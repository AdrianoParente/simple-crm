import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date = new Date;
  loading = false;
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>,private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }


  /**
   * 
   * add a new user to the firebase database
   */
  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    this.firestore
      .collection('users')
      .add(this.user.toJson())
      .then((result: any) => {
        this.loading = false;
        console.log(result);
        this.dialogRef.close();
      });
    
  }
}
