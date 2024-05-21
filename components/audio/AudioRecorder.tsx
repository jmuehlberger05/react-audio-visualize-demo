import { useEffect, useState } from "react";
// @ts-ignore
import { LiveAudioVisualizer } from "react-audio-visualize";

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
      {visualizer && recording && mediaRecorder && audioContext && (
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
