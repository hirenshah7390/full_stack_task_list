package com.example.tasks.service;

import com.example.tasks.exception.BadRequestException;
import com.example.tasks.exception.ResourceNotFoundException;
import com.example.tasks.model.*;
import com.example.tasks.repository.TaskTemplateRepository;
import com.example.tasks.templates.PagedResponse;
import com.example.tasks.templates.TaskRequest;
import com.example.tasks.templates.TaskResponse;
import com.example.tasks.repository.TaskRepository;
import com.example.tasks.repository.UserRepository;
import com.example.tasks.security.UserPrincipal;
import com.example.tasks.util.AppConstants;
import com.example.tasks.util.ModelMapper;
import com.example.tasks.util.SortByRank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskTemplateRepository taskTemplateRepository;

    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);


    public PagedResponse<TaskResponse> getTasksByUsers(String username, UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));


        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Long> usertaskIds = taskRepository.taskIdsByUserId(user.getId(), pageable);

        if (usertaskIds.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), usertaskIds.getNumber(),
                    usertaskIds.getSize(), usertaskIds.getTotalElements(),
                    usertaskIds.getTotalPages(), usertaskIds.isLast());
        }

        List<Long> taskIds = usertaskIds.getContent();

        Sort sort = new Sort(Sort.Direction.DESC, "createdAt");
        List<Task> tasks = taskRepository.findByIdIn(taskIds, sort);
        //tasks.sort(Comparator.comparing(Task::getTaskStatus));
        tasks = sortTaskByRank(tasks);

        List<TaskResponse> taskResponses = tasks.stream().map(task -> ModelMapper.mapTaskToTaskResponse(task)).collect(Collectors.toList());


        return new PagedResponse<>(taskResponses, usertaskIds.getNumber(), usertaskIds.getSize(), usertaskIds.getTotalElements(), usertaskIds.getTotalPages(), usertaskIds.isLast());
    }

    public TaskResponse getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task", "id", taskId));
      // if(task.getUsers().contains(currentUser) && currentUser.getAuthorities().contains())

        return ModelMapper.mapTaskToTaskResponse(task);
    }

    public Task createTask(TaskRequest taskRequest) {
        Task task = taskRepository.findById(taskRequest.getId()).orElse(new Task());

        Instant now = Instant.now();
        Instant timeEstimatedFinish = taskRequest.getDueDate();
        task.setDueDate(timeEstimatedFinish);
        String title = taskRequest.getTitle();
        task.setTitle(title);
        TaskStatus status = taskRequest.getTaskStatus();
        task.setTaskStatus(status);
        TaskPriority priority = taskRequest.getTaskPriority();
        task.setTaskPriority(priority);
        int timeToFinish = taskRequest.getTimeEstimated();
        task.setTimeEstimated(timeToFinish);
        Set<User> users = taskRequest.getUsers();
        task.setUsers(users);
        task.setTaskTemplate(taskRequest.getTaskTemplate());
        task.setIsRecurring(taskRequest.getIsRecurring());
        task.setRecurringPeriod(taskRequest.getRecurringPeriod());
        task.setStopDate(taskRequest.getStopDate());

        return taskRepository.save(task);
    }

    public TaskTemplate createTaskTemplate(TaskTemplate taskTemplate) {
        return taskTemplateRepository.save(taskTemplate);
    }

    public List<TaskTemplate> getTaskTemplate(){
        return taskTemplateRepository.findAll();
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public List<Task> sortTaskByRank(List<Task> tasks) {
        tasks.sort(Comparator.comparing(Task::getTaskStatus).thenComparing(new SortByRank()));
        return tasks;
    }
}
