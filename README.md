# Aether Studio ✦ Premium Interactive Experience

A premium, motion-driven, and highly interactive creative agency website for **Aether Studio** built using Vanilla HTML, CSS, JavaScript, and GSAP.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://animation-webpage-weld.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS_/_GSAP-6366f1?style=for-the-badge)](https://github.com/UditDadhich/Aether)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

---

## 🚀 Live Demo

Experience the live, performance-optimized deployment here:  
👉 **[https://animation-webpage-weld.vercel.app](https://animation-webpage-weld.vercel.app)**

---

## ✨ Key Features

*   **Interactive Particle Canvas:** A custom HTML5 canvas background rendering a network of drifting nodes that organically repel from the mouse pointer.
*   **Custom Reactive Cursor:** A lag-behind trailing circular cursor designed using linear interpolation (lerp). The cursor dynamically morphs and reveals helper text (like `VIEW`) when hovering over showcase media.
*   **3D perspective Bento Grid:** Staggered visual layouts showcasing capabilities. Each card rotates in 3D space based on the relative position of the mouse cursor, complete with a shining light reflection effect.
*   **Staggered Bobbing Animations:** Icons inside bento cells hover and bob gently with distinct delays, giving the layout an active, premium feel.
*   **GSAP Horizontal Showcase:** An immersive, side-scrolling project track that pins to the screen on scroll and translates horizontally with pixel-level precision, leaving **zero blank gaps**.
*   **Magnetic Cursor Attraction:** Physics-based micro-interactions that pull interactive logos and action buttons toward the user's cursor when they get close.
*   **Slowly Floating Ambient Blobs:** Glowing gradient nodes that drift lazily in the background to create a luxurious glassmorphic backdrop.

---

## 🛠️ Technology Stack

*   **Structure:** Semantic HTML5
*   **Styling:** Vanilla CSS (Responsive variables, glassmorphic filters, keyframes)
*   **Motion Engine:** GSAP (GreenSock Animation Platform) & ScrollTrigger
*   **Icons:** Lucide SVG Icons
*   **Background:** HTML5 2D Canvas Engine

---

## 📁 File Structure

```
├── index.html             # Main semantic page structure & CDN imports
├── style.css              # Custom layout, styling system, variables & cursor rules
├── app.js                 # Lerp tracking, particles simulation, tilt, & GSAP triggers
├── project_cyberpunk.png  # Futuristic high-res project mockup
├── project_minimalist.png # Frosted glass sculpture mockup
├── project_generative.png # iridescence generative mesh mockup
└── .gitignore             # Git exclusion rules
```

---

## 💻 Local Installation & Run

1.  Clone the repository:
    ```bash
    git clone https://github.com/UditDadhich/Aether.git
    cd Aether
    ```
2.  Start a local development server (Python built-in):
    ```bash
    python -m http.server 8080
    ```
3.  Open your browser and navigate to:
    ```
    http://localhost:8080
    ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
