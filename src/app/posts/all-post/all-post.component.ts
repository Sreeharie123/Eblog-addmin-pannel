import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {

  postArray:any

  constructor(private postService:PostsService){}

  ngOnInit(): void {

    this.postService.logdata().subscribe((value)=>{


      this.postArray=value

    })
  }
  onDelete(postImgpath:any,id:string){
    this.postService.deleteIMG(postImgpath,id)
  }

  onFeatured(id:string,selected:boolean){

    const featuredData={
        isFeatured: selected
    }
    this.postService.markFeatured(id,featuredData)
  }


}
