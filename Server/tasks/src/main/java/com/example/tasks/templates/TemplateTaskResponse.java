package com.example.tasks.templates;

import com.example.tasks.model.Task;

import java.util.List;

public class TemplateTaskResponse {
    private String title;
    private String defaultDescription;
    private List<Task> tasks;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDefaultDescription() {
        return defaultDescription;
    }

    public void setDefaultDescription(String defaultDescription) {
        this.defaultDescription = defaultDescription;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setChoices(List<Task> choices) {
        this.tasks = tasks;
    }

}
