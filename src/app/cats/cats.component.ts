import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscriber } from 'rxjs';
import { CatsService } from '../cats.service';
import { User, UserDataServiceService } from '../user-data-service.service';
import * as moment from 'moment';





export interface Cat {
  image: string;
  fact: string;
  comments:Array<Comment>;
}

export class Cat {
  constructor(cat: any) {
    this.image = cat.image || '';
    this.fact = cat.fact || '';
    this.comments = cat.comments || [];
  }
  image:string;
  fact:string;
  comments:Comment[]
}

export interface Comment {
  text: string;
  emitter: User;
  creationDate: Date;
  response: Comment;

}

export class Comment {
  constructor(obj:any){
    this.text = obj.text || ''
    this.emitter = obj.emitter || {}
    this.creationDate = obj.creationDate || new Date()
    this.response  = obj.response || []
  }
  text:string;
  emitter:User;
  creationDate:Date;
  response:Comment;

}


@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})

export class CatsComponent implements OnInit {
  public isLoading: boolean = true;
  public posts: Cat[] = [];
  public sentComments:Array<string> = [];
  public currentUser!: User ;

  constructor(private catService: CatsService, private userService:UserDataServiceService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  
    let image = this.catService.getCatImage()
    let fact = this.catService.getCatFact()

    forkJoin([image, fact]).subscribe((results: any) => {
      results[0].forEach((image: any, index: number) => {
        let cat = new Cat({
          image: image.url,
          fact: results[1].data[index].fact
          
        })
        this.posts.push(cat)
      })
      console.log(this.posts)
      //this.currentCat.fact= results[1].fact;
    })
  }

  

  sendComment(index:number){
    let com = new Comment({});

    com.emitter = this.currentUser
    com.text = this.sentComments[index]

      console.log(this.sentComments);
      this.posts[index].comments.push(com)
      this.sentComments[index]= ""
      console.log(com)

  }

  getDateFromNow(date:Date){
    let now = moment(date)
    now.locale('es')
    let fromNow = now.fromNow()
    return fromNow
  
  }
}
