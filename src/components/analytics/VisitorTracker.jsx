import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axiosClient";

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    // ✅ Track ONLY home page
    if (location.pathname === "/") {
      api.post("/analytics/visit", {
        page: "/",
      }).catch(() => {});
    }
  }, [location.pathname]);

  return null;
}
