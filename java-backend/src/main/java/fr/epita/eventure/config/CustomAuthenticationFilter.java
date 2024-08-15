package fr.epita.eventure.config;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class CustomAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {

        // Log the request method and URI for debugging
        logger.info("Request Method: {}, URI: {}", request.getMethod(), request.getRequestURI());

        // Apply to POST, PUT, DELETE requests
        if (HttpMethod.POST.matches(request.getMethod()) ||
                HttpMethod.PUT.matches(request.getMethod()) ||
                HttpMethod.DELETE.matches(request.getMethod())) {

            String token = request.getHeader("Authorization");
            System.out.println("token = " + token);
            if (!StringUtils.hasText(token) || !token.startsWith("Bearer ")) {
                logger.warn("Unauthorized: Missing or invalid token");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Missing or invalid token");
                return;
            }

            token = token.substring(7); // Remove "Bearer " prefix
            logger.info("Token received: {}", token);

            boolean isValidToken = validateTokenWithNodeApi(token);

            if (!isValidToken) {
                logger.warn("Unauthorized: Invalid token");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Invalid token");
                return;
            }

            // Set authentication in Spring Security
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(token, null, null);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.info("Token validated and authentication set for: {}", token);
        }

        filterChain.doFilter(request, response);
    }

    private boolean validateTokenWithNodeApi(String token) {
        // Implement actual validation logic
        // Log for debugging
        logger.debug("Validating token with Node.js API: {}", token);
        return true; // Replace with actual validation logic
    }
}

