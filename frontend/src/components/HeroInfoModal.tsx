import { useEffect } from "react";

const heroes = [
  {
    name: "Black Widow",
    image: "/heroes/black_widow.png",
  },
  {
    name: "Captain America",
    image: "/heroes/captain.png",
  },
  {
    name: "Doctor Strange",
    image: "/heroes/strange.jpeg",
  },
  {
    name: "Hulk",
    image: "/heroes/hulk.png",
  },
  {
    name: "Ironman",
    image: "/heroes/ironman.png",
  },
  {
    name: "Loki",
    image: "/heroes/loki.png",
  },
  {
    name: "Spider-Man",
    image: "/heroes/spidey.png",
  },
  {
    name: "Thanos",
    image: "/heroes/thanos.png",
  },
];

interface HeroInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function HeroInfoModal({
  isOpen,
  onClose,
}: HeroInfoModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl border-4 border-black bg-white p-6 shadow-[10px_10px_0_0_#000]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close hero list"
          className="absolute right-4 top-4 text-3xl font-bold"
        >
          ×
        </button>

        <h2 className="font-comic text-center text-4xl tracking-wide">
          CLASSIFIABLE HEROES
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {heroes.map((hero) => (
            <div
              key={hero.name}
              className="overflow-hidden rounded-lg border-3 border-black"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="border-t-3 border-black px-2 py-2 text-center font-comic text-lg">
                {hero.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroInfoModal;