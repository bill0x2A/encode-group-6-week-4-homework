import { Injectable, StreamableFile } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { FileData } from './schemas/file-data.interface';
import { FileDataDto } from './dtos/file-data.dto';
import { MetadataDto } from './dtos/metadata.dto';
import { IPFSHTTPClient } from 'ipfs-http-client';
import {create} from 'ipfs-http-client';
import * as fs from 'fs';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { createReadStream } from 'fs';

const DB_PATH = '../db-local/db.json';
@Injectable()
export class AppService {
  db: JsonDB;
  lastId: number;
  ipfsClient: IPFSHTTPClient;

  constructor(){
    this.db = new JsonDB(new Config(DB_PATH, true, true, '/'));

    const data = this.db.getData('/')
    this.lastId = data && Object.keys(data).length > 0
                  ? Math.max(...Object.keys(data).map((key) => Number(key)))
                  : -1;

    this.ipfsClient = create({
      host:'localhost',
      port:5001,
      protocol: 'http',
    });
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

  setMetadata(fileID: number, metadata: MetadataDto){
    let file:any;
    try{
      file = this.db.getData(`/${fileID}/file`);
    } catch(err){
      return{err};
    }
    if(!file) return false;
    this.db.push(`/${fileID}/metadata`, metadata);
    return this.get(fileID);
  }

  get(fileID: number){
    return this.db.getData(`/${fileID}`);
  }

  getMetadata(fileID: number){
    return this.db.getData(`/${fileID}/metadata`)
  }

  isIpfsNodeOnline(){
    try{
      const state = this.ipfsClient.isOnline();
      console.log(state);
      return state;
    } catch(err){
      return err;
    }
  }

  getFileStream(filename: string) {
    const fileStream = createReadStream(`../upload/${filename}`);
    return new StreamableFile(fileStream);
  }

  async saveToIPFS(fileID: number) {
    const fileData: FileData = this.get(fileID);
    const fileLocation = `../upload/${fileData.file.storageName}`;
    const fileBytes = fs.readFileSync(fileLocation);
    const ipfsData = await this.ipfsClient.add(fileBytes);
    this.db.push(`/${fileID}/ipfs`, ipfsData);
    return this.get(fileID);
  }

  async getFromIpfs(fileId: number) {
    const fileData: FileData = this.get(fileId);
    if (!fileData.ipfs || !fileData.ipfs.path || fileData.ipfs.path.length == 0)
      throw new Error('File not found');
    const ipfsBytes = this.ipfsClient.cat(fileData.ipfs.path);
    const content = [];
    for await (const chunk of ipfsBytes) {
      content.push(chunk);
    }
    const fileStream = uint8ArrayConcat(content);
    return new StreamableFile(fileStream);
  }
}
