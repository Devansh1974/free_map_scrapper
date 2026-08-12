# Setup Instructions (Frontend & Backend Structure)

Follow these steps to configure the Google Places API (New) and run **FreeMapScrapper** locally or deploy it.

## 1. Enable APIs

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select or create a project.
3. Search for and enable the **Places API (New)**.
   * *Note: Make sure it is the Places API (New), which supports the v1 textSearch and details endpoints.*

## 2. Create API key

1. In the Google Cloud Console, navigate to **APIs & Services > Credentials**.
2. Click **Create Credentials > API Key**.
3. Copy the generated API key.

## 3. Add Environment Variables

Create a `.env` file inside the `backend` directory:

```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
PORT=5000
```

*Optionally, if you deploy the frontend and change the backend URL in production, configure the `NEXT_PUBLIC_API_URL` environment variable in the frontend project.*

## 4. Run Locally (Orchestrated)

From the root directory of the project, run:

1. **Install all dependencies** (installs both frontend and backend packages):
   ```bash
   npm run install:all
   ```
2. **Start development servers** (boots both Next.js frontend on port 3000 and Express backend on port 5000 concurrently):
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to search businesses.

## 5. Deployment

### Backend (Express)
- Deploy the `backend` subfolder to any Node host (Render, Heroku, Railway, AWS, etc.).
- Set environment variables `GOOGLE_MAPS_API_KEY` and `PORT`.

### Frontend (Next.js)
- Deploy the `frontend` subfolder to Vercel.
- Configure the environment variable:
  * `NEXT_PUBLIC_API_URL`: Points to your deployed Express backend URL (e.g. `https://your-backend-api.com`).
