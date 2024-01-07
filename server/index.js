const express=require("express")
const app=express();

const http=require("http");
//backend emni emni baire (frontend theke) req allow
//kore na..so we have to use cors library
const cors=require("cors")

//server namer ekta class hoi...we will use it from socket
const {Server} =require("socket.io")
// mone rekho , socket.io r server , express server
//theke ektu alada hoi

app.use(cors());

// created a node.js server
const server=http.createServer(app);

// inside io we will make our socket.io server 
const io=new Server(server,{
 cors:{
        origin:"http://localhost:5174", // vite app er port 
        methods:["GET","POST"]  //socket er server a get ar post req asbe
    }
})


// io will recive socket (chat) sei socket er ekta id thakbe (kon user aslo)
io.on("connection",(socket)=>{
    console.log(`User connected ${socket.id}`)


    socket.on("send-message",(message)=>{
        //console.log(message);
        io.emit("recieve-message",message);
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected")
    })
})

//ebar server ke listen korbo
server.listen(5000,()=>{
    console.log("Server running at port 5000")
})

