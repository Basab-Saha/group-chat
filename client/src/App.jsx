import React, { useEffect, useState } from 'react'
import io from "socket.io-client"

const socket=io("http://localhost:5000")
const App = () => {

const[username,setUserName]=useState("");

const[chatActive , setChatActive]=useState(false);

const[messages , setMessages]=useState([]);
const[newMessage,setNewMessage]=useState("");


useEffect( ()=>{

  socket.on("recieve-message",(message)=>{
    setMessages([...messages,message]);
      //frontend side a console korchi (mane browser er console a)
  })
  console.log(messages);
},[messages,socket])

const handleSubmit=(e)=>{
  e.preventDefault();

  const messageData={
    message:newMessage,
    user:username,
    time : new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
  }
setNewMessage("");
  !newMessage=="" ?  socket.emit("send-message",messageData) :
  alert("Type some message!")
 ;
}

  return (
    <>
    <div className='w-screen h-screen bg-gray-200 flex justify-center items-center'>
     {chatActive? 


     <div>

      <h1 className='text-center text-2xl font-bold mb-10'>Squad Chat</h1>

       {/*Message div*/ }
      <div className='overflow-scroll h-[80vh] lg:h-[60vh]'>

        {
          messages.map((singleMsg,i)=>{
           return(
            <div key={i} className={`flex px-3 py-3 gap-2 shadow-xl w-fit rounded-md ${username===singleMsg.user && "ml-auto"}`}>

              <div className='bg-green-400 text-lg px-4 py-2 rounded-sm items-center'>
              <h3>{singleMsg.user.charAt(0).toUpperCase()}</h3>
              </div>
            <div>
            <h3 className='font-bold'>{singleMsg.user}</h3>
              <h3>{singleMsg.message}</h3>
              <h3 className='text-right'>{singleMsg.time}</h3>
              </div>
          
          </div>
           )
          })
        }

      </div>

    {/*Message type div */}
      <form onSubmit={handleSubmit} className='flex gap-3'>
        <input type='text' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className='w-full px-3 py-2 rounded-md' placeholder='type your msg here'/> 
        <button className='bg-green-500 px-3 py-2 rounded-md' type='submit'>Send</button>
      </form>

      </div> 
      
      
      :

      <div className='w-screen h-screen flex justify-center items-center gap-2'>
        <input type="text" name='' value={username} onChange={(e)=>setUserName(e.target.value)} id='' className='text-center px-3 py-2 outline-none border-2  rounded-md'/>
        <button type='submit' onClick={ ()=> !username=="" && setChatActive(true)} className='bg-green-500 px-3 py-2'>Start chat</button>
      </div>
      
      }
    </div>
    </>
  )
}

export default App