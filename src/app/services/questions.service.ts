import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Questions } from '../Questions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  url = 'http://localhost:5152/api/DashBoard3'
  constructor(public myClient: HttpClient) { }

  GetQuestions(): Observable<Questions[]> {
    return this.myClient.get<Questions[]>(this.url);
  }
  
  GetQuestionsByTitle(title: string): Observable<Questions[]> {
    return this.myClient.get<Questions[]>(this.url + '/' + title);
  }
}
