import HeroHeader from "./components/HeroHeader";
import ImageUploader from "./components/ImageUploader";
import ComicButton from "./components/ComicButton";

function App() {
  return (
    <main className="min-h-screen">
      <HeroHeader />

      <ImageUploader />

      <div className="flex justify-center pb-12">
        <ComicButton>
          PREDICT!
        </ComicButton>
      </div>
    </main>
  );
}

export default App;