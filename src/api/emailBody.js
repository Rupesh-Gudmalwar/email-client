import axios from "axios";

export const getEmailBodyApi = async (id) => {
  const data = await axios(`https://flipkart-email-mock.now.sh/?id=${id}`);
  return data;
};
