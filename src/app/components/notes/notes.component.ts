import { Component, OnInit } from '@angular/core';
import { Toast } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';
import { NotesModel } from './notes.model';
import { NotesService } from './notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})



export class NotesComponent implements OnInit {

  userId:number = this.userDataService.getUserID();
  note:NotesModel = {
    id:1,
    content:"",
    title:"",
    userId:+this.userId
  }
  notes:NotesModel[] = [];
  currentNoteIndex:number =  0;

  constructor(private userDataService:UserDataService, private notesService:NotesService,private _snackBar: MatSnackBar) { 
  
    
  }

  ngOnInit():void {
    this.notes.push(this.note);
    this.notesService.getAllNotesByUserId(this.userId)
    .subscribe((data:NotesModel[])=>{
      this.notes = data;
      if(this.notes.length===0){
        this.newNote();
      }
    });
  }

  deleteNote(note:NotesModel){
    this._snackBar.open("\""+this.notes[this.currentNoteIndex].title.toString() +"\" deleted successfully!!", "OK");
    this.notes.splice(this.currentNoteIndex,1);
    this.currentNoteIndex=this.currentNoteIndex-1;
    if(this.currentNoteIndex==-1){
      this.currentNoteIndex=0;
    }
    if(this.notes.length===0){
      this.newNote();
    }
    this.notesService.deleteNote(note);
  }


  newNote(){
    const currNote:NotesModel = {
      "id":this.currentNoteIndex+1,
      "title":"Untitled",
      "content":"Take a Quick Note!",
      "userId" : +this.userId
    };
    // * Adding into local object

    this.notes.push( currNote );
    this.loadNote(this.notes.length-1)  
    this.notesService.postNote(currNote);
  }
  
  saveNote(note:NotesModel){
    this.notesService.putNotes(this.notes);
  }


  loadNote(index:number){
    this.currentNoteIndex = index;
  }
}
