import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddedAddressComponent } from '../dialog-added-address/dialog-added-address.component';
import { DialogAddedUserComponent } from '../dialog-added-user/dialog-added-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: any = '';
  user: User = new User();
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  /**
   * 
   * check the parameter in the URL
   */
  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe((params) => {
        this.userId = params.get('id');
        this.getUser();
      });
  }

  /**
   * 
   * get the information of a user from the database
   */
  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
      })
  }

  /**
   * 
   * open new dialog for editting the address of an user
   */
  editMenu() {
    const dialog = this.dialog.open(DialogAddedAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  }


  /**
   * 
   * open new dialog for editting the name of an user
   */
  editUserMenu() {
    const dialog = this.dialog.open(DialogAddedUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  }
}
