/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState , useRef, useEffect } from "react"
import { vapi } from "@/lib/vapi";

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [callEnd, setCallEnded] = useState(false);

  const { user } = useUser();
  const router = useRouter();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  //auto scroll setup for message Container : 
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
   },[messages])

  //navigate user to profile page after call ends : 
  useEffect(() => {
    if (callEnd) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(redirectTimer);
     }
  }, [callEnd, router]);
  
  //Vapi Event Listeners : 
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call Started");
      setCallActive(true);
      setCallEnded(false);
      setConnecting(false);
    }
    
    const handleCallEnd = () => {
      console.log("Call Ended");
      setCallActive(false);
      setCallEnded(true);
      setIsSpeaking(false);
      setConnecting(false);
    }
    
    const handleSpeechStart = () => {
      console.log("AI Started Speaking");
      setIsSpeaking(true);
    }

    const handleSpeechEnd = () => { 
      console.log("AI Stopped Speaking");
      setIsSpeaking(false);
    }
    
    const handleMessage = (message: any) => { 
      console.log("Message Received", message);
    }

    const handleError = (error: any) => {
      console.log("Error", error);
      setConnecting(false);
      setCallActive(false);
     }

    vapi.on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
    .on("error", handleError)

    return () => {
      vapi.off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    }
  }, [])
  
  //Toggle Call Function : 
  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    }
    else{
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const fullName = user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "There";
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID as string, {
          variableValues:{
            full_name: fullName
          }
        })

      } catch (error : any) {
        console.error("Error starting call:", error);
        setConnecting(false);
      }
    }
  }

  //UI : 
  return(
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Title  */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            <span className="pr-3">Generate Your</span>
            
            <span className="text-primary uppercase">fitness Program</span>
          </h1>
          <p className="text-muted-forground mt-2">
            Have a voice conversation with our AI  assistant to create your personalized fitness plan 
          </p>
        </div>
      </div>
    </div>
  )
}

export default GenerateProgramPage