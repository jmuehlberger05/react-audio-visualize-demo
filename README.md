## AudioRecorder

`components/audio/AudioRecorder.tsx`

### Einführung

Die `AudioRecorder`-Komponente in React ermöglicht es Benutzern, Audioaufnahmen direkt im Browser zu erstellen und eine Echtzeit-Audio-Visualisierung anzuzeigen. Diese Komponente verwendet die `MediaRecorder` API und die `LiveAudioVisualizer`-Bibliothek von `react-audio-visualize`.

Der AudioRecorder handelt dabei alle Aspekte der Aufnahme.

- Permissions
- Recording
- Visualisierung

<p align="center >
  <img src="https://prod-files-secure.s3.us-west-2.amazonaws.com/780e0c0a-feda-42e8-8e71-f224dcfdff19/2797d900-e9c2-46e9-827d-8ed9f904059b/Untitled.png">
</p> 


AudioRecorder Demo Page

### Installation

Stellen Sie sicher, dass Sie die `react-audio-visualize`-Bibliothek installiert haben:

```bash
npm install react-audio-visualize
```

| Eigenschaft | Typ | Standardwert | Beschreibung |
| --- | --- | --- | --- |
| recording | boolean | - | Gibt an, ob die Aufnahme läuft. |
| visualizer | boolean | true | Zeigt den Audio-Visualizer an, wenn true. |
| width | number | 150 | Breite des Audio-Visualizers. |
| height | number | 70 | Höhe des Audio-Visualizers. |
| barWidth | number | 8 | Breite der Balken im Audio-Visualizer. |
| barColor | string | "rgb(255, 255, 255)" | Farbe der Balken im Audio-Visualizer. |
| smoothingTimeConstant | number | 0.4 | Glättungskonstante für den Audio-Visualizer. |
| fftSize | number | 128 | FFT-Größe für den Audio-Visualizer. |
| className | string | "" | CSS-Klasse für das umgebende div-Element. |
| visualizerClassName | string | "" | CSS-Klasse für den Audio-Visualizer. |
| maxDecibels | number | 100 | Maximale Dezibelwerte für den Audio-Visualizer. |

### Verwendung

Der Component könnte wie folgt benutzt werden, um Live Audio zu visualisieren.

```tsx
"use client";

import AudioRecorder from "@/components/audio/AudioRecorder";
import { useState } from "react";

function Page() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      <AudioRecorder
        recording={isRecording}
        height={400}
        width={400}
        barWidth={7}
        fftSize={1024}
        maxDecibels={-20}
        barColor="rgb(0,0,0)"
      />

      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </>
  );
}

export default Page;

```
