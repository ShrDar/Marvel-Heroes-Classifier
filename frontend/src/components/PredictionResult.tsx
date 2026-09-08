"use client"

import { useState } from "react";
import HeroInfoModal from "./HeroInfoModal";

interface PredictionResultProps {
  predictedClass: string | null;
  confidence: number | null;
}

const heroImages: Record<string, string> = {
  "black widow": "/heroes/black_widow.png",
  "captain america": "/heroes/captain.png",
  "doctor strange": "/heroes/strange.jpeg",
  hulk: "/heroes/hulk.png",
  ironman: "/heroes/ironman.png",
  loki: "/heroes/loki.png",
  "spider-man": "/heroes/spidey.png",
  thanos: "/heroes/thanos.png",
};



function PredictionResult({
  predictedClass,
  confidence,
}: PredictionResultProps) {

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  if (!predictedClass) {
    return (
      <section className="w-full lg:w-[40%] flex min-h-96 items-center justify-center rounded-xl border-4 border-black bg-transparent backdrop-blur-2xl backdrop-brightness-125 p-8 text-center shadow-[8px_8px_0_0_#000]">
        <div>
          <p className="font-comic text-4xl">
            PREDICTED HERO
          </p>

          <p className="mt-4 font-raleway text-sm tracking-[2px]">
            Check Classifiable Heros
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsInfoOpen(true)}
          aria-label="View classifiable heroes"
          className="fixed cursor-pointer top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border-4 border-black bg-white font-bold shadow-[2px_2px_0_0_#000]"
        >
          i
        </button>

        <HeroInfoModal
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />
      </section>
    );
  }

  const heroImage = heroImages[predictedClass];

  return (
      <div className="flex h-full justify-center items-center w-full lg:w-[40%] backdrop-blur-2xl backdrop-brightness-125 rounded-lg">

        {heroImage && (
          <div className="overflow-hidden rounded-lg border-4 border-black shadow-[8px_8px_0_0_#000]">
            <div className="aspect-square overflow-hidden">
              <img
                src={heroImage}
                alt={predictedClass}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="border-t-3 border-black px-2 py-2 text-center font-comic text-2xl">
              {predictedClass}
            </p>
            <div className="rounded-xl font-raleway absolute top-2 right-3 bg-transparent backdrop-blur-2xl p-2 border-4 border-black shadow-[2px_2px_0_#000]">
              <p className="drop-shadow-[2px_2px_4px_#555] text-white tracking-[2px]">
                {confidence !== null ? `${(confidence * 100).toFixed(2)}%` : ""}
              </p>
            </div>
          </div>
        )}
      </div>
  );
}

export default PredictionResult;