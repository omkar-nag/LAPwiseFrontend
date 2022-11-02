import { Component, OnInit } from '@angular/core';
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
      });
  }

  deleteNote() {
    
    if(this.currentNote.id>0){
      this.notesService.deleteNote(this.currentNote);
    }
    
    this._snackBar.open("\"" + this.currentNote.title + "\" deleted successfully!!", "OK");

    this.notes.splice(this.currentNoteIndex,1);

    var len = this.notes.length;

    len===0?this.newNote():this.currentNote=this.notes[len-1];this.currentNoteIndex=len-1;
    
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
    this.notesService.putNote(this.currentNote)
      .subscribe((note:NotesModel)=>{
          this.currentNote = note;
          this.notes[this.currentNoteIndex] = this.currentNote;
        }
      );
      
  }


  loadNote(id: number){
    
    this.currentNote = <NotesModel>this.notes.find(note=>note.id===id);
    
    this.currentNoteIndex = this.notes.findIndex(note=>note.id===this.currentNote.id);

  }
  
}
