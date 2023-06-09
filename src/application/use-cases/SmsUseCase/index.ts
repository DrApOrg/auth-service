
export const SendPhoneCode = (phone: string) => {
    return "12345"
} 

export const VerifyPhoneCode = (code: string) => {
    return "12345" === code
} 

export const VerifyPhone = (phone: string) => {
    return !(phone.length === 9)
} 