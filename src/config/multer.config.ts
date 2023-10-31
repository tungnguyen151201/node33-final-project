import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter: (req: any, file: any, callback: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new BadRequestException(
          `Unsupported file type ${extname(file.originalname)}`,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (_, __, callback) => {
      const distPath =
        process.cwd() + `/dist/${process.env.MULTER_DESTINATION}`;
      const rootPath = process.cwd() + `/${process.env.MULTER_DESTINATION}`;
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }
      if (!fs.existsSync(rootPath)) {
        fs.mkdirSync(rootPath, { recursive: true });
      }
      callback(null, distPath);
      callback(null, rootPath);
    },
    filename: (_, file, callback) =>
      callback(null, new Date().getTime() + '_' + file.originalname),
  }),
};
