import { Order } from '../models/order.model';
import { Subject } from 'rxjs';

export class OrdersServices {
    orderChanged = new Subject<Order[]>();

    private orders: Order[] = [];

    getOrders(){
        return this.orders.slice();
    }

    getOrder(user: string){
        const order = this.orders.find(
           (o) => {
               return o.user === user;
           }
        );
        return order;
    }

    setOrder(order){
        this.orders = order;
        this.orderChanged.next(this.orders);
    }


    addOrder(order: Order){
        this.orders.push(order);
        this.orderChanged.next(this.orders.slice());
    }



}
