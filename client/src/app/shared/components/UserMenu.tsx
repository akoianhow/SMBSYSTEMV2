import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { useAccount } from '../../../lib/hooks/useAccounts';
import { Link } from 'react-router';
import { Add, Logout, Person } from '@mui/icons-material';

export default function BasicMenu() {
  const {currentUser, logoutUser} = useAccount();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button 
            onClick={handleClick}
            color='inherit'
            size='large'
            sx={{fontSize: '1.1rem'}}>
        <Box display='flex' alignItems='center' gap={2}>
        <Avatar/>
        {currentUser?.displayName}
      </Box>
      </Button>
    
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem component={Link} to='/createProduct' onClick={handleClose}>
            <ListItemIcon>
                <Add />
                <ListItemText>Create Product</ListItemText>
            </ListItemIcon>
        </MenuItem>
        <MenuItem component={Link} to='/profile' onClick={handleClose}>
            <ListItemIcon>
                <Person />
                <ListItemText>My Profile</ListItemText>
            </ListItemIcon>
        </MenuItem>
       
        <Divider />
         <MenuItem  onClick={() => {
              logoutUser.mutate();
              handleClose();
         }} >
            <ListItemIcon>
                <Logout />
                <ListItemText>Logout</ListItemText>
            </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
}
