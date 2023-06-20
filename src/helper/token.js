import jwt from "jsonwebtoken";


export const generateAppToken = (data) => {
    return jwt.sign({
        data: data
      }, 'secret', { expiresIn: '1h' });
}
export const verifyAppToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'secret');
        return decoded;
    } catch (error) {
        return false;
    }
}