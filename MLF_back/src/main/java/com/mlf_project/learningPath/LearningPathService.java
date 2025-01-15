package com.mlf_project.learningPath;

import com.mlf_project.entities.User;
import com.mlf_project.exception.PermissionDeniedException;
import com.mlf_project.repository.UserRepository;
import com.mlf_project.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class LearningPathService {

    private final LearningPathMapper mapper;
    private final LearningPathRepository repository;

    private final UserRepository userRepository;


    public LearningPathService(LearningPathMapper mapper, LearningPathRepository repository, UserRepository userRepository) {
        this.mapper = mapper;
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public LearningPath createLearningPath(LearningPathRequest request, Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        LearningPath path = mapper.toLearingPath(request);
        path.setOwner(user);
        return repository.save(path);
    }

    public List<LearningPath> getAllLearningPaths(Authentication connectedUser) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return repository.findAll(LearningPathSpecification.withOwnerId(user.getId()));
    }

    public void deleteLearingPath(Authentication connectedUser, Long id) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        LearningPath path = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No article found with ID:: " + id));
        if (!Objects.equals(path.getOwner().getId(), user.getId())) {
            throw new PermissionDeniedException("You cannot delete someone else's learning path ");
        }
        repository.delete(path);
    }

    @Transactional
    public void editLearningPathTitle(Authentication connectedUser, Long id, String newTitle) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        LearningPath path = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No learing paths found with ID:: " + id));
        if (!Objects.equals(path.getOwner().getId(), user.getId())) {
            throw new PermissionDeniedException("You cannot edit someone else's learning path ");
        }
        repository.updateLearningPathTitle(id, newTitle);
    }

    @Transactional
    public void editLearningPathDescription(Authentication connectedUser, Long id, String newDescription) {
        UserDetailsImpl userDetails = (UserDetailsImpl) connectedUser.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        LearningPath path = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No learing paths found with ID:: " + id));
        if (!Objects.equals(path.getOwner().getId(), user.getId())) {
            throw new PermissionDeniedException("You cannot edit someone else's learning path ");
        }
        repository.updateLearningPathDescription(id, newDescription);
    }
}
