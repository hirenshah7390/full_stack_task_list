package com.example.tasks.templates;

import com.example.tasks.model.*;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class TaskRequest {
    @NotBlank
    @Size(max = 140)
    private String title;
    private TaskStatus taskStatus;
    private String description;
    private String note;
    private String feedback;
    private TaskPriority taskPriority;
    private Instant timeEstimatedFinish;
    private TaskTemplate template;
    private Set<User> users;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public TaskPriority getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(TaskPriority taskPriority) {
        this.taskPriority = taskPriority;
    }

    public Instant getTimeEstimatedFinish() {
        return timeEstimatedFinish;
    }

    public void setTimeEstimatedFinish(Instant timeEstimatedFinish) {
        this.timeEstimatedFinish = timeEstimatedFinish;
    }

    public TaskTemplate getTaskTemplate() {
        return template;
    }

    public void setTaskTemplate(TaskTemplate template){
        this.template = template;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }


}
