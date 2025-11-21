"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { gsap } from "gsap";
import RecordRTC from "recordrtc";
// import WebcamVideo from "./videorecording";


function App() {
  const webRef = useRef(null);
  const containerRef = useRef(null);
  const tweenRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);


  const [overlayText, setOverlayText] = useState("");
  const [duration, setDuration] = useState(30);
  const [playing, setPlaying] = useState(false);

  // Camera Adjustable size code
  const [camSize, setCamSize] = useState(400); // default height

  const handleDataAvaliable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => prev.concat(data));
    }
  }, []);


  // -------------------------------------------------------
  // START RECORDING
  // -------------------------------------------------------  
  const handleStartCaptureClick = useCallback(() => {
    if (!webRef.current || !webRef.current.stream) {
      alert("Webcam not ready yet!");
      return;
    }

    setRecording(true);

    mediaRecorderRef.current = RecordRTC(webRef.current.stream, {
      type: "video",
      audio: true
    });

    mediaRecorderRef.current.startRecording();
    mediaRecorderRef.current.ondataavailable = handleDataAvaliable;
  }, [handleDataAvaliable]);
  // }, [webRef, setRecording, mediaRecorderRef, handleDataAvaliable]);



  // -------------------------------------------------------
  // STOP RECORDING
  // -------------------------------------------------------
  const handleStopCaptureClick = useCallback(() => {
    setRecording(false);

    mediaRecorderRef.current.stopRecording(() => {
      const blob = mediaRecorderRef.current.getBlob();
      setRecordedChunks([blob]);
    });
  }, []);



  // -------------------------------------------------------
  // DOWNLOAD VIDEO
  // -------------------------------------------------------
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      // document.body.appendChild(a);
      // a.style = "display: none";
      a.href = url;
      a.download = "teleprompter-recording.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);


  // -----------------------------
  // Auto Scroll Start
  // -----------------------------
  const startAutoScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    // kill previous tween
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    tweenRef.current = gsap.to(container, {
      scrollTop: maxScroll,
      duration: duration,
      ease: "none",
      onComplete: () => setPlaying(false)
    });

    setPlaying(true);
  };

  // -----------------------------
  // Pause scroll
  // -----------------------------
  const pauseAutoScroll = () => {
    if (tweenRef.current) {
      tweenRef.current.pause();
      setPlaying(false);
    }
  };

  // -----------------------------
  // Resume scroll
  // -----------------------------
  const resumeAutoScroll = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
      setPlaying(true);
    }
  };

  // pause when user touches/scrolls manually
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (tweenRef.current && tweenRef.current.isActive()) {
        tweenRef.current.pause();
        setPlaying(false);
      }
    };

    container.addEventListener("wheel", handleScroll);
    container.addEventListener("touchstart", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleScroll);
      container.removeEventListener("touchstart", handleScroll);
    };
  }, []);

  // cleanup
  useEffect(() => {
    return () => tweenRef.current && tweenRef.current.kill();
  }, []);




  return (

    <div className="w-screen h-screen bg-black text-white flex overflow-hidden">

      {/* LEFT SCRIPT EDITOR */}
      <div className="w-[300px] md:w-[380px] h-full bg-[#0f1625] border-r border-purple-800/20 p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Script Editor</h2>

        <textarea
          placeholder="Type your text here..."
          value={overlayText}
          onChange={(e) => setOverlayText(e.target.value)}
          className="w-full flex-1 bg-[#0b1120] border border-purple-800/20 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500"
        />

        <div className="mt-4 flex flex-col gap-2">
          <button className="bg-purple-600 hover:bg-purple-700 py-2 rounded-lg">Magic Polish ✨</button>
        </div>
      </div>

      {/* RIGHT PREVIEW PANEL */}
      <div className="flex-1 flex flex-col relative bg-black">

        {/* CAMERA FRAME */}
        <div className="relative w-full h-[45%] border-b border-purple-900/30 flex items-center justify-center">


          {/* <div
        style={{
          position: "relative",
          // width: "600px",
          // height: "600px",
          width: "700px",
          height: "529px",
          border: "2px solid black",
          overflow: "hidden",
          borderRadius: "10px",

        }}
> */}
          {/* <div className="w-auto h-80vh flex items-center justify-center">
        <Webcam
          ref={webRef}
          onUserMedia={(stream) => { webRef.current.stream = stream; }}
          className="w-[90%] h-[90%] object-cover rounded-xl"
          //           style={{
          //   display: "flex",
          //   alignItems: "center",
          //   width: "100%",
          //   height: "100%",
          //   objectFit: "contain",
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          //   zIndex: 1
          // }}
        />

      </div> */}

        </div>




  
{/* fixed relative static absolute  */}

        <div className="w-full h-full  ">

         <Webcam
            ref={webRef}
            audio={true}
            onUserMedia={(stream) => { webRef.current.stream = stream; }}
            className="
                  relative
                  left-[5%] right-[5%]
                  top-[10%] bottom-[10%]
                  overflow-y-auto
                  text-white text-2xl leading-relaxed
                  p-6 
                  rounded-3xl
            w-[90%] h-[90%] object-contain rounded-xl bg-black "
          />

        <div
          ref={containerRef}
          className="
                  absolute 
                  left-[30%] right-[30%]
                  top-[15%] bottom-[5%]
                  overflow-y-auto
                  text-white text-2xl leading-relaxed
                  p-6 
                  rounded-3xl
                  backdrop-blur-
                "
          style={{
background: "linear-gradient(to bottom right,rgba(99,102,241,0.3), rgba(139,92,246,0.25))"
 ,  // Tailwind purple-600 at 25% opacity

            whiteSpace: "pre-wrap",
          }}
        > {overlayText}

        </div>
      </div>










        {/* BOTTOM CONTROLS */}
        <div className="w-full h-[70px] bg-[#080b12] border-t border-purple-700/20 flex items-center px-6 gap-8 absolute">

          <button onClick={startAutoScroll} className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
            ▶ Start
          </button>

          <button onClick={pauseAutoScroll} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            ❚❚ Pause
          </button>

          <button onClick={resumeAutoScroll} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            ► Resume
          </button>

          <div className="flex items-center gap-3 ml-10">
            <span className="text-xs text-gray-400">Scroll Speed</span>
            <input
              type="range"
              min={5}
              max={120}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-40"
            />
          </div>

          {/* RECORDING BUTTONS */}
          {recording ? (
            <button onClick={handleStopCaptureClick} className="ml-auto px-4 py-2 bg-red-600 rounded-lg">
              ⏹ Stop
            </button>
          ) : (
            <button onClick={handleStartCaptureClick} className="ml-auto px-4 py-2 bg-green-600 rounded-lg">
              ⏺ Record
            </button>
          )}

          {recordedChunks.length > 0 && (
            <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 rounded-lg">
              ⬇ Download
            </button>
          )}

        </div>
      </div>
    </div>
  );

}

export default App;