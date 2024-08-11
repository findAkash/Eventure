package fr.epita.eventure.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;
import java.util.UUID;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            String requestId = UUID.randomUUID().toString();
            log.info("Request ID: {}", requestId);
            log.info("Request URI: {}", request.getRequestURI());
            log.info("Request Method: {}", request.getMethod());

            // Logging headers
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                log.info("Header: {} = {}", headerName, request.getHeader(headerName));
            }

            long startTime = System.currentTimeMillis();

            try {
                filterChain.doFilter(request, response);
            } finally {
                long endTime = System.currentTimeMillis();
                log.info("Request ID: {}, Response Status: {}, Elapsed Time: {} ms", requestId, response.getStatus(), endTime - startTime);
            }
        }
    }
