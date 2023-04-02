import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService:AuthService){}

ngOnInit(): void {


}

onSubmit(data:NgForm){
  const email=data.value.email
  const password=data.value.password
  console.log(email)
  console.log(password)
  this.authService.signUp(email,password)
  data.reset()
}

}
