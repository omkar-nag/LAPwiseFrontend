import { Component, OnInit } from '@angular/core';
import { Observable, throwIfEmpty } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';
import { NotesModel } from './notes.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  userId:number = this.userDataService.getUserID();
  notes:any[] = [];
  currentNoteId:number = 0;
  currentNoteIndex:number =  0;
  zeroNotes:boolean = false;
  constructor(private userDataService:UserDataService, private notesService:NotesService) { 
  
    
  }

  ngOnInit():void {
    this.notesService.getAllNotesByUserId(this.userId)
    .subscribe((data:NotesModel[])=>{
      this.notes = data;
      
    });
  }

  // newNote(){
  //   this.notesService.
  // }
  loadNote(noteId:string, index:number){
    
    console.log(this.notes);
    this.currentNoteId = parseInt(noteId);
    this.currentNoteIndex = index;
  }
}
