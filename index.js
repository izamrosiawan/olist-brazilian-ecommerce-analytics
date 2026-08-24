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
    { state: "CE", days: 20.81 },
    { state: "PA", days: 23.32 },
    { state: "MA", days: 23.45 },
    { state: "AM", days: 25.98 },
    { state: "AP", days: 26.73 },
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
    const numParticles = 25;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 1,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
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
        ctx.fillStyle = `rgba(217, 119, 6, ${p.opacity * 0.5})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(15, 23, 42, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  const simDist = document.getElementById('sim-distance');
  const simWeight = document.getElementById('sim-weight');
  const simSla = document.getElementById('sim-sla');
  const simPrice = document.getElementById('sim-price');

  const valDist = document.getElementById('val-distance');
  const valWeight = document.getElementById('val-weight');
  const valSla = document.getElementById('val-sla');
  const valPrice = document.getElementById('val-price');

  const simCsatValue = document.getElementById('sim-csat-value');
  const simGaugeProgress = document.getElementById('sim-gauge-progress');
  const simTierBadge = document.getElementById('sim-tier-badge');
  const simStatusText = document.getElementById('sim-status-text');
  const simExplanationText = document.getElementById('sim-explanation-text');

  function calculateSimulator() {
    if (!simDist || !simWeight || !simSla || !simPrice) return;

    const dist = parseFloat(simDist.value);
    const weight = parseFloat(simWeight.value);
    const sla = parseFloat(simSla.value);
    const price = parseFloat(simPrice.value);

    if (valDist) valDist.textContent = `${dist} km`;
    if (valWeight) valWeight.textContent = `${weight >= 1000 ? (weight/1000).toFixed(1) + ' kg' : weight + ' g'}`;
    if (valSla) valSla.textContent = `${sla} Days`;
    if (valPrice) valPrice.textContent = `R$ ${price}`;

    const estDays = 4.5 + (dist * 0.0052) + (weight * 0.00035);
    const delay = estDays - sla;

    let csat = 4.6 - Math.max(0, delay) * 0.42 - (dist > 2500 ? 0.25 : 0);
    csat = Math.max(1.0, Math.min(5.0, Math.round(csat * 10) / 10));

    if (simCsatValue) simCsatValue.textContent = csat.toFixed(1);
    if (simGaugeProgress) {
      const degrees = (csat / 5.0) * 360;
      simGaugeProgress.style.background = `conic-gradient(var(--color-primary) ${degrees}deg, var(--bg-surface-elevated) ${degrees}deg)`;
    }

    if (simTierBadge && simStatusText && simExplanationText) {
      if (delay <= 0) {
        simStatusText.textContent = 'ON-TIME DELIVERY';
        simExplanationText.textContent = `Estimasi tiba aktual ${estDays.toFixed(1)} hari. Paket diproyeksikan tiba ${(Math.abs(delay)).toFixed(1)} hari sebelum batas SLA.`;
      } else {
        simStatusText.textContent = 'HIGH DELAY RISK';
        simExplanationText.textContent = `Peringatan: Paket diproyeksikan terlambat ${delay.toFixed(1)} hari melebihi SLA penjual (${sla} hari).`;
      }
    }
  }

  [simDist, simWeight, simSla, simPrice].forEach(input => {
    if (input) input.addEventListener('input', () => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      calculateSimulator();
    });
  });

  document.querySelectorAll('.preset-chip[data-dist]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (simDist && chip.dataset.dist) simDist.value = chip.dataset.dist;
      if (simWeight && chip.dataset.weight) simWeight.value = chip.dataset.weight;
      if (simSla && chip.dataset.sla) simSla.value = chip.dataset.sla;
      if (simPrice && chip.dataset.price) simPrice.value = chip.dataset.price;
      calculateSimulator();
    });
  });

  let monthlyChart = null;
  let stateChart = null;

  function renderCharts() {
    const textCol = '#475569';
    const gridCol = 'rgba(15, 23, 42, 0.06)';

    const mCtx = document.getElementById('monthlyTrendChart');
    if (mCtx) {
      if (monthlyChart) monthlyChart.destroy();
      monthlyChart = new Chart(mCtx.getContext('2d'), {
        type: 'line',
        data: {
          labels: monthlyTrendData.map(d => d.month),
          datasets: [{
            data: monthlyTrendData.map(d => d.revenue),
            borderColor: '#d97706',
            backgroundColor: 'rgba(217, 119, 6, 0.08)',
            fill: true,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#d97706'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0f172a',
              titleColor: '#ffffff',
              bodyColor: '#94a3b8',
              borderColor: '#d97706',
              borderWidth: 1
            }
          },
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
            backgroundColor: '#d97706b0',
            hoverBackgroundColor: '#d97706',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0f172a',
              titleColor: '#ffffff',
              bodyColor: '#94a3b8',
              borderColor: '#d97706',
              borderWidth: 1
            }
          },
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

  function renderAllKaTeX() {
    if (!window.katex) return;
    document.querySelectorAll('.katex-formula-box').forEach(el => {
      let tex = el.getAttribute('data-tex');
      if (!tex) {
        tex = el.textContent.trim().replace(/^\$\$|\$\$$/g, '').trim();
        if (tex) el.setAttribute('data-tex', tex);
      }
      if (tex) {
        try {
          katex.render(tex, el, { displayMode: true, throwOnError: false });
        } catch (err) {
          console.warn('KaTeX render warning:', err);
        }
      }
    });
  }

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

  calculateSimulator();
  renderCharts();
  renderAllKaTeX();
  setTimeout(renderAllKaTeX, 250);
});
