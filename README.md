# ⚡ TechMart

> A modern, fully responsive e-commerce web application for tech gadgets — built with React, Redux Toolkit, and React Bootstrap.

---

## 🌐 Live Demo

🔗 [View Live on Vercel]((https://experiment-5-eight.vercel.app/)

---

## 📖 About

TechMart is a multi-page e-commerce web app built as part of the **Full Stack Development** course at Chandigarh University. The project was developed progressively across 5 experiments, each adding new React concepts and features on top of the previous one.

The app simulates a real-world online tech store featuring product browsing, cart management, membership plans, light/dark theme, and live search and filtering — all without a backend.

---

## ✨ Features

- 🛍️ **Product Catalog** — 12 products with search and category filtering
- 🛒 **Shopping Cart** — Add, remove, update quantity, auto discount & shipping logic
- 💎 **Pricing / Membership Plans** — Monthly & yearly billing toggle with savings calculation
- 🌙 **Dark / Light Mode** — Global theme toggle persisted across all pages
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop
- ⚡ **Performance Optimized** — `useMemo` prevents unnecessary re-renders and recalculations
- 🧭 **Multi-page Navigation** — Smooth routing with React Router v6
- 👤 **Mock User Profile** — Personalized UI using Context API

---

## 🗂️ Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero section, featured products, category strip, trust badges |
| Products | `/products` | All 12 products with live search & category filter |
| Cart | `/cart` | Cart items, quantity controls, order summary with auto-discount |
| Pricing | `/pricing` | 3 membership plans with monthly/yearly toggle and FAQ |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | Core UI library |
| Vite | 5 | Build tool and dev server |
| Redux Toolkit | 2 | Global cart state management |
| React Redux | 9 | Connecting Redux to React |
| React Router DOM | 6 | Client-side routing |
| React Bootstrap | 2 | UI components |
| Bootstrap | 5 | CSS framework |
| React Icons | 5 | Icon library |
| Context API | — | Theme and user global state |
| Google Fonts | — | Syne + DM Sans typography |

---

## 📁 Project Structure
```
TechMart/
│
├── public/
│
├── screenshots/
│   ├── home.png
│   ├── products.png
│   ├── cart.png
│   └── pricing.png
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navbar with cart badge and theme toggle
│   │   ├── Footer.jsx          # Footer with links and contact info
│   │   ├── HeroSection.jsx     # Landing hero with CTA buttons and stats
│   │   ├── CardComponent.jsx   # Product card with Redux add-to-cart
│   │   ├── ThemeToggle.jsx     # Reusable light/dark mode toggle button
│   │   └── FilterBar.jsx       # Search input and category dropdown
│   │
│   ├── context/
│   │   └── AppContext.jsx      # Global theme + mock user context
│   │
│   ├── redux/
│   │   ├── store.js            # Redux store configuration
│   │   └── slices/
│   │       └── cartSlice.js    # Cart slice — addItem, removeItem, updateQty, clearCart
│   │
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Products.jsx        # Product listing with filtering
│   │   ├── Cart.jsx            # Shopping cart with order summary
│   │   └── Pricing.jsx         # Membership plans page
│   │
│   ├── App.jsx                 # Root — Router + Redux Provider + Context Provider
│   ├── main.jsx                # React DOM entry point
│   └── index.css               # Global styles and fonts
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js **v18 or higher**
- npm **v9 or higher**

Check your versions:
```bash
node -v
npm -v
```

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/techmart.git

# 2. Navigate into the project
cd techmart

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint the code
npm run lint
```

---

## 📦 Dependencies
```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.3.0",
    "bootstrap": "^5.3.3",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.5",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.10"
  }
}
```

---

## 🏗️ Architecture & Key Concepts

### Redux State Flow
```
User clicks "Add to Cart"
  → dispatch(addItem(product))
    → cartSlice reducer updates state
      → useSelector reads updated items
        → Navbar cart badge updates instantly
        → Cart page totals recompute via useMemo
```

### Context Flow
```
<AppProvider> wraps entire app
  → theme, toggleTheme, user available everywhere
    → All pages apply theme for light/dark styling
    → Navbar shows user's first name
    → Cart and Pricing personalize with user.name
```

### useMemo Optimization
```jsx
// Products.jsx — re-filters only when search or category changes
const filteredProducts = useMemo(() => {
  return ALL_PRODUCTS.filter(p => matchesSearch && matchesCategory);
}, [search, category]);

// Cart.jsx — recomputes totals only when cart items change
const { subtotal, discount, shipping, total } = useMemo(() => {
  ...
}, [items]);

// Pricing.jsx — recomputes plan prices/savings only when billing toggle changes
const planDetails = useMemo(() => {
  ...
}, [billing, cartItems]);
```

### Cart Discount Logic
```
Subtotal > ₹20,000  →  5% discount applied automatically
Subtotal >= ₹999    →  Free shipping
Subtotal < ₹999     →  ₹99 shipping fee
```

---

## 🚢 Deploying to Vercel

1. Push your code to GitHub (make sure `node_modules` is in `.gitignore`)
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — no configuration needed
5. Click **Deploy**

Rename your deployment to match the required format:
```
{uid}-{experiment-number}-{your-name}.vercel.app
Example: 24bda70021-5-mohammad-mehfooz.vercel.app
```

---

## 📝 .gitignore

Make sure your `.gitignore` includes:
```
node_modules
dist
.env
.DS_Store
```

---

## 👨‍💻 Author

**Mohammad Mehfooz**
B.Tech — Chandigarh University

[![GitHub](https://img.shields.io/badge/GitHub-your--mohammadmehfooz9755-181717?style=flat&logo=github)](https://github.com/mohammadmehfooz9755)

---

## 📄 License

This project was built for academic purposes as part of coursework at Chandigarh University.

---

> ⭐ If you found this project helpful, consider giving it a star on GitHub!
