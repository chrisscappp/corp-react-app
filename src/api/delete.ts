import axios from "axios"

export const deleteData = (url: string, id: number) => {
    axios.delete(`${url}/${id}`)
}