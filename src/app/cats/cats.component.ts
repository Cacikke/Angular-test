import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscriber } from 'rxjs';
import { CatsService } from '../cats.service';



export interface Cat {
  image: string;
  fact: string;
}

export class Cat {
  constructor(cat: Cat) {
    this.image = cat.image || '';
    this.fact = cat.fact || '';
  }
}


@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {

  public currentCat: any;
  public isLoading: boolean = true;
  public posts: Cat[] = [];
  constructor(private catService: CatsService) { }

  ngOnInit(): void {
    this.currentCat = new Cat({
      image: '',
      fact: ''
    });

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
}
