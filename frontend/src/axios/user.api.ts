import { $authHost, $host } from ".";

export const authUser = async () => {
  const { data } = await $authHost.get("/auth");
  return data;
};

export const signInUser = async (email: string, password: string) => {
  if (!email || !password) return;
  const { data } = await $host.post("/auth/signin", { email, password });
  return data;
};
export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  if (!name || !email || !password || !phone) return;
  const { data } = await $host.post("/auth/signup", {
    name,
    email,
    password,
    phone,
  });
  return data;
};
export const createReservation = async (params: any) => {
  const { data } = await $authHost.post(`/reservation`, {
    ...params,
  });
  return data;
};

export const getUserReservations = async (id: String | undefined) => {
  if (!id) return;
  const { data } = await $authHost.get(`/reservation/user/${id}`);
  return data;
};
