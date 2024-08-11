package fr.epita.eventure.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;


@Getter
@Setter
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    @NotBlank
    private String name;

    private String assignedTo;

    private boolean completed;

    private String eventId;
}

