import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


trueelement:boolean=false

// @Output()visible=new EventEmitter()


// additem(element:boolean){
// this.trueelement=!element
//  this.visible.emit(this.trueelement)
// }

constructor(private authService:AuthService){


}

userEmail?:string;
isLoggedIn$?:Observable<boolean>



element(value:boolean){
  this.trueelement=!value
}



ngOnInit(){

  this.userEmail = JSON.parse(localStorage.getItem('User')||'{}').email

  // this.authService.isLoggedIn().subscribe((data)=>{
  //  this.isLoggedIn$=data

  // })

  //or

  this.isLoggedIn$=this.authService.isLoggedIn()

}

logOut(trueelement:boolean){
  this.authService.logOut()
  this.trueelement=trueelement

}

}
