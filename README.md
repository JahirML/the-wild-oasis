# The Wild Oasis

The Wild Oasis is a full-stack hotel management application built with React and Supabase. The application allows hotel staff to manage bookings and cabins, monitor important business metrics through a dashboard, configure hotel settings, and manage users.

##  Features

* **Dashboard**

  * Overview of important hotel metrics.
  * Statistics about bookings, sales and occupancy.
  * Data visualization through charts.

* **Booking management**

  * View and manage existing bookings.
  * Check booking details.
  * Calculate booking prices based on the number of guests and additional services.
  * Filter and sort bookings.

* **Cabin management**

  * View available cabins and their details.
  * Create, edit and delete cabins.
  * Configure cabin capacity and pricing.

* **Hotel settings**

  * Configure minimum and maximum number of guests.
  * Set the minimum number of nights.
  * Configure the price per night.
  * Configure additional services such as breakfast.

* **User management**

  * Create new users.
  * Manage application users.
  * Users can perform the same hotel management operations after logging in.

* **Responsive interface**

  * Interface designed to work across different screen desktop sizes.
  * Reusable components and consistent UI patterns.

## 🛠️ Technologies

### Frontend

* **React** — Used to build the user interface through reusable components.
* **React Router** — Handles client-side routing and navigation between application views.
* **Styled Components** — Used for component-level styling and creating reusable UI styles.
* **React Hook Form** — Handles form state, validation and submission.
* **React Icons** — Provides icons used throughout the application.
* **React Hot Toast** — Used to display feedback and notifications after user actions.

### Data & State Management

* **Supabase** — Used as the backend service, including database operations and user authentication.
* **TanStack React Query** — Manages server state, data fetching, caching, mutations and synchronization with Supabase.
* **date-fns** — Used for date manipulation, formatting and calculations related to bookings.

### Data Visualization

* **Recharts** — Used to create charts and visualize hotel statistics on the dashboard.

### Error Handling

* **React Error Boundary** — Used to handle unexpected errors in the React component tree and provide a better user experience when something goes wrong.

## Project Structure

The project is organized into reusable components and features, separating UI components, pages, services, hooks, contexts and utilities to keep the codebase maintainable and easier to scale.

## What I Practiced

This project allowed me to practice building a complete frontend application connected to a backend service, including:

* Managing server state and asynchronous operations.
* CRUD operations.
* Authentication and user management.
* Form handling and validation.
* Client-side routing.
* Data visualization.
* Date manipulation and booking-related business logic.
* Reusable React components.
* Error handling.
* Responsive UI development.

## 🌐 Live Demo

https://the-wild-oasis-five-indol.vercel.app/

## 💻 Installation

Clone the repository:

```bash
git clone https://github.com/JahirML/the-wild-oasis.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```
http://localhost:5173
```
