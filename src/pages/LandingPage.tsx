import Navbar from "../components/Navbar";
import heroBg from "../assets/hero-bg.svg";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-primary-100 h-full text-white overflow-y-scroll">
      <Navbar />
      <section
        className="py-6 flex h-[calc(100vh-96px)] justify-center items-center bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="bg-black/70 h-max px-36 py-8 rounded-xl backdrop-blur-md max-w-4xl flex flex-col gap-4 items-center">
          <h1 className="font-bold text-6xl text-center">
            Create Music with AI, Effortlessly.
          </h1>
          <h4 className="text-gray-400 text-xl">
            HarmonySketch is your intuitive sketchpad for melody and rhythm.
          </h4>
          <a
            href="/dashboard"
            className="bg-blue-700 text-white py-2 rounded-4xl font-bold hover:bg-blue-800 transition-colors duration-300 px-6 w-max"
          >
            Start Creating Now
          </a>
        </div>
      </section>
      <section className="py-16 px-6 w-full flex flex-col items-center bg-primary-500">
        <div className="max-auto max-w-6xl">
          <h1 className="font-bold text-4xl text-center mb-12">Key Features</h1>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-primary-900 p-8 rounded-xl shadow-lg">
              <p className="text-6xl mb-4 text-center">🤖</p>
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-gray-400">
                Transform your ideas into unique melodies with simple text
                prompts. Let the AI do the heavy lifting.
              </p>
            </div>
            <div className="bg-primary-900 p-8 rounded-xl shadow-lg">
              <p className="text-6xl mb-4 text-center">🎨</p>
              <h3 className="text-xl font-semibold mb-2">
                Intuitive Melody Canvas
              </h3>
              <p className="text-gray-400">
                Click and create. The visual canvas makes composing music as
                easy as painting a picture.
              </p>
            </div>
            <div className="bg-primary-900 p-8 rounded-xl shadow-lg">
              <p className="text-6xl mb-4 text-center">🎹</p>
              <h3 className="text-xl font-semibold mb-2">
                Diverse Instruments
              </h3>
              <p className="text-gray-400">
                Choose from classic synths, a realistic piano, and more to find
                the perfect sound for your song.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-16 px-6 text-center rounded-t-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Composing?</h2>
          <p className="text-xl mb-8 text-gray-400">
            Join thousands of creators using HarmonySketch to bring their
            musical ideas to life.
          </p>
          <a
            href="/dashboard"
            className="bg-green-700 px-4 py-2 rounded-full hover:bg-green-800 duration-300 "
          >
            {" "}
            Get Started for Free
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
