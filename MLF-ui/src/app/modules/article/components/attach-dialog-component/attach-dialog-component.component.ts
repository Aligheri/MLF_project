import {Component, Inject, OnInit} from '@angular/core';
import {Topic} from "../../../../services/models/topic";
import {Article} from "../../../../services/models/article";
import {TopicContollerService} from "../../../../services/services/topic-contoller.service";
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-attach-dialog-component',
  standalone: true,
  imports: [
    NgForOf,
    MatListModule,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './attach-dialog-component.component.html',
  styleUrl: './attach-dialog-component.component.scss',
})
export class AttachDialogComponentComponent implements OnInit{
  topics: Topic[] = [];

  constructor(
    private topicService: TopicContollerService,
    public dialogRef: MatDialogRef<AttachDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { article: Article }
  ) {}

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe((topics) => {
      this.topics = topics;
    });
  }

  selectTopic(id: number): void {
    if (id == undefined) {
      console.error('Topic ID is undefined!');
      return;
    }
    this.dialogRef.close(id);
  }
}
