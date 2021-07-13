package com.thao.qlts.project.config.security;

import com.thao.qlts.project.entity.HumanResourcesEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JWTProvider {

    private final Logger log = LogManager.getLogger(JWTProvider.class);

    public String getEmailFromHeaders(String header) {
        String token = "", email = "";
        if (header != null || header.startsWith(JWTConstants.TOKEN_PREFIX)) {
            token = header.substring(JWTConstants.TOKEN_PREFIX.length());
            if (token.length() != 0) {
                email = this.getEmailFromToken(token);
                return email;
            }
        }
        return null;
    }
    public Long getIdHummer(String header) {
        String token = ""; Long id ;
        if (header != null || header.startsWith(JWTConstants.TOKEN_PREFIX)) {
            token = header.substring(JWTConstants.TOKEN_PREFIX.length());
            if (token.length() != 0) {
                id = this.getLongHummer(token);
                return id;
            }
        }
        return null;
    }
    public Map<String,Object> getListDataToken(String header) {
        String token = ""; Long id ;
        Map<String,Object> map;
        if (header != null || header.startsWith(JWTConstants.TOKEN_PREFIX)) {
            token = header.substring(JWTConstants.TOKEN_PREFIX.length());
            if (token.length() != 0) {
                final Claims claims = getClaimsFromToken(token);
                map=claims;
                return map;
            }
        }
        return null;
    }
    public Long getLongHummer(String token) {
        Long id;
        try {
            final Claims claims = getClaimsFromToken(token);
            id = Long.valueOf(String.valueOf(claims.get("humanResourceId")));
        } catch (Exception e) {
            log.error("Not found Username by Token", token);
            id = null;
        }
        return id;
    }

    public String getEmailFromToken(String token) {
        String email;
        try {
            final Claims claims = getClaimsFromToken(token);
            email = claims.getSubject();
        } catch (Exception e) {
            log.error("Not found Username by Token", token);
            email = null;
        }
        return email;
    }

    public Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(JWTConstants.SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            log.error("Not found Claim by Token ", token);
            claims = null;
        }
        return claims;
    }

    public Date getCreatedDateFromToken(String token) {
        Date created;
        try {
            final Claims claims = getClaimsFromToken(token);
            created = new Date((Long) claims.get("created"));
        } catch (Exception e) {
            log.error("Not found Created date by Token ", token);
            created = null;
        }
        return created;
    }

    public Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            expiration = getClaimsFromToken(token).getExpiration();
        } catch (Exception e) {
            log.error("Not found Created date by Token ", token);
            expiration = null;
        }
        return expiration;
    }

    public String generateToken(HumanResourcesEntity user) {
        log.info("<--- generateToken : start");
        Claims claims = Jwts.claims().setSubject(user.getEmail());
        claims.put("humanResourceId", user.getHumanResourceId());
//        claims.put("username", user.getUsername());
//        claims.put("email", user.getEmail());
//        claims.put("code", user.getCode());
//        claims.put("listPermission", user.getAuthorities());
//        claims.put("created", new Date());
        return generateToken(claims);
    }

    public String refreshToken(String token) {
        String refreshToken;
        try {
            final Claims claims = getClaimsFromToken(token);
            claims.put("created", new Date());
            refreshToken = generateToken(claims);
        } catch (Exception e) {
            log.error("Not fond Claim");
            refreshToken = null;
        }
        return refreshToken;
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = getEmailFromToken(token);
        return (
                email.equals(userDetails.getUsername())
                        && !isExpirationDate(token)
        );
    }

    private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS256, JWTConstants.SECRET)
                .compact();
    }

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + JWTConstants.EXPIRATION_TIME);
    }

    private boolean isExpirationDate(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private boolean canTokenBeRefreshed(String token) {
        return !isExpirationDate(token);
    }

    private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
        return (lastPasswordReset != null && created.before(lastPasswordReset));
    }


}
