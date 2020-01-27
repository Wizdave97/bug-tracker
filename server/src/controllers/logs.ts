import e = require("express")


export type handlers = {
    getLogs:e.RequestHandler;
    getFeatureLogs:e.RequestHandler;
    postLog:e.RequestHandler;
}

function logsHandlers(__data:{[key:string]:any},helpers:{[key:string]:any}):handlers{
    
    const handlers:handlers={
        getLogs:function(req,res,next){
            try{
                let start:number|boolean=typeof +req.query.start === 'number'?+req.query.start:false,rows:number|boolean=typeof +req.query.rows === 'string'?+req.query.rows:false
                let userId:number | boolean= typeof +req.query.userId === 'number' && +req.query.userId>=0?+req.query.userId:false;
                if(start && userId && rows){
                    __data.findUserById(userId).then((user:{[key:string]:any})=>{
                        __data.getLogs(start,rows,user.projects).then((results:{count:number,rows:[]})=>{
                            res.setHeader('Content-Type','application/json')
                            res.status(200).send({status:200,data:rows,next:(+start + +rows+1)<results.count?+start + +rows + 1:null})
                        }).catch((err:any)=>{
                            res.setHeader('Content-Type','application/json')
                            res.status(500).send({status:500,error:'An unknown error occured'})
                        })
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                    
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:'please check your query params,start,rows and userId, they must all be positive numbers'}) 
                }

            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        getFeatureLogs:function(req,res,next){
            try{
                
                let start:number|boolean=typeof Number(req.query.start) === 'number'?Number(req.query.start):false,rows:number|boolean=typeof Number(req.query.rows) === 'string'?Number(req.query.rows):false
                let userId:number | boolean= typeof Number(req.query.userId) === 'number' && Number(req.query.userId)>=0?Number(req.query.userId):false;
                let featureId:number | boolean= typeof Number(req.query.featureId) === 'number' && Number(req.query.featureId)>=0?Number(req.query.featureId):false;
                if(start && userId && rows && featureId){
                    __data.getFeatureLogs(featureId,start,rows).then((results:{count:number,rows:[]})=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(200).send({status:200,data:rows,next:(Number(start)+Number(rows)+1)<results.count?Number(start)+Number(rows)+1:null})
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:'please check your query params,start,rows and userId, they must all be positive numbers'}) 
                }

            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        postLog:function(req,res,next){
            try{
                let user:number | boolean=typeof req.body.user === 'number' && req.body.user>=0?req.body.user:false;
                let description:string | boolean=typeof req.body.description === 'string' && req.body.description.trim().length>3?req.body.description.trim():false;
                let featureId:number | boolean=typeof req.body.featureId === 'number' && req.body.featureId>=0?req.body.featureId:false;
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                
                if(!user) errors.title="user required and must be a number";
                if(!description) errors.description="description required and must be a string";
                if(!projectId) errors.projectId="projectId required and must be a string";

                if(Object.keys(errors).length===0){
                    data={user,description,projectId,featureId}
                    __data.createLog(data).then((results:[])=>{
                        res.setHeader('Content-Type','application/json')
                        res.sendStatus(204)
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:errors})
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
logsHandlers.__inject=['__data','helpers']

export default logsHandlers