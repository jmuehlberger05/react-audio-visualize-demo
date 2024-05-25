"use client";

import AudioRecorder from "@/components/audio/AudioRecorder";
import { useState } from "react";

function Page() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <main className="w-full min-h-dvh bg-gray-200 p-4">
      <h1 className="text-2xl text-center pb-10">AudioRecorder.tsx</h1>
      <div className="w-full flex flex-col gap-10 items-center justify-center">
        <div className="h-[400px] w-[500px] bg-white flex justify-center rounded-xl">
          <AudioRecorder
            recording={isRecording}
            height={400}
            width={400}
            barWidth={7}
            fftSize={1024}
            maxDecibels={-20}
            barColor="rgb(0,0,0)"
            mirrored
          />
        </div>
        <div className="flex justify-between w-[500px]">
          <pre className="w-[300px]">
            {"recording={isRecording}"}
            <br />
            {"height={400}"}
            <br />

            {"width={400}"}
            <br />

            {"barWidth={7}"}
            <br />

            {"fftSize={1024}"}
            <br />

            {"maxDecibels={-20}"}
            <br />

            {"barColor='rgb(0,0,0)'"}
            <br />

            {"mirrored"}
          </pre>
          <button
            className="start-recording bg-white px-6 py-2 rounded-xl shadow-md h-fit"
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Page;
