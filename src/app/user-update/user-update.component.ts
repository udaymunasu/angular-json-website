import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { signUp } from '../data-types';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  user: signUp = {
    id: 1, // Assuming you have user id available
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    dob: undefined,
    mobile: '',
    profilepic: '',
    createdat: undefined
  };  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.user.createdat = new Date(); // Set current date
    this.userService.updateProduct(this.user).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
    });
  }

}
