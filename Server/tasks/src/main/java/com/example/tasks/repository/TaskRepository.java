package com.example.tasks.repository;

import com.example.tasks.model.Task;
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
public interface TaskRepository extends JpaRepository<Task, Long>{
    Optional<Task> findById(Long taskId);

    Page<Task> findByCreatedBy(Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<Task> findByIdIn(List<Long> taskIds);

    List<Task> findByIdIn(List<Long> taskIds, Sort sort);

    @Query("SELECT t.id from Task t join t.users u where u.id = :userId")
    Page<Long> taskIdsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT t from Task t join t.users u where u.id = :userId")
    List<Task> tasksByUserId(@Param("userId") Long userId);
}
