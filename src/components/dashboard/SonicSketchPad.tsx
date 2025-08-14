import React, { useState } from 'react'
import type { PlayedNote } from '../../types';
import * as Tone from 'tone';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type SonicSketchpadProps = {
  playedNotes: PlayedNote[];
  setPlayedNotes: React.Dispatch<React.SetStateAction<PlayedNote[]>>;
};

const SonicSketchpad = ({
  playedNotes,
  setPlayedNotes,
}: SonicSketchpadProps) => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const apiKey = "AIzaSyDssoWfkEVF9rUKc__GQcdwEO187Nsz2dk";
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a short melody as a JSON array of note strings (e.g., ["C4", "D4", "E4"]) based on the prompt: "${prompt}". Respond only with the JSON array, no additional text.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      const generatedNotes: string[] = JSON.parse(generatedText);
      const newPlayedNotes: PlayedNote[] = generatedNotes.map((note) => ({
        note,
        time: Date.now(),
      }));
      setPlayedNotes((prev) => [...prev, ...newPlayedNotes]);
    } catch (error) {
      console.error("Error generating melody try again:", error);
      // Optionally, add user-facing error message here
    } finally {
      setLoading(false);
    }
  };
  const playAll = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    playedNotes.forEach((note, index) => {
      synth.triggerAttackRelease(note.note, "8n", now + index * 0.5);
    });
  };
  return (
    <div className="bg-primary-900 rounded-lg px-6 py-4">
      <p className="text-white font-semibold text-2xl">Sonic Sketchpad</p>
      <div className="my-4 flex flex-col gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt, e.g., 'melancholic piano piece'"
          className="bg-primary-800 text-white"
        />
        <Button onClick={handleGenerate} disabled={loading || !prompt}>
          {loading ? "Generating..." : "Generate with Gemini"}
        </Button>
      </div>
      <div className="mt-4">
        <p className="text-white font-semibold text-lg">Playback</p>
        <Button onClick={playAll} disabled={playedNotes.length === 0}>
          Play All Notes (Including Generated)
        </Button>
      </div>
    </div>
  )
}

export default SonicSketchpad