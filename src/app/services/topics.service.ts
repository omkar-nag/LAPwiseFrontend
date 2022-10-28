import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topics } from '../Topics';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  url = 'http://localhost:5152/api/DashBoard'
  constructor(private myClient: HttpClient) { }

  GetTopics(): Observable<Topics[]> {
    return this.myClient.get<Topics[]>(this.url);
  }
}
