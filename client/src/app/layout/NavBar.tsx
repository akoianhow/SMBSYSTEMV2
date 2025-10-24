import { AddShoppingCart } from "@mui/icons-material";
import { Observer } from 'mobx-react-lite';
import { AppBar, Box, Button, Container,Menu, MenuItem, Toolbar,Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router";
import { useStore } from "../../lib/hooks/useStore";

export default function NavBar() {
  const {cart} = useStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [anchorElFile, setAnchorElFile] = useState(null);
  const [anchorElReports, setAnchorElReports] = useState(null);
  const [anchorElFileMaintenance, setAnchorElFileMaintenance] = useState(null);

  const [selectedForm, setSelectedForm] = useState('');

  const handleOpen = (setter:React.Dispatch<null>) => (event) => setter(event.currentTarget);
  const handleClose = (setter: React.Dispatch<null>) => () => setter(null);

  const handleSelect = (formName: string) => {
    switch (formName.toLowerCase()) {
      case 'products':
        navigate('/products');
        break;
      case 'categories':
        navigate('/categories');
        break;     
      case 'suppliers':
        navigate('/suppliers');
        break;
    }
    setSelectedForm(formName);
    setAnchorElFile(null);
    setAnchorElReports(null);
    setAnchorElFileMaintenance(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
          backgroundImage: "linear-gradient(135deg, #000000ab, #000000ab, #000000ab, 69%, #530000ff )",}}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
             <Typography variant="h6" sx={{ flexGrow: 1 }}>Menu System</Typography>

          <Button color="inherit" onClick={handleOpen(setAnchorElFile)}>FILE</Button>
          <Menu anchorEl={anchorElFile} open={Boolean(anchorElFile)} onClose={handleClose(setAnchorElFile)}>
            <MenuItem onClick={() => handleSelect('Supplier')}>Supplier</MenuItem>
            <MenuItem onClick={() => handleSelect('Customer')}>Customer</MenuItem>
          </Menu>

          <Button color="inherit" onClick={handleOpen(setAnchorElReports)}>REPORTS</Button>
          <Menu anchorEl={anchorElReports} open={Boolean(anchorElReports)} onClose={handleClose(setAnchorElReports)}>
            <MenuItem onClick={() => handleSelect('Sales')}>Sales</MenuItem>
            <MenuItem onClick={() => handleSelect('Reports')}>Reports</MenuItem>
          </Menu>

          <Button color="inherit" onClick={handleOpen(setAnchorElFileMaintenance)}>FILE MAINTENANCE</Button>
          <Menu anchorEl={anchorElFileMaintenance} open={Boolean(anchorElFileMaintenance)} onClose={handleClose(setAnchorElFileMaintenance)}>
            <MenuItem onClick={() => handleSelect('Products')}>Products</MenuItem>
            <MenuItem onClick={() => handleSelect('Suppliers')}>Suppliers</MenuItem>
            <MenuItem onClick={() => handleSelect('Categories')}>Categories</MenuItem>
          </Menu>
            <Button size="large" variant="contained">
              Login
            </Button>
            <Observer>
              {()=> (
                <>
                <Box display='flex'>
                   <AddShoppingCart/>
                  <Typography> ({cart.cartItems.length}) items</Typography>
                </Box>
                </>
              )}
            </Observer>
          </Toolbar>
        </Container>
        <Box></Box>
      </AppBar>
    </Box>
  );
}
