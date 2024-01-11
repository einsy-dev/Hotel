import { $host, $authHost } from './index';


export const authUser = async () => {
    const { data } = await $authHost.get('/user/auth');
    return data;
}

export const loginUser = async (email: any, password: any) => {
    const { data } = await $host.post('/user/login', { email, password })
    return data
}
export const registerUser = async (name: any, email: any, password: any) => {
    const { data } = await $host.post('/user/register', { name, email, password })
    return data
}

export const wishList = async (arr: any) => {
    const { data } = await $authHost.post('/user/wishlist', { arr })
    return data
}

export const getWishList = async () => {
    const { data } = await $authHost.get('/user/wishlist')
    return data
}

export const basket = async (arr: any) => {
    const { data } = await $authHost.post('/user/basket', { arr })
    return data
}

export const getBasket = async () => {
    const { data } = await $authHost.get('/user/basket')
    return data
}

export const order = async (info: any) => {
    const { data } = await $authHost.post('/user/order', { info })
    return data
}

export const orders = async () => {
    const { data } = await $authHost.get('/user/orders')
    return data
}

