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

export const getOneCard = async (id: string) => {
  const { data } = await $host.get("/store/" + id);
  return data;
};

export const getCategory = async () => {
  const { data } = await $host.get("/category");
  return data;
};
