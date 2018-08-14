package com.example.tasks.model;

public enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH;

    public static TaskPriority lookup(String inputTaskPriorityString) {
        for (TaskPriority priority : values()) {
            if (priority.name().equals(inputTaskPriorityString.toUpperCase())) {
                return priority;
            }
        }
        return null;
    }

    public static int compareTwoPriorities(String p1String, String p2String) {
        if (p1String.equals(p2String)) {
            return 0;
        } else {
            TaskPriority p1 = TaskPriority.valueOf(p1String);
            TaskPriority p2 = TaskPriority.valueOf(p2String);
            if (p1.equals(TaskPriority.HIGH)) {
                return -1;
            } else if (p1.equals(TaskPriority.MEDIUM) && p2.equals(TaskPriority.LOW)) {
                return -1;
            } else if (p1.equals(TaskPriority.MEDIUM) && p2.equals(TaskPriority.HIGH)) {
                return 1;
            } else {
                return 1;
            }
        }
    }
}
