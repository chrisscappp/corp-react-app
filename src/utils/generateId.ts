export function generateId() {
    const idLength = 4
    const charset = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789"
    let id = ""

    for (let i = 0, n = charset.length; i < idLength; ++i) {
        id += charset.charAt(Math.floor(Math.random() * n))
    }

    return id
}