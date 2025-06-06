package com.mlf_project.topic;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicContoller {
    private final TopicService topicService;
    private final TopicMapper topicMapper;

    @PostMapping("/{learningPathId}")
    public ResponseEntity<Topic> createOrUpdateTopic(
            @RequestParam String path,
            @PathVariable Long learningPathId, Authentication connectedUser) {
        Topic topic = topicService.createOrUpdateTopic(path, learningPathId, connectedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(topic);
    }

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getAllattachedTopics(Authentication connectedUser, @RequestParam Long learningPathId) {
        List<TopicResponse> topics = topicService.getAllAttachedTopics(learningPathId, connectedUser)
                .stream().map(topicMapper::toTopicResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(topics);
    }

    @GetMapping("/topics")
    public ResponseEntity<List<TopicResponse>> getAllTopics(Authentication connectedUser) {
        List<TopicResponse> topics = topicService.getAllTopics(connectedUser)
                .stream().map(topicMapper::toTopicResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(topics);
    }

    @PostMapping("/assign-articles")
    public ResponseEntity<Void> assignArticlesToTopics(
            @RequestBody Map<Long, List<Long>> topicArticleMapping) {
        topicService.assignArticlesToTopics(topicArticleMapping);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/learning-path/{id}/topics/tree")
    public ResponseEntity<Map<String, Object>> getTopicTree(@PathVariable Long id) {
        Topic rootTopic = topicService.findRootTopicByLearningPath(id);
        return ResponseEntity.of(Optional.ofNullable(topicService.convertTopicToTree(rootTopic)));
    }
}
