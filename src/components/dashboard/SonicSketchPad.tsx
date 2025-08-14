import React, { useEffect, useRef, useState } from "react";
import type { PlayedNote } from "../../types";
import * as Tone from "tone";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2Icon, PauseIcon, PlayIcon } from "lucide-react";
import { Slider } from "../ui/slider";

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
  const synthRef = useRef<Tone.Synth | Tone.Sampler | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(120);
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
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
    synthRef.current = synth;
    setIsPlaying(true);
    const now = Tone.now();
    const noteDuration = 60 / bpm / 2;
    playedNotes.forEach((note, index) => {
      synth.triggerAttackRelease(note.note, "8n", now + index * 0.5);
    });
    setTimeout(() => {
      setIsPlaying(false);
      synthRef.current = null;
    }, playedNotes.length * noteDuration * 500);
  };
  const stopAll = () => {
    if (synthRef.current) {
      synthRef.current.triggerRelease(Tone.now());
      synthRef.current.dispose();
      synthRef.current = null;
    }
    Tone.Transport.stop();
    setIsPlaying(false);
  };
  return (
    <div className="bg-primary-900 rounded-lg px-6 py-4">
      <p className="text-white font-semibold text-2xl">Sonic Sketchpad</p>
      <div className="my-4 flex flex-col gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt, e.g., 'melancholic piano piece'"
          className="bg-primary-100 border-blue-600 text-white"
        />
        <Button
          className="bg-blue-700 hover:bg-blue-800 duration-300 transition-all cursor-pointer"
          onClick={handleGenerate}
          disabled={loading || !prompt}
        >
          {loading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            "Generate with Gemini"
          )}
        </Button>
      </div>
      <div className="mt-4">
        <p className="text-white font-semibold text-lg mb-4">Playback</p>
        <Button
          className="bg-green-600 rounded-full"
          onClick={playAll}
          disabled={playedNotes.length === 0}
        >
          <PlayIcon />
        </Button>
        <Button
          className="bg-red-600 rounded-full ml-4"
          onClick={stopAll}
          disabled={!isPlaying}
        >
          <PauseIcon />
        </Button>
      </div>
      <div>
        <h1 className="text-white font-semibold text-ld my-4">
          Beats per minute: (BPM)
        </h1>
        <div className="flex items-center gap-4 text-white">
          <Slider
            className="[&>span:first-child]:border-blue-600 [&>span:first-child]:border [&>span:first-child]:h-2 [&>*:nth-child(2)]:bg-primary-100"
            defaultValue={[bpm]}
            max={320}
            step={1}
            onValueChange={(val) => setBpm(val[0])}
          />
          <span>{bpm}</span>
        </div>
      </div>
    </div>
  );
};

export default SonicSketchpad;
