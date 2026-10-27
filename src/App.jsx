import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SavedJobs from "./pages/SavedJobs";
import Dashboard from "./pages/Dashboard";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <main className="page-container flex min-h-[55vh] flex-col items-center justify-center text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                  Error 404
                </p>
                <h1 className="mt-3 font-display text-4xl font-extrabold text-slate-950">
                  Page not found
                </h1>
                <p className="mt-3 text-sm text-slate-500">
                  The page you're looking for doesn't exist.
                </p>
                <a
                  href="/"
                  className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
                >
                  Back to home
                </a>
              </main>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
