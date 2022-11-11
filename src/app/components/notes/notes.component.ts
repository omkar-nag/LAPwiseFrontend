import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { NotesModel } from './notes.model';
import { NotesService } from '../../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

  userId: number = this.userDataService.getUserID();

  currentNote: NotesModel = {
    id: -1,
    content: "",
    title: "",
    userId: +this.userId
  };

  notes: Array<NotesModel> =  [];
  currentNoteIndex: number = 0;
  newNoteId:number = -1;
  constructor(private userDataService: UserDataService, private notesService: NotesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.notesService.getAllNotesByUserId()
      .subscribe((data: NotesModel[]) => {
        this.notes = data;
        if (this.notes.length === 0) {
          this.newNote();
        }
        this.loadNote(this.notes[0].id);
      });
  }

  deleteNote() {
    
    if(this.currentNote.id>0){
      
      // Mocking wrong behaviour to check exception
      // this.currentNote.id=777;
      this.notesService.deleteNote(this.currentNote)
      .subscribe({
        next:()=>
        {

          this._snackBar.open("\"" + this.currentNote.title + "\" deleted successfully!!", "OK");

          this.notes.splice(this.currentNoteIndex,1);
      
          var len = this.notes.length;
      
          len===0?this.newNote():this.currentNote=this.notes[len-1];this.currentNoteIndex=len-1;
        },
        error:(er:HttpErrorResponse) => 
        {
          this.customErrorHandler(er);
        }
      });
    }
    
    
  }


  newNote() {

    const tempNote: NotesModel = {
      "id": this.newNoteId--,
      "title": "*Untitled",
      "content": "",
      "userId": +this.userId
    };

    this.notes.push(tempNote);
    this.loadNote(tempNote.id);
  
  }

  saveNote() {

    if(this.currentNote.content===""||this.currentNote.title===""){
      this._snackBar.open("Title or Content cannot be empty!!", "OK");
      return;
    }
    
    if(this.currentNote.id<0){
      // Mocking wrong behaviour to check exception
      // this.currentNote.id=777;
      this.notesService.postNote(this.currentNote)
        .subscribe({
            next: (note:NotesModel)=>{
              this.currentNote = note;
              this.notes[this.currentNoteIndex] = this.currentNote;
              this._snackBar.open(this.currentNote.title +" Saved Successfully!","OK");
            },
            error: (er:HttpErrorResponse) => {
              this.customErrorHandler(er);
            }
        });
    }

    else{
      // Mocking wrong behaviour to check exception
      // this.currentNote.id=777;
      this.notesService.putNote(this.currentNote)
      .subscribe({
          next: (note:NotesModel)=>{
            this.currentNote = note;
            this.notes[this.currentNoteIndex] = this.currentNote;
            this._snackBar.open(this.currentNote.title +" Saved Successfully!","OK");
          },
          error: (er:HttpErrorResponse) => {
            this.customErrorHandler(er);
          }
      });
    }
  }


  loadNote(id: number){
    
    this.currentNote = <NotesModel>this.notes.find(note=>note.id===id);
    
    this.currentNoteIndex = this.notes.findIndex(note=>note.id===this.currentNote.id);

  }
 
  customErrorHandler(er:HttpErrorResponse){
    if(er.status==400){
      this._snackBar.open("😕 Oops! The operation was not performed due to internal error, Try again after sometime", "X");
    }
    if(er.status==500 || er.status==404){
      this._snackBar.open("😕 Oops! The operation was not performed due to server error, Try again after sometime", "X");
    }
  }
}
