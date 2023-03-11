import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

const routes: Routes = [
  {path:'',component:DashbordComponent},
  {path:'login',component:LoginComponent},
  {path:'category',component:CategoriesComponent},

  {path:"post",component:AllPostComponent},
  {path:"post/new",component:NewPostComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
