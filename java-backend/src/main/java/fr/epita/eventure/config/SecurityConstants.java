package fr.epita.eventure.config;

public class SecurityConstants {
    public static final long JWT_EXPIRATION = 70000;
    public static String TOKEN_VALIDATION_URL = "http://localhost:8000/api/v1/auth/validateToken/";
}