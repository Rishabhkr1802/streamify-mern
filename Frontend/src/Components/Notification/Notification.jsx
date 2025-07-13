import { useEffect, useState } from 'react';
import styles from './Notification.module.css';
import { useQuery } from '@tanstack/react-query';

const baseurl = import.meta.env.VITE_SERVER_URL;

function Notification() {
  // const [data, setData] = useState(null);
  // const email = "test@gmail.com";
  // const password = "test123"

  // async function fetchList() {
  //   const response = await fetch(`${baseurl}/api/v1/login`,{ 
  //     method: "POST",
  //     headers: {
  //     "Content-Type": "application/json"
  //   },
  //     body: JSON.stringify({email,password}),
  //   });
  //   const data = await response.json();
  //   setData(data);
  // }
  
  // useEffect(()=> {
  //   fetchList();
  // }, []);

  // const query = useQuery({
  //   queryKey: ['NotificationData'],
  //   queryFn : fetchList,
  // });
  return (
    <>
      This is Notification Component
      {/* {data && (
        data?.message
      )} */}
    </>
  )
}

export default Notification;