package com.example.tasks.model;
import com.example.tasks.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tasks")

public class Task extends UserDateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 140)
    private String title;

    @Enumerated(EnumType.STRING)
    private TaskStatus taskStatus;

    @Column(length = 65535, columnDefinition = "Text")
    private String description;

    @Column(length = 65535, columnDefinition = "Text")
    private String note;

    @Column(length = 65535, columnDefinition = "Text")
    private String feedback;

    @Enumerated(EnumType.STRING)
    private TaskPriority taskPriority;

    @ManyToOne
    @JoinColumn(name = "template_id", referencedColumnName="id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
    private TaskTemplate taskTemplate;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "task_users",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users = new HashSet<>();

    //@NotNull
    private int timeEstimated;

   // @NotNull
    private Instant dueDate;

    private boolean isRecurring;

    private Instant stopDate;

    @Enumerated(EnumType.STRING)
    private RecurringPeriod recurringPeriod;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public boolean getIsRecurring() {
        return isRecurring;
    }

    public void setIsRecurring(boolean isRecurring) {
        this.isRecurring = isRecurring;
    }

    public Instant getStopDate() {
        return stopDate;
    }

    public void setStopDate(Instant stopDate) {
        this.stopDate = stopDate;
    }

    public RecurringPeriod getRecurringPeriod() {
        return recurringPeriod;
    }

    public void setRecurringPeriod(RecurringPeriod recurringPeriod) {
        this.recurringPeriod = recurringPeriod;
    }

   public TaskTemplate getTaskTemplate() {
        return taskTemplate;
   }

   public void setTaskTemplate(TaskTemplate template){
        this.taskTemplate = template;
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
