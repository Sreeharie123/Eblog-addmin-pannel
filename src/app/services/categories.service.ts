import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  saveData(data: any, formdata: any) {
    this.firestore
      .collection('categories')
      .add(data)
      .then((docRef) => {
        this.toastr.success('Data insert Successfully ..!');
        formdata.reset();
      })
      .catch((err) => {
        this.toastr.success(err.message);
      });
  }

  logdata() {
    return this.firestore
      .collection('categories')
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

  updateData(id: any, editedData: any) {
    this.firestore
      .doc(`categories/${id}`)
      .update(editedData)
      .then((docref) => {
        this.toastr.success('Data updated Successfully ..!');
        console.log(docref);
      });
  }

  deleteData(id: string) {
    this.firestore
      .doc(`categories/${id}`)
      .delete()
      .then((docref) => {
        this.toastr.success('Data deleted Successfully ..!');
      });
  }
}
