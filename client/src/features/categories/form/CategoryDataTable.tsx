import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useCategories } from '../../../lib/hooks/useCategories';
import type { Category } from '../../../lib/types';
import { Link, useNavigate } from 'react-router';
export default function CategoryDataTable() {

const {categories, deleteCategory} = useCategories();
const [open, setOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
const navigate = useNavigate();
const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', width: 300},
    {field: 'description', headerName: 'Description', width: 300},
     { field: 'edit', headerName: 'Edit', width: 80, sortable: false, filterable: false,
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

const paginationModel = { page: 0, pageSize: 10 };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteCategory.mutate(selectedCategory.id);
      setOpen(false);
    }
  };
const confirmDelete = (row: Category) => {
    setSelectedCategory(row);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setSelectedCategory(null);
  };
const handleEdit = (row: Category) => {
  setSelectedCategory(row);
  navigate(`/editCategory/${row.id}`);
}
  return (
    <>
        <Button color='primary' component={Link} to ='/createCategory'>Add New Category</Button>
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={categories}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{' '}
            <strong>{selectedCategory?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
