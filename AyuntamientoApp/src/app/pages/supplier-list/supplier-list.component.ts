import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TableComponent } from "../../components/table/table.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SupplierService } from '../../services/supplier.service';

import { Observable } from 'rxjs';
import Supplier from '../../models/Suppliers';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, TableComponent, FooterComponent],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent {
  
  suppliers$: Observable<Supplier[]>

constructor( private supplierService: SupplierService){
  this.suppliers$ = this.supplierService.getSuppliers()
  
  
}
}
