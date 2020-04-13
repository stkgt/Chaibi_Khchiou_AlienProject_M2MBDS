import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cas } from './models/cas.model';

@Injectable({
  providedIn: 'root'
})
export class CasService {

  constructor(private http: HttpClient) {}

  private baseUrl = "http://localhost:8080/api/cas";

  // Renvoie les 10 premiers cas
  getCas(): Promise<any> {
    // on va chercher par GET les info en base
    return this.http.get(this.baseUrl).toPromise();
  }
  
  // Requête avec pagination, et le nombre de cas par page
  getCasByPageAndSize(page:number, pageSize:number): Promise<any> {
    // on va chercher par GET les info en base
    return this.http.get(this.baseUrl+"?page="+page+"&pagesize="+pageSize).toPromise();
  }
  
  
  // Requête avec pagination, on indique la page (par defaut: 10 cas par page)
  getCasDetails(casNumber:number): Promise<any> {
    // on va chercher par GET les info en base
    return this.http.get(this.baseUrl+"/"+casNumber).toPromise();
  }

  // Requête de suppression d'un cas
  deleteCas(id:string) : Promise<any>{
    // on envoie un requete delete pour supprimer
    return this.http.delete(this.baseUrl+"/"+id).toPromise();
  }

  updateCas(cas:Cas) : Promise<any>{
    return this.http.put(this.baseUrl+"/"+cas.id_cas, cas).toPromise();
  }

  insertCas(cas:Cas) : Promise<any>{
    return this.http.post(this.baseUrl, cas).toPromise();
  }

}
