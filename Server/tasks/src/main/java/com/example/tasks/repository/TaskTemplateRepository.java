package com.example.tasks.repository;

import com.example.tasks.model.Task;
import com.example.tasks.model.TaskTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskTemplateRepository extends JpaRepository<TaskTemplate, Long> {
    Optional<TaskTemplate> findById(Long taskId);

    List<Task> findByIdIn(List<Long> taskIds);

    List<Task> findByIdIn(List<Long> taskIds, Sort sort);

    @Query("SELECT tt from TaskTemplate tt where id = :taskTemplateId")
    TaskTemplate tasksTemplateById(@Param("taskTemplateId") Long taskTemplateId);
}

