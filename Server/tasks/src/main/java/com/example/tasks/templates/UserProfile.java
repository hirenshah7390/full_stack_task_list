package com.example.tasks.templates;

import com.example.tasks.model.Task;

import java.time.Instant;
import java.util.List;

public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private Instant joinedAt;
    private List<Task> userTasks;

    public UserProfile(Long id, String username, String name, Instant joinedAt, List<Task> userTasks) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.joinedAt = joinedAt;
        this.userTasks = userTasks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Instant joinedAt) {
        this.joinedAt = joinedAt;
    }

    public List<Task> getTasks() {
        return userTasks;
    }

    public void setTasks(List<Task> tasks) {
        this.userTasks = tasks;
    }

}
