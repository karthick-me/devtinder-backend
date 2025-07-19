const jwt = require("jsonwebtoken");

function parseCookies(cookieHeader) {
    const cookies = {};
    cookieHeader?.split(";").forEach((cookie) => {
        const [name, ...rest] = cookie.trim().split("=");
        cookies[name] = decodeURIComponent(rest.join("="));
    });
    return cookies;
}

function authenticateUpgrade(request) {
    const cookieHeader = request.headers.cookie;
    if (!cookieHeader || !cookieHeader?.length) return null;

    const cookies = parseCookies(cookieHeader);

    const { token } = cookies;
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, "KARTHICK");
        const { sub: userId } = decoded;
        return userId;
    } catch (error) {
        return null;
    }
}

module.exports = authenticateUpgrade;
