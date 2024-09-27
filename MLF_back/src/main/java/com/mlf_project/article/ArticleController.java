package com.mlf_project.article;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/articles")
@Tag(name = "articles")
@RequiredArgsConstructor
@Transactional
public class ArticleController {
    private ArticleService articleService;

    private final ArticleMapper articleMapper;

    @Autowired
    public ArticleController(ArticleService articleService, ArticleMapper articleMapper) {
        this.articleService = articleService;
        this.articleMapper = articleMapper;
    }

    //Tested
    @PostMapping
    public ResponseEntity<ArticleResponse> createArticle(@Valid @RequestBody ArticleRequest articleRequest, Authentication authentication) {
        Article savedArticle = articleService.saveArticle(articleRequest, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(articleMapper.toArticleResponse(savedArticle));
    }

    //Tested
    @GetMapping("/my-articles")
    public ResponseEntity<List<ArticleResponse>> getArticles(Authentication authentication) {
        List<ArticleResponse> articles = articleService.getArticles(authentication).stream()
                .map(articleMapper::toArticleResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(articles);
    }

    //Tested
    @GetMapping("/my-articles-by-topic")
    public ResponseEntity<Map<String, List<ArticleResponse>>> getArticlesGroupedByTopic(Authentication authentication) {
        Map<String, List<ArticleResponse>> articlesGroupedByTopic = articleService.getArticlesGroupedByTopic(authentication);
        return ResponseEntity.ok(articlesGroupedByTopic);
    }

    //Tested
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id, Authentication authentication) {
        articleService.deleteArticle(id, authentication);
        return ResponseEntity.noContent().build();
    }

    //Tested
    @PutMapping("/archive/{id}")
    public ResponseEntity<Void> archiveArticle(@PathVariable Long id, Authentication authentication) {
        articleService.archiveArticle(id, authentication);
        return ResponseEntity.ok().build();
    }

    //Tested
    @DeleteMapping("/delete-by-topic")
    public ResponseEntity<Void> deleteArticlesByTopic(@RequestParam String topic, Authentication authentication) {
        articleService.deleteArticlesByTopic(topic, authentication);
        return ResponseEntity.noContent().build();
    }
}
