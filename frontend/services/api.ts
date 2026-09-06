const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface PredictionResponse {
  predicted_class: string;
  confidence: number;
}

export async function predictHero(
  file: File,
): Promise<PredictionResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/predict`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to predict the hero.");
  }

  return response.json();
}