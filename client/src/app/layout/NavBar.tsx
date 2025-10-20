import { AddShoppingCart } from "@mui/icons-material";
import { Observer } from 'mobx-react-lite';
import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";

export default function NavBar() {
  const {cart} = useStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCreate = () => {
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #000000ab, #000000ab, #000000ab, 69%, #530000ff )",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
            <Box>
              <MenuItem component={NavLink} to="/" sx={{ display: "flex", gap: 2 }}>
                <AddShoppingCart fontSize="large" />
                <Typography  variant="h4" fontWeight="bold">
                  SMBS
                </Typography>
              </MenuItem>
            </Box>

            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/">
                Home
              </MenuItemLink>
              <MenuItemLink to='/'>
                SALES
              </MenuItemLink>
              <MenuItem sx={{ fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "bold",}}>
                Purchases
              </MenuItem>
              <Button id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                INVENTORY
              </Button>
              <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <MenuItem onClick={handleClose} component={NavLink} to='/products'>Product List</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to="/createProduct">
                  Create Product
                </MenuItem>
                <MenuItem onClick={handleClose}>Reports</MenuItem>
              </Menu>

            </Box>
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
