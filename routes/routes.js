import express from 'express';
import  supplierController  from '../controllers/routes.controllers.js';
import cors from 'cors';
 

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', supplierController.getSuppliers);
app.get('/suppliers/:cif', supplierController.getSupplier);
app.post('/register', supplierController.createSupplier);
app.put('/suppliers/:cif', supplierController.editSupplier);
app.delete('/suppliers/:cif', supplierController.deleteSupplier);


export default app