if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  if (window.lucide) {
    lucide.createIcons();
  }

  const monthlyTrendData = [
    { month: "2017-01", revenue: 138488 },
    { month: "2017-02", revenue: 291908 },
    { month: "2017-03", revenue: 449863 },
    { month: "2017-04", revenue: 417788 },
    { month: "2017-05", revenue: 592918 },
    { month: "2017-06", revenue: 511276 },
    { month: "2017-07", revenue: 592382 },
    { month: "2017-08", revenue: 674396 },
    { month: "2017-09", revenue: 727762 },
    { month: "2017-10", revenue: 779677 },
    { month: "2017-11", revenue: 1194882 },
    { month: "2017-12", revenue: 878401 },
    { month: "2018-01", revenue: 1115004 },
    { month: "2018-02", revenue: 992463 },
    { month: "2018-03", revenue: 1159652 },
    { month: "2018-04", revenue: 1160785 },
    { month: "2018-05", revenue: 1153982 },
    { month: "2018-06", revenue: 1023880 },
    { month: "2018-07", revenue: 1066540 },
    { month: "2018-08", revenue: 1022425 }
  ];

  const stateDeliveryData = [
    { state: "SP", days: 8.65 },
    { state: "PR", days: 11.91 },
    { state: "MG", days: 11.94 },
    { state: "DF", days: 12.92 },
    { state: "RJ", days: 14.82 },
    { state: "SC", days: 14.85 },
    { state: "RS", days: 15.16 },
    { state: "ES", days: 15.34 },
    { state: "GO", days: 15.38 },
    { state: "BA", days: 18.68 },
    { state: "PE", days: 18.07 },
    { state: "CE", days: 20.17 },
    { state: "PA", days: 23.02 },
    { state: "AM", days: 25.65 },
    { state: "RR", days: 29.30 }
  ];

  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroCanvas.offsetWidth);
    let height = (heroCanvas.height = heroCanvas.offsetHeight);

    window.addEventListener('resize', () => {
      width = heroCanvas.width = heroCanvas.offsetWidth;
      height = heroCanvas.height = heroCanvas.offsetHeight;
    });

    const particles = [];
    const numParticles = 35;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.15
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity * 0.5})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  const simDistance = document.getElementById('sim-distance');
  const simWeight = document.getElementById('sim-weight');
  const simSla = document.getElementById('sim-sla');
  const simPrice = document.getElementById('sim-price');

  const valDistance = document.getElementById('val-distance');
  const valWeight = document.getElementById('val-weight');
  const valSla = document.getElementById('val-sla');
  const valPrice = document.getElementById('val-price');

  const simCsatValue = document.getElementById('sim-csat-value');
  const simGaugeProgress = document.getElementById('sim-gauge-progress');
  const simTierBadge = document.getElementById('sim-tier-badge');
  const simStatusText = document.getElementById('sim-status-text');
  const simExplanationText = document.getElementById('sim-explanation-text');

  function calculateSimulator() {
    if (!simDistance || !simWeight || !simSla || !simPrice) return;

    const distance = parseFloat(simDistance.value);
    const weight = parseFloat(simWeight.value);
    const sla = parseFloat(simSla.value);
    const price = parseFloat(simPrice.value);

    valDistance.textContent = `${distance} km`;
    valWeight.textContent = `${weight.toLocaleString()} g`;
    valSla.textContent = `${sla} Days`;
    valPrice.textContent = `R$ ${price.toLocaleString()}`;

    const baseDeliveryDays = 4.5 + (distance / 250) + (weight / 5000);
    const actualDays = Math.round(baseDeliveryDays * 10) / 10;
    const delayDelta = actualDays - sla;

    let csat = 4.6 - (actualDays / 25);
    if (delayDelta > 0) {
      csat -= delayDelta * 0.35;
    }
    csat = Math.max(1.0, Math.min(5.0, Math.round(csat * 10) / 10));

    simCsatValue.textContent = csat.toFixed(1);
    const degrees = (csat / 5.0) * 360;
    simGaugeProgress.style.background = `conic-gradient(var(--color-primary) ${degrees}deg, var(--bg-surface-elevated) ${degrees}deg)`;

    if (delayDelta <= 0) {
      simTierBadge.style.color = '#f59e0b';
      simTierBadge.style.borderColor = '#f59e0b';
      simStatusText.textContent = 'ON-TIME DELIVERY';
      simExplanationText.textContent = `Estimasi tiba aktual ${actualDays} hari (${Math.abs(Math.round(delayDelta * 10) / 10)} hari lebih cepat dari batas SLA). Respon kepuasan tinggi.`;
    } else {
      simTierBadge.style.color = '#ef4444';
      simTierBadge.style.borderColor = '#ef4444';
      simStatusText.textContent = 'DELIVERY DELAY RISK';
      simExplanationText.textContent = `Estimasi tiba aktual ${actualDays} hari (${Math.round(delayDelta * 10) / 10} hari terlambat dari SLA). Berisiko menurunkan review pelanggan secara drastis.`;
    }
  }

  [simDistance, simWeight, simSla, simPrice].forEach(input => {
    if (input) input.addEventListener('input', () => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      calculateSimulator();
    });
  });

  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      simDistance.value = chip.dataset.dist;
      simWeight.value = chip.dataset.weight;
      simSla.value = chip.dataset.sla;
      simPrice.value = chip.dataset.price;
      calculateSimulator();
    });
  });

  document.querySelectorAll('.bento-card, .console-deck-panel, .gauge-console-card, .math-telemetry-card, .analytics-panel').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 28,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    });

    document.querySelectorAll('.chapter-section').forEach(section => {
      const heading = section.querySelector('.chapter-heading-box');
      const cards = section.querySelectorAll('.bento-card, .math-telemetry-card, .analytics-panel');

      if (heading) {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%'
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out'
        });
      }

      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%'
          },
          opacity: 0,
          y: 35,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    });
  }

  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ]
    });
  }

  let monthlyChart = null;
  let stateChart = null;

  function renderCharts() {
    const isLight = document.body.classList.contains('light-theme');
    const textCol = isLight ? '#475569' : '#94a3b8';
    const gridCol = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';

    const mCtx = document.getElementById('monthlyTrendChart');
    if (mCtx) {
      if (monthlyChart) monthlyChart.destroy();
      monthlyChart = new Chart(mCtx.getContext('2d'), {
        type: 'line',
        data: {
          labels: monthlyTrendData.map(d => d.month),
          datasets: [{
            data: monthlyTrendData.map(d => d.revenue),
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            fill: true,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#f59e0b'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: gridCol },
              ticks: { color: textCol, font: { family: 'JetBrains Mono', size: 10 } }
            },
            x: {
              grid: { display: false },
              ticks: { color: textCol, font: { family: 'Plus Jakarta Sans', size: 9 }, maxRotation: 45 }
            }
          }
        }
      });
    }

    const sCtx = document.getElementById('stateDeliveryChart');
    if (sCtx) {
      if (stateChart) stateChart.destroy();
      stateChart = new Chart(sCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: stateDeliveryData.map(d => d.state),
          datasets: [{
            data: stateDeliveryData.map(d => d.days),
            backgroundColor: '#f59e0bb0',
            hoverBackgroundColor: '#f59e0b',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              max: 32,
              grid: { color: gridCol },
              ticks: { color: textCol, font: { family: 'JetBrains Mono', size: 10 } }
            },
            x: {
              grid: { display: false },
              ticks: { color: textCol, font: { family: 'Plus Jakarta Sans', size: 9 } }
            }
          }
        }
      });
    }
  }

  renderCharts();

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.chapter-section').forEach(section => {
      const heading = section.querySelector('.chapter-heading-box');
      const cards = section.querySelectorAll('.double-bezel-card, .console-bezel-outer, .gauge-console-card');

      if (heading) {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%'
          },
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power2.out'
        });
      }

      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 88%'
          },
          opacity: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out'
        });
      }
    });
  }

  function triggerKaTeX() {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  triggerKaTeX();
  setTimeout(triggerKaTeX, 300);
});
