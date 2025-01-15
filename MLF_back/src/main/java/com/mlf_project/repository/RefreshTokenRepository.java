package com.mlf_project.repository;


import com.mlf_project.entities.RefreshToken;
import com.mlf_project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {

    Optional<RefreshToken> findByToken(String token);

    @Modifying
    int deleteByUser(User user);

    @Modifying
    @Transactional
    void deleteByToken(String token);

    Optional<RefreshToken> findByUserId(Long id);

}
