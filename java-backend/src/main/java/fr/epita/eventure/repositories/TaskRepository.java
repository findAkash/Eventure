package fr.epita.eventure.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import fr.epita.eventure.models.Task;
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByEventId(String eventId);
}

