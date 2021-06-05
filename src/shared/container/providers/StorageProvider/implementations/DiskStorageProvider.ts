import fs from 'fs'
import path from 'path'

import { tmpFolder } from '@config/upload'

import IStorageProvider from '../models/IStorageProvider'

class DiskStorageProvider implements IStorageProvider {
  public async deleteFile(folder: string, file: string): Promise<void> {
    const fileFolder = path.resolve(tmpFolder, folder)

    const filePath = path.resolve(fileFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

export default DiskStorageProvider
