export function useCurrentItems<T>(items: T[], itemOffset: number, elemsInList: number) {

    let endOffset = itemOffset + elemsInList
    let currentItems = items.slice(itemOffset, endOffset)
    if (currentItems.length === 0) currentItems = items.slice(0, elemsInList)

    return { currentItems } 
}