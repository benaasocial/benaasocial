# Benaa Social Frontend

Frontend dashboard for managing and publishing social media content across multiple platforms from a single interface.

---

## Overview

Benaa Social Frontend provides a unified dashboard where users can create, manage, and publish posts to multiple social media platforms at the same time.

The frontend communicates with the backend API and provides a smooth publishing experience with real-time publishing status updates, retry handling, and platform-specific controls.

The system currently supports integrations with:

- Facebook
- Instagram
- TikTok
- YouTube

Users can connect their accounts, create posts, upload media, and monitor publishing results directly from the dashboard.

---

## Features

- Authentication and protected routes
- Role-based dashboard access
- Responsive dashboard UI
- Create and publish posts
- Upload images and videos
- Multi-platform publishing
- TikTok publish status polling
- Retry failed publishing attempts
- Real-time publishing feedback
- Platform-specific publishing settings
- Publish error details viewer
- Delete posts
- Strong TypeScript typing
- React Query data fetching and caching
- Reusable UI components

---

## Tech Stack

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- Axios
- React Hook Form
- Zod

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/benaasocial/benaasocial_Front-End.git
cd benaasocial_Front-End
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create `.env.local` file

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# Running Locally

## Development Mode

```bash
npm run dev
```

Runs the Next.js development server.

---

## Build Project

```bash
npm run build
```

---

## Start Production Build

```bash
npm start
```

---

# Available Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

# Social Publishing Flow

1. User logs in to the dashboard.
2. User connects social media accounts.
3. User creates a post and uploads media.
4. User selects the target platforms.
5. Frontend sends the publishing request to the backend.
6. Backend starts publishing content to selected platforms.
7. Frontend displays platform-specific publishing results.
8. TikTok publishing status is polled while processing.
9. Users can view publish errors and retry failed platforms.

---

# Supported Platforms

- Facebook Pages
- Instagram Business Accounts
- TikTok
- YouTube

---

# TikTok Publishing Notes

TikTok publishing is asynchronous.

A successful initial request means the upload job has started, but it does not always mean the video has been fully published.

The frontend handles this by:

- Showing a processing state while TikTok is still publishing
- Polling the backend for the latest TikTok publish status
- Showing the final success or failure result
- Displaying TikTok failure reasons when available
- Allowing retry only when publishing has failed

---

# Project Structure

```txt
src/
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
└── validation/
```

---

# Important Notes

- The backend API must be running before using the dashboard.
- Environment variables should never be committed.
- TikTok publishing may take additional time because it requires platform-side processing.
- Some publishing failures may come directly from platform validation rules.
- OAuth redirect URLs must match the backend and provider dashboard settings.
