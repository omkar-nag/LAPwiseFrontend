import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';
import { NotesModel } from './notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  url = 'http://localhost:5152/api/Notes/'
  constructor(private client:HttpClient, private userService: UserDataService) { }
  notes:NotesModel[] = [];
  note:NotesModel={} as NotesModel;

  getAllNotesByUserId(userId:number):Observable<NotesModel[]>{
    return this.client.get<NotesModel[]>(this.url+'user/'+userId.toString());
  }
  postNote(note:NotesModel){
    this.client.post<NotesModel[]>(this.url,note)
    .subscribe(data=>{
      this.notes=data;
    });
  }
  putNote(note:NotesModel):void{
    this.client.put<NotesModel>(this.url+note.id.toString()+'/',note).subscribe(data=>{});
    
  }

  putNotes(notes:NotesModel[]):void{
    
    this.client.put<NotesModel[]>(this.url+this.userService.getUserID().toString()+'/',notes).subscribe(data=>{});
  }
  deleteNote(note:NotesModel){
    this.client.delete<NotesModel>(this.url+note.id.toString()+'/').subscribe(data=>{});
  }
}
