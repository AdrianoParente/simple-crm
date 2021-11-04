import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-added-user',
  templateUrl: './dialog-added-user.component.html',
  styleUrls: ['./dialog-added-user.component.scss']
})
export class DialogAddedUserComponent implements OnInit {
  user: any;
  loading = false;
  birthDate: any;
  userId: any;
  constructor(public dialogRef: MatDialogRef<DialogAddedUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  /**
   * 
   * update the user information
   */
  saveUser() {
    this.loading = true;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.user.toJson())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }
}
