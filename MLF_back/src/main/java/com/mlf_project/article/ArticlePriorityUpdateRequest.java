package com.mlf_project.article;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticlePriorityUpdateRequest {
    private Long id;
    @NotNull(message = "Priority is required")
    @Min(1)
    @Max(5)
    private Integer priority;
}
