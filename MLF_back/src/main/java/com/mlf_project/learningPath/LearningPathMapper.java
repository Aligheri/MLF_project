package com.mlf_project.learningPath;

import org.springframework.stereotype.Service;

@Service
public class LearningPathMapper {

    public LearningPath toLearingPath(LearningPathRequest request) {
        LearningPath path = new LearningPath();
        path.setDescription(request.getDescription());
        path.setTitle(request.getTitle());
        return path;
    }

    public LearningPathResponse toLearningPathResponse(LearningPath path) {
        return new LearningPathResponse(
                path.getId(),
                path.getTitle(),
                path.getDescription()
        );
    }
}
