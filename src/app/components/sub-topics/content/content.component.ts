import { Component, OnInit, Input } from '@angular/core';
import { SubTopics } from 'src/app/SubTopics';
import { Topics } from 'src/app/Topics';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() st: SubTopics | any;
  disabled: boolean = true;
  constructor() { }

  ngOnInit(): void {
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
