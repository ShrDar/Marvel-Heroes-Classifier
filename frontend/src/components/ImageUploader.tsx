import { useState } from "react";

interface SelectedImage {
  file: File;
  preview: string;
}

function ImageUploader() {
  const [image, setImage] = useState<SelectedImage | null>(null);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  }

  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-xl">
        <label
          htmlFor="hero-image"
          className="flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-2xl border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0_0_#000]"
        >
          {image ? (
            <img
              src={image.preview}
              alt="Selected hero"
              className="max-h-64 rounded-lg object-contain"
            />
          ) : (
            <>
              <span className="font-comic text-4xl tracking-[4px]">
                DROP YOUR HERO HERE!
              </span>

              <span className="mt-3 text-xs font-raleway tracking-[4px]">
                Tap to choose
              </span>
            </>
          )}

          <input
            id="hero-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </section>
  );
}

export default ImageUploader;