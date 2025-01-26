package com.mlf_project.topic;

import com.mlf_project.learningPath.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long>, JpaSpecificationExecutor<Topic> {
    Optional<Topic> findByNameAndParentAndLearningPath(String name, Topic parent, LearningPath learningPath);

    List<Topic> findByLearningPathIdAndParentIsNull(Long learningPathId);

}
