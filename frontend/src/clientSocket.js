import io from 'socket.io-client';

export default class socketProxy{
    constructor(url){
        this.url=url
        this.initialized=false;
        this.socket=null;
        this.events=[];
        this.commands=[]
    }
    init(){
        this.socket=io(this.url)
        let interval=setInterval(() => {
            if(this.socket){
                clearInterval(interval)
                this.initialized=true
                this.events.map(obj=>{
                    this.socket.on(obj.e,obj.handler)
                })
                this.commands.map(obj=>{
                    this.socket.emit(obj.e,obj.data)
                })
            }
        }, 1);
    }
    on(e,handler){
        if(!this.initialized){
            this.events.push({e,handler})
        }
        else{
            this.socket.on(e,handler)
        }
        
    }
    emit(e,data){
        if(!this.initialized){
            this.commands.push({e,data})
        }
        else{
            this.socket.emit(e,data)
        }
    }
} 