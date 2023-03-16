import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AuthenticationGuard } from './Guard/authentication.guard';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {path:'',component:DashbordComponent,canActivate:[AuthenticationGuard]},
  {path:'login',component:LoginComponent},
  {path:'category',component:CategoriesComponent,canActivate:[AuthenticationGuard]},

  {path:"post",component:AllPostComponent,canActivate:[AuthenticationGuard]},
  {path:"post/new",component:NewPostComponent,canActivate:[AuthenticationGuard]},
  {path:"signUp",component:SignUpComponent},


  {path:"subscribers",component:SubscribersComponent,canActivate:[AuthenticationGuard]},
  {path:"**",redirectTo:"login",pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
