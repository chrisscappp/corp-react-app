import axios from "axios"

export const putData = async (url: string, data: any) => {
    await axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .catch((err) => {
            console.error("Всё...", err)
        })
}