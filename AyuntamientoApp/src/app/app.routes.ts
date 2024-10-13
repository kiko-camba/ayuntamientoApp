import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'suppliers', component: SupplierListComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'suppliers/:cif', component: RegisterComponent }
    
];
