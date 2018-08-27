package com.example.tasks.templates;

import com.example.tasks.model.Role;

import java.util.List;
import java.util.Set;

public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private Set<Role> role;

    public UserSummary(Long id, String username, String name, Set<Role> role) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.role = role;
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

    public Set<Role> getRole() {
        return role;
    }

    public void setrole(Set<Role> role) {
        this.role = role;
    }
}
