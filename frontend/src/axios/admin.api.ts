import { $authHost } from "./";
export const createHotel = async (formData: FormData) => {
  const { data } = await $authHost.post("/api/hotel", formData);
  return data;
};

export const updateHotel = async (
  formData: FormData,
  id: string | undefined
) => {
  if (!id) return;
  const { data } = await $authHost.put(`/api/hotel/${id}`, formData);
  return data;
};

export const createRoom = async (formData: FormData) => {
  const { data } = await $authHost.post("/api/room", formData);
  return data;
};
export const updateRoom = async (
  formData: FormData,
  id: string | undefined
) => {
  if (!id) return;
  const { data } = await $authHost.put(`/api/room/${id}`, formData);
  return data;
};
export const getUsers = async () => {
  const { data } = await $authHost.get("/users");
  return data;
};
export const getUser = async (userId: string | undefined) => {
  if (!userId) return;
  const { data } = await $authHost.get(`/user/${userId}`);
  return data;
};

export const getAllReservations = async () => {
  const { data } = await $authHost.get(`/reservation/all`);
  return data;
};
