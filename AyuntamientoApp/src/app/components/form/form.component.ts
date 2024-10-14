import { Component, OnInit } from '@angular/core';
import Supplier from '../../models/Suppliers';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators }  from '@angular/forms'
import { SupplierService } from '../../services/supplier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  updateSupplierCif!: string 

  supplierForm!: FormGroup;
  cif!: FormControl;
  name!: FormControl;
  email!: FormControl;
  activity!: FormControl;
  address!: FormControl;
  location!: FormControl;
  postalCode!: FormControl;
  telephoneNumber!: FormControl;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
   

    this.cif = new FormControl('', [Validators.required, Validators.maxLength(8)]);
    this.name = new FormControl('', Validators.required);
    this.email = new  FormControl('', [Validators.required, Validators.email])
    this.activity = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.postalCode = new FormControl('', [Validators.required, Validators.min(1001)  ,Validators.max(52100)]);
    this.telephoneNumber = new FormControl('', [Validators.required, Validators.maxLength(9)]);

    this.supplierForm = new FormGroup({
      cif: this.cif,
      name: this.name,
      email: this.email,
      activity: this.activity,
      address: this.address,
      location: this.location,
      postalCode: this.postalCode,
      telephoneNumber: this.telephoneNumber,
    });

    this.updateSupplierCif = this.route.snapshot.params['cif'];
    if(this.updateSupplierCif){
      this.cif.disable()
    }
    
    if(this.updateSupplierCif){
      this.supplierService.getSupplier(this.updateSupplierCif).subscribe( (result) =>{
        console.log(result)
        if (result) {
          this.supplierForm.patchValue(result.supplierFounded);
        }
      })
    }
    
    
   
  }
  addSupplier(){
    if(this.supplierForm.invalid){
      alert('Es obligatorio rellenar todos los campos correctamente');
      return
    }

  }
  handleSubmit(){
    
    this.supplierForm.markAllAsTouched();

    if(this.supplierForm.invalid){
    this.errorMessage = 'Es obligatorio rellenar todos los campos'
      return
    }
   this.errorMessage = '';
  

    if(this.updateSupplierCif){
      this.updateSupplier()
    }else{
      const newSupplier: Supplier = this.supplierForm.value;

      this.supplierService.addSupplier(newSupplier).subscribe({
        next: () => {
          this.successMessage = 'Proveedor añadido correctamente';
          this.errorMessage = '';
          this.supplierForm.reset();
        },
        error: (error) => {
          console.error('Error al añadir el proveedor:', error);
          this.errorMessage = 'Error al añadir el proveedor.';
        }
      });
    
    }
  
 
  }
  updateSupplier(){
    if(this.supplierForm.invalid){
      this.errorMessage ='Es obligatorio rellenar todos los campos correctamente';
      return
    }
    const updateSupplier: Supplier = this.supplierForm.value;
    console.log(this.supplierForm.value)
    this.supplierService.updateSupplier(this.updateSupplierCif, updateSupplier).subscribe({
      next: ()=>{
        this.successMessage = 'Proveedor editado correctamente';
       
       }
    })
  }
  clearErrorMessage() {
  
     this.errorMessage = '';
     this.supplierForm.markAsUntouched();
    

}


}
