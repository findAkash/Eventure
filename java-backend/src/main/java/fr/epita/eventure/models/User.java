package fr.epita.eventure.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6)
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String role = "User";  // Default role

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // You can add methods to handle password encryption, token generation, etc., if needed
}
