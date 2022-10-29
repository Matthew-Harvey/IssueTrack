import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Mynav from '../comps/Mynav';

export default function UserProfile() {
  const router = useRouter();
  const { userid } = router.query;

  const [isFound, setFound] = useState(null);

  useEffect( () => {
    const fetchData = async () => {
      const reponse = await axios.get('../api/UsernameExist?userid=' + userid);
      setFound(reponse.data.isFound);
    }
    fetchData();
  }, [userid, isFound]);

  if (isFound == true) {
    return (
      <>
          <Mynav params={{username: userid}}/>
          <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
            <Grid item={true} xs={12}>
              <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                <Avatar src="/vercel.svg" sx={{ width: 200, height: 200 }} style={{alignItems: 'center'}}/>
              </Box>
              <p>USER PAGE for - {userid}</p>
            </Grid>
          </Grid>
      </>
    )
  } else {
    return (
      <>
          <p>USER DOES NOT EXIST</p>
      </>
    )
  }
}
