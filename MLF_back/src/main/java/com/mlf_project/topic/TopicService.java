package com.mlf_project.topic;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mlf_project.article.Article;
import com.mlf_project.article.ArticleRepository;
import com.mlf_project.learningPath.LearningPath;
import com.mlf_project.learningPath.LearningPathRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    private final ArticleRepository articleRepository;

    private final LearningPathRepository learningPathRepository;

    public TopicService(TopicRepository topicRepository, LearningPathRepository learningPathRepository,ArticleRepository articleRepository) {
        this.topicRepository = topicRepository;
        this.learningPathRepository = learningPathRepository;
        this.articleRepository = articleRepository;
    }

    @Transactional
    public Topic createOrUpdateTopic(String path, Long learningPathId) {
        if (path == null || path.isEmpty()) {
            throw new IllegalArgumentException("Path cannot be null or empty");
        }

        // Fetch the learning path
        LearningPath learningPath = learningPathRepository.findById(learningPathId)
                .orElseThrow(() -> new IllegalArgumentException("LearningPath with ID " + learningPathId + " does not exist"));

        String[] pathSegments = path.split("/");
        if (pathSegments.length == 0) {
            throw new IllegalArgumentException("Invalid path format");
        }

        Topic parentTopic = null;

        for (int i = 0; i < pathSegments.length; i++) {
            String currentSegment = pathSegments[i];

            // Check if the topic exists under the current parent
            Topic topic = topicRepository.findByNameAndParentAndLearningPath(currentSegment, parentTopic, learningPath);

            if (topic == null) {
                // If it's the first segment and a parent is required, throw an exception
                if (i == 0 && pathSegments.length > 1) {
                    throw new IllegalArgumentException(
                            "Parent topic '" + currentSegment + "' does not exist for subtopic creation in this learning path");
                }

                // Create a new topic
                topic = new Topic(currentSegment, learningPath, parentTopic);
                topicRepository.save(topic);
            }

            parentTopic = topic; // Set current topic as the parent for the next iteration
        }

        return parentTopic; // Return the final topic (either existing or newly created)
    }

    @Transactional
    public void assignArticlesToTopics(Map<Long, List<Long>> topicArticleMapping) {
        for (Map.Entry<Long, List<Long>> entry : topicArticleMapping.entrySet()) {
            Long topicId = entry.getKey();
            List<Long> articleIds = entry.getValue();

            Topic topic = topicRepository.findById(topicId)
                    .orElseThrow(() -> new EntityNotFoundException("Topic not found with ID: " + topicId));

            List<Article> articles = articleRepository.findAllById(articleIds);
            for (Article article : articles) {
                article.setTopic(topic);
            }
            articleRepository.saveAll(articles);
        }
    }
    public String getTopicTreeJson(Long learningPathId) {
        List<Topic> rootTopics = topicRepository.findByLearningPathIdAndParentIsNull(learningPathId);
        List<Map<String, Object>> tree = rootTopics.stream()
                .map(this::convertTopicToTree)
                .collect(Collectors.toList());
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(tree);
        } catch (Exception e) {
            throw new RuntimeException("Error generating JSON", e);
        }
    }

    private Map<String, Object> convertTopicToTree(Topic topic) {
        Map<String, Object> node = new HashMap<>();
        node.put("name", topic.getName());
        node.put("articles", topic.getArticles()
                .stream()
                .map(Article::getTitle)
                .collect(Collectors.toList()));
        node.put("children", topic.getChildren()
                .stream()
                .map(this::convertTopicToTree)
                .collect(Collectors.toList()));
        return node;
    }
}
