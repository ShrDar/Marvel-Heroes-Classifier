import { useEffect } from "react";
import { createPortal } from "react-dom";

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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-[90vw] max-w-7xl overflow-y-auto rounded-xl border-4 border-black bg-transparent backdrop-blur-3xl p-8 text-white shadow-[1px_1px_0_0_#000]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close hero list"
          className="absolute right-5 top-4 cursor-pointer text-4xl font-bold leading-none"
        >
          ×
        </button>

        <h2 className="font-comic text-center text-4xl tracking-wide">
          CLASSIFIABLE HEROES
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {heroes.map((hero) => (
            <div
              key={hero.name}
              className="overflow-hidden rounded-lg border-4 border-black bg-transparent shadow-[4px_4px_0_0_#000]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="border-t-4 border-black px-2 py-3 text-center font-comic text-xl">
                {hero.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default HeroInfoModal;