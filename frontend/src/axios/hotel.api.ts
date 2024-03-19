import { $host } from "./";
export const getHotels = async ({
  name = "",
  limit = 10,
  offset = 0,
  order,
}: {
  name?: string;
  limit?: number;
  offset?: number;
  order: {
    from: string;
    to: string;
  };
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
