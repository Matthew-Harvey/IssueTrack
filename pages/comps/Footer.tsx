import { Grid, IconButton } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';


export default function Footer() {
    return (
        <>
            <footer style={{backgroundColor: "#1976d2", color: "white", flexShrink: 0, boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"}}>
                <br />
                <Grid container spacing={0} style={{justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                    <Grid item={true} xs={6} style={{justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                        <p>Created by: Matthew Harvey</p>
                        <IconButton href='https://mharvey.netlify.app/'>
                            <WebIcon fontSize="large" style={{fill: "", color: "white"}} />
                        </IconButton>
                        <IconButton href='https://github.com/Matthew-Harvey/'>
                            <GitHubIcon fontSize="large" style={{fill: "", color: "white"}} />
                        </IconButton>
                        <IconButton href='https://github.com/Matthew-Harvey/'>
                            <GitHubIcon fontSize="large" style={{fill: "", color: "white"}} />
                        </IconButton>
                        <IconButton href='https://www.linkedin.com/in/m-harvey/'>
                            <LinkedInIcon fontSize="large" style={{fill: "", color: "white"}} />
                        </IconButton>
                        <IconButton href='mailto:matthewtlharvey@gmail.com'>
                            <EmailIcon fontSize="large" style={{fill: "", color: "white"}} />
                        </IconButton>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Grid container spacing={0} style={{justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                            <Grid item={true} xs={2}>
                                <p><Link href="/home">Home</Link></p>
                            </Grid>
                            <Grid item={true} xs={2}>
                                <p><Link href="/teams">Teams</Link></p>
                            </Grid>
                            <Grid item={true} xs={2}>
                                <p><Link href="/notifications">Notifications</Link></p>
                            </Grid>
                            <Grid item={true} xs={2}>
                                <p><Link href="/Profile">Profile</Link></p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
            </footer>
        </>
    )
}

