import { Response, Param, Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fileURLToPath } from 'url';
import { AppService } from './app.service';
import { Express } from 'express';
import {FileDataDto} from './dtos/file-data.dto';
import { SetMetadataDto } from './dtos/set-metadata.dto';
import { UploadIPFSDto } from './dtos/upload-ipfs.dto';

@ApiTags('file')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @ApiOperation({
    summary: 'Database contents(Db folder)',
    description: 'gets Database contents of backend',
  })
  async getAllDAta(){
    try{
      const result = this.appService.getAll();
      return result;
    } catch(error){
      throw new HttpException(error.message, 503)
    }
  }

  @Post('file')
  @ApiOperation({
    summary:'Register a file',
    description:'registers the file in the db',
  })
  @ApiResponse({
    status:200,
    description:'file is registered',
  })
  @ApiResponse({
    status:503,
    description:'Server Error',
    type:HttpException,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type:'object',
      properties:{
        file:{
          type:'string',
          format:'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File){
    const fileData = new FileDataDto(
      file.originalname,
      file.mimetype,
      file.filename,
      file.size,
    );
    const savedObj = this.appService.pushFile(fileData);
    return savedObj;
  }

  @Post('metadata')
  @ApiOperation({
    summary:'Register file metadata',
    description:'register the metadata for a file',
  })
  @ApiResponse({
    status:200,
    description:'Metadata registered',
  })
  @ApiResponse({
    status:503,
    description:'Server Error',
    type:HttpException,
  })
  setMedatadata(@Body() body: SetMetadataDto){
    const updatedObj = this.appService.setMetadata(body.id, body.metadata);
    return updatedObj;
  }

  @Post('ipfs-save')
  @ApiOperation({
    summary:'Register file metadata',
    description: 'registers a metadata f',
  })
  @ApiResponse({
    status:200,
    description:'Metadata registered',
  })
  @ApiResponse({
    status:503,
    description:'Server Error',
    type:HttpException,
  })
  sendFileIpfs(@Body() body: UploadIPFSDto){
    const updatedObj = this.appService.saveToIPFS(body.id);
    return updatedObj;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get element by id',
    description: 'Gets the element at the requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getData(@Param('id') id: number) {
    try {
      const result = this.appService.get(id);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Get('metadata/:id')
  @ApiOperation({
    summary: 'Get metadata by id',
    description: 'Gets metadata at requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getMetadata(@Param('id') id: number) {
    try {
      const result = this.appService.getMetadata(id);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Get('file/:id')
  @ApiOperation({
    summary: 'Get file of element by id from server storage',
    description: 'Gets the file of element at the requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element file',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getFile(@Response({ passthrough: true }) res, @Param('id') id: number) {
    try {
      const fileData = this.appService.get(id).file;
      const fileStream = this.appService.getFileStream(fileData.storageName);
      res.set({
        'Content-Type': fileData.mimetype,
        'Content-Disposition': `attachment; filename="${fileData.fileName}"`,
      });
      return fileStream;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }
}
