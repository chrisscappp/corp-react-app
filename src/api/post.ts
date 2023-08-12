import axios from "axios"

export const sendData = async <T>(url: string, data: T) => {
    await axios.post(url, data, {
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((err) => {
        console.error("Всё...", err)
    })
}