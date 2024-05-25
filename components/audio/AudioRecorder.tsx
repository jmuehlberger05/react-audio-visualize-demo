"use client";

import { useEffect, useState } from "react";
// @ts-ignore
import { LiveAudioVisualizer } from "react-audio-visualize";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getMicrophoneStream = async (): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (err) {
    console.error("Error accessing microphone:", err);
    throw err;
  }
};

interface AudioRecorderProps {
  recording: boolean;
  visualizer?: boolean;
  width?: number;
  height?: number;
  barWidth?: number;
  barColor?: string;
  smoothingTimeConstant?: number;
  fftSize?: number;
  className?: string;
  visualizerClassName?: string;
  maxDecibels?: number;
  router?: AppRouterInstance;
  onMicrophoneDenied?: (error: any) => void;
  mirrored?: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  recording,
  visualizer = true,
  width = 150,
  height = 70,
  barWidth = 8,
  barColor = "rgb(255, 255, 255)",
  smoothingTimeConstant = 0.4,
  fftSize = 128,
  className = "",
  visualizerClassName = "",
  maxDecibels = 100,
  router,
  onMicrophoneDenied,
  mirrored = false,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Setup media recorder and audio context
  useEffect(() => {
    const setupRecorder = async () => {
      try {
        const stream = await getMicrophoneStream();
        const recorder = new MediaRecorder(stream);
        const audioCtx = new AudioContext();

        setMediaRecorder(recorder);
        setAudioContext(audioCtx);
      } catch (err) {
        console.error("Error setting up media recorder:", err);
      }
    };

    setupRecorder();

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start/stop recording
  useEffect(() => {
    if (!mediaRecorder) return;

    const handleDataAvailable = (event: BlobEvent) => {
      // Process audio data if needed
    };

    mediaRecorder.ondataavailable = handleDataAvailable;

    if (recording) {
      mediaRecorder.start();
      console.log("Recording started");
    } else {
      mediaRecorder.stop();
      console.log("Recording stopped");
    }

    return () => {
      mediaRecorder.ondataavailable = null;
    };
  }, [recording, mediaRecorder]);

  return (
    <div className={className}>
      {mirrored && visualizer && recording && mediaRecorder && audioContext && (
        <div className={`flex items-end gap-[1.5px]`}>
          <div className={`rotate-180 mb-[-1px] ${visualizerClassName}`}>
            <LiveAudioVisualizer
              mediaRecorder={mediaRecorder}
              audioContext={audioContext}
              width={width / 2}
              height={height}
              barWidth={barWidth}
              barColor={barColor}
              smoothingTimeConstant={smoothingTimeConstant}
              fftSize={fftSize}
              maxDecibels={maxDecibels}
            />
          </div>
          <div>
            <LiveAudioVisualizer
              mediaRecorder={mediaRecorder}
              audioContext={audioContext}
              width={width / 2}
              height={height}
              barWidth={barWidth}
              barColor={barColor}
              smoothingTimeConstant={smoothingTimeConstant}
              fftSize={fftSize}
              className={visualizerClassName}
              maxDecibels={maxDecibels}
            />
          </div>
        </div>
      )}
      {!mirrored &&
        visualizer &&
        recording &&
        mediaRecorder &&
        audioContext && (
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            audioContext={audioContext}
            width={width}
            height={height}
            barWidth={barWidth}
            barColor={barColor}
            smoothingTimeConstant={smoothingTimeConstant}
            fftSize={fftSize}
            className={visualizerClassName}
            maxDecibels={maxDecibels}
          />
        )}
    </div>
  );
};

export default AudioRecorder;
