import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Adding http client And adding public apis her in each method::
  constructor(private http :HttpClient) { }
  private baseUrl:string ="https://localhost:7125/api/User/"
  //signup Api service 
  signup(user:any):Observable<any>{
    const url = `${this.baseUrl}register`;
    return this.http.post<any>(url, user);
 
  }
  //login api service 
  login(usser:any):Observable<any>{
    const url = `${this.baseUrl}authenticate`;
    return this.http.post<any>(url, usser);
  // return this.http.post<any>(`${this.baseUrl}regristration`,user)
  }
  

 

//It is a public Api From internet:
// This is the public Api link for the header to the top treanding crunnecy...
  getTrendingCrunnecy(crunnecy:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${crunnecy}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h
  }`)}
 getCurrency(currency:string)
 {
   return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
 }
//it is private api for coin details :
  getCrunnecy(crunnecy:string){
return this.http.get<any>(`https://localhost:7125/api/Coin`);

   }
   // its related to UserDashbord 

   private apiurl='https://localhost:7125/api/User';

   getuser(userId:number)
  {
    return this.http.get<any>(`https://localhost:7125/api/User`)
  }


  //Crud operations private api link 
   addCoin(data:any):Observable<any>{
     //this is return observable 
     return this.http.post('https://localhost:7125/api/Coin',data)
   }
   deleteCoin(id:number):Observable<any>
   {
      return this.http.delete('https://localhost:7125/api/Coin/'+id)
   }
  
  //  openEditCoinForm(id:number):Observable<any>
  //  {
  //    return this.http('https://localhost:7125/api/Coin/${id}')
  //  }
  getGraphicalCureencyData(coinId:string,currency:string,days:string){
    return this.http.get<any>(`htttps://api.coingecko.com/api/v3/coins/${coinId}/market_chartvs_currency=${currency}&days=${days}`)
  }
  getCurrencyById(coinId:String)
  {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  }
  
///these api is for Price

 private apiUrl = 'https://localhost:7125/api/Price';


  getPrices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPrice(price: any): Observable<any> {
    return this.http.post('https://localhost:7125/api/Price',price)
   
  }

  updatePrice(id: number, price: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, price);
  }

  deletePrice(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  private traapiUrl = 'https://localhost:7125/api/Transaction';


  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.traapiUrl);
  }

  createTransactions(transaction: any): Observable<any> {
    return this.http.post('https://localhost:7125/api/Transaction',transaction)
   
  }


  // deleteTransactions(id:number):Observable<any>
  //  {
  //     return this.http.delete('https://localhost:7125/api/Transaction/'+id)
  //  }

  updateTransaction(id: number, transaction: any): Observable<any> {
    const url = `${this.traapiUrl}/${id}`;
    return this.http.put<any>(url, transaction);
  }


  deleteTransactions(id: number): Observable<any> {
    const url = `${this.traapiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  // deleteTransactions(id:number):Observable<any>
  //  {
  //     return this.http.delete('https://localhost:7125/api/Transaction'+id)
  //  }

   
 // wallet api 
  private walletapiUrl = 'https://localhost:7125/api/Wallet';



  getWallets(): Observable<any[]> {
    return this.http.get<any[]>(this.walletapiUrl);
  }

  createWallet(wallet: any): Observable<any> {
    return this.http.post('https://localhost:7125/api/Wallet',wallet)
   
  }

  deleteWallet(id:number):Observable<any>
   {
      return this.http.delete('https://localhost:7125/api/Wallet/'+id)
   }

  // deleteWallet(id: number): Observable<any> {
  //   const url = `${this.walletapiUrl}/${id}`;
  //   return this.http.delete<any>(url);
  // }

  // updateWallet(id: number, wallet: any): Observable<any> {
  //   const url = `${this.walletapiUrl}/${id}`;
  //    return this.http.put<any>(url,wallet);
  //  }

  updateWallet(id: number, wallet: any): Observable<any> {
    const url = `${this.walletapiUrl}/${id}`;
    return this.http.put<any>(url, wallet);
  }
//  usertransactionapi='https://localhost:7125/api/User/${userId}/transaction/wallet'

//   getuserwithTransactionsandwallets (): Observable<any> {
//     const url= `$ {this.usertransactionapi}/users?include=transactions.wallets `;
//     return this.http.get(url);
    
    // return this.http.get<any[]>(this.usertransactionapi);
  // }
  //   apiUrl1=''
  // getUserTransactions(userId:number):Observable<UserTransaction[]>{
  //   const url= `${this.apiUrl1}/${userId}`;
  // }

  private api = 'https://localhost:7125/api/User';
  getUsersWithTransactionsAndWallets() {
    // return this.http.get<any[]>(`${this.apiUrl}/GetUsersWithTransactionsAndWallets`);
    return this.http.get<any[]>(this.api);
  }
  
}





