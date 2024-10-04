import  { suppliers }  from '../models/models.js'

const supplierController = {}

supplierController.getSuppliers = async (req, res) =>{
    try{    
        const suppliersFounded = await suppliers.find()
        return res.status(200).json({
            message: 'ok',
            suppliersFounded
        })

    }catch(error){
        return res.status(500).json({
            message: 'Database error'
        })
    }

};
supplierController.createSupplier = async (req, res) => {
    try{
        const { cif, name, activity, address, location, postalCode, telephoneNumber   } = req.body
        if( !cif, !name, !activity, !address, !location, !postalCode, !telephoneNumber){
            return res.staturs(200).json({
                message: 'Deben completarse todos los campos'
            })
        }
        const supplierFounded = await suppliers.findOne({ cif });
        if(!supplierFounded){
            const supplierSaved = new suppliers({ cif, name, activity, address, location, postalCode, telephoneNumber})
            await supplierSaved.save()
            return res.status(200).json({
                message: 'Proveedor registrado'
            })

        }else{
            return res.status(200).json({
                message: 'El proveedor ya existe'
            })
        }

    }catch(error){
        return res.status(500).json({
            message: 'Batabase error'
        })
    }
};
supplierController.getSupplier = async (req, res) => {
    try{
        const { cif } = req.body;
        if(!cif){
            return res.status(200).json({
                message: 'Debe completarse el campo'
            })
        }
        const supplierFounded = await suppliers.findOne({ cif });
        if(!supplierFounded){
            return res.status(200).json({
                message: 'El proveedor no existe'
            })
        }else{
            return res.status(200).json({
                message: 'ok',
                supplierFounded
            })
        }


    }catch(error){
        return res.status(500).json({
            message: 'Database error'
        })
    }
};
supplierController.editSupplier = async (req, res) => {
    try{
        const { cif, ...updateData} = req.body;
        if(!cif){
            return res.status(200).json({
                message: 'cif requerido'
            })
        };
        const supplierUpdate =  await suppliers.findOneAndUpdate({ cif }, updateData)
        if(!supplierUpdate){
            return res.status(200).json({
                message: 'Proveedor no encontrado'
            })
        }
       return res.status(200).json({
        message: 'Proveedor actualizado',
        supplierUpdate
       })

    }catch(error){
        return res.status(500).json({
            message: 'Database error'
        })

    }
};
supplierController.deleteSupplier = async (req, res) => {
    try{
        const { cif } = req.body;
        if(!cif){
            return res.status(200).json({
                message: 'cif requerido'
            });
        };
        const supplierToDelete = await suppliers.findOne({ cif });
        if(!supplierToDelete){
            return res.status(200).json({
                message: 'Proveedor no encontrado'
            });
        };
        const supplierDeleted = await suppliers.findOneAndDelete({ cif });
        if(!supplierDeleted.deletedCount === 0){
            return res.status(200).json({
                message: 'Proveedor no encontrado'
            });
        };
        return res.status(200).json({
            message: 'Proveedor eliminado',
            supplierDeleted: supplierToDelete
        })



    }catch(error){
        return res.status(500).json({
            message: 'Database error'
        })

    }
}

export default supplierController