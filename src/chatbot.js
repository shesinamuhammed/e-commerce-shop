import React from 'react'
import ChatBot from 'react-simple-chatbot';
export default function Chatbot  ()  {
  const config ={
    width: "400px",
    height: "500px",
    floating: true,
  };
  return (
    <ChatBot 
    steps={[
        {
         id:'intro', 
         message:'Hii..How can I help you', 
         trigger:'intro-user',
        },
        {
         id:'intro-user', 
         user:true,  
        
        trigger:'place'
        },
        {
            id:'place', 
            message:'You can place an order by connecting this WhatsApp number. 9786677889', 
            trigger:'order'
           },
           {
            id:'order', 
            message:'Do you wish to order', 
            trigger:'intro-user1',
           },
           {
            id:'intro-user1', 
            options:[
              {value:'y', label:'Yes', 
             trigger:'yes-response'
            },
              {value:'n', label:'No', 
             trigger:'no-response'
            },
            ] 
           },
           {
            id:'yes-response', 
            message:'Great!', 
            end:true,
           },
           {
            id:'no-response', 
            message:'Sorry to hear that.', 
            end:true,
           },
       ]}
       {...config}
   />
  )
}

