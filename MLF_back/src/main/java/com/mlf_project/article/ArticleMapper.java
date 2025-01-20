package com.mlf_project.article;

import com.mlf_project.topic.Topic;
import com.mlf_project.topic.TopicRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ArticleMapper {

    private final TopicRepository topicRepository;

    public ArticleMapper(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public Article toArticle(ArticleRequest request) {
        Article article = new Article();
        article.setUrl(request.getUrl());
        article.setTitle(request.getTitle());
        Topic topic = topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with ID: " + request.getTopicId()));
        article.setTopic(topic);
//        article.setTopic(request.getTopicId());
        article.setCreatedAt(LocalDateTime.now());
        article.setPriority(request.getPriority());

        return article;
    }

    public ArticleResponse toArticleResponse(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getUrl(),
                article.getTitle(),
//                article.getTopicId(),
                article.getTopic() != null ? article.getTopic().getId() : null,
                article.getCreatedAt(),
                article.getPriority()
        );
    }
}
