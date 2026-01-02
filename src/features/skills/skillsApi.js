import axiosClient from "../../api/axiosClient";

export const fetchSkillsByUserApi = async (userId) => {
  const res = await axiosClient.get(`/api/skills/public/${userId}`);
  return res.data.data;
};
