package com.mlf_project.exception;

public class PermissionDeniedException extends RuntimeException {

    public PermissionDeniedException() {
    }
    public PermissionDeniedException(String message) {
        super(message);
    }
}