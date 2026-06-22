import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import BusyBunnyPage from "./pages/BusyBunnyPage";
import PortfolioPage from "./pages/PortfolioPage";
import LoadingScreen from "./components/LoadingScreen";
import BackgroundGlow from "./components/BackgroundGlow";
import CursorSparkle from "./components/CursorSparkle";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function RouteWatcher() {
  const location = useLocation();
  const [showing, setShowing] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setShowing(true);
    const t = setTimeout(() => setShowing(false), 1100);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return showing ? <LoadingScreen /> : null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteWatcher />
      <BackgroundGlow />
      <CursorSparkle />
      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/work/busy-bunny" element={<BusyBunnyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
