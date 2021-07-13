package com.thao.qlts.project.filter;

import com.thao.qlts.project.config.security.JWTConstants;
import com.thao.qlts.project.config.security.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author chinhlv
 * @created 23/06/2020 - 11:09 AM
 * @project booking-room-services
 **/


public class JWTAuthorizaionFilter extends OncePerRequestFilter {

    @Autowired
    private JWTProvider jwtProvider;

    @Resource(name = "humanResourcesService")
    public UserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader(JWTConstants.HEADER_STRING);
        if (authHeader != null && authHeader.startsWith(JWTConstants.TOKEN_PREFIX)) {
            final String authToken = authHeader.substring(7);
            String username = jwtProvider.getEmailFromToken(authToken);// (username->>email)
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtProvider.validateToken(authToken, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(
                            request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
