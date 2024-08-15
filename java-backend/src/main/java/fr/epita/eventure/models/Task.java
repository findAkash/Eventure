package fr.epita.eventure.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;


@Getter
@Setter
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String assignedTo;

    @NotBlank
    private String status;

    @NotBlank
    private String eventId;

    @NotBlank
    private LocalDateTime deadline;

    @NotBlank
    private String createdBy;
}

