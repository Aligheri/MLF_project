package com.mlf_project.repository;

import com.mlf_project.entities.ERole;
import com.mlf_project.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role>findByName(ERole name);
}
