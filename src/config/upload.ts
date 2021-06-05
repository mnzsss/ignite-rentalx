import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import { resolve } from 'path'

export const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export const uploadConfig = {
  upload(folder: string): { storage: StorageEngine } {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename(_, file, cb) {
          const fileHash = crypto.randomBytes(16).toString('hex')

          const fileName = `${fileHash}-${file.originalname}`

          return cb(null, fileName)
        }
      })
    }
  }
}
