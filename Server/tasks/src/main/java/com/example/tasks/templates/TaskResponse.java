package com.example.tasks.templates;

import com.example.tasks.model.TaskPriority;
import com.example.tasks.model.TaskStatus;
import com.example.tasks.model.TaskTemplate;
import com.example.tasks.model.User;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;
import java.util.Set;

public class TaskResponse {
    private Long id;
    private String title;
    private TaskStatus taskStatus;
    private String description;
    private String note;
    private String feedback;
    private TaskPriority taskPriority;
    private Instant dueDate;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private TaskTemplate template;
    private Set<User> users;
    private int timeEstimated;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public void setFeedback(String note) {
        this.feedback = feedback;
    }

    public TaskPriority getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(TaskPriority taskPriority) {
        this.taskPriority = taskPriority;
    }

    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public Instant getTimeEstimatedFinish() {
        return dueDate;
    }

    public void setTimeEstimatedFinish(Instant timeEstimatedFinish) {
        this.dueDate = timeEstimatedFinish;
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

    public int getTimeEstimated(){return timeEstimated;}

    public void setTimeEstimated(int timeEstimated) {this.timeEstimated = timeEstimated;}



}
