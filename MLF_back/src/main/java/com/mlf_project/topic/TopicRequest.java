package com.mlf_project.topic;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicRequest {

    @NotBlank(message = "Topic name cannot be blank")
    private String name;

    @NotNull(message = "learningPathID cannot be null")
    private Long learningPathId;

    private Long parentId;
}
