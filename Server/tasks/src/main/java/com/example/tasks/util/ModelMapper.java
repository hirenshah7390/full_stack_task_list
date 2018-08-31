package com.example.tasks.util;

import com.example.tasks.model.Task;
import com.example.tasks.model.User;
import com.example.tasks.templates.TaskResponse;
import com.example.tasks.templates.UserSummary;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ModelMapper {

    public static TaskResponse mapTaskToTaskResponse(Task task) {
        TaskResponse TaskResponse = new TaskResponse();
        TaskResponse.setId(task.getId());
        TaskResponse.setTitle(task.getTitle());
        TaskResponse.setCreationDateTime(task.getCreatedAt());
        TaskResponse.setDueDate(task.getDueDate());
        TaskResponse.setTaskStatus(task.getTaskStatus());
        TaskResponse.setTaskPriority(task.getTaskPriority());
        TaskResponse.setUsers(task.getUsers());
        TaskResponse.setTaskTemplate(task.getTaskTemplate());
        TaskResponse.setTimeEstimated(task.getTimeEstimated());
        TaskResponse.setIsRecurring(task.getIsRecurring());
        TaskResponse.setStopDate(task.getStopDate());
        TaskResponse.setRecurringPeriod(task.getRecurringPeriod());
        return TaskResponse;
    }

}
