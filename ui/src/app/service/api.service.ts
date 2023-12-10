import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = "http://localhost:8080";
  }

  postContact(data : any){
    return this.http.post<any>(`${this._baseUrl}/api/Contacts`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getContacts(){
    return this.http.get<any>(`${this._baseUrl}/api/Contacts`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateContact(data : any, id : number){
    return this.http.put<any>(`${this._baseUrl}/api/Contacts/`+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

 deleteContact(id : number){
    return this.http.delete<any>(`${this._baseUrl}/api/Contacts/` + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
