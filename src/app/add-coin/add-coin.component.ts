import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-coin',
  templateUrl: './add-coin.component.html',
  styleUrls: ['./add-coin.component.css']
})
export class AddCoinComponent implements OnInit {

 addCoinRequest:any ={
   id:'',
   name:'',
   symbol:'',
   marketCap:'',
   volume24h:'',
   change24h:''
 };
 constructor(){

 }
 ngOnInit(): void {
   
 }
 addCoin(){
   console.log(this.addCoinRequest);
 }
}
