package com.studijeuxolympiques.configuration;

import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.service.Impl.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
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

    private final String secretKey = "a091e1f010a4014553f790bc45c2bde32d357081d43f1f9df9c05db05b7f41de";


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

        final long currentTimeMillis = System.currentTimeMillis();
        final long expirationTimeMillis = currentTimeMillis + 30 * 60 * 1000;

        Map<String, Object> map = Map.of(
                "nom", user.getLastname(),
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
       byte[] keyBytes = secretKey.getBytes();
       return new SecretKeySpec(keyBytes, "HmacSHA512");
    }

}
