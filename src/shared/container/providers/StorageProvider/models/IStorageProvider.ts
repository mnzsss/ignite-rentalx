export default interface IStorageProvider {
  deleteFile(folder: string, file: string): Promise<void>
}
