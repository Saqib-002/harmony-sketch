import { useEffect, useMemo, useState } from "react";
import * as Tone from "tone";
import MelodyPanel from "./MelodyPanel";
import type { PlayedNote } from "../../types";
import { generatePianoKeys } from "../../lib/pianoUtils";

const MelodyCanvas = () => {
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [playedNotes, setPlayedNotes] = useState<PlayedNote[]>([]);
  const [selectedScale, setSelectedScale] = useState<string>("chromatic");
  const [selectedOctave, setSelectedOctave] = useState<number>(4);
  const pianoKeys = useMemo(() => {
    return generatePianoKeys(selectedScale, selectedOctave);
  }, [selectedScale, selectedOctave]);
  useEffect(() => {
    const pianoSampler = new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    setSampler(pianoSampler);

    return () => {
      pianoSampler.dispose();
    };
  }, []);
  const handleKeyClick = async (note: string, midi: number) => {
    await Tone.start();
    if (sampler) {
      sampler.triggerAttackRelease(Tone.Midi(midi).toNote(), "8n");
      setPlayedNotes((prev) => [...prev, { note, time: Date.now() }]);
    }
  };
  const handleScaleChange = (scale: string) => {
    setSelectedScale(scale);
  };

  const handleOctaveChange = (octave: number) => {
    setSelectedOctave(octave);
  };
  return (
    <div className="col-span-2 bg-primary-900 rounded-lg px-6 py-4">
      <p className="text-white font-semibold text-2xl">MelodyCanvas</p>
      <MelodyPanel
        selectedScale={selectedScale}
        selectedOctave={selectedOctave}
        onScaleChange={handleScaleChange}
        onOctaveChange={handleOctaveChange}
      />
      <div className="relative flex w-full overflow-x-auto justify-center">
        <div className="flex">
          {pianoKeys.map((key) => (
            <button
              key={key.midi}
              className={`border text-xs border-gray-700 rounded-xs focus:outline-none
                ${
                  key.isBlack
                    ? "bg-black text-white h-24 w-8 z-10 mx-[-16px]"
                    : "bg-white text-black h-36 w-10 z-0 flex flex-col items-center justify-end pb-2"
                }`}
              style={{
                marginLeft: key.isBlack ? "-16px" : "0",
                marginRight: key.isBlack ? "-16px" : "0",
              }}
              onClick={() => handleKeyClick(key.note, key.midi)}
              title={key.note}
            >
              {key.note}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-white font-semibold text-lg">Played Notes</p>
        <div className="bg-primary-800 p-4 rounded-lg min-h-[100px] flex flex-wrap gap-2">
          {playedNotes.length === 0 ? (
            <p className="text-gray-400">No notes played yet.</p>
          ) : (
            playedNotes.map((note, index) => (
              <span
                key={index}
                className="bg-primary-700 text-white px-2 py-1 rounded"
              >
                {note.note}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MelodyCanvas;
