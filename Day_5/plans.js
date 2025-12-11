const plansContainer = document.getElementById("plans");

fetch("https://6933fc0a4090fe3bf01e8cb5.mockapi.io/api/plans/plans")
  .then(response => response.json())
  .then(data => {
    // Generate all plan cards HTML at once
    const plansHTML = data.map(plan => `
      <div class="plan-card">
        <h3>${plan.planName}</h3>
        <p><strong>Validity:</strong> ${plan.validity}</p>
        <p><strong>Speed:</strong> ${plan.speed}</p>
        <p>${plan.description}</p>
        <p class="price">₹${plan.price}</p>
        <button class="select-btn">Select Plan</button>
      </div>
    `).join('');

    plansContainer.innerHTML = plansHTML;

    // Apply automatic staggered fade-in
    const cards = document.querySelectorAll('.plan-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--delay', `${index * 0.2}s`);
    });
  })
  .catch(err => console.error("Error fetching data:", err));
