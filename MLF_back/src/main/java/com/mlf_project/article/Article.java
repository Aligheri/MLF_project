package com.mlf_project.article;

import com.mlf_project.entities.User;
import com.mlf_project.topic.Topic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String title;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    private LocalDateTime createdAt;
    private boolean archived = false;
    @Column(nullable = false, columnDefinition = "int default 3")
    private Integer priority;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    private boolean attached = false;
}
