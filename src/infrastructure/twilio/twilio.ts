import twilio from 'twilio'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

const TWILIO_SID= process.env.TWILIO_SID as string
const TWILIO_TOKEN = process.env.TWILIO_TOKEN as string

export const clientTwilio = twilio(TWILIO_SID, TWILIO_TOKEN)

export async function sendCoderTest(pin: string, phone: string): Promise<MessageInstance> {
    return await clientTwilio.messages.create({
        body: "tarao " + pin,
        from: process.env.TWILIO_PHONE,
        to: phone,
    })
}