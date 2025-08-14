import { INSTRUMENTS, PIANO_SCALES } from "../../contants";
import type { MelodyPanelProps } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const octaves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const MelodyPanel = ({
  selectedScale,
  selectedOctave,
  selectedInstrument,
  onScaleChange,
  onOctaveChange,
  onInstrumentChange,
}: MelodyPanelProps) => {
  return (
    <div className="text-white flex gap-4 my-4">
      <div className="flex items-center gap-2">
        <label htmlFor="scale" className="whitespace-nowrap">
          Scale:
        </label>
        <Select value={selectedScale} onValueChange={onScaleChange}>
          <SelectTrigger
            id="scale"
            className="bg-primary-100 text-white border-blue-900 w-[150px]"
          >
            <SelectValue placeholder="Select a scale" />
          </SelectTrigger>
          <SelectContent className="bg-primary-100 text-white border-blue-900">
            {Object.keys(PIANO_SCALES).map((scale) => (
              <SelectItem key={scale} value={scale}>
                {scale.charAt(0).toUpperCase() + scale.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="octave" className="whitespace-nowrap">
          Octave:
        </label>
        <Select
          value={String(selectedOctave)}
          onValueChange={(value) => onOctaveChange(Number(value))}
        >
          <SelectTrigger
            id="octave"
            className="bg-primary-100 text-white border-blue-900 w-[100px]"
          >
            <SelectValue placeholder="Select an octave" />
          </SelectTrigger>
          <SelectContent className="bg-primary-100 text-white border-blue-900">
            {octaves.map((octave) => (
              <SelectItem key={octave} value={String(octave)}>
                {octave}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="instrument" className="whitespace-nowrap">
          Instrument:
        </label>
        <Select value={selectedInstrument} onValueChange={onInstrumentChange}>
          <SelectTrigger
            id="instrument"
            className="bg-primary-100 text-white border-blue-900 w-[150px]"
          >
            <SelectValue placeholder="Select an instrument" />
          </SelectTrigger>
          <SelectContent className="bg-primary-100 text-white border-blue-900">
            {INSTRUMENTS.map((instrument) => (
              <SelectItem key={instrument} value={instrument}>
                {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MelodyPanel;
