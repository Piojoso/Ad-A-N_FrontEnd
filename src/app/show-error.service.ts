import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowErrorService {

  private errors = [];
  private errors$ = new BehaviorSubject<any[]>([]);

  constructor() { }

  public select = () => [...this.errors];
  public select$ = () => this.errors$.asObservable();

  public dispatchError(error){
    this.errors.push({...error});
    this.errors$.next(this.select());
  }
}
