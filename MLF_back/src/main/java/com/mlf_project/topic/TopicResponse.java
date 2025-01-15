package com.mlf_project.topic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class TopicResponse {
    private Long id;
    private String name;
    private Long learningPathId;
    private Long parentId; // Может быть null, если тема является корневой
    private List<Long> childrenIds; // Список ID дочерних тем
    private List<Long> articleIds; // Список ID статей, связанных с этой темой
}
