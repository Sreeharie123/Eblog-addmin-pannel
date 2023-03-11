import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoriesService) {}

  categoryArray?: any;
  formCategory?: string;
  formStatus: string = 'Add';
  formId?: string;

  ngOnInit(): void {
    this.categoryService.logdata().subscribe((data) => {
      this.categoryArray = data;
      console.log(this.categoryArray);
    });
  }

  close() {
    location.reload();
  }

  onSubmit(formdata: any) {
    const categorydata: Category = {
      category: formdata.value.category,
    };

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categorydata, formdata);
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.formId, categorydata);
      formdata.reset();
      this.formStatus = 'Add';
    }
  }

  onEdit(value: string, id: string) {
    this.formCategory = value;
    this.formStatus = 'Edit';
    this.formId = id;
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}

// const subCategorydata = {
//   subCategory: 'subCategory1',
// };

// this.firestore.collection('categories').add(categorydata).then((docRef) => {
//   console.log(docRef);

//   // this.firestore.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategorydata)
//     this.firestore.collection('categories').doc(docRef.id).collection('subcategories').add(subCategorydata).then(docref1=>{
//       console.log(docref1)
//     //  this.firestore.doc(`categories/${docRef.id}/subcategories/${docref1.id}`).collection("subsubcategory ").add(subCategorydata ).then(docref2=>{
//     //   console.log(docref2)
//     // })
//     this.firestore.collection('categories').doc(docRef.id).collection('subcategories').doc(docref1.id).collection('subsubcategories').add(subCategorydata).then((docRef2)=>{
//       console.log("Second level subcategory saved successfully")
//     })
//     // this.firestore.doc(`categories/${docRef.id}/subcategories/${docref1.id}/subsubcategory`).collection("subsubcategory ").add(subCategorydata ).then(docref2=>{
//     //   console.log(docref2)
//     // })

//     });

//   }).catch((err) => {
//     console.log(err);
//   });
