import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubTopics } from '../SubTopics';

@Injectable({
  providedIn: 'root'
})
export class SubtopicsService {
  url = 'http://localhost:5152/api/DashBoard1'
  constructor(public myClient: HttpClient) { }

  GetSubTopics(): Observable<SubTopics[]> {
    return this.myClient.get<SubTopics[]>(this.url);
  }
  GetSubTopicByTopicId(id: number) {
    return this.myClient.get<SubTopics[]>(this.url+'/'+id);
  }
}
