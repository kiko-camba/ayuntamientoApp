import { Component , OnInit} from '@angular/core';
import Supplier from '../../models/Suppliers';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators }  from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-lookup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './lookup.component.html',
  styleUrl: './lookup.component.css'
})
export class LookupComponent implements OnInit {

  getSupplierCif!: string;
  errorMessage: string = '';

  lookUpForm!: FormGroup;
   cif!: FormControl;


   constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
   ){}

   ngOnInit(): void {
    this.cif = new FormControl('', [Validators.required, Validators.maxLength(8)]);

    this.lookUpForm = new FormGroup ({
      cif: this.cif

    })
    this.getSupplierCif = this.route.snapshot.params['cif'];
   }
   getSupplier(): void {
    this.lookUpForm.markAllAsTouched();
    if (this.lookUpForm.invalid) {
      this.errorMessage = 'CIF requerido'
      return;
    }

    const getSupplierCif: string = this.lookUpForm.get('cif')?.value;
    console.log(this.lookUpForm.value);

    this.supplierService.getSupplier(getSupplierCif).subscribe({

      next: (result) => {
        if (result?.supplierFounded) {
          console.log('Proveedor encontrado:', result.supplierFounded);
          this.router.navigate(['/suppliers', getSupplierCif]);
        }else {
          console.log(' no existe')
          this.errorMessage = 'El proveedor no existe'
          this.cdr.detectChanges();
        
        }
     
      },
      error: (error) => {
        console.error('Error al obtener el proveedor:', error);
        this.errorMessage = 'Ocurrió un error al buscar el proveedor.'; 
      }
    });
  }
  clearErrorMessage() {
  
    this.errorMessage = '';
    this.lookUpForm.markAllAsTouched();
    
  }
   
  
}