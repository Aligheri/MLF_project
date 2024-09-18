package com.mlf_project.article;

import com.mlf_project.entities.User;
import com.mlf_project.exception.PermissionDeniedException;
import com.mlf_project.repository.UserRepository;
import com.mlf_project.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final UserRepository userRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
        this.userRepository = userRepository;
    }

    public Article saveArticle(ArticleRequest request, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Article article = articleMapper.toArticle(request);
        article.setOwner(user);
        article.setCreatedAt(LocalDateTime.now());
        return articleRepository.save(article);
    }

//TODO User user = (User) connectedUser.getPrincipal(); ->  UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
    public List<Article> getArticlesByOwner(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        return articleRepository.findAll(ArticleSpecification.withOwnerId(user.getId()));
    }
    //TODO User user = (User) connectedUser.getPrincipal(); ->  UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
    public Map<String, List<ArticleResponse>> getArticlesGroupedByTopic(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        List<Article> articles = articleRepository.findAll(ArticleSpecification.withOwnerId(user.getId()));

        return articles.stream()
                .collect(Collectors.groupingBy(
                        Article::getTopic,
                        Collectors.mapping(articleMapper::toArticleResponse, Collectors.toList())
                ));
    }

    //TODO User user = (User) connectedUser.getPrincipal(); ->  UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
    public void deleteArticle(Long id, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No article found with ID:: " + id));
        if (!Objects.equals(article.getOwner().getId(), user.getId())) {
            throw new PermissionDeniedException("You cannot delete someone else's article");
        }
        articleRepository.delete(article);
    }

    //TODO User user = (User) connectedUser.getPrincipal(); ->  UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
    public void archiveArticle(Long id, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No article found with ID:: " + id));
        if (!Objects.equals(article.getOwner().getId(), user.getId())) {
            throw new PermissionDeniedException("You cannot archive someone else's article");
        }
        article.setArchived(!article.isArchived());
        articleRepository.save(article);
    }
    //TODO User user = (User) connectedUser.getPrincipal(); ->  UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
    public void deleteArticlesByTopic(String topic, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        List<Article> articles = articleRepository.findByTopicAndOwnerId(topic, user.getId());
        if (articles.isEmpty()) {
            throw new EntityNotFoundException("No articles found with topic: " + topic);
        }
        articleRepository.deleteAll(articles);
    }
}
