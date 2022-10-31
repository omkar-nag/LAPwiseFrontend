import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit {
  @Output() scrollToTop = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onScrollClick(): void {
    this.scrollToTop.emit();
  }

}
