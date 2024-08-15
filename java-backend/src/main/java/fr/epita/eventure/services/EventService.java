package fr.epita.eventure.services;

import fr.epita.eventure.models.Event;
import fr.epita.eventure.models.Task;
import fr.epita.eventure.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    public List<Event> getMyEvents(String id) {
        // Get the current date and time
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByPostedByAndDateTimeAfterOrderByDateTimeAsc(id, now);
    }

    public List<Event> getPastEvents(String userId) {
        LocalDateTime currentTime = LocalDateTime.now();
        return eventRepository.findByPostedByAndDateTimeBeforeOrderByDateTimeDesc(userId, currentTime);
    }

    public List<Event> getAllUpcomingEvents() {
        LocalDateTime currentTime = LocalDateTime.now();
        return eventRepository.findByDateTimeAfterOrderByDateTimeAsc(currentTime);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(String id, Event event) {
        if (eventRepository.existsById(id)) {
            event.setId(id);
            return eventRepository.save(event);
        }
        return null;
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}

