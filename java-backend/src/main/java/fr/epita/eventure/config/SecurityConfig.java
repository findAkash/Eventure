package fr.epita.eventure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .requestMatchers(HttpMethod.GET, "/**").permitAll()  // Allow all GET requests
                .requestMatchers(HttpMethod.POST, "/**").authenticated()  // Require authentication for POST
                .requestMatchers(HttpMethod.PUT, "/**").authenticated()  // Require authentication for PUT
                .requestMatchers(HttpMethod.DELETE, "/**").authenticated()  // Require authentication for DELETE
                .anyRequest().authenticated()  // Require authentication for other requests
                .and()
                .csrf().disable();  // Disable CSRF for simplicity (if needed)

        // Add custom JWT authentication filter
        http.addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() {
        return new CustomAuthenticationFilter();
    }
}
