import * as Tone from 'tone';
import { PIANO_SCALES } from "../contants";
import type { PianoKey } from "../types";

const generateFullPianoKeys = (): PianoKey[] => {
  const keys: PianoKey[] = [];
  const startMidi = 21; // A0
  const endMidi = 108;  // C8

  for (let midi = startMidi; midi <= endMidi; midi++) {
    const note = Tone.Midi(midi).toNote();
    const isBlack = note.includes('#');

    keys.push({
      note,
      midi,
      isBlack,
    });
  }
  return keys;
};

const fullPianoKeys = generateFullPianoKeys();

export const generatePianoKeys = (scale: string, centralOctave: number): PianoKey[] => {
  const selectedScaleNotes = PIANO_SCALES[scale];
  if (!selectedScaleNotes) {
    return [];
  }

  // Determine the range of octaves to display (e.g., 1 octaves below to 1 octaves above)
  const octaveRangeStart = centralOctave - 1;
  const octaveRangeEnd = centralOctave + 1;

  // Filter keys based on the selected scale and the expanded octave range
  return fullPianoKeys.filter(key => {
    const [noteName, noteOctave] = key.note.match(/([A-G]#?)([0-8])/)!.slice(1);
    const noteOctaveNumber = parseInt(noteOctave);
    
    // Check if the key's note is in the selected scale AND its octave is within the expanded range
    return selectedScaleNotes.includes(noteName) && 
           noteOctaveNumber >= octaveRangeStart && 
           noteOctaveNumber <= octaveRangeEnd;
  });
};