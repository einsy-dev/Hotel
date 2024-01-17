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

export const createHotel = async (formData: FormData) => {
  const { data } = await $authHost.post("/api/hotel", formData);
  return data;
};