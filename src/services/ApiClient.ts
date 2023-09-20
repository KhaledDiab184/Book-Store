import axios from "axios";
export const baseUrl: string = "https://wfatairreact-001-site1.ctempurl.com";

export default axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    Authorization: "bearer " + localStorage.getItem("access_token"),
  },
});
