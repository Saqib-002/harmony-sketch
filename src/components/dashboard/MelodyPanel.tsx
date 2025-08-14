import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type MelodyPanelProps = {
  selectedScale: string;
  selectedOctave: number;
  onScaleChange: (scale: string) => void;
  onOctaveChange: (octave: number) => void;
};

const scales: { [key: string]: string[] } = {
  chromatic: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  major: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  minor: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
  majorPentatonic: ['C', 'D', 'E', 'G', 'A'],
  minorPentatonic: ['C', 'D#', 'F', 'G', 'A#'],
};

const octaves = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const MelodyPanel = ({ selectedScale, selectedOctave, onScaleChange, onOctaveChange }: MelodyPanelProps) => {
  return (
    <div className="text-white flex gap-4 my-4">
      <div className="flex items-center gap-2">
        <label htmlFor="scale" className="whitespace-nowrap">Scale:</label>
        <Select value={selectedScale} onValueChange={onScaleChange}>
          <SelectTrigger id="scale" className="bg-primary-800 w-[150px]">
            <SelectValue placeholder="Select a scale" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(scales).map((scale) => (
              <SelectItem key={scale} value={scale}>
                {scale.charAt(0).toUpperCase() + scale.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="octave" className="whitespace-nowrap">Octave:</label>
        <Select value={String(selectedOctave)} onValueChange={(value) => onOctaveChange(Number(value))}>
          <SelectTrigger id="octave" className="bg-primary-800 w-[100px]">
            <SelectValue placeholder="Select an octave" />
          </SelectTrigger>
          <SelectContent>
            {octaves.map((octave) => (
              <SelectItem key={octave} value={String(octave)}>
                {octave}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MelodyPanel;