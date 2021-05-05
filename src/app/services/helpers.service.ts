import { Injectable } from '@angular/core';
import { Coordinates, Rover, Square} from '../interfaces/interfaces';

@Injectable({
providedIn: 'root'
})

// eslint-disable-next-line @typescript-eslint/naming-convention
export class helpersService {

  constructor() { }

  // This method will check if the coordinates given are inside the square



checkIfInsideSquare(square: Square , coordinates: Coordinates ): boolean {

  const maxWidth = square.width; // The max width of the square will be the width of the square.
  const maxHeight = square.height; // The max height of the square will be the height of the square.

  // so we check if coordinates are within those boundaries and also positive number
  return ( coordinates.xWidth <= maxWidth )
  && ( coordinates.yHeight <= maxHeight )
  && ( coordinates.xWidth >= 0 && coordinates.yHeight >= 0 );
  }




  //// METHODS THAT HANDLE MOVEMENT OF THE ROVER ON THE SQUARE /////

  getNewCoordinateWhereIWantToGo( actualCoordinate: Coordinates, orientation: 'N' | 'S' | 'O' | 'E' ): Coordinates {

  switch (orientation){
  case 'N': {
  return {
  xWidth: actualCoordinate.xWidth,
  yHeight: actualCoordinate.yHeight + 1
  };
  }

  case 'E': {
  return {
  xWidth: actualCoordinate.xWidth + 1,
  yHeight: actualCoordinate.yHeight
  };
  }
  case 'S': {
  return {
  xWidth: actualCoordinate.xWidth,
  yHeight: actualCoordinate.yHeight - 1
  };
  }
  case 'O': {
  return {
  xWidth: actualCoordinate.xWidth - 1,
  yHeight: actualCoordinate.yHeight
  };
  }
  }
  }


  // This method will return the actual orientation and the new direction after receiving an order

  changeOrientation( direction: string, orientation: string ): string {
  // we assume the rover can only change orientation when he receives either Left (L) or Right (R) Direction

  // const arrayOrientations = ['N', 'E', 'S', 'O']
  if( ( direction === 'L' ) || ( direction === 'R') ){
  switch(orientation) {
  case 'N': {
  if( direction === 'L'){
  return 'O';
  }else{
  // can only be 'R'
  return 'E';
  }
  }
  case 'S': {
  if( direction === 'L'){
  return 'E';
  }else{
  // can only be 'R'
  return 'O';
  }
  }
  case 'E': {
  if( direction === 'L'){
  return 'N';
  }else{
  // can only be 'R'
  return 'S';
  }
  }
  case 'O': {
  if( direction === 'L'){
  return 'S';
  }else{
  // can only be 'R'
  return 'N';
  }
  }
  }

  }else{
  return orientation;
  }
  }







  moveRover( rover: Rover , direction: 'L' | 'R' | 'A' , square: Square ): Rover {
  // I receive an order of type direction;
  // 1. I change the orientation of the rover;
  if( direction === 'L' || direction === 'R') {

  rover.orientation = this.changeOrientation(direction, rover.orientation) as 'N' | 'S' | 'O' | 'E';
  console.log('rover', rover);

  return rover;

  } else {
  // I want to check first if is possible to go there;

  const targetCoordinates = this.getNewCoordinateWhereIWantToGo(rover.coordinates, rover.orientation);

  if( this.checkIfInsideSquare(square, targetCoordinates)){

  // is allowed to go so let's execute the method move;
  rover.coordinates = targetCoordinates;

  console.log('ROVER', rover);
  rover.successTrip = true;
  return rover;
  }else{
  rover.successTrip = false;
  return rover;
  }
  }
  }



  /// L, L, L, L , A, A, A, R, A , R, L, A


  async trip( directions: string[], rover: Rover, square: Square){

  // we use a promise to track all the steps since we add some delay effect
  let roverUpdated: Rover = rover;

  directions.forEach((direction: 'L' | 'R' | 'A' )=>{

  if(roverUpdated.successTrip ){
  roverUpdated = this.moveRover(roverUpdated, direction, square );
  console.log('rover updated', roverUpdated);

  }else{
  console.log('ME HE SALIDO DEL CUADRADO, EL ROVER ESTA EN', roverUpdated);

  }
  });



  }




}
