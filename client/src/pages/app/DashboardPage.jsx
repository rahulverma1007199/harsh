import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from 'axios'
import { URL } from "../../api/constants";

const DashboardPage = () => {
  const [data, setData] = useState([])
  const token = localStorage.getItem("token");
  console.log(token)
console.log(`${URL}dashboard`);
  useEffect(() => {
     axios.get(`${URL}dashboard`,
    { headers: { "Authorization": `Bearer ${token}` } 
  }).then(res=>{
    setData(res.data);
    console.log(data);
  }).catch(err=> {
    console.log(err)

  })
  }, [])

  return (
    <Layout>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {data.map((item, ind) => (
          <div className="h-48 bg-secondaryBlue flex flex-col gap-5 justify-center items-center text-teal-200" key={ind}>
            <h1 className="text-5xl font-semibold text-primaryBlue">{Object.values(item)}</h1>
            <div>{Object.keys(item)} </div>
          </div>

        ))}
      </div>
    </Layout>
  );
};
export default DashboardPage;
