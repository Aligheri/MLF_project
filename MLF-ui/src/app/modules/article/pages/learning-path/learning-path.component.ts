import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LearningPathControllerService} from "../../../../services/services/learning-path-controller.service";
import {LearningPathRequest} from "../../../../services/models/learning-path-request";
import {LearningPathResponse} from "../../../../services/models/learning-path-response";
import {CreateOrUpdateTopic$Params} from "../../../../services/fn/topic-contoller/create-or-update-topic";
import {TopicContollerService} from "../../../../services/services/topic-contoller.service";

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss'],
})
export class LearningPathComponent implements OnInit {
  newTopicPath: string = '';
  learningPaths: any[] = [];
  topics:any[] = [];
  newLearningPath: any = {title: '', description: ''};
  expandedPathId: number | null = null;


  constructor(private learningPathService: LearningPathControllerService,
              private topicService: TopicContollerService) {
  }

  ngOnInit(): void {
    this.loadLearningPaths();
  }

  loadLearningPaths(): void {
    this.learningPathService.getAllLearningPaths().subscribe({
      next: (paths) => {
        this.learningPaths = paths.map((path) => ({
          ...path,
          topics: [],
        }));
      },
      error: (error) => console.error('Error loading learning paths:', error),
    });
  }

  toggleDescription(id: number): void {
    this.expandedPathId = this.expandedPathId === id ? null : id;
  }

  createLearningPath(): void {
    if (this.newLearningPath.title.trim()) {
      const request: LearningPathRequest = {
        title: this.newLearningPath.title,
        description: this.newLearningPath.description,
      };

      this.learningPathService.createLearningPath({body: request}).subscribe({
        next: (response: LearningPathResponse) => {
          this.learningPaths.push(response);

          this.newLearningPath = {title: '', description: ''};
        },
        error: (error) => {
          console.error('Error creating learning path:', error);
        },
      });
    }
  }

  deleteLearningPath(id: number): void {
    if (!id) {
      console.error('Invalid id :', {id});
      return;
    }
    this.learningPathService.deleteLearningPath({id}).subscribe({
      next: () => {
        this.loadLearningPaths();
      },
      error: (error) => {
        console.error('Error updating learning path description:', error);
      },
    });
  }

  updateLearningPathTitle(id: number, newTitle: string): void {
    if (!id || !newTitle) {
      console.error('Invalid id or title:', {id, newTitle});
      return;
    }
    this.learningPathService.editLearningPathTitle({id, newTitle}).subscribe({
      next: () => {
        this.loadLearningPaths();
      },
      error: (error) => {
        console.error('Error updating learning path description:', error);
      },
    });
  }


  updateLearningPathDescription(id: number, newDescription: string): void {
    if (!id || !newDescription) {
      console.error('Invalid id or description:', {id, newDescription});
      return;
    }

    this.learningPathService.editLearningPathDescription({id, newDescription}).subscribe({
      next: (response) => {
        console.log('Description updated successfully', response);
        this.loadLearningPaths();
      },
      error: (error) => {
        console.error('Error updating learning path description:', error);
      },
    });
  }

  //TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
  createTopicPath(learningPathId: number): void {
    if (this.newTopicPath.trim()) {
      const params: CreateOrUpdateTopic$Params = {
        path: this.newTopicPath,
        learningPathId
      };

      this.topicService.createOrUpdateTopic(params).subscribe({
        next: () => {
          this.newTopicPath = '';
          console.log('Topic path created successfully');
        },
        error: (error) => console.error('Error creating topic path:', error),
      });
    }
  }
//Todo - not working
  loadAllAttachedTopics(learningPathId: number) {
    this.topicService.getAllattachedTopics({ learningPathId }).subscribe({
      next: (response) => {
        console.log('Loaded topics:', response); // Ensure this is not empty
        this.topics = response;
      },
      error: (error) => {
        console.error('Error loading topics:', error);
      },
    });
  }
}
