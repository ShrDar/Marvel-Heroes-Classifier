import { useEffect, useState } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function ImageUploader({
  onImageSelect,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
    onImageSelect(file);
  }

  return (
    <section>
      <label
        htmlFor="hero-image"
        className="flex min-h-96 cursor-pointer flex-col items-center justify-center rounded-xl border-4 border-black bg-white p-8 text-center shadow-[8px_8px_0_0_#000]"
      >
        {preview ? (
          <img
            src={preview}
            alt="Selected hero"
            className="max-h-72 max-w-full rounded-lg object-contain"
          />
        ) : (
          <>
            <span className="font-comic text-4xl">
              DROP YOUR HERO HERE!
            </span>

            <span className="mt-3">
              Click to choose an image
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

      {error && (
        <p className="mt-4 text-center font-semibold text-red-600">
          {error}
        </p>
      )}
    </section>
  );
}

export default ImageUploader;