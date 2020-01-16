import e = require("express")

export type handlers = {
    login:e.RequestHandler;
    logout:e.RequestHandler;
    accountCreate:e.RequestHandler;
    accountEdit:e.RequestHandler;
    getProfile:e.RequestHandler;
}

function userHandlers(__data:{[key:string]:any},helpers:{[key:string]:any}):handlers{
    
    const handlers:handlers={
        login:function(req,res,next){
           try{
            let errors:{[key:string]:string}={}
            let email=typeof req.body.email ==='string' && req.body.email.trim().length>0?req.body.email.trim():false ;
            let password=typeof req.body.password === 'string' && req.body.password.trim().length>=8 ?req.body.password.trim():false;
            if(email && password){
             __data.findUser(email).then((user:{[key:string]:any})=>{
                 if(user){
                     let hashedPassword:string=helpers.hash(password)
                     if(hashedPassword===user.password){
                         let token:string=helpers.createToken(40)
                         let expiresIn:number=Date.now() + (60*60*1000)
                         let tokenObject:{token:string,expiresIn:number,userId:number}={token,userId:user.Id,expiresIn}
                         __data.saveToken(tokenObject).then((status:boolean)=>{
                             res.setHeader('Content-Type','application/json')
                             res.status(200).send({data:tokenObject,status:200})
                         }).catch((err:{[key:string]:any})=>{
                             res.setHeader('Content-Type','application/json')
                             res.status(500).send({error:'An error occured please try again',status:500})
                         })
                     }
                     else {
                         res.setHeader('Content-Type','application/json')
                         res.status(403).send({status:403,error:'Invalid Password'})
                     }
   
                 }
             }).catch((err:{[key:string]:any})=>{
                 res.setHeader('Content-Type','application/json')
                 res.status(403).send({status:403,error:'Invalid login details submitted, please check and try again'})
             })
            }
            else{
                if(!email) errors.email='A valid email is required'
                if(!password) errors.password='A valid password is required'
                res.setHeader('Content-Type','application/json')
                res.status(405).send({status:405,error:errors})
            }
           }
           catch(err){
            res.setHeader('Content-Type','application/json')
            res.status(500).send({status:500,error:'An unknown error occured'})
           }
        },
        logout:function(req,res,next){
            try{
                let token=typeof req.body.token === 'string' && req.body.token.trim().length===40?req.body.token:false;
                if(token){
                    __data.deleteToken(token).then((status:boolean)=>{
                        res.sendStatus(204)
                    }).catch((err:any)=>{
                        res.sendStatus(204)
                    })
                }
                else{
                    res.status(403).send({status:403,error:'Invalid token'})
                }
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,err:'An unknown error occured'}) 
            }
           
        },
        accountCreate:function(req,res,next){
            try{
                let firstName:string | boolean=typeof req.body.firstName === 'string' && req.body.firstName.trim().length >=3 ? req.body.firstName.trim():false
                let lastName:string | boolean=typeof req.body.lastName === 'string' && req.body.lastName.trim().length >=3 ? req.body.lastName.trim():false
                let mobileNumber:string | boolean=typeof req.body.mobileNumber === 'string' && req.body.mobileNumber.trim().length === 11? req.body.mobileNumber.trim() :false
                let password:string | boolean=typeof req.body.password === 'string' && req.body.password.trim().length >=8 ?req.body.password:false
                let email:string | boolean=typeof req.body.email === 'string' && req.body.email.trim().length >0 ?req.body.email:false
                let data:{[key:string]:any}={}
                let errors:{[key:string]:any}={}
                if(!firstName) errors.firstName='Required field, must be a string with minimum length of 3'
                if(!lastName) errors.lastName='Required field, must be a string with minimum length of 3'
                if(!mobileNumber) errors.mobileNumber='Required field, must be a string with  length of 11'
                if(!password) errors.password='Required field, must be a string with minimum length of 8'
                if(!email) errors.email="A valid email is required"
                
                if(Object.keys(errors).length===0){
                     let hashedPassword=helpers.hash(password)
                     data={...data,firstName,lastName,mobileNumber,password:hashedPassword,email}
                     __data.findUser(email).then((user:{})=>{
                         if(user){
                             res.setHeader('Content-Type','application/json')
                             res.status(405).send({status:402,error:'Email already exists on our server'}) 
                         }
                         if(!user){
                            __data.createUser(data).then((status:boolean)=>{
                                res.sendStatus(204)
                            }).catch((err:any)=>{
                                res.status(500).send({status:500,error:'An unknown error occured'})
                            })
                         }
                     }).catch((err:{})=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})

                     })    
                }
                else{
                     res.status(403).send({status:403,error:errors})
                }  
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }
            
        },
        accountEdit:function(req,res,next){
            try{
                let firstName:string | boolean=typeof req.body.firstName === 'string' && req.body.firstName.trim().length >=3 ? req.body.firstName.trim():false
                let lastName:string | boolean=typeof req.body.lastName === 'string' && req.body.lastName.trim().length >=3 ? req.body.lastName.trim():false
                let mobileNumber:string | boolean=typeof req.body.mobileNumber === 'string' && req.body.mobileNumber.trim().length === 11? req.body.mobileNumber.trim() :false
                let password:string | boolean=typeof req.body.password === 'string' && req.body.password.trim().length >=8 ?req.body.password:false
                let email:string | boolean=typeof req.body.email === 'string' && req.body.email.trim().length >0 ?req.body.email:false
                
                let data:{[key:string]:any}={}
                let errors:{[key:string]:any}={}
                if(!firstName) errors.firstName='Required field, must be a string with minimum length of 3'
                if(!lastName) errors.lastName='Required field, must be a string with minimum length of 3'
                if(!mobileNumber) errors.mobileNumber='Required field, must be a string with  length of 11'
                if(!password) errors.password='Required field, must be a string with minimum length of 8'
                if(!email) errors.email="A valid email is required"
                
                if(Object.keys(errors).length===0){
                     let hashedPassword=helpers.hash(password)
                     data={...data,firstName,lastName,mobileNumber,password:hashedPassword,email}
                            __data.updateUser(data).then((status:boolean)=>{
                                res.sendStatus(204)
                            }).catch((err:any)=>{
                                res.setHeader('Content-Type','application/json')
                                res.status(500).send({status:500,error:'An unknown error occured'})
                            })
                             
                }
                else{
                     res.status(403).send({status:403,error:errors})
                }  
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }
        },
        getProfile:function(req,res,next){
            try{
                let email:string | boolean=typeof req.query.email === 'string' && req.query.email.trim().length >0 ?req.query.email.trim():false
                if(email){
                    __data.findUser(email).then((user:{})=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(200).send({status:200,data:user})
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(404).send({status:404,error:'User not found'})
                    })
                }
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }
        }
    }
    return handlers
}
userHandlers.__inject=['__data','helpers']

export default userHandlers