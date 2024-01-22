import { Clock, Play } from "lucide-react";
import React, { useState } from "react";
import Countdown from "react-countdown";

function Timer() {
  const [displayClock, setDisplayClock] = useState<boolean>(false);

  const [workCounting, setWorkCounting] = useState<boolean>(false);
  const [breakCounting, setBreakCounting] = useState<boolean>(false);
  
  const audio = new Audio("/sounds/clock.mp3");
  
  const startWorkTimer = () => {
    setWorkCounting(true);
  };

  const stopWorkTimer = () => {
    setWorkCounting(false);
    audio.pause();
  };

  const workTimeIsUp = () => {
    console.log("Work time is up");
    audio.volume = 0.5;
    audio.play();
  };

  const startBreakTimer = () => {
     setBreakCounting(true);
   };
 
   const stopBreakTimer = () => {
     setBreakCounting(false);
     audio.pause();
   };

  const breakTimeIsUp = () => {
     console.log("Work time is up");
     audio.volume = 0.5;
     audio.play();
   };

   return (
     <div>
       {displayClock ? (
  <div className="fixed bottom-0 right-0 bg-gray-800 rounded-2xl text-gray-100 transition-all p-3 shadow-lg">
    <div className="grid grid-cols-2 gap-4 items-center">
      <div onClick={() => {
            setDisplayClock(false); 
            startWorkTimer();
          }}  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 cursor-pointer p-4 rounded-xl">
        <p className="text-lg font-semibold">Work Timer</p>
        <Play 
          size={32}
          className="text-green-500 " 
        />
      </div>
      <div 
          onClick={() => {
            setDisplayClock(false); 
            startBreakTimer();
          }}  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 cursor-pointer p-4 rounded-xl">
        <p className="text-lg font-semibold">Break Timer</p>
        <Play 
          size={32} 
          className="text-purple-500 hover:text-purple-400 cursor-pointer"
        />
      </div>
    </div>
  </div>
) : (
  <div 
    onClick={() => setDisplayClock(true)}
    className="fixed bottom-0 cursor-pointer right-0 bg-gray-800 rounded-2xl text-gray-100 transition-all p-6 shadow-lg"
  >
    <Clock size={32} className="text-blue-400" />
  </div>
)}
   
       {workCounting && (
         <div className="fixed flex gap-4 items-center right-0 top-0 p-3 right-2 top-2 p-3 bg-gray-800 text-gray-100 rounded-lg shadow-2xl">
           <Countdown
             date={Date.now() + 90 * 60 * 1000} // 90 minutter i millisekunder
             intervalDelay={0}
             precision={3}
             onComplete={() => workTimeIsUp()}
             renderer={({ hours, minutes, seconds }) => (
               <div>
                 {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
               </div>
             )}
           />
           <span 
             className="bg-red-800 text-gray-100 rounded-full px-3 py-1 cursor-pointer hover:bg-red-700" 
             onClick={stopWorkTimer}
           >
             X
           </span>
         </div>
       )}
   
       {breakCounting && (
         <div className="fixed flex gap-4 items-center right-2 top-2 p-3 bg-gray-800 text-gray-100 rounded-lg shadow-2xl">
           <Countdown
             date={Date.now() + 15 * 60 * 1000} // 15 minutter i millisekunder
             intervalDelay={0}
             precision={3}
             onComplete={() => breakTimeIsUp()}
             renderer={({ hours, minutes, seconds }) => (
               <div>
                 {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
               </div>
             )}
           />
           <span 
             className="bg-red-800 text-gray-100 rounded-full px-3 py-1 cursor-pointer hover:bg-red-700" 
             onClick={stopBreakTimer}
           >
             X
           </span>
         </div>
       )}
     </div>
   );
   
}

export default Timer;
