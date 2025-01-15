package com.mlf_project.article;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleRequest {

    @NotNull(message = "URL cannot be null")
    @NotEmpty(message = "URL cannot be empty")
    @Pattern(
            regexp = "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$",
            message = "Invalid URL format"
    )
    private String url;

    @NotNull(message = "Title cannot be null")
    @NotEmpty(message = "Title cannot be empty")
    private String title;

    @NotNull(message = "Topic cannot be null")
    @NotEmpty(message = "Topic cannot be empty")
    private Long topicId;

    //    private String topic;

    @NotNull(message = "Priority cannot be null")
    @Min(1)
    @Max(5)
    private Integer priority;

}
