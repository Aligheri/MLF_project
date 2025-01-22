import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LearningPathControllerService} from "../../../../services/services/learning-path-controller.service";
import {LearningPathRequest} from "../../../../services/models/learning-path-request";
import {LearningPathResponse} from "../../../../services/models/learning-path-response";
import {CreateOrUpdateTopic$Params} from "../../../../services/fn/topic-contoller/create-or-update-topic";
import {TopicContollerService} from "../../../../services/services/topic-contoller.service";

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss'],
})
export class LearningPathComponent implements OnInit {
  learningPaths: any[] = [];
  newLearningPath: any = {title: '', description: ''};
  articles: any[] = [];

  constructor(private learningPathService: LearningPathControllerService,
              private topicService: TopicContollerService,
  ) {
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
          newTopicPath: '',
        }));
        this.learningPaths.forEach((path) => {
          this.loadAllAttachedTopics(path.id);
        });
      },
      error: (error) =>
        console.error('Error loading learning paths:', error),
    });
  }

  createLearningPath(): void {
    if (this.newLearningPath.title.trim()) {
      const request: LearningPathRequest = {
        title: this.newLearningPath.title,
        description: this.newLearningPath.description,
      };

      this.learningPathService.createLearningPath({body: request}).subscribe({
        next: (response: LearningPathResponse) => {
          this.learningPaths.push({...response, topics: [], newTopicPath: ''});
          this.newLearningPath = {title: '', description: ''};

          // Загрузить темы для нового Learning Path
          this.loadAllAttachedTopics(<number>response.id);
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
        this.learningPaths = this.learningPaths.filter((lp) => lp.id !== id);
      },
      error: (error) => {
        console.error('Error deleting learning path:', error);
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
        console.log(`Title for Learning Path ${id} updated successfully`);
      },
      error: (error) => {
        console.error('Error updating learning path title:', error);
      },
    });
  }

  updateLearningPathDescription(id: number, newDescription: string): void {
    if (!id || !newDescription) {
      console.error('Invalid id or description:', {id, newDescription});
      return;
    }

    this.learningPathService
      .editLearningPathDescription({id, newDescription})
      .subscribe({
        next: (response) => {
          console.log('Description updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating learning path description:', error);
        },
      });
  }

  createTopicPath(learningPathId: number): void {
    const learningPath = this.learningPaths.find((lp) => lp.id === learningPathId);
    if (learningPath && learningPath.newTopicPath.trim()) {
      const params: CreateOrUpdateTopic$Params = {
        path: learningPath.newTopicPath,
        learningPathId,
      };

      this.topicService.createOrUpdateTopic(params).subscribe({
        next: () => {
          learningPath.newTopicPath = '';
          this.loadAllAttachedTopics(learningPathId);
        },
        error: (error) => console.error('Error creating topic path:', error),
      });
    }
  }

  loadAllAttachedTopics(learningPathId: number): void {
    this.topicService.getAllattachedTopics({learningPathId}).subscribe({
      next: (response) => {
        console.log('Loaded topics for learningPathId:', learningPathId, response);
        const learningPaths = this.learningPaths.find((lp) => lp.id === learningPathId);
        if (learningPaths) {
          learningPaths.topics = response;
        }
      },
      error: (error) => {
        console.error('Error loading topics:', error);
      },
    });
  }

}
