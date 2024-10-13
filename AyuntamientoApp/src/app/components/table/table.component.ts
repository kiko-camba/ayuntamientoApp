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

  isModalVisible = false; // Controla la visibilidad del modal
  cifToDelete!: string  // Guarda el CIF del proveedor a eliminar

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
    this.cifToDelete = cif; // Guardar el CIF del proveedor a eliminar
    this.isModalVisible = true; // Mostrar el modal
  }

  confirmDelete(cif: string) {
    if (cif) {
      this.supplierService.deleteSupplier(cif).subscribe({
        next: (result) => {
          console.log(result);
          this.successMessage = 'Proveedor eliminado'; // Mensaje de éxito
          this.data = this.data.filter((u) => u.cif !== cif); // Filtrar el proveedor eliminado
          this.closeModal(); // Cerrar el modal
        },
        error: (err) => {
          console.error('Error al eliminar el proveedor:', err);
          this.errorMessage = 'Error al eliminar el proveedor'; // Mensaje de error
        }
      });
    }
  }

  closeModal() {
    this.isModalVisible = false; // Ocultar el modal
  }
}


