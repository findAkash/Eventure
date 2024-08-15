package fr.epita.eventure.models;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.time.LocalDateTime;

@Setter
@Getter
@Document(collection = "events")
public class Event {

    @Id
    private String id;

    @NotBlank(message = "Event name is required")
    private String title;

    private String description;

    @NotBlank(message = "Event name is required")
    private LocalDateTime dateTime;

    @NotBlank(message = "Event name is required")
    private String location;

    private List<String> participants;

    private List<String> images;

    private String postedBy;
}
