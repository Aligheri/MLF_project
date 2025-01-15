package com.mlf_project.topic;

import com.mlf_project.learningPath.LearningPath;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    Topic findByNameAndParentAndLearningPath(String name, Topic parent, LearningPath learningPath);

    List<Topic> findByLearningPathIdAndParentIsNull(Long learningPathId);

    List<Topic> getAllByLearningPathId(Long learningPathId, Specification<Topic> topicPathSpecification);
}
