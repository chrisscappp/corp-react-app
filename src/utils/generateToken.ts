export function generateToken() {
    const tokenLength = 24
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
    let token = ""

    for (let i = 0, n = charset.length; i < tokenLength; ++i) {
        token += charset.charAt(Math.floor(Math.random() * n))
    }

    return token
}