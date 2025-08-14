import type { User } from "firebase/auth";
import * as Tone from "tone";
// Interface for a piano key
export interface PianoKey {
  note: string;
  isBlack: boolean;
  midi: number;
}
// Interface for a played note
export interface PlayedNote {
  note: string;
  time: number;
}

export type SamplerConfig = {
  urls: { [key: string]: string };
  baseUrl: string;
};

export type SynthConfig = {
  urls: object;
  create: () => Tone.Synth;
};
export type InstrumentType = "piano" | "synth";

export type MelodyPanelProps = {
  selectedScale: string;
  selectedOctave: number;
  onScaleChange: (scale: string) => void;
  onOctaveChange: (octave: number) => void;
  selectedInstrument: InstrumentType;
  onInstrumentChange: (instrument: InstrumentType) => void;
};
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => void;
}