import { $host } from '.';

export const getAllCards = async (category: any, page: any) => {
    const { data } = await $host.get('/store', {
        params: { category, page }
    })
    return data
}

export const getOneCard = async (id: string) => {
    const { data } = await $host.get('/store/' + id)
    return data
}

export const getCategory = async () => {
    const { data } = await $host.get('/category')
    return data
}
