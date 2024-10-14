import { Component, OnInit, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import Supplier from '../../models/Suppliers';
import { LookupComponent } from "../lookup/lookup.component"; 





@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule, LookupComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  
  data: Supplier[] = [];
  errorMessage: string = ''
  successMessage: string = ''

  isModalVisible = false; 
  cifToDelete!: string 

  constructor(
    private supplierService:  SupplierService,
  
   
  ){}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (result) => {  
        this.data = result;
       
       
      },
      error: (err) => {
        console.error('Error al obtener los proveedores:', err);  
      },
     
    });
  }
 
  delete(cif: string) {
    this.cifToDelete = cif; 
    this.isModalVisible = true; 
  }

  confirmDelete(cif: string) {
    if (cif) {
      this.supplierService.deleteSupplier(cif).subscribe({
        next: (result) => {
          console.log(result);
          this.successMessage = 'Proveedor eliminado'; 
          this.data = this.data.filter((u) => u.cif !== cif); 
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al eliminar el proveedor:', err);
          this.errorMessage = 'Error al eliminar el proveedor';
        }
      });
    }
  }

  closeModal() {
    this.isModalVisible = false; 
  }
}


