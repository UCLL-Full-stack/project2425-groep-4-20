import jwt from "jsonwebtoken"
import { Role } from "../types"

const generateJwtToken = ({ username, role }: { username: string, role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'lab_app' }
    try {
        return jwt.sign({ username , role}, `${process.env.JWT_SECRET}`, options)
    } catch (err) {
        console.log(err)
        throw new Error(`Error generating JWT token, see server logs`)
    }
}

export { generateJwtToken }