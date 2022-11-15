import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';
import React from "react";
import Lottie from "lottie-react";
import Animation404 from "../public/Animation404.json";
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

export default function page404() {
  return (
    <>
        <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", border: "1px"}}>
            <Grid item={true} xs={6} sm={6} md={5} lg={4}>
                <Lottie animationData={Animation404} />
                <p style={{padding: "1em"}}>Page not found.</p>
            </Grid>
        </Grid>
        <Grid container spacing={0} style={{justifyContent: "center", alignItems: "center", textAlign: "center"}}>
            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                <IconButton href="/home">
                    <HomeIcon fontSize="large" style={{fill: "", color: "blue"}} />
                </IconButton>
            </Grid>
        </Grid>
    </>
  );
}
