package com.mlf_project.article;

import org.springframework.data.jpa.domain.Specification;

public class ArticleSpecification {
    public static Specification<Article> withOwnerId(Long ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}
