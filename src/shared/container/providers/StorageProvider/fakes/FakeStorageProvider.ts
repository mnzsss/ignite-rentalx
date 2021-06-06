import IStorageProvider from '../models/IStorageProvider'

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = []

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(sf => sf === file)

    this.storage.splice(findIndex, 1)
  }
}

export default FakeStorageProvider
