import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-added-address',
  templateUrl: './dialog-added-address.component.html',
  styleUrls: ['./dialog-added-address.component.scss']
})
export class DialogAddedAddressComponent implements OnInit {
  user: any;
  loading = false;
  userId: any;
  constructor(public dialogRef: MatDialogRef<DialogAddedAddressComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

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
