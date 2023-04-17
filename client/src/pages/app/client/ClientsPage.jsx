import React from "react";
import { useState } from "react";
import { ADDCLIENT } from "../../../api/constants";
import TabsLayout from "../../../layout/TabsLayout";
import Layout from "../../../layout/Layout";
import ClientTable from "../client/ClientTable";
import axios from "axios";
import FormInput from "../../../components/formInput/FormInput";

const ClientForm = () => {
  const [values, setValues] = useState({
    client_name: "",
    mobile_number: "",
    descriptions: "",
  });

  const inputs = [
    {
      id: 1,
      name: "client_name",
      type: "text",
      placeholder: "Enter client name",
      label: "Client Name",
      errorMessage:"required",
      // required:true,
      // pattern:`^[A-Za-z0-9]{3,15}$`

    },
    {
      id: 2,
      name: "mobile_number",
      type: "text",
      placeholder: "Enter mobile number",
      label: "Mobile Number",
      errorMessage:"required",
      // required:true,
      // pattern: `^[0-9]{10}$`
    },
    {
      id: 3,
      name: "descriptions",
      type: "text",
      placeholder: "Enter descriptions",
      label: "Description",
      errorMessage:"required",
      // required:false,
    },
  ];
  const client_name = values["client_name"];
  const mobile_number = values["mobile_number"];
  const descriptions = values["descriptions"];
  const [data, setData] = useState([]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log();
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: ADDCLIENT,
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        client_name,
        mobile_number,
        descriptions,
      },
    })
      .then((res) => {
        alert(res.data.Message);
        setData(res.data);
      })
      .catch((err) => {
        
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className="flex gap-5">
          <button
            type="submit"
            className="px-3 w-full py-2 text-primaryWhite bg-primaryBlue mt-4"
          >Submit</button>
          <button
            type="submit"
            className="px-3 w-full py-2 text-primaryWhite bg-primaryBlue mt-4"
          >Cancel</button>
        </div>
      </form>
    </>
  );
};

const ClientsPage = () => {
  return (
    <Layout>
      <div>
        <TabsLayout
          headings={["Add Client", "Clients View"]}
          components={[<ClientForm />, <ClientTable />]}
        />
      </div>
    </Layout>
  );
};

export default ClientsPage;
