export class Order{
    public size: string;
    public crust: string;
    public cheese: string;
    public meats: string;
    public veggies: string;
    public wings: string;
    public breadsticks: string;
    public drinks: string;
    public total: number;
    public user: string;

    constructor(size: string, crust: string, cheese: string, meats: string, veggies: string, wings: string,
        breadsticks: string, drinks: string, total: number, user: string){
            this.size = size;
            this.crust = crust;
            this.cheese = cheese;
            this.meats = meats;
            this.veggies = veggies;
            this.wings = wings;
            this.breadsticks = breadsticks;
            this.drinks = drinks;
            this.total = total;
            this.user = user;
        }
}
