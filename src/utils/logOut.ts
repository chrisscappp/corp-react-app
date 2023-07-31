export const logOut = (key: string) => {
    localStorage.removeItem(key)
    window.location.reload()
}