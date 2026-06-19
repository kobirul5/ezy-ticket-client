# EzyTicket — Client

A full-featured ticket booking and travel management web application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. EzyTicket allows users to browse and purchase event tickets, book bus travel, manage wishlists, and access a role-based dashboard for admins, event managers, and travel managers.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| State Management | Redux Toolkit + RTK Query |
| Server State | TanStack React Query v5 |
| Routing | React Router DOM v7 |
| Forms | React Hook Form |
| Payments | Stripe (`@stripe/react-stripe-js`) |
| HTTP Client | Axios |
| Animations | Framer Motion, AOS, React Awesome Reveal |
| Notifications | React Hot Toast, React Toastify, SweetAlert2 |
| UI Components | React Select, React Slick, Swiper, MUI Date Pickers |
| Email | EmailJS (`@emailjs/browser`) |

---

## 📁 Project Structure

```
ezy-ticket-client/
├── public/                    # Static assets
├── src/
│   ├── API/                   # Axios utility (Utils.ts)
│   ├── Hooks/                 # Custom React hooks
│   │   ├── useAuth.tsx        # Auth context hook
│   │   ├── useAdmin.tsx       # Admin role check
│   │   ├── useAxiosPublic.tsx # Unauthenticated axios instance
│   │   ├── useAxiosSecure.tsx # Authenticated axios instance
│   │   ├── useCurrentUser.tsx # Fetch current user profile
│   │   ├── useEventManager.tsx
│   │   ├── useEventPublic.tsx
│   │   ├── useEventReview.tsx
│   │   ├── useTravelManager.tsx
│   │   ├── useScrollToTop.tsx
│   │   └── TrevalHook/        # Travel-specific hooks
│   ├── Layout/
│   │   ├── MainLayout         # Public layout (Navbar + Footer)
│   │   └── Dashboard          # Dashboard layout (Sidebar)
│   ├── Pages/
│   │   ├── Home/              # Landing page
│   │   ├── Events/            # Event listing & detail
│   │   ├── Travel/            # Bus search, booking & seat selection
│   │   ├── Checkout/          # Checkout flow
│   │   ├── Authentication/    # Login & Register
│   │   ├── Dashboard/
│   │   │   ├── Admin/         # ManageEvents, ManageUsers
│   │   │   ├── Events/        # AddEvents, UpdateEvent, MyAddedEvents, ManageEventReview
│   │   │   ├── Travel/        # CreateBus, UpdateBus, CreateTravelLocation, ManageReviews, MyBusServices, SoldTickets
│   │   │   ├── Profile/       # User profile
│   │   │   └── User/          # TicketBought
│   │   ├── MyWishList/        # Saved events wishlist
│   │   ├── Pricing/           # Pricing plans
│   │   ├── Contact/           # Contact form (EmailJS)
│   │   ├── About/             # About page
│   │   ├── PaymentSuccess/    # Post-payment success
│   │   ├── PaymentFail/       # Post-payment failure
│   │   ├── Error/             # Route error boundary
│   │   └── Page404/           # 404 Not Found
│   ├── Provider/
│   │   ├── AuthProvider.tsx   # Auth context (user, darkMode, logOut)
│   │   └── TravelProvider.tsx # Travel state context
│   ├── Routes/
│   │   ├── Route.tsx          # All app routes (createBrowserRouter)
│   │   ├── PrivateRoute.tsx   # Redirect unauthenticated users
│   │   ├── AuthRoute.tsx      # Redirect already-logged-in users
│   │   └── DashboardRoute.tsx # Protect dashboard routes
│   ├── app/
│   │   ├── store.ts           # Redux store
│   │   ├── baseApi.ts         # RTK Query base API (http://localhost:5000/api/v1)
│   │   └── features/
│   │       ├── auth/          # authApi (login, logout)
│   │       ├── event/         # eventApi
│   │       ├── order/         # orderApi
│   │       ├── travel/        # travelApi
│   │       └── user/          # userApi (getMyProfile)
│   ├── components/            # Reusable UI components (by page)
│   ├── assets/                # Images, icons
│   ├── App.tsx
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** ≥ 18 or **Bun** ≥ 1.0
- A running instance of the **ezy-ticket-server** backend (default: `http://localhost:5000`)

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/ezy-ticket-client.git
cd ezy-ticket-client
```

### 2. Install dependencies

Using **Bun** (recommended):
```bash
bun install
```

Using **npm**:
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

> **Note:** The backend base URL is also hardcoded in [`src/app/baseApi.ts`](./src/app/baseApi.ts). Update it there or use the env variable.

---

## 🧑‍💻 Development

```bash
# Using Bun
bun run dev

# Using npm
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🏗️ Build for Production

```bash
# Using Bun
bun run build

# Using npm
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🔥 Firebase Deployment

The project is configured with Firebase Hosting (see [`.firebaserc`](./.firebaserc)).

```bash
# Build first
npm run build

# Deploy
firebase deploy
```

---

## 🗺️ Application Routes

### Public Routes
| Path | Page |
|---|---|
| `/` | Home (Banner, Categories, Travel & Event Sections, Testimonials) |
| `/about` | About page |
| `/events` | Event listing |
| `/eventdetailspublic/:eventId` | Event detail |
| `/travel` | Travel / Bus search |
| `/travel/bus-ticket-book` | Bus ticket booking |
| `/travel/bus-reservation` | Bus reservation |
| `/travel/bus-set/:tran_id` | Seat selection |
| `/travel/Bus-Ticket-Cancellation-policy` | Cancellation policy |
| `/pricing` | Pricing plans |
| `/contact` | Contact form |
| `/mywishlist` | My Wishlist |
| `/strip-payment` | Stripe payment page |
| `/payment/success/:tran_id` | Payment success |
| `/payment/fail/:tran_id` | Payment failure |
| `/travel-payment-success/:tran_id` | Travel payment success |
| `/login` | Login (redirects if already logged in) |
| `/register` | Register (redirects if already logged in) |

### Dashboard Routes (Protected)
| Path | Page | Role |
|---|---|---|
| `/dashboard` | Dashboard Home | All |
| `/dashboard/profile` | User Profile | All |
| `/dashboard/ticket-bought` | My Purchased Tickets | User |
| `/dashboard/ticketSold` | Tickets Sold | Event Manager |
| `/dashboard/addEvent` | Add New Event | Event Manager |
| `/dashboard/updateEvent/:id` | Update Event | Event Manager |
| `/dashboard/my-added-events` | My Added Events | Event Manager |
| `/dashboard/manageEventReview` | Manage Event Reviews | Event Manager |
| `/dashboard/manageEvents` | Manage All Events | Admin |
| `/dashboard/manageUsers` | Manage Users | Admin |
| `/dashboard/add-bus-service` | Add Bus Service | Travel Manager |
| `/dashboard/update-bus-service/:id` | Update Bus Service | Travel Manager |
| `/dashboard/create-travel-location` | Create Travel Location | Travel Manager |
| `/dashboard/manageReview` | Manage Travel Reviews | Travel Manager |
| `/dashboard/MyBusServices` | My Bus Services | Travel Manager |
| `/dashboard/SoldTickets` | Sold Bus Tickets | Travel Manager |

---

## 🔐 Authentication & Authorization

- Authentication state is managed via **AuthProvider** (`src/Provider/AuthProvider.tsx`)
- Session management is cookie-based (credentials included in all API calls)
- User profile and role are fetched from the backend on app load via `useGetMyProfileQuery`
- Three route guards:
  - **PrivateRoute** — redirects unauthenticated users to `/login`
  - **AuthRoute** — redirects authenticated users away from `/login` and `/register`
  - **DashboardRoute** — protects all dashboard routes

---

## 🔌 API Integration

- RTK Query is used as the primary data-fetching solution
- Base API URL: `http://localhost:5000/api/v1` (configured in `src/app/baseApi.ts`)
- API feature slices: `auth`, `event`, `order`, `travel`, `user`
- TanStack React Query v5 is used alongside RTK Query in some components
- Axios instances (`useAxiosPublic`, `useAxiosSecure`) are available for manual requests

---

## 💳 Payment Integration

- **Stripe** is integrated via `@stripe/react-stripe-js` for event ticket payments
- A separate payment flow handles travel bus ticket payments
- Payment result pages are available at `/payment/success/:tran_id` and `/payment/fail/:tran_id`

---

## 🧪 Linting

```bash
npm run lint
```

ESLint is configured with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.

---

## 📜 Scripts Reference

| Command | Description |
|---|---|
| `dev` | Start Vite dev server |
| `build` | Build for production |
| `preview` | Preview production build |
| `lint` | Run ESLint |

---

## 🤝 Related Repository

- **Backend (ezy-ticket-server):** [ezy-ticket-server](../ezy-ticket-server) — Express + Prisma + PostgreSQL API server

---

## 📄 License

This project is private. All rights reserved.
