package com.mlf_project.article;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponse {

    private Long id;
    private String url;
    private String title;
    private String topic;
    private LocalDateTime createdAt;
}
