package com.example.tasks.controller;

import com.example.tasks.model.TaskTemplate;
import com.example.tasks.repository.TaskRepository;
import com.example.tasks.repository.UserRepository;
import com.example.tasks.service.TaskService;
import com.example.tasks.templates.ApiResponse;
import com.example.tasks.templates.TaskRequest;
import com.example.tasks.templates.TaskResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/taskTemplates")
public class TaskTemplateController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskService taskService;


    @PostMapping
    public ResponseEntity<?> createTaskTemplate(@Valid @RequestBody TaskTemplate taskTemplate) {
        TaskTemplate generatedTaskTemplate = taskService.createTaskTemplate(taskTemplate);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{taskTemplateId}")
                .buildAndExpand(taskTemplate.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "TaskTemplate Created Successfully"));
    }

    @GetMapping
    public List<TaskTemplate> getTaskTemplates() {
        return taskService.getTaskTemplate();
    }

}
