import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Supplier from '../models/Suppliers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

   URL_API = "http://localhost:3000"

  
  constructor(private httpClient: HttpClient) { }



  getSuppliers(): Observable<Supplier[]>{
    return  this.httpClient.get<{suppliersFounded: Supplier[]}>(this.URL_API)
    .pipe(
      map(response => response.suppliersFounded)  
    );
    
  }
  getSupplier(cif: string): Observable<{supplierFounded: Supplier}>{
     return this.httpClient.get<{supplierFounded: Supplier}>(this.URL_API + '/suppliers/' + cif)
      .pipe(catchError((error: HttpErrorResponse) => {
     
      console.error('Error al obtener el proveedor:', error);
     
      return of({ supplierFounded: null as unknown as Supplier });  
  }))
    
 
    

  }
  addSupplier(newSupplier: Supplier): Observable<{ supplierSaved: Supplier }> {
   
    return this.httpClient.post<{supplierSaved: Supplier}>(this.URL_API + '/register', newSupplier)
  
  }
  updateSupplier(cif: string, supplierUpdate: Supplier): Observable<any> {
    return this.httpClient.put(this.URL_API + '/suppliers/' + cif, supplierUpdate)
  }
  deleteSupplier(cif: string): Observable<{supplierDeleted: Supplier}>{
    return this.httpClient.delete<{supplierDeleted: Supplier}>(this.URL_API + '/suppliers/' + cif )
    
  }
}

