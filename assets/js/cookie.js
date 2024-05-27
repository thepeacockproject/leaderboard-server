yafunction addTime(time) {
    const date = new Date()
    date.setTime(date.getTime() + time)
    return date
}

function createCookie(key, value, expires, extraTags = "") {
    document.cookie =
        key +
        "=" +
        JSON.stringify(value) +
        ";path=/;expires=" +
        expires.toUTCString() +
        extraTags
}

function getCookie(key, isString) {
    const results = new RegExp(key + "=(.*?)(;|$)", "g").exec(document.cookie)

    if (!results) {
        return null
    }

    return isString ? results[1] : JSON.parse(results[1])
}

const addSeconds = (time) => addTime(time * 1000)
const addMinutes = (time) => addTime(addSeconds(time * 60))
const addHours = (time) => addTime(addSeconds(time * 3600))
const addDays = (time) => addTime(addSeconds(time * 86400))

const formats = {
    s: addSeconds,
    m: addMinutes,
    h: addHours,
    d: addDays,
}

function cookieFactory() {
    return {
        get(key, isString, markAsErasable) {
            const value = getCookie(key, isString)

            if (markAsErasable) {
                this.remove(key)
            }

            return value
        },
        set(key, value, time, format, extraTags = "") {
            time = time || 365
            format = format || "d"
            const fn = formats[format]
            createCookie(key, value, fn(time), extraTags)
        },
        remove: function removeI(key) {
            createCookie(key, null, addDays(-7))
        },
    }
}

window.cookieImpl = cookieFactory()

window.logout = function logout() {
    const sure = confirm("Are you sure you want to logout?")

    if (!sure) {
        return
    }

    window.cookieImpl.remove("authToken")
    window.location.replace("/")
}
