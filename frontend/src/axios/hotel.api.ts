import { $host } from "./";
export const getHotels = async ({
  name = "",
  limit = 5,
  offset = 0,
}: {
  name?: string;
  limit?: number;
  offset?: number;
}) => {
  const { data } = await $host.get("/api/hotels", {
    params: { limit, offset, name },
  });
  return data;
};

export const getHotel = async (id: string | undefined) => {
  if (!id) return;
  const { data } = await $host.get(`/api/hotel/${id}`);
  return data;
};
