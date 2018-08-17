import {Component, OnInit} from '@angular/core';
import data from './kids-data';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

interface Kid {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'Nitzo\'s Kindergarten Game';
  public formControl = new FormControl('');
  public currentItem = 0;
  private progress = 0;
  public kids: Kid[] = data as Kid[];

  constructor(private snake: MatSnackBar) {}

  getCurrentItem() {
    return this.kids[this.currentItem];
  }

  nextSlide() {
    if(this.currentItem === this.kids.length - 1) {
      this.snake.open('You completed the game!, see you next time!', null, { duration: 20000 })
      this.setProgress(100);
    } else {
      this.currentItem++;
      this.setProgress((100 / this.kids.length) * this.currentItem);
      this.formControl.setValue('');
      this.snake.open('Success! switching to the next slide', null, { duration: 3000 })
    }
  }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      if(!value) {
        this.snake.open('Please enter a name before continuing further.', null, { duration: 3000 })
      }

      if(value.trim() === this.getCurrentItem().firstName) {
        this.nextSlide();

      } else {
        this.snake.open('Wrong name, you can do better', null, { duration: 3000 });
      }
    })
  }

  getProgress() {
    return this.progress;
  }

  setProgress(value: number) {
    this.progress = value;
  }
}
