import { PATHS } from "./paths";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/app/DashboardPage";
import CustomersPage from "../pages/app/customer/CustomersPage";
import CustomerDetailsPage from "../pages/app/customer/CustomerDetailsPage";
import ClientsPage from "../pages/app/client/ClientsPage";
import ClientDetailsPage from "../pages/app/client/ClientDetailsPage";
import CampaignsPage from "../pages/app/campaign/CampaignsPage";
import CampaignEditPage from "../pages/app/campaign/CampaignEditPage";

const routes = [
  {
    path: PATHS.login, isPrivate: false,
    element: <LoginPage />
  },
  {
    path: PATHS.dashboard, isPrivate: true,
    element: <DashboardPage />
  },
  {
    path: PATHS.customers, isPrivate: true,
    element: <CustomersPage />
  },
  {
    path: PATHS.customerDetails, isPrivate: true,
    element: <CustomerDetailsPage />
  },
  {
    path: PATHS.clients, isPrivate: true,
    element: <ClientsPage />
  },
  {
    path: PATHS.clientDetails, isPrivate: true,
    element: <ClientDetailsPage />
  },
  {
    path: PATHS.campaigns, isPrivate: true,
    element: <CampaignsPage />
  },
  {
    path: PATHS.campaignEdit, isPrivate: true,
    element: <CampaignEditPage />
  },

];

export default routes;
