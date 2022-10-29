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
          <p>USER PAGE for - {userid}</p>
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
