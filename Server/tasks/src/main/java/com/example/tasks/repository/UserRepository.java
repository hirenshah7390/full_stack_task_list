package com.example.tasks.repository;

import com.example.tasks.model.Task;
import com.example.tasks.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);

   /* @Query("SELECT u from User u join user_roles r where u.id = r.user_id and r.role_id = :roleId")
    List<User> usersByRoleId(@Param("roleId") Long roleId);*/

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
