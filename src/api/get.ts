import axios from "axios"

export const getData = async <T>(url: string) => 
    (await axios.get<T>(url)).data