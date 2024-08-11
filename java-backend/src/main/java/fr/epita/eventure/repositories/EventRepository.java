package fr.epita.eventure.repositories;


import fr.epita.eventure.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByParticipantsContaining(String participant);
}

