import { useState } from "react";

import ComicButton from "./components/ComicButton";
import HeroHeader from "./components/HeroHeader";
import HeroInfoModal from "./components/HeroInfoModal";
import ImageUploader from "./components/ImageUploader";
import PredictionResult from "./components/PredictionResult";
import { predictHero } from "../services/api";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [predictedClass, setPredictedClass] = useState<string | null>(
    null,
  );

  const [confidence, setConfidence] = useState<number | null>(null);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [isPredicting, setIsPredicting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  function handleImageSelect(file: File) {
    setSelectedFile(file);

    // Clear previous prediction when a new image is selected.
    setPredictedClass(null);
    setConfidence(null);

    // Clear previous error.
    setError(null);
  }

  async function handlePrediction() {
    if (!selectedFile) {
      return;
    }

    setIsPredicting(true);
    setError(null);

    try {
      const result = await predictHero(selectedFile);

      setPredictedClass(result.predicted_class);
      setConfidence(result.confidence);
    } catch (error) {
      console.error("Prediction failed:", error);

      setError(
        "Something went wrong while predicting the hero. Please try again.",
      );
    } finally {
      setIsPredicting(false);
    }
  }

  return (
    <main className="min-h-screen">
      <HeroHeader />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
        {/* Image upload + prediction */}
        <div>
          <ImageUploader onImageSelect={handleImageSelect} />

          <div className="mt-8 flex justify-center">
            <ComicButton
              disabled={!selectedFile || isPredicting}
              onClick={handlePrediction}
            >
              {isPredicting ? "PREDICTING..." : "PREDICT!"}
            </ComicButton>
          </div>

          {error && (
            <p className="mt-6 text-center font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* Prediction result */}
        <PredictionResult
          predictedClass={predictedClass}
          confidence={confidence}
        />
      </section>

      {/* Hero information button */}
      <button
        type="button"
        onClick={() => setIsInfoOpen(true)}
        aria-label="View classifiable heroes"
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-black bg-white text-xl font-bold shadow-[4px_4px_0_0_#000]"
      >
        i
      </button>

      {/* Hero information modal */}
      <HeroInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </main>
  );
}

export default App;