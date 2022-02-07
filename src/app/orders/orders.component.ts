import { Component, OnInit } from '@angular/core';
import { OrdersServices } from '../services/orders.services';
import { DataStorageServices } from '../services/data-storage.services';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderForm: FormGroup;
  sizes = ['Small', 'Medium', 'Large'];
  crusts = ['Thin', 'Hand Tossed', 'Deep Dish'];
  cheeses = ['Light', 'Regular', 'Extra'];
  spreads = ['Left Side Only', 'Right Side Only', 'Full Pie'];
  peppChecked = false;
  sausageChecked = false;
  baconChecked = false;
  meatballChecked = false;
  hamChecked = false;
  chickChecked = false;
  beefChecked = false;
  porkChecked = false;
  mushChecked = false;
  onionChecked = false;
  pineChecked = false;
  oliveChecked = false;
  gPepperChecked = false;
  bPepperChecked = false;
  tomatoChecked = false;
  mildSixChecked = false;
  mildTwelveChecked = false;
  hotSixChecked = false;
  hotTwelveChecked = false;
  bbqSixChecked = false;
  bbqTwelveChecked = false;
  sweetSixChecked = false;
  sweetTwelveChecked = false;
  sixChecked = false;
  twelveChecked = false;
  eighteenChecked = false;
  dewChecked = false;
  cokeChecked = false;
  spriteChecked = false;
  teaChecked = false;
  orangeChecked = false;
  showOrder = false;
  currentMeatOrder = false;
  currentVeggieOrder = false;
  currentWingOrder = false;
  currentBreadstickOrder = false;
  currentDrinkOrder = false;
  meatOrder = false;
  veggieOrder = false;
  wingOrder = false;
  breadstickOrder = false;
  drinkOrder = false;
  priorOrder = false;
  user: {email: string, firstname: string, lastname: string, id: string};
  submitted = false;
  subTotal = 0;
  total = 0;
  roundTotal = 0;
  addOns = 0;
  smallPrice = 4.99;
  mediumPrice = 8.99;
  largePrice = 12.99;
  fullTopping = 1.00;
  halfTopping = .50;
  fullVegTopping = .50;
  halfVegTopping = .25;
  deepDish = 1.00;
  extraCheese = 2.00;
  sixWing = 4.99;
  twelveWing = 7.99;
  sixBread = 2.99;
  twelveBread = 4.99;
  eighteenBread = 6.99;
  drink = 1.99;
  portion: string = null;
  noPeppPortion;
  noSausPortion;
  noBaconPortion;
  noMeatballPortion;
  noHamPortion;
  noChickenPortion;
  noBeefPortion;
  noPorkPortion;
  noMushroomPortion;
  noOnionPortion;
  noOlivePortion;
  noPinePortion;
  noGPepperPortion;
  noBPepperPortion;
  noTomatoPortion;
  meats = '';
  veggies = '';
  wings = '';
  breadsticks = '';
  drinks = '';
  newOrder;
  getOrder = [];
  viewOrder = [];
  error: string = null;


  constructor(private ordersServices: OrdersServices,
    private dataStorageServices: DataStorageServices,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.orderForm = new FormGroup({
        'size': new FormControl(null, Validators.required),
        'crust': new FormControl(null, Validators.required),
        'cheese': new FormControl(null, Validators.required),
        'thin': new FormControl(null),
        'hand': new FormControl(null),
        'deep': new FormControl(null),
        'light': new FormControl(null),
        'regular': new FormControl(null),
        'extra': new FormControl(null),
        'pepp': new FormControl(null),
        'sausage': new FormControl(null),
        'bacon': new FormControl(null),
        'meatball': new FormControl(null),
        'ham': new FormControl(null),
        'chick': new FormControl(null),
        'beef': new FormControl(null),
        'pork': new FormControl(null),
        'mush': new FormControl(null),
        'red': new FormControl(null),
        'pine': new FormControl(null),
        'black': new FormControl(null),
        'green': new FormControl(null),
        'banana': new FormControl(null),
        'roma': new FormControl(null),
        'mildsix': new FormControl(null),
        'mildtwelve': new FormControl(null),
        'hotsix': new FormControl(null),
        'hottwelve': new FormControl(null),
        'bbqsix': new FormControl(null),
        'bbqtwelve': new FormControl(null),
        'sweetsix': new FormControl(null),
        'sweettwelve': new FormControl(null),
        'six': new FormControl(null),
        'twelve': new FormControl(null),
        'eighteen': new FormControl(null),
        'dew': new FormControl(null),
        'coke': new FormControl(null),
        'sprite': new FormControl(null),
        'tea': new FormControl(null),
        'orange': new FormControl(null),
      });

      this.user = {
        email: this.route.snapshot.params['email'],
        firstname: this.route.snapshot.params['firstname'],
        lastname: this.route.snapshot.params['lastname'],
        id: this.route.snapshot.params['id']
      }
      this.error = null;
      this.dataStorageServices.autoLogin();
    }

  onPeppSelected(){
    this.peppChecked = !this.peppChecked;

    if(this.peppChecked === true){
      if(!this.orderForm.get('pepperoni')){
        this.orderForm.addControl('pepperoni', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('pepperoni')).push(control);
    }else{
        this.orderForm.removeControl('pepperoni');
    }
  }

  onSausageSelected(){
    this.sausageChecked = !this.sausageChecked;

    if(this.sausageChecked === true){
      if(!this.orderForm.get('saus')){
        this.orderForm.addControl('saus', new FormArray([]));
      }

       const control = new FormControl(null);
      (<FormArray>this.orderForm.get('saus')).push(control);
    }else{
      this.orderForm.removeControl('saus');
    }
  }

  onBaconSelected(){
    this.baconChecked = !this.baconChecked;

    if(this.baconChecked === true){
      if(!this.orderForm.get('bac')){
        this.orderForm.addControl('bac', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('bac')).push(control);
    }else{
      this.orderForm.removeControl('bac');
    }
  }

  onMeatballSelected(){
    this.meatballChecked = !this.meatballChecked;

    if(this.meatballChecked === true){
      if(!this.orderForm.get('meat')){
        this.orderForm.addControl('meat', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('meat')).push(control);
    }else{
      this.orderForm.removeControl('meat');
    }
  }

  onHamSelected(){
    this.hamChecked = !this.hamChecked;

    if(this.hamChecked === true){
      if(!this.orderForm.get('hamportion')){
        this.orderForm.addControl('hamportion', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('hamportion')).push(control);
    }else{
      this.orderForm.removeControl('hamportion');
    }
  }

  onChickSelected(){
    this.chickChecked = !this.chickChecked;

    if(this.chickChecked === true){
      if(!this.orderForm.get('chicken')){
        this.orderForm.addControl('chicken', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('chicken')).push(control);
    }else{
      this.orderForm.removeControl('chicken');
    }
  }

  onBeefSelected(){
    this.beefChecked = !this.beefChecked;

    if(this.beefChecked === true){
      if(!this.orderForm.get('beefportion')){
        this.orderForm.addControl('beefportion', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('beefportion')).push(control);
    }else{
      this.orderForm.removeControl('beefportion');
    }
  }

  onPorkSelected(){
    this.porkChecked = !this.porkChecked;

    if(this.porkChecked === true){
      if(!this.orderForm.get('porkportion')){
        this.orderForm.addControl('porkportion', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('porkportion')).push(control);
    }else{
      this.orderForm.removeControl('porkportion');
    }
  }

  onMushroomSelected(){
    this.mushChecked = !this.mushChecked;

    if(this.mushChecked === true){
      if(!this.orderForm.get('mushrooms')){
        this.orderForm.addControl('mushrooms', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('mushrooms')).push(control);
    }else{
      this.orderForm.removeControl('mushrooms');
    }
  }

  onOnionSelected(){
    this.onionChecked = !this.onionChecked;

    if(this.onionChecked === true){
      if(!this.orderForm.get('onions')){
        this.orderForm.addControl('onions', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('onions')).push(control);
    }else{
      this.orderForm.removeControl('onions');
    }
  }

  onPineappleSelected(){
    this.pineChecked = !this.pineChecked;

    if(this.pineChecked === true){
      if(!this.orderForm.get('pineapple')){
        this.orderForm.addControl('pineapple', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('pineapple')).push(control);
    }else{
      this.orderForm.removeControl('pineapple');
    }
  }

  onOliveSelected(){
    this.oliveChecked = !this.oliveChecked;

    if(this.oliveChecked === true){
      if(!this.orderForm.get('olives')){
        this.orderForm.addControl('olives', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('olives')).push(control);
    }else{
      this.orderForm.removeControl('olives');
    }
  }

  onGreenPepperSelected(){
    this.gPepperChecked = !this.gPepperChecked;

    if(this.gPepperChecked === true){
      if(!this.orderForm.get('gpeppers')){
        this.orderForm.addControl('gpeppers', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('gpeppers')).push(control);
    }else{
      this.orderForm.removeControl('gpeppers');
    }
  }

  onBananaPepperSelected(){
    this.bPepperChecked = !this.bPepperChecked;

    if(this.bPepperChecked === true){
      if(!this.orderForm.get('bpeppers')){
        this.orderForm.addControl('bpeppers', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('bpeppers')).push(control);
    }else{
      this.orderForm.removeControl('bpeppers');
    }
  }

  onTomatoSelected(){
    this.tomatoChecked = !this.tomatoChecked;

    if(this.tomatoChecked === true){
      if(!this.orderForm.get('tomatoes')){
        this.orderForm.addControl('tomatoes', new FormArray([]));
      }

      const control = new FormControl(null);
      (<FormArray>this.orderForm.get('tomatoes')).push(control);
    }else{
      this.orderForm.removeControl('tomatoes');
    }
  }

  onMildSixSelected(){
    this.mildSixChecked = !this.mildSixChecked;

    if(this.mildSixChecked === true){
      this.addOns = this.sixWing;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.sixWing;
    }
  }

  onMildTwelveSelected(){
    this.mildTwelveChecked = !this.mildTwelveChecked;

    if(this.mildTwelveChecked === true){
      this.addOns += this.twelveWing;
      this.subTotal += this.addOns;
    }else if(this.mildSixChecked === true){
      this.addOns -= this.twelveWing;
    }
  }

  onHotSixSelected(){
      this.hotSixChecked = !this.hotSixChecked;

      if(this.hotSixChecked === true){
        this.addOns += this.sixWing;
        this.subTotal += this.addOns;
      }else{
        this.addOns -= this.sixWing;
      }
  }

  onHotTwelveSelected(){
      this.hotTwelveChecked = !this.hotTwelveChecked;

      if(this.hotTwelveChecked === true){
        this.addOns += this.twelveWing;
        this.subTotal += this.addOns;
      }else{
        this.addOns -= this.twelveWing;
      }
  }

  onBbqSixSelected(){
      this.bbqSixChecked = !this.bbqSixChecked;

      if(this.bbqSixChecked === true){
        this.addOns += this.sixWing;
        this.subTotal += this.addOns;
      }else{
        this.addOns -= this.sixWing;
      }
  }

  onBbqTwelveSelected(){
    this.bbqTwelveChecked = !this.bbqTwelveChecked;

    if(this.bbqTwelveChecked === true){
      this.addOns += this.twelveWing;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.twelveWing;
    }
  }

  onSweetsixSelected(){
    this.sweetSixChecked = !this.sweetSixChecked;

    if(this.sweetSixChecked === true){
      this.addOns += this.sixWing;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.sixWing;
    }
  }

  onSweettwelveSelected(){
    this.sweetTwelveChecked = !this.sweetTwelveChecked;

    if(this.sweetTwelveChecked === true){
      this.addOns += this.twelveWing;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.twelveWing;
    }
  }

  onSixSelected(){
    this.sixChecked = !this.sixChecked;

    if(this.sixChecked === true){
      this.addOns += this.sixBread;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.sixBread;
    }
  }

  onTwelveSelected(){
    this.twelveChecked = !this.twelveChecked;

    if(this.twelveChecked === true){
      this.addOns += this.twelveBread;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.twelveBread;
    }
  }

  onEighteenSelected(){
    this.eighteenChecked = !this.eighteenChecked;

    if(this.eighteenChecked === true){
      this.addOns += this.eighteenBread;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.eighteenBread;
    }
  }

  onDewSelected(){
    this.dewChecked = !this.dewChecked;

    if(this.dewChecked === true){
      this.addOns += this.drink;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.drink;
    }
  }

  onCokeSelected(){
    this.cokeChecked = !this.cokeChecked;

    if(this.cokeChecked === true){
      this.addOns += this.drink;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.drink;
    }
  }

  onSpriteSelected(){
    this.spriteChecked = !this.spriteChecked;

    if(this.spriteChecked === true){
      this.addOns += this.drink;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.drink;
    }
  }

  onTeaSelected(){
    this.teaChecked = !this.teaChecked;

    if(this.teaChecked === true){
      this.addOns += this.drink;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.drink;
    }
  }

  onOrangeSelected(){
    this.orangeChecked = !this.orangeChecked;

    if(this.orangeChecked === true){
      this.addOns += this.drink;
      this.subTotal += this.addOns;
    }else{
      this.addOns -= this.drink;
    }
  }

  onSubmit(){
    this.noPeppPortion = false;
    this.noSausPortion = false;
    this.noBaconPortion = false;
    this.noMeatballPortion = false;
    this.noHamPortion = false;
    this.noChickenPortion = false;
    this.noBeefPortion = false;
    this.noPorkPortion = false;
    this.noMushroomPortion = false;
    this.noOnionPortion = false;
    this.noOlivePortion = false;
    this.noPinePortion = false;
    this.noGPepperPortion = false;
    this.noBPepperPortion = false;
    this.noTomatoPortion = false;



    //Size, Cheese, and Crust
    if(this.orderForm.value.size === 'Small'){
      this.subTotal = this.smallPrice;
    }else if(this.orderForm.value.size === 'Medium'){
      this.subTotal = this.mediumPrice;
    }else if(this.orderForm.value.size === 'Large'){
      this.subTotal = this.largePrice;
    }

    if(this.orderForm.value.crust === 'Deep Dish'){
      this.subTotal += this.deepDish;
    }

    if(this.orderForm.value.cheese === 'Extra'){
      this.subTotal += this.extraCheese;
    }

    //Pepperoni Selected
    if(this.peppChecked){
        this.portion = this.orderForm.value['pepperoni'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noPeppPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noPeppPortion === true){
          alert('You selected Pepperoni. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats = "Pepperoni " + this.portion[0] + " ";
        }
    }

    //Sausage Selected.
    if(this.sausageChecked){
        this.portion = this.orderForm.value['saus'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noSausPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noSausPortion === true){
          alert('You selected Sausage. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats += "Italian Sausage " + this.portion[0] + " ";
        }
    }

    //Bacon Selected.
    if(this.baconChecked){
        this.portion = this.orderForm.value['bac'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noBaconPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noBaconPortion === true){
          alert('You selected Bacon. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats += "Bacon " + this.portion[0] + " ";
        }
    }

    //Meatball Selected.
    if(this.meatballChecked){
        this.portion = this.orderForm.value['meat'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noMeatballPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noMeatballPortion === true){
          alert('You selected Meatball. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats += "Meatball " + this.portion[0] + " ";
        }
    }

     //Ham Selected.
    if(this.hamChecked){
        this.portion = this.orderForm.value['hamportion'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noHamPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noHamPortion === true){
          alert('You selected Ham. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats += "Ham " + this.portion[0] + " ";
        }
    }

     //Chicken Selected.
    if(this.chickChecked){
        this.portion = this.orderForm.value['chicken'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noChickenPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noChickenPortion === true){
          alert('You selected Chicken. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats += "Chicken " + this.portion[0] + " ";
        }
    }

     //Beef Selected.
    if(this.beefChecked){
        this.portion = this.orderForm.value['beefportion'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noBeefPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noBeefPortion === true){
          alert('You selected Beef. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats += "Beef " + this.portion[0] + " ";
        }
    }

     //Pork Selected.
    if(this.porkChecked){
        this.portion = this.orderForm.value['porkportion'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noPorkPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noPorkPortion === true){
          alert('You selected Pork. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullTopping;
          }

          this.meats += "Pork " + this.portion[0] + " ";
        }
    }

     //Mushrooms Selected.
     if(this.mushChecked){
      this.portion = this.orderForm.value['mushrooms'];
      if(this.portion[0] !== 'Left Side Only'){
        if(this.portion[0] !== 'Right Side Only'){
          if(this.portion[0] !== 'Full Pie'){
            this.noMushroomPortion = true;
            this.submitted = false;
          }
        }
      }

      if(this.noMushroomPortion === true){
        alert('You selected Mushrooms. Please select a portion.')
      }else{
        if(this.portion[0] === 'Left Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Right Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Full Pie'){
          this.subTotal += this.fullVegTopping;
        }

        this.veggies = "Mushrooms " + this.portion[0] + " ";
      }
     }

     //Red Onions Selected.
     if(this.onionChecked){
      this.portion = this.orderForm.value['onions'];
      if(this.portion[0] !== 'Left Side Only'){
        if(this.portion[0] !== 'Right Side Only'){
          if(this.portion[0] !== 'Full Pie'){
            this.noOnionPortion = true;
            this.submitted = false;
          }
        }
      }

      if(this.noOnionPortion === true){
        alert('You selected Red Onions. Please select a portion.')
      }else{
        if(this.portion[0] === 'Left Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Right Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Full Pie'){
          this.subTotal += this.fullVegTopping;
        }

        this.veggies += "Red Onions " + this.portion[0] + " ";
      }
     }

     //Pineapple Selected.
     if(this.pineChecked){
      this.portion = this.orderForm.value['pineapple'];
      if(this.portion[0] !== 'Left Side Only'){
        if(this.portion[0] !== 'Right Side Only'){
          if(this.portion[0] !== 'Full Pie'){
            this.noPinePortion = true;
            this.submitted = false;
          }
        }
      }

      if(this.noPinePortion === true){
        alert('You selected Pineapple. Please select a portion.')
      }else{
        if(this.portion[0] === 'Left Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Right Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Full Pie'){
          this.subTotal += this.fullVegTopping;
        }

        this.veggies += "Pineapple " + this.portion[0] + " ";
      }
     }

     //Black Olives Selected.
     if(this.oliveChecked){
      this.portion = this.orderForm.value['olives'];
      if(this.portion[0] !== 'Left Side Only'){
        if(this.portion[0] !== 'Right Side Only'){
          if(this.portion[0] !== 'Full Pie'){
            this.noOlivePortion = true;
            this.submitted = false;
          }
        }
      }

      if(this.noOlivePortion === true){
        alert('You selected Black Olives. Please select a portion.')
      }else{
        if(this.portion[0] === 'Left Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Right Side Only'){
          this.subTotal += this.halfVegTopping;
        }else if(this.portion[0] === 'Full Pie'){
          this.subTotal += this.fullVegTopping;
        }

        this.veggies += "Black Olives " + this.portion[0] + " ";
      }
     }

      //Green Peppers Selected.
      if(this.gPepperChecked){
        this.portion = this.orderForm.value['gpeppers'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noGPepperPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noGPepperPortion === true){
          alert('You selected Green Peppers. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfVegTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfVegTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullVegTopping;
          }

          this.veggies += "Green Peppers " + this.portion[0] + " ";
        }
       }

       //Banana Peppers Selected.
      if(this.bPepperChecked){
        this.portion = this.orderForm.value['bpeppers'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noBPepperPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noBPepperPortion === true){
          alert('You selected Banana Peppers. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfVegTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfVegTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullVegTopping;
          }

          this.veggies += "Banana Peppers " + this.portion[0] + " ";
        }
       }

      //Tomatoes Selected.
      if(this.tomatoChecked){
        this.portion = this.orderForm.value['tomatoes'];
        if(this.portion[0] !== 'Left Side Only'){
          if(this.portion[0] !== 'Right Side Only'){
            if(this.portion[0] !== 'Full Pie'){
              this.noTomatoPortion = true;
              this.submitted = false;
            }
          }
        }

        if(this.noTomatoPortion === true){
          alert('You selected Roma Tomatoes. Please select a portion.')
        }else{
          if(this.portion[0] === 'Left Side Only'){
            this.subTotal += this.halfVegTopping;
          }else if(this.portion[0] === 'Right Side Only'){
            this.subTotal += this.halfVegTopping;
          }else if(this.portion[0] === 'Full Pie'){
            this.subTotal += this.fullVegTopping;
          }

          this.veggies += "Roma Tomatoes " + this.portion[0] + " ";
        }
       }

       this.total = this.subTotal;

      if((this.noPeppPortion === false && this.noSausPortion === false && this.noBaconPortion === false &&
        this.noMeatballPortion === false && this.noHamPortion === false && this.noChickenPortion === false &&
        this.noBeefPortion === false && this.noPorkPortion === false && this.noMushroomPortion === false &&
        this.noOnionPortion === false && this.noOlivePortion === false && this.noPinePortion === false &&
        this.noGPepperPortion === false && this.noBPepperPortion === false && this.noTomatoPortion === false) && (
          this.orderForm.value.size || this.orderForm.value.crust || this.orderForm.value.cheese)){
          this.submitted = true;

          if(this.orderForm.value.mildsix === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "6 Mild Wings ";
          }

          if(this.orderForm.value.mildtwelve === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "12 Mild Wings ";
          }

          if(this.orderForm.value.hotsix === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "6 Hot Wings ";
          }

          if(this.orderForm.value.hottwelve === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "12 Hot Wings ";
          }

          if(this.orderForm.value.bbqsix === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "6 BBQ Wings ";
          }

          if(this.orderForm.value.bbqtwelve === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "12 BBQ Wings ";
          }

          if(this.orderForm.value.sweetsix === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "6 Sweet & Spicy Wings ";
          }

          if(this.orderForm.value.sweettwelve === true){
            this.total = this.subTotal + this.addOns;
            this.wings += "12 Sweet & Spicy Wings ";
          }

          if(this.orderForm.value.six === true){
            this.total = this.subTotal + this.addOns;
            this.breadsticks += "6 Breadsticks ";
          }

          if(this.orderForm.value.twelve === true){
            this.total = this.subTotal + this.addOns;
            this.breadsticks += "12 Breadsticks ";
          }

          if(this.orderForm.value.eighteen === true){
            this.total = this.subTotal + this.addOns;
            this.breadsticks += "18 Breadsticks ";
          }

          if(this.orderForm.value.dew === true){
            this.total = this.subTotal + this.addOns;
            this.drinks += "Mountain Dew ";
          }

          if(this.orderForm.value.coke === true){
            this.total = this.subTotal + this.addOns;
            this.drinks += "Coke ";
          }

          if(this.orderForm.value.sprite === true){
            this.total = this.subTotal + this.addOns;
            this.drinks += "Sprite ";
          }

          if(this.orderForm.value.tea === true){
            this.total = this.subTotal + this.addOns;
            this.drinks += "Lipton Brisk Iced Tea ";
          }

          if(this.orderForm.value.orange === true){
            this.total = this.subTotal + this.addOns;
            this.drinks += "Fanta Orange ";
          }


          if(this.meats === ""){
            this.meats = "no meats";
          }

          if(this.veggies === ""){
            this.veggies = "no veggies";
          }

          if(this.wings === ""){
            this.wings = "no wings";
          }

          if(this.breadsticks === ""){
            this.breadsticks = "no breadsticks";
          }

          if(this.drinks === ""){
            this.drinks = "no drinks";
          }


          if(this.meats !== "no meats"){
            this.currentMeatOrder = true;
          }else{
            this.currentMeatOrder = false;
          }

          if(this.veggies !== "no veggies"){
            this.currentVeggieOrder = true;
          }else{
            this.currentVeggieOrder = false;
          }

          if(this.wings !== "no wings"){
            this.currentWingOrder = true;
          }else{
            this.currentWingOrder = false;
          }

          if(this.breadsticks !== "no breadsticks"){
            this.currentBreadstickOrder = true;
          }else{
            this.currentBreadstickOrder = false;
          }

          if(this.drinks !== "no drinks"){
            this.currentDrinkOrder = true;
          }else{
            this.currentDrinkOrder = false;
          }

          let fullTotal = Number((Math.abs(this.total) * 100).toPrecision(15));

          this.roundTotal = Math.round(fullTotal) / 100 * Math.sign(this.total);

          console.log("Total " + this.roundTotal);


          this.newOrder = new Order(this.orderForm.value.size, this.orderForm.value.crust,
            this.orderForm.value.cheese, this.meats, this.veggies, this.wings, this.breadsticks,
            this.drinks, this.roundTotal, this.user.id);

          this.ordersServices.addOrder(this.newOrder);

          this.dataStorageServices.storeOrder(this.newOrder)
            .subscribe(data => {
              console.log(data);
            },
            errorMessage => {
              console.log(errorMessage);
              this.error = errorMessage;
            });
      }
  }

  onPastOrders(){
    this.showOrder = true;
    this.dataStorageServices.fetchOrders(this.user.id)
      .subscribe(data => {
        let order = Object.values(data);
        this.orderData(order);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      })
  }

  orderData(order: Array<string>){
    this.getOrder.push(order);
    if(this.getOrder[0].length === 1){
      this.priorOrder = false;
    } else{
      this.priorOrder = true;
      for(let i = 0; i < this.getOrder.length - 1; i++){
        for(let j = 0; j < this.getOrder.length - 1; j++){
          if(this.getOrder[i][j].meats !== "no meats"){
            this.meatOrder = true;
          }else{
            this.meatOrder = false;
          }

          if(this.getOrder[i][j].veggies !== "no veggies"){
            this.veggieOrder = true;
          }else{
            this.veggieOrder = false;
          }

          if(this.getOrder[i][j].wings !== "no wings"){
            this.wingOrder = true;
          }else{
            this.wingOrder = false;
          }

          if(this.getOrder[i][j].breadsticks !== "no breadsticks"){
            this.breadstickOrder = true;
          }else{
            this.breadstickOrder = false;
          }

          if(this.getOrder[i][j].drinks !== "no drinks"){
            this.drinkOrder = true;
          }else{
            this.drinkOrder = false;
          }
        }
      }
    }
  }
}
