# ITBA Expo 2027 – Exhibition Stand Booking & Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socket.io)](https://socket.io/)

A modern, full-stack enterprise web application designed for **ITBA Expo 2027** (Supported by *The Irish Field*). The platform enables exhibitors to explore an interactive SVG-based exhibition floor plan, reserve and purchase stands with Stripe, and manage their bookings. It also provides event organizers with a comprehensive admin dashboard for stand inventory, booking workflows, payments, document reviews, and real-time analytics.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
  - [Public & Exhibitor Portal](#1-public--exhibitor-portal)
  - [Interactive Floor Plan](#2-interactive-floor-plan)
  - [Booking & Checkout Flow](#3-booking--checkout-flow)
  - [Admin Management Dashboard](#4-admin-management-dashboard)
  - [Real-Time & Security](#5-real-time--security)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Routing & Middleware Architecture](#-routing--middleware-architecture)
- [State Management & API Layer](#-state-management--api-layer)
- [Available Scripts](#-available-scripts)
- [Contributing & Code Standards](#-contributing--code-standards)

---

## 🌟 Key Features

### 1. Public & Exhibitor Portal
- **High-Impact Landing Page**: Event highlights, exhibitor statistics, panel details, interactive preview, feature breakdown, FAQ accordion, and contact forms.
- **Authentication & Security**: Email/password authentication, JWT session persistence via cookies, email verification, OTP verification, and password reset flows.
- **User Profile & History**:
  - Profile customization and document uploads.
  - Comprehensive Booking History with real-time status updates (Pending, Confirmed, Cancelled).
  - Transaction History logs with payment receipts.
  - Real-time in-app notification center.

### 2. Interactive Floor Plan
- **SVG-Powered Floor Map**: Vector-rendered exhibition layout with dynamic hall categories.
- **Zoom & Pan Controls**: Fluid canvas interactions powered by `react-zoom-pan-pinch`.
- **Live Stand Status**: Color-coded stands indicating availability:
  - 🟢 **Available**
  - 🟡 **Reserved / Pending**
  - 🔴 **Booked**
- **Interactive Tooltips**: Instant details on stand size, category, pricing, dimensions, and one-click "Book Now" navigation.

### 3. Booking & Checkout Flow
- **Multi-Step Checkout**:
  1. Stand selection from interactive floor plan.
  2. Terms and conditions review and digital agreement.
  3. Exhibitor & attendee information collection with international phone validation.
  4. Optional add-ons & package selection.
  5. Secure payment processing via **Stripe Elements**.
  6. Instant confirmation page with booking summary and reference ID.

### 4. Admin Management Dashboard
- **Executive Analytics**: Real-time statistical metrics, stand occupancy rates, booking graphs (`recharts`), and recent reservation activity.
- **Stand Inventory Management**: Create, update, toggle stand states, and adjust category pricing.
- **Booking Management**: Review, filter, approve, or reject booking submissions.
- **Payment Tracking**: Monitor Stripe transaction records, track revenue, and reconcile payments.
- **Document Review**: Inspect and verify required regulatory/compliance documents uploaded by exhibitors.
- **User Administration**: Monitor registered accounts, manage roles, and review account activity.

### 5. Real-Time & Security
- **WebSockets (Socket.io)**: Live notifications for booking approvals, status updates, and broadcast announcements without requiring page refreshes.
- **Role-Based Access Control (RBAC)**: Custom routing middleware separating public routes, exhibitor accounts, and admin dashboards.
- **Cookie Security**: Secure cookie storage for session tokens with automatic token cleanup on unauthorized (401) responses.

---

## 🛠 Tech Stack & Architecture

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), Radix UI Primitives, Lucide React, Heroicons |
| **State Management** | [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| **Payment Gateway** | [Stripe](https://stripe.com/) (`@stripe/stripe-js`, `@stripe/react-stripe-js`) |
| **Real-Time** | [Socket.io Client](https://socket.io/docs/v4/client-api/) |
| **Interactive Map** | `react-zoom-pan-pinch`, Custom SVG components |
| **Form Management** | `react-hook-form`, `react-international-phone`, `libphonenumber-js`, `input-otp` |
| **Charts & Data Viz** | [Recharts](https://recharts.org/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Utilities** | `date-fns`, `jszip`, `clsx`, `tailwind-merge`, `js-cookie` |

---

## 📁 Project Directory Structure

```text
├── app/                          # Next.js App Router root
│   ├── (auth)/                   # Authentication routes (sign-in, sign-up, reset-password, etc.)
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (root)/                   # Public & customer-facing pages
│   │   ├── (profile)/            # Customer account (profile, booking history, transactions, notifications)
│   │   ├── booking-info/         # Booking form and Stripe checkout
│   │   ├── booking-success/      # Booking confirmation receipt
│   │   ├── exhibition-map/       # Interactive floor map & stand selection
│   │   ├── contact/              # Contact support page
│   │   ├── faq/                  # Frequently Asked Questions
│   │   ├── pricing/              # Stand pricing packages
│   │   └── terms-and-conditions/ # Legal & booking agreement terms
│   ├── dashboard/                # Admin Portal
│   │   ├── _components/          # Dashboard widgets, stats cards, and charts
│   │   ├── booking-management/   # Booking request processing
│   │   ├── document-review/      # Exhibitor document verification
│   │   ├── payment-tracking/     # Transaction & Stripe payment monitoring
│   │   ├── stand-management/     # Floor plan stand configuration
│   │   ├── user-management/      # Exhibitor and admin user directory
│   │   └── settings/             # System and platform preferences
│   ├── layout.tsx                # Root layout & Redux/Toaster providers
│   └── globals.css               # Tailwind CSS styles and theme variables
├── components/                   # Shared and modular UI components
│   ├── dashboard/                # Admin-specific components
│   ├── exhibition-map/           # Interactive SVG floor plan, stand shapes & tooltips
│   ├── home/                     # Landing page sections (Banner, EventDetails, etc.)
│   ├── layout/                   # Navbar, Footer, Mobile Sidebar, ProfileDropdown
│   ├── map/                      # Base map canvas elements
│   ├── phone-input/              # International phone selector
│   └── ui/                       # Reusable design system components (buttons, dialogs, inputs)
├── data/                         # Static datasets, mock fallbacks, terms, and country lists
├── hooks/                        # Custom React hooks (socket notifications, booking persistence, stats)
├── lib/                          # Utility helpers, cookie managers, stand lookups
├── proxy.ts                      # Route guards & RBAC redirection logic
├── public/                       # Static public assets (images, icons, textures, manifest)
├── src/
│   ├── lib/                      # Stripe client initialization
│   └── redux/                    # Redux Toolkit store configuration
│       ├── api/                  # RTK Query API slices (auth, booking, exhibition, payments, etc.)
│       └── features/             # Redux slices (authSlice, bookingSlice, etc.)
├── types/                        # TypeScript type definitions & interfaces
├── next.config.ts                # Next.js configuration (remote image patterns, optimizations)
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json                  # Dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`
- **Backend API Server**: Running backend providing authentication, stand inventory, and socket server.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hanoijane01
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Real-Time WebSocket Server
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_PATH=/socket.io
```

### Running the App

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Routing & Middleware Architecture

The application enforces strict **Role-Based Access Control (RBAC)** via `proxy.ts`:

- **Guest / Unauthenticated**:
  - Can browse public marketing pages, view exhibition floor plan, pricing, and FAQs.
  - Prompted to log in or sign up before reserving a stand.
- **Exhibitor (`user`)**:
  - Full access to booking, profile dashboard, booking history, transactions, and live notifications.
  - Automatically redirected away from authentication screens (`/sign-in`, `/sign-up`) when logged in.
- **Administrator (`admin`)**:
  - Automatically redirected to `/dashboard` upon logging in.
  - Exclusive access to all administrative modules (`/dashboard/*`).
  - Unauthorized users accessing admin routes are redirected to `/sign-in` or home.

---

## ⚡ State Management & API Layer

State is managed through **Redux Toolkit** with **RTK Query**:

- **Centralized Store**: Configured at `src/redux/store.ts`.
- **`baseApi.ts`**: Handles unified API queries, automatic JWT Bearer token header injection via cookies, and automatic session logout on `401 Unauthorized`.
- **API Slices**:
  - `authApi`: Sign in, sign up, verify email, OTP validation, forgot/reset password, and profile fetching.
  - `exhibitionApi`: Fetches real-time exhibition halls and stand availability.
  - `bookingApi`: Creates stand reservations, tracks status, and fetches user booking history.
  - `paymentApi`: Coordinates checkout sessions and payment verification with Stripe.
  - `dashboardApi`: Powers analytics metrics, stand charts, and booking logs for organizers.
  - `notificationApi`: Fetches notifications and marks messages as read.
  - `userApi`: Profile management and admin user controls.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server on `http://localhost:3000` |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint to verify code quality and style conventions |

---

## 🤝 Contributing & Code Standards

- Keep components modular and single-responsibility.
- Follow TypeScript typing guidelines — avoid `any` types wherever possible.
- Use Tailwind CSS design tokens defined in `app/globals.css`.
- Format code and ensure `npm run lint` passes before pushing changes or opening a Pull Request.

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use is strictly prohibited without explicit permission.
