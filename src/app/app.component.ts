import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageServices } from './services/data-storage.services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageServices: DataStorageServices){}

  ngOnInit(){
    this.userSub = this.dataStorageServices.user.subscribe(user => {
        this.isAuthenticated = !user? false: true;
    });

    this.dataStorageServices.autoLogin();
  }

  onLogOut(){
    this.dataStorageServices.logOut();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
