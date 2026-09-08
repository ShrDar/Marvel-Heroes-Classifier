import { useState } from "react";

import ComicButton from "./components/ComicButton";
import HeroHeader from "./components/HeroHeader";
import ImageUploader from "./components/ImageUploader";
import PredictionResult from "./components/PredictionResult";
import { predictHero } from "../services/api";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [predictedClass, setPredictedClass] = useState<string | null>(
    null,
  );

  const [confidence, setConfidence] = useState<number | null>(null);

  const [isPredicting, setIsPredicting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  function handleImageSelect(file: File) {
    setSelectedFile(file);

    setPredictedClass(null);
    setConfidence(null);

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
    <main className="relative flex min-h-screen flex-col items-center lg:gap-10 overflow-hidden text-center pb-20">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-xs "
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      />
      <HeroHeader />

      <section className="flex lg:flex-row flex-col justify-center items-start gap-10 w-[90%] lg:w-[70%]">
        <div className="w-full lg:w-[60%]">
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

        <PredictionResult
          predictedClass={predictedClass}
          confidence={confidence}
        />
      </section>

      
    </main>
  );
}

export default App;