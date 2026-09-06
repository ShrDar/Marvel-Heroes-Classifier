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

function HeroGallery() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-comic text-center text-5xl tracking-wide">
          MEET THE HEROES!
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {heroes.map((hero) => (
            <article
              key={hero.name}
              className="overflow-hidden rounded-lg border-4 border-black bg-white shadow-[6px_6px_0_0_#000]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="border-t-4 border-black px-3 py-3 text-center">
                <h3 className="font-comic text-2xl tracking-wide">
                  {hero.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroGallery;