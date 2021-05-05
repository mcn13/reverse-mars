import { Injectable } from '@angular/core';
import { Coordinates, Square, Rover } from '../interfaces/interfaces';

@Injectable({
providedIn: 'root'
})
export class HelpersService {

constructor() { }

checkRoverPosition(square: Square,coord: Coordinates): boolean{

const maxWidth = square.width; // The max width of the square will be the width of the square.
const maxHeight = square.height; // The max height of the square will be the height of the square.

//Check if coordinates are within those boundaries and also positive number
return ( coord.xWidth <= maxWidth )
&& ( coord.yHeight <= maxHeight )
&& ( coord.xWidth >= 0 && coord.yHeight >= 0 );

}

changeOrientation(newDirection: 'L' | 'R' | 'A', orientPrevia: 'N' | 'E' | 'S' | 'O'): 'N' | 'E' | 'S' | 'O'{

//const orientPrevia = rover.orientation;
// Direction L, R, A
// Orientation N W E S
switch(newDirection){
case 'L':
// eslint-disable-next-line eqeqeq
if(orientPrevia === 'N'){
return 'O';
}
if(orientPrevia === 'O'){
return 'S';
}
if(orientPrevia === 'S'){
return 'E';
}
if(orientPrevia === 'E'){
return 'N';
}
break;
case 'R':
if(orientPrevia === 'N'){
return 'E';
}
if(orientPrevia === 'E'){
return 'S';
}
if(orientPrevia === 'S'){
return 'O';
}
if(orientPrevia === 'O'){
return 'N';
}
break;

case 'A':
return orientPrevia;
}
}

//change position
getNewCoordinateWhereIWantToGo(coord: Coordinates, orientacion: 'N' | 'E' | 'S' | 'O'): Coordinates{

switch(orientacion){
case 'N':
coord.yHeight++;
break;
case 'E':
coord.xWidth++;
break;
case 'S':
coord.yHeight--;
break;
case'O':
coord.xWidth--;
break;
}
return {xWidth: coord.xWidth, yHeight: coord.yHeight};

}

checkValidMovement(square: Square, direccion: 'L' | 'R' | 'A', rover: Rover): Rover{

const roverCoord = rover.coordinates;
const orientacion = rover.orientation;
if(direccion !== 'A'){
rover.orientation = this.changeOrientation(direccion,orientacion);
rover.successTrip = true;
return rover;
}else{
const newPosition = this.getNewCoordinateWhereIWantToGo(roverCoord,orientacion);
console.log('posicionNueva',newPosition);
//const valid = this.checkRoverPosition(square,newPosition);
if(this.checkRoverPosition(square,newPosition)){
rover.coordinates = newPosition;
rover.successTrip = true;
return rover;
}else{
rover.successTrip = false;
return rover;
}

}

}

trip(arrayOrders,rover: Rover,map: Square){
let i = 0;
rover.successTrip = true;

while(rover.successTrip && i < arrayOrders.length){
const order = arrayOrders[i];
console.log('orden',order);
console.log('coordenadas',rover.coordinates);
rover = this.checkValidMovement(map,order,rover);
i++;
}

// eslint-disable-next-line max-len
console.log('Final: '+rover.successTrip+' Coordenada: ('+rover.coordinates.xWidth+','+rover.coordinates.yHeight+') Orientación: '+ rover.orientation);

/*arrayOrders.forEach(order => {
console.log('orden',order);
console.log('coordenads',rover.coordinates);
console.log(this.checkValidMovement(map,order,rover));
});*/
}

async trip2( directions: string[], rover: Rover, square: Square){

// we use a promise to track all the steps since we add some delay effect
let roverUpdated: Rover = rover;

directions.forEach((direction: 'L' | 'R' | 'A' )=>{

if(roverUpdated.successTrip ){
roverUpdated = this.checkValidMovement(square, direction,roverUpdated );
console.log('rover updated', roverUpdated);

}else{
console.log('ME HE SALIDO DEL CUADRADO, EL ROVER ESTA EN', roverUpdated);

}

});}


}
