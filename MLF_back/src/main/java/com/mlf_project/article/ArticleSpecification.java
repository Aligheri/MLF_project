package com.mlf_project.article;

import com.mlf_project.entities.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class ArticleSpecification {
    public static Specification<Article> withOwnerId(Long ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }

    public static Specification<Article> withArchived(boolean archived) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("archived"), archived);
    }

    public static Specification<Article> withOwnerIdAndArchived(Long ownerId, boolean archived) {
        return Specification.where(withOwnerId(ownerId)).and(withArchived(archived));
    }

    public static Specification<Article> withTitleLike(String title) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Article> byTopicIdAndUserId(Long topicId, Long userId) {
        return (root, query, criteriaBuilder) -> {
            Join<Article, User> userJoin = root.join("owner");

            return criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("topic").get("id"), topicId),
                    criteriaBuilder.equal(userJoin.get("id"), userId)
            );
        };
    }
}
