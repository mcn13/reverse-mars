export interface Square {
  width: number;
  height: number;
}

export interface Coordinates {
  xWidth: number;
  yHeight: number;
}

export interface Rover {

  direction: 'L' | 'R' | 'A';
  orientation: 'N' | 'E' | 'S'| 'O';
  coordinates: Coordinates;
  successTrip: boolean;
}
