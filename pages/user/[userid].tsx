import axios from 'axios';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  }, [userid]);

  if (isFound == true) {
    return (
      <>
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
