import { Component, OnInit } from '@angular/core';
import { Topics } from 'src/app/Topics';
import { Observable } from 'rxjs';
import { TopicsService } from 'src/app/services/topics.service';
import { SubTopics } from 'src/app/SubTopics';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topic: Topics[] = []
  constructor(public topicService: TopicsService) { }

  ngOnInit(): void {
    this.topicService.GetTopics().subscribe((data: Topics[]) => {
      this.topic = data;
      console.log(this.topic);
    })
  }

}
