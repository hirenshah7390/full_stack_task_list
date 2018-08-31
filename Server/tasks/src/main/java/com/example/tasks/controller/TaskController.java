package com.example.tasks.controller;

import com.example.tasks.model.*;
import com.example.tasks.templates.*;
import com.example.tasks.repository.TaskRepository;
import com.example.tasks.repository.UserRepository;
import com.example.tasks.security.CurrentUser;
import com.example.tasks.security.UserPrincipal;
import com.example.tasks.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskService taskService;

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    @PostMapping
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskRequest taskRequest) {
        Task task = taskService.createTask(taskRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{taskId}")
                .buildAndExpand(task.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, task.getId().toString()));
    }

    @GetMapping("{taskId}")
    public TaskResponse getTaskById(@PathVariable Long taskId) {
        return taskService.getTaskById(taskId);
    }

}
