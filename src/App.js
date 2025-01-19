import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary"; // New component for error handling
import LoadingSpinner from "./components/LoadingSpinner"; // New component for loading state

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const CreateRoadmap = React.lazy(() => import("./pages/CreateRoadmap"));
const EditRoadmap = React.lazy(() => import("./pages/EditRoadmap"));
const RoadmapDetail = React.lazy(() => import("./pages/RoadmapDetail"));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-darkBackground">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <ScrollToTop />
              <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Create Roadmap */}
                <Route path="/create" element={<CreateRoadmap />} />

                {/* Edit Roadmap */}
                <Route path="/edit/:id" element={<EditRoadmap />} />

                {/* Roadmap Detail */}
                <Route path="/roadmap/:id" element={<RoadmapDetail />} />

                {/* Catch-all Route - Redirect to Home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
