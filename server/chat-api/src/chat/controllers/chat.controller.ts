import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
const path = require('path');
import { v4 as uuid4 } from 'uuid';
import { FileTypeEnum } from '../model/interfaces/file-type.enum';
import { join } from 'path';

// mimetype: 'image/png',
@Controller()
export class ChatController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './imgs',
        filename: (req, file, cb) => {
          console.log(file.originalname);
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuid4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    let type: string = file.mimetype;
    if (type.includes('image')) {
      type = FileTypeEnum.Img;
    } else if (type.includes('video')) {
      type = FileTypeEnum.Video;
    } else if (type.includes('audio')) {
      type = FileTypeEnum.audio;
    } else {
      type = FileTypeEnum.file;
    }

    return { filePath: file.filename, type };
  }

  @Get('file/:fileName')
  showFile(@Param('fileName') file, @Res() res) {
    return res.sendfile(join(process.cwd(), 'imgs/' + file));
  }
}
