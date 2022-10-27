import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotesModel } from './notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  url = 'http://localhost:5152/api/Notes/user/'
  constructor(private client:HttpClient) { }
  getAllNotesByUserId(userId:number):Observable<NotesModel[]>{
    return this.client.get<NotesModel[]>(this.url+userId.toString());
  }
}
