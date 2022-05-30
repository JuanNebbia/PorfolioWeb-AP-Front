import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Informacion } from '../models/informacion';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiServerUrl = "https://porfolio-web-ap.herokuapp.com"

  constructor(private http: HttpClient) { }

  public getInformacion():Observable<Informacion>{
    return this.http.get<Informacion>(`${this.apiServerUrl}/informacion/id/1`);
  }

  public updateInformacion(informacion: Informacion): Observable<Informacion>{
    return this.http.put<Informacion>(`${this.apiServerUrl}/informacion/update`, informacion);
  }
}
