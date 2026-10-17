import { useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import { getFallbackReply } from "./chatbotUtils";


function Chatbot() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm Vimal's AI assistant. Ask me about my skills, projects, or experience."
    }
  ]);


  const [input, setInput] = useState("");


  const sendMessage = async () => {

    if (!input.trim()) return;

    const question = input.trim();

    setMessages(prev => [
      ...prev,
      {
        role:"user",
        text:question
      }
    ]);

    setInput("");

    try {
      const response = await fetch(
        "https://vimal-ai-portfolio.onrender.com/chat",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({ question })
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const data = await response.json();
      const answer = data?.answer || getFallbackReply(question);

      setMessages(prev=>[
        ...prev,
        {
          role:"bot",
          text:answer
        }
      ]);

    } catch {
      setMessages(prev=>[
        ...prev,
        {
          role:"bot",
          text:getFallbackReply(question)
        }
      ]);
    }
  };


  return (

    <>

    {/* Floating button */}

    {!open && (

      <button

        onClick={()=>setOpen(true)}

        className="fixed bottom-6 right-6 bg-cyan-500 text-black p-5 rounded-full shadow-xl"

      >

        <FaRobot size={30}/>

      </button>

    )}



    {/* Chat window */}

    {open && (

    <div className="fixed bottom-6 right-6 w-96 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">


      <div className="bg-cyan-500 text-black p-4 flex justify-between items-center">

        <div className="flex gap-2 items-center">

          <FaRobot/>

          <b>Vimal AI Assistant</b>

        </div>


        <button onClick={()=>setOpen(false)}>

          <FaTimes/>

        </button>

      </div>



      <div className="h-96 overflow-y-auto p-4 space-y-3">

        {messages.map((msg,index)=>(

          <div
            key={index}
            className={
              msg.role==="user"
              ?
              "bg-cyan-500 text-black p-3 rounded-xl ml-10"
              :
              "bg-slate-800 p-3 rounded-xl mr-10"
            }
          >

            {msg.text}

          </div>

        ))}

      </div>



      <div className="flex p-3 border-t border-slate-700">

        <input

          value={input}

          onChange={(e)=>setInput(e.target.value)}

          onKeyDown={(e)=>{
            if(e.key==="Enter") sendMessage();
          }}

          placeholder="Ask about Vimal..."

          className="flex-1 bg-slate-800 p-3 rounded-xl"

        />


        <button

          onClick={sendMessage}

          className="ml-2 bg-cyan-500 text-black px-4 rounded-xl"

        >

          <FaPaperPlane/>

        </button>


      </div>


    </div>

    )}

    </>

  );

}


export default Chatbot;