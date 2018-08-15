package com.example.tasks.model;

public enum TaskStatus {

    PENDING,
    IN_PROGRESS,
    FINISHED;

    public static TaskStatus lookup(String inputTaskStatusString) {
        for (TaskStatus status : values()) {
            if (status.name().equals(inputTaskStatusString.toUpperCase())) {
                return status;
            }
        }
        return null;
    }
}
