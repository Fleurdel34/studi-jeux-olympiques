package com.studijeuxolympiques.configuration;

import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.service.Impl.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

/** Create class Service
 * use property UserServiceImpl
 * @method to generate token with Map
 * @params User
 * @method to verify if token is expired from Claims
 */

@Service
public class JwtService {

    private final UserServiceImpl userServiceImpl;

    @Autowired
    public JwtService(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    public Map<String, String> generate(String username){
        User user= (User) this.userServiceImpl.loadUserByUsername(username);
        return this.generateJwt(user);
    }

    public String extractUsername(String token){
        return this.getClaim(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = this.getClaim(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    private Map<String, String> generateJwt(User user){

        final long currentTimeMillis = System.currentTimeMillis();
        final long expirationTimeMillis = currentTimeMillis + 30 * 60 * 1000;

        Map<String, Object> map = Map.of(
                "nom", user.getLastname(),
                "mail", user.getMail(),
                Claims.EXPIRATION,new Date(expirationTimeMillis),
                Claims.SUBJECT, user.getUsername()
        );

        final String bearer = Jwts.builder()
                .issuedAt(new Date(currentTimeMillis))
                .expiration(new Date(expirationTimeMillis))
                .subject(user.getUsername())
                .claims(map)
                .signWith(getKey())
                .compact();
        
        return Map.of("bearer", bearer);
    }

    private SecretKey getKey() {
        return Jwts.SIG.HS512.key().build();
    }

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(this.getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private <T> T getClaim(String token, Function<Claims, T> function) {
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

}
