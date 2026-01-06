# Employee & Policy Management System

A full-stack application designed to streamline the management of company employees and insurance policies. This system features a high-performance Rust backend powered by SurrealDB and a modern, responsive React frontend.

**Note:** This project was developed during my internship at **Veersa Technology**, a tech startup specializing in AI/ML, Big Data, and digital engineering solutions. This application served as a comprehensive exercise in building scalable, full-stack solutions using modern web technologies.

---

## ✨ Features

### Dashboard & Analytics
*   **Overview:** Real-time summary of total employees and policies.
*   **Data Visualization:** Quick insights into system status (can be expanded).

### Employee Management
*   **CRUD Operations:** Create, Read, Update, and Delete employee records.
*   **Search & Filter:** Instantly search employees by name or filter by role.
*   **Detailed Views:** View comprehensive employee profiles.

### Policy Management
*   **CRUD Operations:** Manage insurance policies with full lifecycle support.
*   **Status Tracking:** Filter policies by active/inactive status.
*   **Search:** Quick lookup for specific policy details.

### Technical Highlights
*   **High Performance:** Backend built with Rust for optimal speed and safety.
*   **Modern Database:** Utilizes SurrealDB for flexible data modeling and real-time capabilities.
*   **State Management:** Frontend uses Redux Toolkit for efficient global state handling.
*   **Responsive Design:** Styled with Tailwind CSS v4 to ensure a seamless experience across devices.
*   **Theming:** Supports light and dark modes with modern color palettes.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **HTTP Client:** [Axios](https://axios-http.com/)

### Backend
*   **Language:** [Rust](https://www.rust-lang.org/)
*   **Web Framework:** [Actix-web](https://actix.rs/)
*   **Database:** [SurrealDB](https://surrealdb.com/)
*   **Serialization:** [Serde](https://serde.rs/)

---

## 📂 Project Structure

```
/
├── backend/            # Rust + Actix-web API server
│   ├── src/
│   │   ├── database/   # Database connection and initialization
│   │   ├── handlers/   # API route handlers (Employees, Policies)
│   │   ├── models/     # Data structs (Serde + SurrealDB types)
│   │   └── main.rs     # Entry point
│
└── frontend/           # React + Vite application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Route views (Dashboard, Employees, etc.)
    │   ├── store/      # Redux slices and store configuration
    │   ├── services/   # API integration (Axios)
    │   └── styles/     # Global styles and Tailwind config
```

---

## 🚀 Getting Started

### Prerequisites
*   **Node.js** (v18+ recommended) & **pnpm**
*   **Rust** (latest stable) & **Cargo**
*   **SurrealDB** (installed and running locally)

### Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create a `.env` file with your SurrealDB credentials:
    ```env
    SURREAL_URL=127.0.0.1:8000
    SURREAL_USER=root
    SURREAL_PASS=root
    SURREAL_NS=test
    SURREAL_DB=test
    ```
3.  Ensure SurrealDB is running at the specified URL.
4.  Run the server:
    ```bash
    cargo run
    ```
    The API will be available at `http://localhost:3100`.

### Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server:
    ```bash
    pnpm dev
    ```
    Access the UI at `http://localhost:5173`.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).