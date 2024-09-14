import axios from 'axios';

export const getIndexAssetData = async () => {
  try {
    const response = await axios.get('/api/getIndexAssetData');
    return response.data;
  } catch (error) {
    console.error('Error fetching asset data', error);
    return null;
  }
};
