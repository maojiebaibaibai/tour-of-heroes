import { Injectable } from '@angular/core';
import { Hero } from '../const/hero';
import { HEROES } from '../const/mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroUrl)
    .pipe(
      catchError(this.handleError<Hero[]>(
        'getHeroes',[]
      ))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failded: ${error}`);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(hero => this.log(`fetched hero name=${hero.name}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero name = ${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`add hero w/ name = ${newHero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

}
