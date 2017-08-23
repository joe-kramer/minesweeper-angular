import { Component, OnInit } from '@angular/core';
import { Square } from '../square.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  grid: Square[][];
  max: number = 6;
  min: number = 1;
  bombCounter: number = 0;
  flipCounter: number = 0;

  constructor() {

  }

  initializeGrid(size: number){
    this.grid = [];
    for(let i: number = 0; i < size; i++) {
      this.grid[i] = [];
      for(let j: number = 0; j< size; j++) {
        let randomBomb = Math.floor(Math.random() * (this.max - this.min) + this.min);
        this.grid[i][j] = new Square(randomBomb === 1 ? true : false);
        if (this.grid[i][j].bomb === true){
          this.bombCounter++;
          this.grid[i][j].proximityNumber = 9;
        }
      }
    }
    this.setNumberValues(size);
  }

  setNumberValues(size: number) {
    for(let r: number = 0; r < size; r++) {
      for(let c: number = 0; c < size; c++) {
        let counter: number = 0;
        if(this.grid[r][c].bomb === false) {
          //left
          if(c > 0 && this.grid[r][c - 1].bomb === true) {
            counter++;
          }
          //Upper left
          if(c > 0 && r > 0 && this.grid[r-1][c-1].bomb === true) {
            counter++;
          }
          //Up
          if(r > 0 && this.grid[r-1][c].bomb === true) {
            counter++;
          }
          //Upper right
          if((c < size - 1) && r > 0 && this.grid[r-1][c + 1].bomb === true) {
            counter++;
          }
          //right
          if((c < size - 1) && this.grid[r][c+1].bomb === true) {
            counter++;
          }
          //bottom right
          if((c < size - 1) && (r < size - 1) && this.grid[r+1][c+1].bomb === true) {
            counter++;
          }
          //bottom
          if((r < size - 1) && this.grid[r+1][c].bomb === true) {
            counter++;
          }
          //bottom left
          if((c > 0) && (r < size - 1) && this.grid[r+1][c-1].bomb === true) {
            counter++;
          }

        }
        if (this.grid[r][c].bomb === false) {
          this.grid[r][c].proximityNumber = counter;
        }
      }
    }
    console.log(this.grid);
  }

  ngOnInit() {
    this.initializeGrid(8)
  }

  minesweep(square){
    square.mineswept = true;
    if (square.bomb === true){
      console.log("BOMB");
    } else {
      this.flipCounter++;
      this.hasWon(this.flipCounter, this.bombCounter, 8);
    }
  }

  hasWon(flipCount : number, bombs : number, size : number) {
    let totalSquares: number = size * size;
    if (bombs + flipCount >= totalSquares ) {
      alert("YOU WIN");
    }
  }

}
