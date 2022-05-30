import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private hc:HttpClient) { }

  createmovie(movieObj):Observable<any>{
      return this.hc.post('/movies',movieObj);
  }

  getMovieDetails():Observable<any>{
    return this.hc.get('/allmovies');
  }
  
}
