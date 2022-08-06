const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = AWS.S3();

exports.handler = async (event, context, callback) => {
    const Bucket = event.Records[0].s3.bucket.name; //react-nodebird-isking235-aws
    const Key = decodeURIComponent(event.Records[0].s3.object.key);//original/1231.png
    console.log(Bucket, Key);
    const filename = Key.split('/')[Key.split('/').length - 1];
    const ext = Key.split('/')[Key.split('.').length - 1].toLowerCase();
    const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
    console.log('filename', filename, 'ext', ext);

    try {
        const s3Object = await s3.getObject({Bucket, Key}).promise();
        console.log('original', s3Object.Body.length);
        const resizedImage = await sharp(s3Object.Body)
            .resize(400, 400, {fit: 'inside'})
            .toFormat(requiredFormat)
            .toBuffer();
        await s3.putObject({
            Bucket,
            Key: 'thumb/${filename}',
            Body: resizedImage,

        });

        console.log('put', resizedImage.length);
        return callback(null, `tumb/${filename}`);

    } catch (error){
        console.error(error);
        return callback(error);
    }



}