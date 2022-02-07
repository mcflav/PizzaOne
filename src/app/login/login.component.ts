import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersServices } from '../services/users.services';
import { DataStorageServices } from '../services/data-storage.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  users = [];
  login = {
    email: '',
    password: ''
  }
  firstname;
  lastname;
  id;
  isLoading = false;
  validLogin = false;
  userValid = false;
  showInvalidMessage = false;
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
    this.isLoading = true;
    this.login.email = this.loginForm.value.email;
    this.login.password = this.loginForm.value.password;
    this.dataStorageServices.validateUser({email: this.login.email, password: this.login.password})
      .subscribe(data => {
        console.log(data.auth);
          this.isLoading = false;
          this.error = null;
          this.isUserValid(data.auth);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });
  }

  isUserValid(isValid: boolean){
    this.userValid = isValid;
    if(this.userValid){
      this.validLogin = true;
      this.showInvalidMessage = false;
      this.users = this.usersServices.getUsers();
      for(var i = 0; i < this.users.length; i++){
        if(this.users[i].email === this.login.email){
          this.id = this.users[i]._id;
          this.firstname = this.users[i].firstname;
          this.lastname = this.users[i].lastname;
        }
      }
     this.router.navigate(['../orders', this.login.email, this.firstname, this.lastname, this.id], {relativeTo: this.route});
    }
  }

  onHandleError(){
    this.error = null;
  }

}
