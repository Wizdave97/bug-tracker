import e = require("express")


export type handlers = {
    getLogs:e.RequestHandler;
    getLog:e.RequestHandler;
    postLog:e.RequestHandler;
    putLog:e.RequestHandler;
    deleteLog:e.RequestHandler;
}

function logsHandlers(__data:{[key:string]:any},helpers:{[key:string]:any}):handlers{
    
    const handlers:handlers={
        getLogs:function(req,res,next){
            try{
                let start:number|boolean=typeof Number(req.query.start) === 'number'?Number(req.query.start):false,rows:number|boolean=typeof Number(req.query.rows) === 'string'?Number(req.query.rows):false
                let userId:number | boolean= typeof Number(req.query.userId) === 'number' && Number(req.query.userId)>=0?Number(req.query.userId):false;
                if(start && userId && rows){
                    __data.getLogs(start,rows).then((results:{count:number,rows:[]})=>{
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
        getLog:function(req,res,next){
            try{
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let id:number | boolean=typeof req.body.id === 'number' && req.body.id>=0?req.body.id:false;
                if(userId && id ){
                    __data.getLog(id).then((row:{[key:string]:any})=>{
                        if(row.user===userId){
                            res.setHeader('Content-Type','application/json')
                            res.status(200).send({status:200,data:row})
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(403).send({status:403,error:'Access denied'})  
                        }
                    }).catch((err:any)=>{
                        res.setHeader('Content-Type','application/json')
                        res.status(500).send({status:500,error:'An unknown error occured'})
                    })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:'please check your query params,id and userId, they must be positive numbers'}) 
                }
                
            }
            catch(err){
                res.setHeader('Content-Type','application/json')
                res.status(500).send({status:500,error:'An unknown error occured'})
            }

        },
        postLog:function(req,res,next){
            try{
                
                let title:string | boolean=typeof req.body.title === 'string' && req.body.title.trim().length>3?req.body.title.trim():false;
                let description:string | boolean=typeof req.body.description === 'string' && req.body.description.trim().length>3?req.body.description.trim():false;
                let status:string | boolean=typeof req.body.status === 'string' && req.body.status.trim().length>1?req.body.status.trim():false;
                let creator:number | boolean=typeof req.body.creator === 'number' && req.body.creator>=0?req.body.creator:false;
                let edd:string |boolean=typeof req.body.edd === 'string' && req.body.edd.trim().length===10?req.body.edd.trim():false;
                let type:number | boolean=typeof req.body.type === 'number' && (req.body.type===0 || req.body.type===1)?req.body.type:false;
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let contributor:number | boolean=typeof req.body.contributor === 'number' && req.body.contributor>=0?req.body.contributor:false;
                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                
                if(!title) errors.title="title required and must be a string";
                if(!description) errors.description="description required and must be a string";
                if(!status) errors.status="status required and must be a string";
                if(!creator) errors.creator="creator required and must be a number";
                if(!edd) errors.ecd="ecd required and must be a date string";
                if(!type) errors.type="type required and must be 0 or 1";
                if(!projectId) errors.projectId="projectId required and must be a number";
                if(!contributor) errors.contributor="contributor required and must be a number";

                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,edd,type,projectId,contributor}
                    __data.createFeature(data).then((results:[])=>{
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

        },
        putLog:function(req,res,next){
            try{
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let id:number | boolean=typeof req.body.id === 'number' && req.body.id>=0?req.body.id:false;
                let title:string | boolean=typeof req.body.title === 'string' && req.body.title.trim().length>3?req.body.title.trim():false;
                let description:string | boolean=typeof req.body.description === 'string' && req.body.description.trim().length>3?req.body.description.trim():false;
                let status:string | boolean=typeof req.body.status === 'string' && req.body.status.trim().length>1?req.body.status.trim():false;
                let creator:number | boolean=typeof req.body.creator === 'number' && req.body.creator>=0?req.body.creator:false;
                let edd:string |boolean=typeof req.body.edd === 'string' && req.body.edd.trim().length===10?req.body.edd.trim():false;
                let type:number | boolean=typeof req.body.type === 'number' && (req.body.type===0 || req.body.type===1)?req.body.type:false;
                let projectId:number | boolean=typeof req.body.projectId === 'number' && req.body.projectId>=0?req.body.projectId:false;
                let contributor:number | boolean=typeof req.body.contributor === 'number' && req.body.contributor>=0?req.body.contributor:false;
                let data:{[key:string]:any}={}, errors:{[key:string]:any}={}
                
                if(!id) errors.id="id of project required and must be a number";
                if(!title) errors.title="title required and must be a string";
                if(!description) errors.description="description required and must be a string";
                if(!status) errors.status="status required and must be a string";
                if(!creator) errors.creator="creator required and must be a number";
                if(!edd) errors.ecd="ecd required and must be a date string";
                if(!type) errors.type="type required and must be 0 or 1";
                if(!projectId) errors.projectId="projectId required and must be a number";
                if(!contributor) errors.contributor="contributor required and must be a number";
                if(!userId) errors.userId="userId required and must be a number";
                if(Object.keys(errors).length===0){
                    data={title,description,status,creator,edd,type,contributor,projectId}
                    __data.getLog(id).then((row:{[key:string]:any})=>{
                    
                        if(row.contributor===userId || row.creator===userId){
                            __data.updateFeature(data).then((results:[])=>{
                                res.setHeader('Content-Type','application/json')
                                res.sendStatus(204)
                            }).catch((err:any)=>{
                                res.setHeader('Content-Type','application/json')
                                res.status(500).send({status:500,error:'An unknown error occured'})
                            })
                        }
                        else{
                            res.setHeader('Content-Type','application/json')
                            res.status(403).send({status:500,error:'Access denied, not an admin or contributor'}) 
                        }
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
        },
        deleteLog:function(req,res,next){
            try{
                let userId:number | boolean= typeof req.body.userId === 'number' && req.body.userId>=0?req.body.userId:false
                let id:number | boolean=typeof req.body.id === 'number' && req.body.id>=0?req.body.id:false;
                if(userId && id ){
                   __data.getLog(id).then((obj:{[key:string]:any})=>{
                        if(obj.creator===userId){
                            __data.deleteLog(id).then(()=>{
                                res.setHeader('Content-Type','application/json') 
                                res.status(204).send({status:204})
                            }).catch(()=>{
                                res.setHeader('Content-Type','application/json')
                                res.status(500).send({status:500,error:'An unknown error occured while trying to delete'})
                            })
                              
                        }
                       else{
                        res.setHeader('Content-Type','application/json') 
                        res.status(403).send({status:2403,error:'Access denied'}) 
                       }
                   }).catch((err:any)=>{
                    res.setHeader('Content-Type','application/json')
                    res.status(500).send({status:500,error:'An unknown error occured'}) 
                   })
                }
                else{
                    res.setHeader('Content-Type','application/json')
                    res.status(405).send({status:405,error:'id and userId required'})
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