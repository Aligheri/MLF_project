package com.mlf_project.topic;

import com.mlf_project.learningPath.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long>, JpaSpecificationExecutor<Topic> {
    Topic findByNameAndParentAndLearningPath(String name, Topic parent, LearningPath learningPath);

    List<Topic> findByLearningPathIdAndParentIsNull(Long learningPathId);

    @Query("SELECT t FROM Topic t WHERE t.learningPath.id = :learningPathId")
    List<Topic> findAllByLearningPathId(@Param("learningPathId") Long learningPathId);

}
