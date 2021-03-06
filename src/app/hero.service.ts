import {Injectable} from '@angular/core';
import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl='api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  getHeroes(): Observable<Hero[]> {
    this.log("fetched heroes");
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.log(`fetched hero id=${id}`);
    return of(hero);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
