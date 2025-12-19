import React, { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../components/hero";
import Benefits from "../components/Benefits";
import PopularPlans from "../components/PopularPlans";
import Offers from "../components/Offers";
import RechargeOptions from "../components/RechargeOptions";
import Footer from "../components/Footer";

export default function Landing() {
  const [popularPlans, setPopularPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/popular-plans")
      .then((res) => {
        setPopularPlans(res.data);
        setLoadingPlans(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPlans(false);
      });
  }, []);

  return (
    <div>
      <Hero />
      <RechargeOptions />
      <Benefits />

      {/* ✅ Backend-connected Popular Plans */}
      <PopularPlans plansData={popularPlans} loading={loadingPlans} />

      <Offers />
      <Footer />
    </div>
  );
}
