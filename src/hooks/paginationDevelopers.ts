import { ELEMS_IN_RATING } from "../utils/constants"
import { IUser } from "../models"

export function useCurrentItems (items: IUser[], itemOffset: number) {

    let endOffset = itemOffset + ELEMS_IN_RATING
    let currentItems = items.slice(itemOffset, endOffset)
    if (currentItems.length === 0) currentItems = items.slice(0, ELEMS_IN_RATING)
    
    return { currentItems } 
}