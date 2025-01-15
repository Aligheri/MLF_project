package com.mlf_project.topic;

import com.mlf_project.article.Article;
import com.mlf_project.learningPath.LearningPath;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class TopicMapper {

    public Topic toTopic(TopicRequest request, LearningPath learningPath, Topic parent) {
        return new Topic(
                request.getName(),
                learningPath,
                parent
        );
    }
    public TopicResponse toTopicResponse(Topic topic) {
        return new TopicResponse(
                topic.getId(),
                topic.getName(),
                topic.getLearningPath().getId(),
                topic.getParent() != null ? topic.getParent().getId() : null,
                topic.getChildren().stream().map(Topic::getId).collect(Collectors.toList()),
                topic.getArticles().stream().map(Article::getId).collect(Collectors.toList())
        );
    }
}
