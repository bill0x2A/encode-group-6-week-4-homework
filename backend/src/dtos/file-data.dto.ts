export class FileDataDto{
    constructor(
        public fileName: string,
        public mimeType: string,
        public storageName: string,
        public size: number,
    ){}
}