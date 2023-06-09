import { type Mongoose, connect} from 'mongoose'
import { disconnect } from 'process'

export const init = async (url: string): Promise<Mongoose> => {
    return await connect(url)
} 

export const closeConnection = async (): Promise<void> => {
    return await disconnect()
} 