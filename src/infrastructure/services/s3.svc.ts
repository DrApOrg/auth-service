import { IS3Service } from "../../domain/services/IS3.srv";
import { generateUniqueFileName } from "../../infrastructure/aws/s3";
import {S3 as s3Client} from 'aws-sdk'
import fs from 'fs'

export class S3Service implements IS3Service {
    constructor(
        private storageClient: s3Client
    ){
    }

    async uploadFile(file: any): Promise<string> {
        const stream = fs.createReadStream(file.tempFilePath)
        const uniqueFileName = generateUniqueFileName(file.name)
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: uniqueFileName,
            Body: stream,
            ContentType: file.mimetype,
            ContentDisposition: 'inline'
        } 

        const command = await this.storageClient.upload(uploadParams).promise() 

        return command.Location
    }

}