import { URLConfig } from '@/services/urls'

export const filterFileLists = (fileLists = []) => {
  return fileLists.map(file => {
    let title = ''

    switch (file.type) {
      case '1':
        title = '身份证正面'
        break
      case '2':
        title = '身份证反面'
        break
      case '3':
        title = '人脸识别照片'
        break
      default:
        break
    }

    const url = `${URLConfig.publicApiHost}/files/${file.fileUuid}`

    return { ...file, title, url }
  })
}
