import React, { useState } from "react";
import { useLanguage } from "../LanguageContext/LanguageContext.tsx";
import { Home, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar,
         Toolbar,
         Stack,
         IconButton,
         Box, 
         Typography,
         Switch,
         Button, 
         Menu,
         MenuItem,
         Link,
         styled} from "@mui/material";

const Text = styled(Typography)({
    fontWeight: "bold",
    color: "white"
})

const LinkBtn = styled(Button)({
    variant: "text",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem"
})


 export const Navbar: React.FC    = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const { isSpanish, toggleLanguage } = useLanguage();
    

    const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    return (
        <AppBar position="static">
            <Toolbar>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton component={Link} href="/">
                            <Home sx={{ color: "white" }} />
                        </IconButton>
                        <Text>Sparr Truck Parts</Text>
                        <Switch checked={isSpanish} onChange={toggleLanguage} />
                        <Text>{isSpanish ? "Spanish" : "English"}</Text>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}>

                        <Box sx={{
                            display: { xs: "none", sm: "flex" }, // responsive display
                            gap: 2,
                        }}>

                            <LinkBtn>{isSpanish ? "Inventario"  : "Inventory"}</LinkBtn>
                            <LinkBtn>{isSpanish ? "Contacto"    : "Contact"}</LinkBtn>
                            <LinkBtn>{isSpanish ? "Informacion" : "About"}</LinkBtn>
                        </Box>
                        <IconButton onClick={handleMenuClick}>
                            <MenuIcon 
                                aria-haspopup={true}
                                aria-expanded={open ? true : undefined}
                                aria-controls={open ? "hamburgerMenu" : undefined}
                                sx={{
                                display: {
                                    sm: "none"
                                },
                                color: "white"
                            }}/>
                        </IconButton>
                        <Menu
                            id='hamburgerMenu'
                            MenuListProps={{
                                'aria-labelledby': 'hamburgerMenu'
                            }}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            onClose={handleClose} 
                            open={open}>

                            <MenuItem component={Link} href='/inventory'>
                                {isSpanish ? "Inventario" : "Inventory"}
                            </MenuItem>

                            <MenuItem component={Link} href='/contact'>
                                {isSpanish ? "Contacto" : "Contact"}
                            </MenuItem>
                            
                            <MenuItem component={Link} href='/about'>
                                {isSpanish ? "Informacion" : "About"}
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
 }