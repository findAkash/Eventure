package fr.epita.eventure.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import fr.epita.eventure.models.Task;
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByEventId(String eventId);

    List<Task> findByCreatedByOrAssignedToOrderByDeadlineDesc(String createdUserId, String assignedUserId);

    List<Task> findByCreatedByOrAssignedToAndDeadlineBeforeOrderByDeadlineDesc(String createdUserId, String assignedUserId, LocalDateTime currentTime);

}

