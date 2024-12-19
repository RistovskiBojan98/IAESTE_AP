function createToken() {
    emptyLocalStorage()
    const expirationTime = Date.now() + 30 * 60 * 1000 // set expiration time to 30 mins plus
    localStorage.setItem("refreshToken", JSON.stringify(expirationTime))
}

export function isTokenValid() {
    const refreshToken = localStorage.getItem("refreshToken")
    if (refreshToken) {
        const token = JSON.parse(refreshToken)
        if (token && token > Date.now()) return true
    }
    createToken()
    return false
    
}

function emptyLocalStorage() {
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("countriesData")
}