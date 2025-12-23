# Ber Tadilat - Renovation Services Website

A fully responsive, mobile-first single-page website built with Next.js (App Router) for Ber Tadilat renovation services.

## Features

- 🌍 **Bilingual Support**: Turkish (default) and English language toggle
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 🖼️ **Image Gallery**: 12 image slots with automatic rotation (24 images total)
- 🚀 **Optimized**: Ready for Vercel deployment
- ⚡ **Performance**: Optimized images and smooth scrolling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is ready to deploy to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Project Structure

```
ber-tadilat/
├── app/
│   ├── layout.tsx      # Root layout with language provider
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── components/
│   ├── LanguageProvider.tsx  # Language context and translations
│   ├── Navbar.tsx       # Navigation bar with language toggle
│   ├── Hero.tsx         # Hero section
│   ├── Gallery.tsx      # Works gallery with rotating images
│   ├── Services.tsx     # Services section
│   └── Contact.tsx      # Contact section with map
└── public/              # Static assets
```

## Technologies Used

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Next.js Image** component for optimized images

## License

Private project for Ber Tadilat.

"# construction-web" 
