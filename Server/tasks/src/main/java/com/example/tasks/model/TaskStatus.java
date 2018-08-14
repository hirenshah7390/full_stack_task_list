package com.example.tasks.model;

public enum TaskStatus {

    CREATED,
    ASSIGNED,
    IN_PROGRESS,
    FINISHED;

    /**
     * lookup function will find the related enum element by input task status string (converted to
     * uppercase) and return with the enum when the input string equals the name of enum element.
     * Otherwise, return null.
     *
     * @param inputTaskStatusString input TaskStatus string is passed from client (frontend or other
     *     backend) as String
     * @return TaskStatus enum when exist and null when doesn't exist
     */
    public static TaskStatus lookup(String inputTaskStatusString) {
        for (TaskStatus status : values()) {
            if (status.name().equals(inputTaskStatusString.toUpperCase())) {
                return status;
            }
        }
        return null;
    }
}
