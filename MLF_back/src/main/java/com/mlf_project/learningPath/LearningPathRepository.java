package com.mlf_project.learningPath;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath , Long>, JpaSpecificationExecutor<LearningPath> {


    @Transactional
    @Modifying
    @Query("UPDATE LearningPath lp SET lp.title = :title WHERE lp.id = :id")
    void updateLearningPathTitle(@Param("id") Long id,@Param("title") String title);
    @Transactional
    @Modifying
    @Query("UPDATE LearningPath lp SET lp.description = :description WHERE lp.id = :id")
    void updateLearningPathDescription(@Param("id") Long id, @Param("description") String description);
}
