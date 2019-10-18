const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const fs = require('fs');
const gs = require('node-gs');
const spawn = require('child-process-promise').spawn;

admin.initializeApp()

exports.generatePng = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;
  if (!contentType.startsWith('application/pdf')) {
    return console.log('This is not an pdf.');
  }
  if (filePath.startsWith('img_')) {
    return console.log('This is generated file.');
  }

  // Download file from bucket.
  const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const newName = path.basename(filePath, '.pdf');

  const bucket = admin.storage().bucket(fileBucket);
  return bucket.file(filePath)
    .download({destination: tempFilePath})
    .then(() => {
      console.log('Image downloaded locally to', tempFilePath);

      // eslint-disable-next-line promise/no-nesting
      return spawn('convert', [tempFilePath + '[0]', tempFilePath]).then(() => { 
        console.log('png created at', tempFilePath); 
        // Convert pdf extension to png 
        const thumbFilePath = filePath.replace('.pdf', 'png'); 
        // Uploading the thumbnail. 
        return bucket.upload(tempFilePath, { 
         destination: thumbFilePath 
        }); 
       }); 
    });
});