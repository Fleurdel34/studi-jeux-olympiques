package com.studijeuxolympiques.configuration;

import com.studijeuxolympiques.model.Jwt;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.repository.JwtRepository;
import com.studijeuxolympiques.service.Impl.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;



/** Create class Service
 * use property UserServiceImpl
 * @method to generate token with Map
 * @params User
 * @method to check if token is expired from Claims
 * @method to find by value the token in bdd
 * @method to clean bdd and to erase token expired and disabled
 */

@Slf4j
@Transactional
@Service
public class JwtService {

    public static final String BEARER = "bearer";
    public static final String TOKEN_INVALID = "Token invalid";

    @Value("${SECRET_KEY_JWT}")
    private String secretKey;

    private final UserServiceImpl userServiceImpl;

    private final JwtRepository jwtRepository;

    @Autowired
    public JwtService(JwtRepository jwtRepository, UserServiceImpl userServiceImpl) {
        this.jwtRepository = jwtRepository;
        this.userServiceImpl = userServiceImpl;
    }

    public Jwt tokenByValue(String value) {
        return this.jwtRepository.findByValueAndDisabledAndExpired(
                value,
                false,
                false
                )
                .orElseThrow(() -> new RuntimeException("Token invalid or unknown"));
    }

    public Map<String, String> generate(String username){
        User user= (User) this.userServiceImpl.loadUserByUsername(username);
        this.disableTokens(user);
        Map<String, String> jwtMap = new HashMap<>(this.generateJwt(user));

        final Jwt jwt = Jwt
                .builder()
                .value(jwtMap.get(BEARER))
                .disabled(false)
                .expired(false)
                .user(user)
                .build();

        this.jwtRepository.save(jwt);
        jwtMap.put("id", String.valueOf(user.getId()));
        jwtMap.put("role", String.valueOf(user.getRole()));
        return jwtMap;
    }

    private void disableTokens(User user){
        final List<Jwt> jwtList = this.jwtRepository.findUserUsername(user.getUsername()).peek(
        jwt -> {
            jwt.setDisabled(true);
            jwt.setExpired(true);
        }
        ).collect(Collectors.toList());

        this.jwtRepository.saveAll(jwtList);

    }

    public String extractUsername(String token){
        return this.getClaim(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate =  getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }

    private Date getExpirationDateFromToken(String token) {
        return this.getClaim(token, Claims::getExpiration);
    }

    private <T> T getClaim(String token, Function<Claims, T> function) {
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

        private Map<String, String> generateJwt(User user){

            final long currentTime = System.currentTimeMillis();
            final long expirationTime = currentTime + 10 * 60 * 1000;

        Map<String, Object> map = Map.of(
                "nom", user.getLastname(),
                Claims.EXPIRATION,new Date(expirationTime),
                Claims.SUBJECT, user.getUsername()
        );

        final String bearer = Jwts.builder()
                .issuedAt(new Date(currentTime))
                .expiration(new Date(expirationTime))
                .subject(user.getUsername())
                .claims(map)
                .signWith(getKey())
                .compact();
        
        return Map.of(BEARER, bearer);
    }

    private SecretKey getKey() {
       byte[] keyBytes = secretKey.getBytes();
       return new SecretKeySpec(keyBytes, "HmacSHA512");
    }


    public void disconnection() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Jwt jwt = this.jwtRepository.findUserValidToken(
                user.getUsername(),
                false,
                false
        ).orElseThrow(() -> new RuntimeException(TOKEN_INVALID));
         jwt.setExpired(true);
         jwt.setDisabled(true);
         this.jwtRepository.save(jwt);
    }

    @Scheduled(cron = "@daily")
    public void removeUselessJwt(){
        log.info("remove token expired and disabled at {}", Instant.now());
        this.jwtRepository.deleteAllByExpiredAndDisabled(true, true);

    }


}
