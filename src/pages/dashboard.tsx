import { useState } from "react";
import DashboardHeader from "../components/dashboard/Header";
import MelodyCanvas from "../components/dashboard/MelodyCanvas";
import SonicSketchpad from "../components/dashboard/SonicSketchPad";
import type { PlayedNote } from "../types";

const Dashboard = () => {
  const [playedNotes, setPlayedNotes] = useState<PlayedNote[]>([]);
  return (
    <div className="bg-primary-100 min-h-screen p-8">
      <DashboardHeader />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <MelodyCanvas
          playedNotes={playedNotes}
          setPlayedNotes={setPlayedNotes}
        />
        <SonicSketchpad
          playedNotes={playedNotes}
          setPlayedNotes={setPlayedNotes}
        />
      </div>
    </div>
  );
};

export default Dashboard;
