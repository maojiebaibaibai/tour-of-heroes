import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, TranslationWidth } from '@angular/common';

import { HeroService } from '../hero.service';
import { Hero } from '../../const/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => {
      this.hero = hero;
    });
  }

  goback(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goback());
  }

}
