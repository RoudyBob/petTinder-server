const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, process.env.GCS_KEYFILE)

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GCLOUD_PROJECT,
})

module.exports = storage