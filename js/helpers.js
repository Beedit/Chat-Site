let remove = (lis, rem) => {
    final = []
    for (let i = 0; i < lis.length; i++) {
        if (lis[i] !== rem){
            final.push(lis[i])
        }
    }
    return final
}

const randomID = (len) => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

    let final = "" 

    for (let i = 0; i < len; i++) {
        final += chars[Math.floor(Math.random() * chars.length)]
    }
    return final
}

module.exports = { remove, randomID }