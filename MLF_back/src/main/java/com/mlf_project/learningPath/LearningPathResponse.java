package com.mlf_project.learningPath;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LearningPathResponse {

    private Long id;
    private String title;
    private String description;

}
