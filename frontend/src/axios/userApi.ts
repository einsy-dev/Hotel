import { $host, $authHost } from "./index";

export const authUser = async () => {
  const { data } = await $authHost.get("/auth");
  return data;
};

export const signInUser = async (email: string, password: string) => {
  const { data } = await $host.post("/auth/signin", { email, password });
  return data;
};
export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  const { data } = await $host.post("/auth/signup", {
    name,
    email,
    password,
    phone,
  });
  return data;
};

export const userReservations = async (id: string) => {
  const { data } = await $authHost.get(`/user/${id}/reservations`);
}
