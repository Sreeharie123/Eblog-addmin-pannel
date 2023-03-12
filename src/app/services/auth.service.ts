import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)

  isLoggedInGuard:boolean=false

  constructor(private afAuth:AngularFireAuth,private tostr:ToastrService,private router:Router) { }

  login(email:string,password:string){

    this.afAuth.signInWithEmailAndPassword(email,password).then((logRef)=>{
          this.tostr.success("login Successfully")
          this.loadUser();
          this.loggedIn.next(true);
          this.isLoggedInGuard=true
          this.router.navigate(['/'])
    }).catch((e)=>{
         this.tostr.warning(e)
    })

   }

loadUser(){

  this.afAuth.authState.subscribe((user)=>{

    localStorage.setItem("User",JSON.stringify(user))
  })

}

logOut(){
  this.afAuth.signOut().then(()=>{
   this.tostr.success("Logout Successfully")
   localStorage.removeItem("User")
   this.loggedIn.next(false);
   this.isLoggedInGuard=false
   this.router.navigate(['/login'])
  })
}

isLoggedIn(){
 return this.loggedIn.asObservable()
}

}
