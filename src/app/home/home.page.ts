import { Component } from '@angular/core';
import { HelpersService } from '../service/helpers.service';
import { Rover, Coordinates, Square } from '../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  arrayOrders = ['L','A','A','R','A','R','A','L']; //Sale
  arrayOrders2 = ['L','R','A','R','A','L']; //Dentro
  rover: Rover={
    direction: 'A',
    orientation: 'N',
    coordinates:{
      xWidth:1,
      yHeight:1,
    },
    successTrip: true
  };


  mars: Square={
    width: 10,
    height: 10

  };

  width = 100;
  height = 100;
  orientacion;
  square;

  constructor( private helper: HelpersService) {

   helper.trip(this.arrayOrders,this.rover,this.mars);
   this.orientacion = this.rover.orientation;

  }

  getWidth(){
    console.log(this.width);
    this.mars.width = this.width;
    return this.width+'px';
  }

  getHeight(){
    console.log(this.height);
    this.mars.height = this.height;
    return this.height+'px';
  }

  // getWidth(){

  //   if(this.width){
  //     this.square.width = parseInt(this.width);
  //     const dimensionsRes = `${this.width}px`;
  //     console.log('square', this.square);
  //     return dimensionsRes;
  //   }

  // }

  // getHeight(){

  //   if(this.height){
  //     this.square.height = parseInt(this.height);
  //     const dimensionsRes = `${this.height}px`;
  //     console.log('square', this.square);

  //     return dimensionsRes;
  //   }

  // }

  getLeft(){
    console.log('Left', (this.rover.coordinates.xWidth)*10+'px');
    return (this.rover.coordinates.xWidth)*10+'px';
  }

  getBottom(){
    console.log('Bottom', (this.rover.coordinates.yHeight)*10+'px');
    return (this.rover.coordinates.yHeight)*10+'px';
  }

}
