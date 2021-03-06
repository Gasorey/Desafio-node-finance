import multer from 'multer';
import path from 'path';
import crypt from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, calllback) {
      const fileHash = crypt.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return calllback(null, fileName);
    },
  }),
};
