package com.mlf_project.article;

import com.mlf_project.entities.User;
import com.mlf_project.exception.PermissionDeniedException;
import com.mlf_project.repository.UserRepository;
import com.mlf_project.security.services.UserDetailsImpl;
import com.mlf_project.topic.Topic;
import com.mlf_project.topic.TopicRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper, UserRepository userRepository, TopicRepository topicRepository) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    public Article saveArticle(ArticleRequest request, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Article article = articleMapper.toArticle(request);
        article.setOwner(user);

        if (article.getPriority() == null) {
            article.setPriority(3);
        }

        article.setCreatedAt(LocalDateTime.now());
        if (request.getTopicId() != null) {
            Topic topic = topicRepository.findById(request.getTopicId())
                    .orElseThrow(() -> new EntityNotFoundException("Topic not found with ID: " + request.getTopicId()));
            article.setTopic(topic);
        } else {
            throw new IllegalArgumentException("Article must be associated with a valid topic.");
        }

        return articleRepository.save(article);
    }

    public Article saveNonAttachedArticle(NonAttachedArticleRequest request, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Article article = new Article();
        article.setUrl(request.getUrl());
        article.setTitle(request.getTitle());
        article.setOwner(user);
        article.setAttached(false);
        article.setPriority(3);
        article.setCreatedAt(LocalDateTime.now());

        return articleRepository.save(article);
    }

    public List<Article> getArticles(Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return articleRepository.findAll(ArticleSpecification.withOwnerId(user.getId()));
    }

    public List<Article> getArticlesByTopic(Long topicId, Authentication connectedUSer) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUSer.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Specification<Article> spec = ArticleSpecification.byTopicIdAndUserId(topicId, user.getId());

        return articleRepository.findAll(spec);
    }

    public void deleteArticle(Long id, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No article found with ID:: " + id));
        if (!Objects.equals(article.getOwner().getId(), user.getId())) {
            throw new PermissionDeniedException("You cannot delete someone else's article");
        }
        articleRepository.delete(article);
    }

    public void archiveArticle(Long id, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No article found with ID:: " + id));
        if (!Objects.equals(article.getOwner().getId(), user.getId())) {
            throw new PermissionDeniedException("You cannot archive someone else's article");
        }
        article.setArchived(!article.isArchived());
        articleRepository.save(article);
    }

    public void deleteArticlesByTopic(Topic topic, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Article> articles = articleRepository.findByTopicAndOwnerId(topic, user.getId());
        if (articles.isEmpty()) {
            throw new EntityNotFoundException("No articles found with topic: " + topic);
        }
        articleRepository.deleteAll(articles);
    }

    public List<Article> getAllArchivedArticles(Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return articleRepository.findAll(ArticleSpecification.withOwnerIdAndArchived(user.getId(), true));
    }

    public List<Article> findArticleByTitle(String title, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        Specification<Article> spec = Specification
                .where(ArticleSpecification.withOwnerId(user.getId()))
                .and(ArticleSpecification.withTitleLike(title));

        return articleRepository.findAll(spec);
    }
}