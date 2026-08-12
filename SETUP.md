# Setup Instructions

Follow these steps to configure the Google Places API (New) and run **FreeMapScrapper** locally or deploy it to Vercel.

## 1. Enable APIs

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select or create a project.
3. Search for and enable the **Places API (New)**.
   * *Note: Make sure it is the Places API (New), which supports the v1 textSearch and details endpoints.*

## 2. Create API key

1. In the Google Cloud Console, navigate to **APIs & Services > Credentials**.
2. Click **Create Credentials > API Key**.
3. Copy the generated API key.
4. *(Optional)* Restrict your API key usage to HTTP referrers, IP addresses, or specifically to the Places API (New) for production security.

## 3. Add Environment Variables

Create a file named `.env.local` in the root of the project:

```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## 4. Run Locally

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test.

## 5. Deploy to Vercel

1. Push your code repository to GitHub, GitLab, or Bitbucket.
2. Link the repository in the Vercel Dashboard.
3. Under **Environment Variables** in Vercel project configuration, add:
   * **Key**: `GOOGLE_MAPS_API_KEY`
   * **Value**: *[Your API key]*
4. Click **Deploy**.
