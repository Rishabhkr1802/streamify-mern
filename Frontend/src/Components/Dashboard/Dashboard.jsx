import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { useQuery } from '@tanstack/react-query';

const baseurl = import.meta.env.VITE_SERVER_URL;

function Dashboard() {
  const [data, setData] = useState(null);
  const email = "test@gmail.com";
  const password = "test123"

  async function fetchList() {
    const response = await fetch(`${baseurl}/api/v1/login`,{ 
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    },
      body: JSON.stringify({email,password}),
    });
    const data = await response.json();
    setData(data);
  }
  
  // useEffect(()=> {
  //   fetchList();
  // }, []);

  const query = useQuery({
    queryKey: ['dashboardData'],
    queryFn : fetchList,
  });
  return (
    <>
      This is Dashboard Component
      {data && (
        data?.message
      )}
    </>
  )
}

export default Dashboard;