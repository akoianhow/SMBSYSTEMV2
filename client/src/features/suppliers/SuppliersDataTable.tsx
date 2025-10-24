import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Paper, } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSuppliers } from '../../lib/hooks/useSuppliers';
import type { Supplier } from '../../lib/types';
import { useState } from 'react';
import DeleteDialog from '../../app/shared/components/DeleteDialog';
import { Link, useNavigate } from 'react-router';



export default function SuppliersDataTable() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {suppliers} = useSuppliers();
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', width: 300},
    {field: 'edit', headerName: 'Edit', width: 80, sortable: false, filterable: false,
    renderCell: (params) => (
      <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
        <EditIcon />
      </IconButton>
    ),
    },
    {
    field: 'delete', headerName: 'Delete', width: 80, sortable: false, filterable: false,
    renderCell: (params) => (
      <IconButton color="error" size="small" onClick={() => confirmDelete(params.row)}>
        <DeleteIcon />
      </IconButton>
    ),
  },
]

const confirmDelete = (row: Supplier) => {
    setSelectedSupplier(row);
    setOpen(true);
}
const handleDelete = ()=> {
    if(selectedSupplier !== null) {
        //deleteSupplier
        console.log("delete ");
        setOpen(false);
    }
}
const handleCancel = () => {
    setOpen(false);
    setSelectedSupplier(null);
}

const handleEdit = (row:Supplier) => {
    setSelectedSupplier(row);
    if(selectedSupplier !== null) {
        navigate(`/editSupplier/${selectedSupplier?.id}`)
        
    }
}


const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
    <Button component={Link} to='/createSupplier'>Create New Supplier</Button>
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={suppliers}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>

     <DeleteDialog handleCancel={handleCancel} handleDelete={handleDelete}
                     message={selectedSupplier?.name} open={open}/>
    </>
  )
}
    