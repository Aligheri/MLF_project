package com.mlf_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MlfProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(MlfProjectApplication.class, args);
    }
}
