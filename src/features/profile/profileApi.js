import axiosClient from "../../api/axiosClient";

export const fetchPublicProfileApi = async () => {
  const res = await axiosClient.get("/api/users/public/profile");
  return res.data;
};
