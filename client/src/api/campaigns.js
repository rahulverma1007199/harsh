// Get all Campaigns
export const getCampaigns = async () => {
  const response = await axios.get(`${URL}/campaign`);
  const data = await response.data;
  return data.Data;
};

// Post Client
export const postCampaigns = async (payload) => {
  const response = await axios.post(`${URL}/campaign`, payload);
  return response;
};
