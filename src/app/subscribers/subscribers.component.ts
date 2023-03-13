import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {

subscribersArray:any
  constructor(private subscribersService:SubscribersService){}


  ngOnInit(): void {


    this.subscribersService.logdata().subscribe((value)=>{

         this.subscribersArray=value
    })
  }

Ondelete(id:string){

  this.subscribersService.deleteData(id)

}

}
