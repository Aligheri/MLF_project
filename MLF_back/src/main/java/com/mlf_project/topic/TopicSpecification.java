package com.mlf_project.topic;

import org.springframework.data.jpa.domain.Specification;


public class TopicSpecification {
    public static Specification<Topic> withOwnerId(Long ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
    public static Specification<Topic> withLearningPathId(Long learningPathId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("learningPath").get("id"), learningPathId);
    }
}
