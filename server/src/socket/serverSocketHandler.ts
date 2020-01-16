import { Socket } from "socket.io";

function serverSocketFactory(__data:{[key:string]:any}){
    return function serverSocketHandler(socket:Socket,io:Socket,connections:{[key:string]:Socket}){
        socket.on('register',function(data:{ip:string}){
          connections[data.ip]=socket  
        })
        socket.on('message',function(data:{[key:string]:string}){
            if(connections[data.to]){
                connections[data.to].emit('message',data)
                __data.saveMessage(data).then((status:boolean)=>{

                }).catch((status:boolean)=>{
                    
                })
            }
            else{
                __data.saveMessage(data).then((status:boolean)=>{

                }).catch((status:boolean)=>{

                })
            }
        })
    }
}
serverSocketFactory.__inject=['__data']


export default serverSocketFactory