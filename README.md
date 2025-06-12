# InspectBuddy SuperAdmin

InspectBuddy SuperAdmin is a modern web-based admin dashboard built with React, Vite, Tailwind CSS, and Mantine UI. It provides a comprehensive interface for managing users, reports, plans, inspections, and more for the InspectBuddy platform.

## Features

- User authentication and protected routes
- Dashboard with analytics and charts
- User management (list, add, edit, view details)
- Plan and report settings
- Restore requests management
- Detailed inspection and template management
- Responsive sidebar and layouts
- Modern UI with Mantine and Tailwind CSS
- Drag-and-drop, image compression, and more

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Mantine UI](https://mantine.dev/)
- [React Router v7](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)
- [ESLint](https://eslint.org/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```powershell
   git clone <repo-url>
   cd inspectBuddy-superAdmin
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```

### Development

Start the development server:

```powershell
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build

To build the app for production:

```powershell
npm run build
```

The output will be in the `dist/` folder.

### Preview Production Build

```powershell
npm run preview
```

### Linting

```powershell
npm run lint
```

## Project Structure

- `src/` - Main source code
  - `components/` - Reusable UI components
  - `features/` - Feature modules (auth, dashboard, users, etc.)
  - `layouts/` - Layout components
  - `middlewares/` - Route guards and middleware
  - `pages/` - Page components
  - `store/` - Zustand stores
  - `styles/` - CSS files
  - `utils/` - Utility functions
- `public/` - Static assets
- `index.html` - Main HTML file
- `vite.config.js` - Vite configuration

## Environment Variables

If your project requires environment variables, create a `.env` file in the root directory. Example:

```
VITE_API_URL=https://api.example.com
```

## Deployment

This project is ready to be deployed on platforms like Netlify, Vercel, or your own server. See `netlify.toml` for Netlify configuration.

## License

This project is private and intended for InspectBuddy internal use only.

---

For any questions or support, please contact the development team.
