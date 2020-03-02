import { Injectable } from '@angular/core';
import { Hero } from '../const/hero';
import { HEROES } from '../const/mock-heroes';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }

}
