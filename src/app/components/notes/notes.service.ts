import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';
import { NotesModel } from './notes.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  url = environment.baseUrl + '/Notes/';
  constructor(private client:HttpClient, private userService: UserDataService) { }
  notes:NotesModel[] = [];
  note:NotesModel={} as NotesModel;

  getAllNotesByUserId():Observable<NotesModel[]>{
    return this.client.get<NotesModel[]>(this.url);
  }

  putNote(note:NotesModel):Observable<NotesModel>{
    return this.client.put<NotesModel>(this.url,note);
  }
  
  deleteNote(note:NotesModel){
    this.client.delete<NotesModel>(this.url+note.id.toString()+'/').subscribe(data=>{});
  }
}
