import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {

  //Global variables
  clear1 = '';
  clear2 = '';
  postForm?: any;
  categories?: any[];
  permalink?: string;
  imgsrc: any =
    'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
  selectedImg: any;
  post:any;

  formStatus:string= "Add New"

  docId?:string

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService:PostsService,
    private route:ActivatedRoute
  ) {

   this.route.queryParams.subscribe((value:any)=>{
    this.docId=value.id

       if(this.docId){

        this.postService.loadOneData(value.id).subscribe((post)=>{
          this.post=post

     this.postForm = this.fb.group({
       title: [this.post.title, [Validators.required, Validators.minLength(10)]],
       permalink: [this.post.permalink, Validators.required],
       except: [this.post.except, [Validators.required, Validators.minLength(50)]],
       categories: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
       postimg: [this.post.postIMG, Validators.required],
       content: [this.post.content, Validators.required],
     });
        this.imgsrc=this.post.postImgPath
        this.formStatus="Edit"
     })

       }else{
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          except: ['', [Validators.required, Validators.minLength(50)]],
          categories: ['', Validators.required],
          postimg: ['', Validators.required],
          content: ['', Validators.required],
        });

       }



   })

  }


  ngOnInit(): void {
    this.categoryService.logdata().subscribe((value) => {
      this.categories = value;
    });
  }

  get fc(){

    return this.postForm.controls

  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    let permlink = title.replaceAll(' ', '-');
    this.permalink = permlink;
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgsrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }


//Submit the form

  onSubmit(){
    const splited=this.postForm.value.categories.split('-')
    const postData:Post={
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        categoryId:splited[0],
        category:splited[1]
      },
      postImgPath:'',
      except: this.postForm.value.except,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt:new Date()
    }



   this.postService.uploadImage(this.selectedImg,postData,this.formStatus,this.docId)
   this.postForm.reset()
   this.imgsrc='https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
  }






}
