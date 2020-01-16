import { Socket } from "socket.io";

const connections:{[key:string]:Socket}={}
export default connections