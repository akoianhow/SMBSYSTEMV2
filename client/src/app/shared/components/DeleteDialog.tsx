import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'


type Props = {
    handleCancel: () => void
    handleDelete: () => void
    message: string
    open: boolean
}
export default function DeleteDialog({handleCancel, handleDelete, message, open}:Props) {
  return (
   <>
    <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{' '}
            <strong>{message}</strong>?
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
