# Marvel Heroes Classifier

A full-stack machine learning application that classifies uploaded Marvel character images into one of eight heroes using a trained TensorFlow/Keras model.

## Overview

This project combines:

* A **FastAPI backend** that loads the trained model and exposes a prediction API
* A **React + TypeScript + Vite frontend** for uploading images and displaying predictions
* A custom **image preprocessing and inference pipeline**

The application recognizes these eight heroes:

* Black Widow
* Captain America
* Doctor Strange
* Hulk
* Ironman
* Loki
* Spider-Man
* Thanos

---

## Tech Stack

### Backend

* Python 3.12+
* FastAPI
* TensorFlow / Keras
* NumPy
* Pillow
* Pydantic Settings
* Python Multipart
* Uvicorn
* uv

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* Fetch API

---

## How It Works

1. The user selects an image from the frontend.
2. The frontend sends the image to the backend as a multipart form-data request.
3. The backend reads the uploaded image.
4. The image is converted to RGB, resized to `224x224`, and normalized.
5. The trained TensorFlow/Keras model performs inference.
6. The backend determines the predicted hero and confidence score.
7. The backend returns the prediction as JSON.
8. The frontend displays the predicted hero and confidence.

Example response:

```json
{
  "predicted_class": "hulk",
  "confidence": 0.9872
}
```

---

## Backend API

### Root Endpoint

```http
GET /
```

Example response:

```json
{
  "message": "Welcome to Marvel Heroes Classifier API",
  "version": "1.0.0"
}
```

### Health Endpoint

```http
GET /health
```

Example response:

```json
{
  "status": "healthy"
}
```

### Prediction Endpoint

```http
POST /predict
```

Request:

* Content-Type: `multipart/form-data`
* Field: `file`
* Value: image file

Example response:

```json
{
  "predicted_class": "captain america",
  "confidence": 0.9148
}
```

### API Documentation

When running locally, FastAPI provides interactive API documentation at:

```text
http://localhost:8000/docs
```

---

## Local Setup

### Backend

From the project root:

```bash
cd backend
```

Create the virtual environment:

```bash
uv venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

On macOS/Linux:

```bash
source .venv/bin/activate
```

Install project dependencies:

```bash
uv sync
```

Run the API:

```bash
uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend

The backend uses environment variables for configuration.

Create a `.env` file inside the `backend` directory:

```env
DEBUG=true
ENVIRONMENT=development
FRONTEND_URL=http://localhost:5173
```

A `.env.example` file is included in the repository as a template.

Production deployments should provide environment variables through the hosting platform rather than committing `.env` to the repository.

### Frontend

The frontend uses:

```env
VITE_API_BASE_URL=http://localhost:8000
```

For production, this should point to the deployed backend URL.

---

## Model

The trained model is stored in the repository at:

```text
backend/assets/models/marvel_heroes_classifier_transfer_model.keras
```

The model is loaded once during application startup through the FastAPI lifespan and retained in application state for subsequent inference requests.

This avoids loading the model separately for every prediction request.

The model expects images resized to:

```text
224 x 224
```

---

## Project Structure

```text
Marvel Heroes Classifier/
├── backend/
│   ├── assets/
│   │   └── models/
│   │       └── marvel_heroes_classifier_transfer_model.keras
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   └── router.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── lifespan.py
│   │   │   └── logging.py
│   │   ├── services/
│   │   │   ├── inference.py
│   │   │   ├── model_loader.py
│   │   │   └── preprocessing.py
│   │   └── main.py
│   ├── tests/
│   ├── .env.example
│   ├── pyproject.toml
│   └── uv.lock
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.ts
```

---

## Deployment

The backend is designed to deploy with the trained model included in the repository

The `.keras` model is approximately 20 MB and is stored under:

```text
backend/assets/models/
```

The application loads the model from this relative project path during startup, making the deployment independent of the hosting platform's filesystem layout
