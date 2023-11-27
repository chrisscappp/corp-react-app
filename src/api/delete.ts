import axios from "axios"

export const deleteData = (url: string, id: string) => {
    axios.delete(`${url}/${id}`)
}