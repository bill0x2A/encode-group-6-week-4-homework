import { ApiProperty } from "@nestjs/swagger";

export class MetadataDto{
    @ApiProperty({
        required: true,
        description: 'Name of this object',
        examples: ['Foo', 'Yolo', 'Group6'],
    })
    name: string;
    @ApiProperty({
        required: false,
        description: 'Description for this object',
    })
    description?: string;
    @ApiProperty({
        required: false,
        description: 'Author of this object',
    })
    author?: string;
    @ApiProperty({
        required: false,
        description:'Timestamp of creation date of this object',
    })
    timestamp?: number;
    @ApiProperty({
        required: false,
        description: 'given type for this object',
        examples: ['Document', 'Image', 'Nft'],
    })
    type?: string;
    @ApiProperty({
        required: false,
        description: 'given class for this object',
        examples: [
            'Limited',
            'Group6',
            'July Bootcamp',
            'Legendary',
            'Common',
            'Confidentional',
        ],
    })
    class?: string;
    @ApiProperty({
        required: false,
        description: 'given score for this object',
        examples: [0, -1, 32, 1996],
    })
    score?: number;
}