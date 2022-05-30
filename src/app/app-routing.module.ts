import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { PostdataComponent } from './postdata/postdata.component';

const routes: Routes = [
  {path:'movies',component:MoviesComponent},
  {path:'post',component:PostdataComponent},
  {path:'',redirectTo:'/movies',pathMatch:'full'}
  //  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
