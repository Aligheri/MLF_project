package com.mlf_project.learningPath;

import org.springframework.data.jpa.domain.Specification;

public class LearningPathSpecification {

    public static Specification<LearningPath> withOwnerId(Long ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}
