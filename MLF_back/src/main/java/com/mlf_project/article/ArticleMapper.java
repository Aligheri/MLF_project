package com.mlf_project.article;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
public class ArticleMapper {

    public Article toArticle(ArticleRequest request) {
        Article article = new Article();
        article.setUrl(request.getUrl());
        article.setTitle(request.getTitle());
        article.setTopic(request.getTopic());
        article.setCreatedAt(LocalDateTime.now());
        return article;
    }

    public ArticleResponse toArticleResponse(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getUrl(),
                article.getTitle(),
                article.getTopic(),
                article.getCreatedAt()
        );
    }

}
