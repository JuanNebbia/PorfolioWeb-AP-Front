import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Informacion } from '../models/informacion';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getInformacion():Observable<Informacion[]>{
    return this.http.get<Informacion[]>(`${this.apiServerUrl}/informacion/all`);
  }

  public addInformacion(informacion:Informacion):Observable<Informacion>{
    return this.http.post<Informacion>(`${this.apiServerUrl}/informacion/add`, informacion);
  }

  public updateInformacion(informacion:Informacion): Observable<Informacion>{
    return this.http.put<Informacion>(`${this.apiServerUrl}/informacion/update`, informacion);
  }

  public deleteInformacion(informacionId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/informacion/delete/${informacionId}`);
  }
}