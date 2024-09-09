package com.mlf_project.article;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
@Transactional
public class ArticleController {
    private ArticleService articleService;

    private final ArticleMapper articleMapper;


    @PostMapping
    public ResponseEntity<ArticleResponse> createArticle(@Valid @RequestBody ArticleRequest articleRequest) {
        Article article = articleMapper.toArticle(articleRequest);
        Article savedArticle = articleService.saveArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(articleMapper.toArticleResponse(savedArticle));
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> getAllArticles() {
        List<ArticleResponse> articles = articleService.getAllArticles().stream()
                .map(articleMapper::toArticleResponse)
                .toList();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/by-topic")
    public ResponseEntity<List<ArticleResponse>> getArticlesByTopic(@RequestParam String topic) {
        List<ArticleResponse> articles = articleService.getArticlesByTopic(topic).stream()
                .map(articleMapper::toArticleResponse)
                .toList();
        return ResponseEntity.ok(articles);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/by-topic")
    public ResponseEntity<Void> deleteArticlesByTopic(@RequestParam String topic) {
        articleService.deleteArticlesByTopic(topic);
        return ResponseEntity.noContent().build();
    }
}
