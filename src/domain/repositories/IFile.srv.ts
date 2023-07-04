
export interface IFileRepository {
    uploadFile(file: any): Promise<string>;
    deleteFile(file: any): Promise<string>;
}