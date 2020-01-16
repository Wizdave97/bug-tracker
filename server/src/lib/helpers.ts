import crypto=require('crypto');

type helpers ={
    createToken(len:number):string
    hash(str:string):string | Error;
}
export default function helperFactory(hashKey:string){
    const helpers:helpers={
        createToken:function (len):string{
            let str='';
            let possibleValues='abcdefgh0123456789ijklmnopqrstuvw';
            for(let i:number=0 ;i<len;i++){
                str+=possibleValues[Math.floor(Math.random()*possibleValues.length)]
            }
           return  str 
        },
        hash:function(str):string | Error{
            try{
                let hmac=crypto.createHmac('sha256',hashKey).update(str)
                return hmac.digest('hex')
            }
            catch(err){
                return err
            }
        }
            
    }
    return helpers
}

helperFactory.__inject=['hashKey']
