import { Component, OnInit, Input } from '@angular/core';
import { TopicsService } from 'src/app/services/topics.service';
import { SubTopics } from 'src/app/SubTopics';
import { Topics } from 'src/app/Topics';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() st: SubTopics | any;
  @Input() tt: Topics | any
  topic: Topics | any
  disabled: boolean = true;
  constructor(public topicService: TopicsService) { }

  ngOnInit(): void {
   

    this.topicService.GetTopics().subscribe((data: Topics[]) => {
      this.topic = data;
      console.log(this.topic);
    });

  }

  onCheckBoxClicked() {
    if(this.disabled == true) {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
  }


}
