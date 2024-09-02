package com.studijeuxolympiques.configuration;

import com.studijeuxolympiques.model.Jwt;
import com.studijeuxolympiques.service.Impl.UserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


/**
 * Create Filter class
 * with abstract class OncePerRequestFilter
 * implement method with properties token and username at null
 * check token gives by user it is the same token in BDD
 */


@Service
public class JwtFilter extends OncePerRequestFilter {

    private final UserServiceImpl userServiceImpl;

    private final JwtService jwtService;

    public JwtFilter(UserServiceImpl userServiceImpl, JwtService jwtService) {
        this.userServiceImpl = userServiceImpl;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
    {

        String token;
        Jwt tokenInBDD = null;
        String username = null;
        boolean isTokenExpired = true;

        final String authorization = request.getHeader("Authorization");

        if (authorization !=null && authorization.startsWith("Bearer ")) {
            token = authorization.substring(7);
            tokenInBDD = this.jwtService.tokenByValue(token);
            isTokenExpired = jwtService.isTokenExpired(token);
            username = jwtService.extractUsername(token);

        }

        if (!isTokenExpired
                && tokenInBDD.getUser().getUsername().equals(username)
                && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = userServiceImpl.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);
    }
}
