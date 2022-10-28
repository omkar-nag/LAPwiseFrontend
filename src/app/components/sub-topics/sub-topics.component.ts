import { Component, OnInit, Inject } from '@angular/core';
import { SubTopics } from 'src/app/SubTopics';
import { SubtopicsService } from 'src/app/services/subtopics.service';
import { Topics } from 'src/app/Topics';
import { TopicsService } from 'src/app/services/topics.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-sub-topics',
  templateUrl: './sub-topics.component.html',
  styleUrls: ['./sub-topics.component.css']
})
export class SubTopicsComponent implements OnInit {
  subtopic: SubTopics[] = []
  topic: Topics[] = []
  sub: SubTopics[] = []

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    untilDestroyed(this),
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  constructor(@Inject(DOCUMENT) private readonly document: Document, public subtopicService: SubtopicsService, public topicService: TopicsService,
    private activatedRoute: ActivatedRoute, private readonly viewport: ViewportScroller) { }

  ngOnInit(): void {

    this.subtopicService.GetSubTopics().subscribe((data: SubTopics[]) => {
      this.subtopic = data;
      console.log(this.subtopic);
    });

    this.topicService.GetTopics().subscribe((data: Topics[]) => {
      this.topic = data;
      console.log(this.topic);
    });

    this.activatedRoute.paramMap.subscribe(param => {
      let x = param.get('id')
      let pid = x === null || x === undefined ? 0 : parseInt(x);
      this.subtopicService.GetSubTopicByTopicId(pid).subscribe((data: SubTopics[]) => {
        this.sub = data;
        console.log(this.sub);
      })
    });

    this.activatedRoute.fragment.subscribe(res => {
      this.jumpTo(res);
      console.log(res);
    });
  }

  jumpTo(section: string | any) {
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({behavior: "smooth"});
    }, 100);
  }

  onScrollClick(): void {
    this.viewport.scrollToPosition([0,0]);
  }

}
