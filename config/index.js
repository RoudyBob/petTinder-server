const Cloud = require('@google-cloud/storage')
const path = require('path')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GCLOUD_PROJECT,
})

module.exports = storage