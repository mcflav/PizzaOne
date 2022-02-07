import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersServices } from '../services/users.services';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageServices } from '../services/data-storage.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  passMatch = true;
  user = {
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: ''
  }
  registeredUsers = [];
  registeredUser: {email: string, firstname: string, lastname: string, password: string};
  emailExsist = false;
  error: string = null;

  constructor(private usersServices: UsersServices,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageServices: DataStorageServices) { }

  ngOnInit(): void {
      this.dataStorageServices.fetchUsers()
        .subscribe(data => {
            if(data !== null){
                this.usersServices.setUsers(data);
            }
        },
        errorMessage => {
            this.error = errorMessage;
        });
  }

  onSubmit(){
    this.error = null;
    this.emailExsist = false;
    this.user.password = this.registerForm.value.password;
    this.user.confirmPassword = this.registerForm.value.confirmPassword;
    this.user.email = this.registerForm.value.email;
    this.user.firstname = this.registerForm.value.firstname;
    this.user.lastname = this.registerForm.value.lastname;
    this.registeredUsers = this.usersServices.getUsers();

    for(var i = 0; i < this.registeredUsers.length; i++){
        if(this.registeredUsers[i].email === this.user.email){
            this.emailExsist = true;
        }
    }

    if(this.user.password !== this.user.confirmPassword){
      this.passMatch = false;
    }else {
      this.passMatch = true;

      if(this.emailExsist === false){
        this.usersServices.addUser({email: this.user.email, firstname: this.user.firstname, lastname: this.user.lastname, password: this.user.password});
        this.dataStorageServices.storeUser({email: this.user.email, firstname: this.user.firstname, lastname: this.user.lastname, password: this.user.password})
          .subscribe(
              data => {
                console.log(data);
                this.router.navigate(['../login'], {relativeTo: this.route});
              },
              errorMessage => {
                this.error = errorMessage;
              });
      }else if(this.emailExsist === true){
        this.error = "This email already exsist in the system. Please choose a different email address.";
      }
    }
  }

  onHandleError(){
    this.error = null;
  }


}
