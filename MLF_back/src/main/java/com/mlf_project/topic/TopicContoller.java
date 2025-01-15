package com.mlf_project.topic;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicContoller {
    private final TopicService topicService;

    @PostMapping("/{learningPathId}")
    public ResponseEntity<Topic> createOrUpdateTopic(
            @RequestParam String path,
            @PathVariable Long learningPathId) {
        Topic topic = topicService.createOrUpdateTopic(path, learningPathId);
        return ResponseEntity.status(HttpStatus.CREATED).body(topic);
    }

    @PostMapping("/assign-articles")
    public ResponseEntity<Void> assignArticlesToTopics(
            @RequestBody Map<Long, List<Long>> topicArticleMapping) {
        topicService.assignArticlesToTopics(topicArticleMapping);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{learningPathId}/tree")
    public ResponseEntity<String> getTopicTreeJson(@PathVariable Long learningPathId) {
        String treeJson = topicService.getTopicTreeJson(learningPathId);
        return ResponseEntity.ok(treeJson);
    }

//    @GetMapping("/topics")
//    public List<Topic> getTopicsByLearningPath(@RequestParam Long learningPathId) {
//        return topicService.getTopicsByLearningPathId(learningPathId);
//    }

}
