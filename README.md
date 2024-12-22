# MyEmojiMaker 🎨

A modern web application for creating custom emoji animations, built with React and Vite. Transform your images and text into unique emoji creations with fun filters, animations, and effects.

## ✨ Key Features

- **Image to Emoji**
  - Upload any image and transform it into animated emoji
  - Multiple animation styles (spin, bounce, party, etc.)
  - Color effects (rainbow, neon, synthwave)
  - Manga-style overlays and text effects

- **Text to Emoji**
  - Convert text into stylized emoji
  - Rich font selection with live preview
  - Custom colors and outlines
  - Background transparency control

- **Effects Library**
  - 20+ animated effects
  - 15+ static overlays
  - Custom GIF background support
  - Adjustable animation speeds

- **Privacy First**
  - All processing happens in-browser
  - No server uploads required
  - No data collection or storage
  - Works offline after initial load

## 🛠️ Technical Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite

- **Animation**
  - Canvas API
  - gif.js
  - gifuct-js

- **UI/UX**
  - Dark/Light mode
  - Responsive design
  - Keyboard navigation
  - Screen reader support

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/myemojimaker.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

## 📦 Project Structure

```
src/
├── components/     # React components
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── images/        # Static assets
├── pages/         # Page components
├── styles/        # CSS styles
├── types/         # TypeScript types
└── utils/         # Utility functions
    ├── effects/   # Visual effects
    ├── filters/   # Image filters
    ├── gif/       # GIF processing
    └── transforms/ # Image transformations
```

## 🎯 Core Features Explained

### Animation System
- Custom animation engine using Canvas API
- Frame-by-frame GIF generation
- Optimized rendering pipeline
- Multiple animation speeds

### Effects Library
- Movement effects (party, shake, bounce)
- Transform effects (spin, twist, jello)
- Color effects (rainbow, neon, synthwave)
- Static overlays (manga text, expressions)

### Font System
- Dynamic Google Fonts loading
- Multiple font categories
- Real-time preview
- Custom text rendering

## 🎨 Customization

- **Colors**: Customize primary and stroke colors
- **Fonts**: Choose from various font families
- **Speed**: Adjust animation speed
- **Backgrounds**: Upload custom GIF backgrounds

## 📱 Responsive Design

- Mobile-friendly interface
- Touch device support
- Adaptive UI components
- Flexible layouts

## ⚡ Performance

- Optimized GIF generation
- Efficient canvas operations
- Lazy-loaded resources
- Smooth animations

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement
- Fallback support
- Offline capability

## 📄 License

MIT License - feel free to use this project for your own purposes!

---

Made with ❤️ using [bolt.new](https://bolt.new)