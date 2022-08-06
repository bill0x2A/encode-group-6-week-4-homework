import { Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { FileData } from './schemas/file-data.interface';
import { FileDataDto } from './dtos/file-data.dto';
const DB_PATH = '../db-local/db.json';
@Injectable()
export class AppService {
  db: JsonDB;
  lastId: number;

  constructor(){
    this.db = new JsonDB(new Config(DB_PATH, true, true, '/'));

    const data = this.db.getData('/')
    this.lastId = data && Object.keys(data).length > 0
                  ? Math.max(...Object.keys(data).map((key) => Number(key)))
                  : -1;
  }

  getAll(){
    return this.db.getData('/');
  }

  pushFile(file: FileDataDto){
    const obj = new FileData(file);
    const fileID = ++this.lastId;
    this.db.push(`/${fileID}`, obj);
    return fileID;
  }
}
