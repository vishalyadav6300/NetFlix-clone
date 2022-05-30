import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private ms:MovieService) { }

  movies=[];
  indx=0;
  ngOnInit(): void {
    this.ms.getMovieDetails().subscribe(data=>{
      this.movies=data['details'];
    },
    err=>{
      alert(err);
      console.log(err);
    })
  }
  clicked(ind){
    this.indx=ind;
  }

}
