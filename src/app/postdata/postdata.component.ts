import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-postdata',
  templateUrl: './postdata.component.html',
  styleUrls: ['./postdata.component.css']
})
export class PostdataComponent implements OnInit {

  constructor(private ms:MovieService ) { }

  ngOnInit(): void {
  }
  files:File;
  file=[]
  selectFile(event){
     this.files= event.target.files[0]
     this.file.push(this.files);
  }

  selectFile1(event){
    this.files= event.target.files[0]
    this.file.push(this.files);
 }

  onSignup(movieObj){

    //create FOrmData obj
    let formData=new FormData();
    //add file
    formData.append("photo",this.file[0],this.file[0].name)
    formData.append("video",this.file[1],this.file[1].name)
    //add movieObj
    formData.append("movieObj",JSON.stringify(movieObj))
    this.ms.createmovie(formData).subscribe(
      res=>{
        if(res.message==="Movie Profile created"){
          alert("Movie Profile created")
        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("Something went wrong in movie creation")
      }
    )
  }

}
