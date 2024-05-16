
import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {MenuButton} from "../MenuButton";
import Switch from "@mui/material/Switch";

type AppBarHeaderType = {
    changeModeHandler: ()=> void
}
export const AppBarHeader = (props: AppBarHeaderType) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <MenuButton color="inherit">Login</MenuButton>
                    <MenuButton color="inherit">Logout</MenuButton>
                    <MenuButton color="inherit">Faq</MenuButton>
                    <Switch color={"default"} onChange={props.changeModeHandler}/>
                </Toolbar>
            </AppBar>
        </div>
    );
};