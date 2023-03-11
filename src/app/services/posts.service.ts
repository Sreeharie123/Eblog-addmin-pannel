import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage:AngularFireStorage,private toastr: ToastrService,private afs:AngularFirestore,private router:Router) { }


  //uploadeimage to cloud firestore
  uploadImage(selectedImage:any,postData:any,formStaus:string,id:any){
    const filePath=`postIMG/${Date.now()}`
    this.storage.upload(filePath,selectedImage).then(()=>{

      this.storage.ref(filePath).getDownloadURL().subscribe((URL)=>{
            postData.postImgPath=URL

       if(formStaus=="Edit"){

        this.updateData(id,postData)

         }else{

           this.saveData(postData)

         }

          })
    })



  }

  saveData(postData:Post){
    this.afs.collection('/posts').add(postData).then((docRef)=>{
      this.toastr.success("Data insert successuflly");
      this.router.navigate(['/post']);

    })
  }


  logdata() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }


 loadOneData(id:any){
     return this.afs.collection('posts').doc(id).valueChanges()
    //or
    // return this.afs.doc(`posts/${id}`).valueChanges()
 }

//updated the data

 updateData(id:any,postData:any){
  this.afs.doc(`posts/${id}`).update(postData).then(()=>{
          this.toastr.success("Data Updated Successfully")
          this.router.navigate(['/post']);
  })

 }

 deleteIMG(postImgPath:any,id:string){

this.storage.storage.refFromURL(postImgPath).delete().then(()=>{

  this.deleteData(id)

})

 }


 deleteData(id:string){

  this.afs.doc(`posts/${id}`).delete().then(()=>{

    this.toastr.warning("Data Deletted ..!");;
  })

 }


 markFeatured(id:string,featuredData:any){

  this.afs.doc(`posts/${id}`).update(featuredData).then(()=>{
    this.toastr.info('Featured Status updated')
  })

 }

}
