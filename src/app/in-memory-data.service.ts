import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../const/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Zhangsan' },
      { id: 2, name: 'Lisi' },
      { id: 3, name: 'Wangwu' },
      { id: 4, name: 'Maojie' },
      { id: 5, name: 'Zhangfei' },
      { id: 6, name: 'Guanyu' },
      { id: 7, name: 'Huatuo' },
      { id: 8, name: 'Liubei' },
      { id: 9, name: 'Sunwukong' },
      { id: 10, name: 'Tangseng' }
    ];
    return {heroes};
  }
  constructor() {}

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
