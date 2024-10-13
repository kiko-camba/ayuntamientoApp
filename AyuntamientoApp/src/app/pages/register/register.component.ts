import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FormComponent } from "../../components/form/form.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SupplierService } from '../../services/supplier.service';
import { Observable } from 'rxjs';
import Supplier from '../../models/Suppliers';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FormComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  suppliers$: Observable<Supplier[]>

  constructor( private supplierService: SupplierService){
    this.suppliers$ = this.supplierService.getSuppliers()
    
  }
}
