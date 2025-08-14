import { useEffect, useMemo, useState } from "react";
import * as Tone from "tone";
import MelodyPanel from "./MelodyPanel";
import type { InstrumentType, PlayedNote } from "../../types";
import { generatePianoKeys } from "../../lib/pianoUtils";
import { INSTRUMENT_CONFIGS } from "../../contants";

type MelodyCanvasProps = {
  playedNotes: PlayedNote[];
  setPlayedNotes: React.Dispatch<React.SetStateAction<PlayedNote[]>>;
};


const MelodyCanvas = ({
  playedNotes,
  setPlayedNotes,
}: MelodyCanvasProps) => {
  const [instrument, setInstrument] = useState<
    Tone.Sampler | Tone.Synth | null
  >(null);
  const [selectedScale, setSelectedScale] = useState<string>("chromatic");
  const [selectedOctave, setSelectedOctave] = useState<number>(4);
  const [selectedInstrument, setSelectedInstrument] =
    useState<InstrumentType>("piano");
  const pianoKeys = useMemo(() => {
    return generatePianoKeys(selectedScale, selectedOctave);
  }, [selectedScale, selectedOctave]);
  useEffect(() => {
    let newInstrument: Tone.Sampler | Tone.Synth | null = null;
    if (selectedInstrument === "piano") {
      const config = INSTRUMENT_CONFIGS[selectedInstrument];
      newInstrument = new Tone.Sampler({
        urls: config.urls,
        baseUrl: config.baseUrl,
      }).toDestination();
    } else {
      const config = INSTRUMENT_CONFIGS[selectedInstrument];
      newInstrument = config.create();
    }
    setInstrument(newInstrument);
    return () => {
      if (newInstrument) {
        newInstrument.dispose();
      }
    };
  }, [selectedInstrument]);
  const handleKeyClick = async (note: string, midi: number) => {
    await Tone.start();
    if (instrument) {
      instrument.triggerAttackRelease(Tone.Midi(midi).toNote(), "8n");
      setPlayedNotes((prev) => [...prev, { note, time: Date.now() }]);
    }
  };
  const handleScaleChange = (scale: string) => {
    setSelectedScale(scale);
  };

  const handleOctaveChange = (octave: number) => {
    setSelectedOctave(octave);
  };
  const handleInstrumentChange = (instrument: InstrumentType) => {
    setSelectedInstrument(instrument);
  };
  return (
    <div className="col-span-2 bg-primary-900 rounded-lg px-6 py-4">
      <p className="text-white font-semibold text-2xl">MelodyCanvas</p>
      <MelodyPanel
        selectedScale={selectedScale}
        selectedOctave={selectedOctave}
        selectedInstrument={selectedInstrument}
        onScaleChange={handleScaleChange}
        onOctaveChange={handleOctaveChange}
        onInstrumentChange={handleInstrumentChange}
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
