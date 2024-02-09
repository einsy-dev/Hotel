import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as uuid from 'uuid';

export const Multer = FilesInterceptor('files', 10, {
  storage: diskStorage({
    destination: './public/images',
    filename: (req, file, callback) => {
      const filename: string = uuid.v4() + '.jpg';
      callback(null, filename);
    },
  }),
});
