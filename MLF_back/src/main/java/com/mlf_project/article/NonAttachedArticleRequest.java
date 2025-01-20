package com.mlf_project.article;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NonAttachedArticleRequest {
    @NotNull
    @Pattern(regexp = "https?://.+", message = "Invalid URL format")
    private String url;

    @NotNull
    private String title;
}
