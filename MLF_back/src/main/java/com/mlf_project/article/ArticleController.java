package com.mlf_project.article;

import com.mlf_project.topic.Topic;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/articles")
@Tag(name = "articles")
@RequiredArgsConstructor
@Transactional
public class ArticleController {

    private final ArticleService articleService;
    private final ArticleMapper articleMapper;

    //Tested
    @PostMapping
    public ResponseEntity<ArticleResponse> createArticle(@Valid @RequestBody ArticleRequest articleRequest, Authentication authentication) {
        Article savedArticle = articleService.saveArticle(articleRequest, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(articleMapper.toArticleResponse(savedArticle));
    }

    @PostMapping("/non-attached")
    public ResponseEntity<ArticleResponse> createMinimalArticle(
            @Valid @RequestBody NonAttachedArticleRequest request, Authentication authentication) {
        Article article = articleService.saveNonAttachedArticle(request, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(articleMapper.toArticleResponse(article));
    }

    //Tested
    @GetMapping("/my-articles")
    public ResponseEntity<List<ArticleResponse>> getArticles(Authentication authentication) {
        List<ArticleResponse> articles = articleService.getArticles(authentication).stream()
                .map(articleMapper::toArticleResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{topicId}/articles")
    public ResponseEntity<List<ArticleResponse>> getArticlesByTopic(@PathVariable Long topicId, Authentication authentication) {
        List<ArticleResponse> articles = articleService.getArticlesByTopic(topicId, authentication).stream()
                .map(articleMapper::toArticleResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(articles);
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

    @GetMapping("/my-archived-articles")
    public ResponseEntity<List<ArticleResponse>> getArchivedArticles(Authentication authentication) {
        List<ArticleResponse> articles = articleService.getAllArchivedArticles(authentication).stream()
                .map(articleMapper::toArticleResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(articles);
    }

    //Tested
    @DeleteMapping("/delete-by-topic")
    public ResponseEntity<Void> deleteArticlesByTopic(@RequestParam Topic topic, Authentication authentication) {
        articleService.deleteArticlesByTopic(topic, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/find-article")
    public ResponseEntity<List<Article>> findArticleByTitle(@RequestParam String title, Authentication authentication) {
        List<Article> articles = articleService.findArticleByTitle(title, authentication);
        return ResponseEntity.ok(articles);
    }
}