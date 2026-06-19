# EzyTicket Client

EzyTicket is a comprehensive booking platform designed to streamline the experience of discovering and booking events and travel packages. This is the frontend client application built with modern web technologies.

## 🚀 Features

EzyTicket offers a wide range of modules to cater to different user needs:

- **Events:** Browse, search, and book tickets for various events.
- **Travel (Bus):** Explore bus schedules, select seats, and book tickets with a visual seat layout.
- **Dashboard:**
  - **User Dashboard:** Manage event bookings, bus tickets, wishlist, and profile.
  - **Admin Dashboard:** Manage users, create and manage events, manage bus services, and handle reviews.
- **Authentication:** Custom JWT-based user authentication system.
- **Payment:** Integrated secure payment processing with Stripe.

## 🛠️ Tech Stack

This project is built using a robust stack of modern libraries and tools:

- **Core:** [React](https://react.dev/) (v19), [Vite](https://vitejs.dev/)
- **State Management & Data Fetching:** [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query) & [TanStack Query](https://tanstack.com/query/latest)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4), [DaisyUI](https://daisyui.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v7)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **UI Components & Animations:** [Swiper](https://swiperjs.com/), [Framer Motion](https://www.framer.com/motion/), [React Icons](https://react-icons.github.io/react-icons/), [SweetAlert2](https://sweetalert2.github.io/), [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Payments:** [Stripe](https://stripe.com/)
- **Hosting:** Firebase Hosting (Configuration included)

## 📦 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd ezy-ticket-client
    ```

2.  **Install dependencies:**

    This project uses `bun.lock`, so Bun is recommended, but npm/yarn will also work.

    ```bash
    npm install
    # or
    yarn install
    # or
    bun install
    ```

3.  **Environment Variables:**

    Create a `.env` file in the root directory and configure the necessary environment variables (e.g., Backend API URL, Stripe Public Key).

4.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    bun run dev
    ```

    The application will be available at `http://localhost:5173`.

## 📂 Project Structure

- `src/app`: Redux store configuration and RTK Query features (`auth`, `event`, `order`, `travel`, `user`).
- `src/components`: Reusable UI components.
- `src/Hooks`: Custom React hooks for API and logic.
- `src/Layout`: Application layout components (Main, Dashboard, Sidebar).
- `src/Pages`: Route-level components grouped by feature (Authentication, Events, Travel, Dashboard, etc.).
- `src/Provider`: Context providers (e.g., `AuthProvider`, `TravelProvider`).
- `src/Routes`: React Router configuration and route protection components (`PrivateRoute`, `AuthRoute`, `DashboardRoute`, etc.).

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run preview`: Locally previews the production build.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
