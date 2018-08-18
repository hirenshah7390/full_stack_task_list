package com.example.tasks.util;

import com.example.tasks.model.Task;
import com.example.tasks.model.TaskPriority;

import java.time.Duration;
import java.time.Instant;
import java.util.Comparator;

public class SortByRank implements Comparator<Task> {

    @Override
    public int compare(Task o1, Task o2) {
        int priorityComparisonResult =
                TaskPriority.comparePriorities(o1.getTaskPriority().toString(), o2.getTaskPriority().toString());
        if (priorityComparisonResult == 0) {
            return compareInstance(o1.getDueDate(), o2.getDueDate());
        } else {
            return priorityComparisonResult;
        }
    }

    private int compareInstance(Instant d1, Instant d2) {
        Duration difference = Duration.between(d1, d2);
        if (difference.getSeconds() == 0) {
            return 0;
        } else if (difference.getSeconds() > 0) {
            return 1;
        } else {
            return -1;
        }
    }
}
