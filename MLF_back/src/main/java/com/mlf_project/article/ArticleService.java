package com.mlf_project.article;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private ArticleRepository articleRepository;


    public Article saveArticle(Article article) {
        article.setCreatedAt(LocalDateTime.now());
        return articleRepository.save(article);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public List<Article> getArticlesByTopic(String topic) {
        return articleRepository.findByTopic(topic);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    public void deleteArticlesByTopic(String topic) {
        List<Article> articles = articleRepository.findByTopic(topic);
        articleRepository.deleteAll(articles);
    }
}
