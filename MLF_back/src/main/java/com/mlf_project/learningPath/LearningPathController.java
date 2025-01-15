package com.mlf_project.learningPath;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/learning-paths")
@RequiredArgsConstructor
public class LearningPathController {

    private final LearningPathService learningPathService;
    private final LearningPathMapper learningPathMapper;

    @PostMapping
    public ResponseEntity<LearningPathResponse> createLearningPath(
            @RequestBody LearningPathRequest request,
            Authentication authentication) {
        LearningPath learningPath = learningPathService.createLearningPath(request, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(learningPathMapper.toLearningPathResponse(learningPath));
    }

    @GetMapping
    public ResponseEntity<List<LearningPathResponse>> getAllLearningPaths(Authentication authentication) {
        List<LearningPathResponse> paths = learningPathService.getAllLearningPaths(authentication).stream()
                .map(learningPathMapper::toLearningPathResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(paths);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningPath(
            @PathVariable Long id,
            Authentication authentication) {
        learningPathService.deleteLearingPath(authentication, id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/title")
    public ResponseEntity<Void> editLearningPathTitle(
            @PathVariable Long id,
            @RequestParam String newTitle,
            Authentication authentication) {
        learningPathService.editLearningPathTitle(authentication, id, newTitle);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/description")
    public ResponseEntity<Void> editLearningPathDescription(
            @PathVariable Long id,
            @RequestParam String newDescription,
            Authentication authentication) {
        learningPathService.editLearningPathDescription(authentication, id, newDescription);
        return ResponseEntity.noContent().build();
    }
}
