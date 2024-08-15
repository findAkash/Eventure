package fr.epita.eventure.controller;

import fr.epita.eventure.models.Event;
import fr.epita.eventure.models.Task;
import fr.epita.eventure.models.User;
import fr.epita.eventure.services.EventService;
import fr.epita.eventure.services.TaskService;
import fr.epita.eventure.services.UserService;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<TaskDetailsResponse> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();

        // Map each task to a TaskDetailsResponse
        return tasks.stream()
                .map(this::mapTaskToTaskResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/personal/{id}")
    public List<TaskDetailsResponse> getPersonalTasks(@PathVariable String id) {
        List<Task> tasks = taskService.getPersonalTasks(id);
        // Map each task to a TaskDetailsResponse
        return tasks.stream()
                .map(this::mapTaskToTaskResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/personal/past/{id}")
    public List<TaskDetailsResponse> getPersonalPastTasks(@PathVariable String id){
        List<Task> tasks = taskService.getPastTasks(id);
        return tasks.stream()
                .map(this::mapTaskToTaskResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        return updatedTask != null ? ResponseEntity.ok(updatedTask)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/event/{eventId}")
    public List<Task> getTasksByEventId(@PathVariable String eventId) {
        return taskService.getTasksByEventId(eventId);
    }

    private TaskDetailsResponse mapTaskToTaskResponse(Task task) {
        TaskDetailsResponse taskResponse = new TaskDetailsResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                "", // Placeholder for the full name of the assigned user
                task.getStatus(),
                "", // Placeholder for the event title
                task.getDeadline(),
                task.getCreatedBy(),
                task.getAssignedTo(),
                task.getEventId()
        );

        // Get Event Details
        Optional<Event> eventOptional = eventService.getEventById(task.getEventId());
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            taskResponse.setEventTitle(event.getTitle());
        } else {
            taskResponse.setEventTitle("Unknown Event");
        }

        // Get User Details
        Optional<User> userOptional = userService.getUserById(task.getAssignedTo());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            taskResponse.setAssignedToFullName(user.getFirstName() + " " + user.getLastName());
        } else {
            taskResponse.setAssignedToFullName("Unknown User");
        }

        return taskResponse;
    }
}

@Getter
@Setter
class TaskDetailsResponse {
    private String id;
    private String title;
    private String description;
    private String assignedTo;
    private String assignedToFullName;
    private String status;
    private String eventId;
    private String eventTitle;
    private LocalDateTime deadline;
    private String createdBy;

    public TaskDetailsResponse(String id, String title, String description, String assignedToFullName, String status, String eventTitle, @NotBlank LocalDateTime deadline, String createdBy, String assignedTo, String eventId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignedToFullName = assignedToFullName;
        this.status = status;
        this.eventTitle = eventTitle;
        this.deadline = deadline;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
        this.eventId = eventId;
    }
}

