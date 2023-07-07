import { IFileRepository } from "../../domain/repositories/IFile.srv";
import { generateUniqueFileName } from "../aws/s3";
import {type S3 as s3Client} from 'aws-sdk'
import fs from 'fs'

export class S3Repository implements IFileRepository {
    constructor(
        private storageClient: s3Client
    ){
    }

    deleteFile(file: any): Promise<string> {
        throw new Error("Method not implemented.");
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