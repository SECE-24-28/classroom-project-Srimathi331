import fs from "fs";

const API_URL =
  "https://6933fc0a4090fe3bf01e8cb5.mockapi.io/api/plans/plans";

async function convertPlans() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const mongoReadyPlans = data.map((plan) => ({
      planName: plan.planName || plan.name,
      price: Number(plan.price),
      description: plan.description,
      validity: plan.validity, // <-- keeps "30 Days", "60 Days"
      speed: plan.speed || "4G",
    }));

    fs.writeFileSync(
      "plans.json",
      JSON.stringify(mongoReadyPlans, null, 2)
    );

    console.log("✅ plans.json created successfully!");
  } catch (error) {
    console.error("❌ Error converting plans:", error);
  }
}

convertPlans();
