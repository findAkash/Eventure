package fr.epita.eventure.repositories;


import fr.epita.eventure.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByParticipantsContaining(String participant);

    List<Event> findByDateTimeAfterOrderByDateTimeAsc(LocalDateTime currentTime);

    List<Event> findByPostedByAndDateTimeAfterOrderByDateTimeAsc(String userId, LocalDateTime dateTime);

    //past events
    List<Event> findByPostedByAndDateTimeBeforeOrderByDateTimeDesc(String userId, LocalDateTime currentTime);


}

