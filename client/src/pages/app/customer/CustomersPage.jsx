import React, { useMemo } from "react";
import Layout from "../../../layout/Layout";
import CustomersTable from "../customer/CustomersTable";
const CustomersPage = () => {
  return (
    <Layout>
      {/* <div>Customer table will come here</div> */}
      <CustomersTable />
    </Layout>
  );
};
export default CustomersPage;
