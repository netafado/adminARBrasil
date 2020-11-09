import config from "../../aws-exports"
import { v4 as uuidv4 } from 'uuid';
import { Storage } from "aws-amplify"


const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
  } = config


  export const salvarToStorage = async(file) => {
    return new Promise((resolve, reject)=>{
        if (file) {
            const key = `produtos/${uuidv4()}${file.name.replace(/ /g,'')}`      
            const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
            try {
            Storage.put(key, file)
              .then (result => {
                  console.log(result, url)
                resolve(url)
              })
            } catch (err) {
              console.log('error: ', err)
            }
        }else{
            reject("passar o arquivo")
        }
    })


}