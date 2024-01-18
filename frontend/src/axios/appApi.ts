import { $host, $authHost } from "./";

export const getHotels = async (
  name: string,
  limit: number,
  offset: number
) => {
  const { data } = await $host.get("/api/hotels", {
    params: { limit, offset, name },
  });
  return data;
};

export const getHotel = async (id: string) => {
  const { data } = await $host.get(`/api/hotel/${id}`);
  return data;
};

export const createHotel = async (formData: FormData) => {
  const { data } = await $authHost.post("/api/hotel", formData);
  return data;
};

export const updateHotel = async (formData: FormData, id: string) => {
  const { data } = await $authHost.put(`/api/hotel/${id}`, formData);
  return data;
};

export const getHotelRooms = async (id: string) => {
  const { data } = await $host.get(`/api/rooms/${id}`);
  return data;
};

export const createRoom = async (formData: FormData) => {
  const { data } = await $authHost.post("/api/room", formData);
  return data;
};
export const updateRoom = async (formData: FormData, id: string) => {
  const { data } = await $authHost.put(`/api/room/${id}`, formData);
  return data;
};

export const getUsers = async () => {
  const { data } = await $authHost.get("/user/all");
  return data;
};
export const getUser = async (userId: string) => {
  const { data } = await $authHost.get(`/user/${userId}`);
  return data;
};
