import axios from "axios";

export const getEmailListApi = async (pageNum = 1) => {
  const data = await axios(
    `https://flipkart-email-mock.now.sh/?page=${pageNum}`
  );
  return data;
};
