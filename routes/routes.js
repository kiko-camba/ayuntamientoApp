import express from 'express';
import supplierController from '../controllers/routes.controllers';
import cors from 'cors';
 

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', supplierController.getSuppliers);
app.get('/:cif', supplierController.getSupplier);
app.post('/register', supplierController.createSupplier);
app.put('/:id', supplierController.editSupplier);
app.delete('/:id', supplierController.deleteSupplier);


export default app