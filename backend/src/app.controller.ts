import { Controller, Get, HttpException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fileURLToPath } from 'url';
import { AppService } from './app.service';
import { Express } from 'express';
import {FileDataDto} from './dtos/file-data.dto';

// @ApiTags('file')
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
}
