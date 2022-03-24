import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from '../user-data-service.service';

export interface User {
  name: string;
  avatar:string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


public inputEnabled:boolean = true;
user:User = {
  name:'',
  avatar:''
}
public userName = this.user.name
  constructor(private UserService:UserDataServiceService) { }

  ngOnInit(): void {

   this.UserService.currentUser.subscribe(user =>{
     this.user = user;
     this.userName = user.name;
   })

   console.log(this.user.name)
  }


  saveUser(){


    this.UserService.modifyUser({
      name:this.userName,
      avatar:this.user.avatar,
    })
    this.inputEnabled = false;

    console.log(this.user)
  }

  onfileChangedEvent(file: any){
    let reader= new FileReader();

    reader.onload = (event:any) => {
      this.user.avatar= event.target.result;

    }
    

    if(file){
      reader.readAsDataURL(file.target.files[0]);
    }
    
      
    
  }

}
