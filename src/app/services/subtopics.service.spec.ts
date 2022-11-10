import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SubtopicsService } from './subtopics.service';

describe('SubtopicsService', () => {
  let service: SubtopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule,RouterTestingModule,HttpClientTestingModule]});
    service = TestBed.inject(SubtopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
