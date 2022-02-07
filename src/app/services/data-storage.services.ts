import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersServices } from '../services/users.services';
import { OrdersServices } from '../services/orders.services';
import { Users } from '../models/users.model';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';

interface StoreUserResponseData{
    email: string,
    firstname: string,
    isAdmin: boolean,
    lastname: string
}

interface ValidateUserResponseData{
    auth: boolean,
    token: string
}

interface StoreOrderResponseData{
    id?: string,
    size: string,
    crust: string,
    meats: string,
    veggies: string,
    cheese: string,
    wings: string,
    breadsticks: string,
    drinks: string,
    total: number,
    user: string
}

@Injectable({providedIn: 'root'})
export class DataStorageServices {
    user = new BehaviorSubject<User>(null);
    elapsedTime = 86400;
    timeInSeconds = 1000;
    orders: [] = [];
    private tokenExpirationTimer: any;
    private _expirationDate = new Date( new Date().getTime() + this.elapsedTime * this.timeInSeconds);

    constructor(private http: HttpClient,
        private usersService: UsersServices,
        private orderService: OrdersServices,
        private router: Router){}

    storeUser(user: Users){
      const body = user;
      return this.http.post<StoreUserResponseData>('https://pacific-cove-41582.herokuapp.com/api/v1/users', body)
        .pipe(catchError(this.handleError));
    }

    fetchUsers(){
      return this.http.get<Users[]>('https://pacific-cove-41582.herokuapp.com/api/v1/users')
        .pipe(catchError(this.handleError));
    }

    storeOrder(order: Order){
      const body = order;
      console.log(body);
      return this.http.post<StoreOrderResponseData>('https://pacific-cove-41582.herokuapp.com/api/v1/orders', body)
        .pipe(catchError(this.handleError));
    }

    fetchOrders(userId: string){
      console.log(userId);
      return this.http.post('https://pacific-cove-41582.herokuapp.com/api/v1/orders/getOrder',
        {
          user: userId
        }
      ).pipe(catchError(this.handleError));
    }

    validateUser(user: UserLogin){
      const body = user;
      return this.http.post<ValidateUserResponseData>('https://pacific-cove-41582.herokuapp.com/api/v1/authentication', body)
        .pipe(catchError(this.authenticationError),
        tap(resData => {
          this.handleAuthentication(
              resData.auth,
              resData.token
          );
        })
      );
    }

    autoLogin(){
        const userData: {
          auth: boolean;
          _token: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
          console.log("no Token!");
          return;
        }

        const loadedUser = new User(
            userData.auth,
            userData._token,
            this._expirationDate
        );
        console.log(userData._token);

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration =
              new Date(this._expirationDate).getTime() - new Date().getTime();
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(auth:boolean, token:string){
        const expirationDate = new Date(
          new Date().getTime() + this.elapsedTime * this.timeInSeconds
        );

        const user = new User(
            auth,
            token,
            expirationDate
        );

        this.user.next(user);
        this.autoLogout(this.elapsedTime * this.timeInSeconds);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
      const errorMessage = errorRes.error;
      return throwError(errorMessage);
    }

    private authenticationError(errorRes: HttpErrorResponse){
      let errorMessage;
      if(errorRes.status === 400 || (errorRes.status === 401 && errorRes.error.token !== null) ||
      (errorRes.status === 401 && errorRes.error.token === null)){
          errorMessage = "Invalid Username or Password.";
      }
      return throwError(errorMessage);
    }


}
