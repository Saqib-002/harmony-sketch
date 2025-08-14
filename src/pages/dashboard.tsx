import DashboardHeader from "../components/dashboard/Header";
import MelodyCanvas from "../components/dashboard/MelodyCanvas";
import SonicSketchpad from "../components/dashboard/SonicSketchPad";

const Dashboard = () => {
  return (
    <div className="bg-primary-100 min-h-screen p-8">
      <DashboardHeader />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <MelodyCanvas />
        <SonicSketchpad />
      </div>
    </div>
  );
};

export default Dashboard;
