import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizzes } from '../Quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  url = 'http://localhost:5152/api/DashBoard2';
  constructor(public myClient: HttpClient) { }

  GetQuizzes(): Observable<Quizzes[]> {
    return this.myClient.get<Quizzes[]>(this.url);
  }
}
