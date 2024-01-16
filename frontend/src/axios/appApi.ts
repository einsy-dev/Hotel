import { $host, $authHost } from "./";

export const getHotels = async (
  limit: number,
  offset: number,
  name: string
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
