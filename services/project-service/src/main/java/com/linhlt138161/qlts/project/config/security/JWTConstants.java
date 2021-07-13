package com.thao.qlts.project.config.security;

public class JWTConstants {
    public static final String SECRET = "IIST";
    public static final long EXPIRATION_TIME = 1000*60*60*8;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}
