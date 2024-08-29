package com.mlf_project.repository;

import com.mlf_project.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);
}
