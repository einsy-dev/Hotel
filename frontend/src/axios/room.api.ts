import { $host } from "./";
export const getRooms = async (id: string | undefined) => {
  if (!id) return;
  const { data } = await $host.get(`/api/rooms`, { params: { hotelId: id } });
  return data;
};

export const getRoom = async (id: string | undefined) => {
  if (!id) return;
  const { data } = await $host.get(`/api/room/${id}`);
  return data;
};
