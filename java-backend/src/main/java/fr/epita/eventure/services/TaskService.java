package fr.epita.eventure.services;

import fr.epita.eventure.models.Task;
import fr.epita.eventure.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getPersonalTasks(String userId){
        return taskRepository.findByCreatedByOrAssignedToOrderByDeadlineDesc(userId, userId);
    }

    public List<Task> getPastTasks(String userId) {
        // Get the current time in UTC
        LocalDateTime currentTime = LocalDateTime.now(ZoneOffset.UTC);
        System.out.println("Current Time (UTC): " + currentTime);

        List<Task> pastTasks = taskRepository.findByCreatedByOrAssignedToAndDeadlineBeforeOrderByDeadlineDesc(userId, userId, currentTime);

        for (Task task : pastTasks) {
            System.out.println("Task Title: " + task.getTitle());
            System.out.println("Task Deadline: " + task.getDeadline());
        }

        return pastTasks;
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task task) {
        if (taskRepository.existsById(id)) {
            task.setId(id);
            return taskRepository.save(task);
        }
        return null;
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByEventId(String eventId) {
        return taskRepository.findByEventId(eventId);
    }
}
