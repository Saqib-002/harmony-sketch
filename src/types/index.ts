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
