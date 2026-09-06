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
  if (!predictedClass) {
    return (
      <section className="flex min-h-96 items-center justify-center rounded-xl border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0_0_#000]">
        <div>
          <p className="font-comic text-4xl">
            YOUR HERO AWAITS!
          </p>

          <p className="mt-4">
            Upload an image and discover your hero.
          </p>
        </div>
      </section>
    );
  }

  const heroImage = heroImages[predictedClass];

  return (
    <section className="flex min-h-96 items-center justify-center rounded-xl border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0_0_#000]">
      <div>
        <p className="font-comic text-3xl">
          YOUR HERO IS...
        </p>

        {heroImage && (
          <div className="mt-6 flex justify-center">
            <img
              src={heroImage}
              alt={predictedClass}
              className="h-56 w-56 rounded-lg object-cover"
            />
          </div>
        )}

        <h2 className="mt-6 font-comic text-6xl tracking-wide">
          {predictedClass}
        </h2>

        {confidence !== null && (
          <p className="mt-4 text-xl">
            Confidence:{" "}
            <strong>
              {(confidence * 100).toFixed(2)}%
            </strong>
          </p>
        )}
      </div>
    </section>
  );
}

export default PredictionResult;