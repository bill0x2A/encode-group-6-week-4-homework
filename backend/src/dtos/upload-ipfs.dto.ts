import { ApiProperty } from "@nestjs/swagger";

export class UploadIPFSDto{
    @ApiProperty({
        required: true,
        description: 'ID of the file',
    })
    id: number;
}