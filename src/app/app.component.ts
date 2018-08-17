import {Component, OnInit} from '@angular/core';
import data from './kids-data';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import shuffle from 'lodash/shuffle';

interface Kid {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

function areKidsEquals(kidB, kidA) {
  return kidB.firstName === kidA.firstName && kidB.lastName === kidA.lastName
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
  public kids = data as Kid[];
  public shuffledKids: Kid[] = shuffle([...data] as Kid[]);

  constructor(private snake: MatSnackBar) {}

  getCurrentItem() {
    return this.shuffledKids[this.currentItem];
  }

  onKidNameChange(kid: Kid) {
    if(!kid) { return this.snake.open('Please enter a name before continuing further.', null, { duration: 5000 })}
    if(!areKidsEquals(kid, this.getCurrentItem())) {  return this.snake.open('Wrong name, you can do better', null, { duration: 5000 }); }

    if(this.currentItem === this.shuffledKids.length - 1) {
      const snake = this.snake.open('You completed the game! see you next time!', 'Play Again', { duration: 20000 });
      snake.onAction().subscribe(() => {
        window.location.reload();
      });

      this.setProgress(100);
    } else {
      this.kids = this.kids.filter((currentKid) => !areKidsEquals(currentKid, kid));
      this.currentItem++;
      this.setProgress((100 / this.shuffledKids.length) * this.currentItem);
      this.formControl.setValue('');
      this.snake.open('Success! switching to the next slide', null, { duration: 5000 })
    }
  }
  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((kid: Kid) => {
      this.onKidNameChange(kid)
    });
  }

  getProgress() {
    return this.progress;
  }

  setProgress(value: number) {
    this.progress = value;
  }
}
