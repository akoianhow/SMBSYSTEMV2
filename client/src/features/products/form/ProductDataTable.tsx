import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useProducts } from '../../../lib/hooks/useProducts';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type {ProductDTO } from '../../../lib/types';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import DeleteDialog from '../../../app/shared/components/DeleteDialog';


export default function ProductDataTable() {

const [open, setOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null);
const navigate = useNavigate()
    
const {products, deleteProduct} = useProducts();

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'cost', headerName: 'Cost', width: 100 },
  { field: 'srp', headerName: 'SRP', width: 100 },
  { field: 'itemsInStock', headerName: 'In Stock', width: 100 },
  { field: 'categoryName', headerName: 'Category', width: 200},
  { field: 'supplierName', headerName: 'Supplier', width: 200},
  { field: 'edit', headerName: 'Edit', width: 80, sortable: false, filterable: false,
    renderCell: (params) => (
      <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
        <EditIcon />
      </IconButton>
    ),
  },
  // 🗑️ Delete button column
  {
    field: 'delete', headerName: 'Delete', width: 80, sortable: false, filterable: false,
    renderCell: (params) => (
      <IconButton color="error" size="small" onClick={() => confirmDelete(params.row)} >
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 10 };


const confirmDelete = (row: ProductDTO) => {
    setSelectedProduct(row);
    setOpen(true);
  };

  const handleDelete = () => {
    if(selectedProduct !== null)
    {
    deleteProduct.mutate(selectedProduct?.id);
    setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
const handleEdit = (row: ProductDTO) => {
  setSelectedProduct(row);
     if(selectedProduct !== null){
    navigate(`/editProduct/${selectedProduct.id}`);}
}

  return (
    <>
    <Button color='primary' component={Link} to ='/createProduct'>Add New Product</Button>
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid rows={products} columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>

    <DeleteDialog handleCancel={handleCancel} handleDelete={handleDelete}
                  message={selectedProduct?.name} open={open}/>

       </>
  );
}
