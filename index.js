document.addEventListener('DOMContentLoaded', () => {
  
  const dashboardData = {
    monthly_trend: [
      { month: "2016-09", revenue: 252.24 },
      { month: "2016-10", revenue: 59090.48 },
      { month: "2016-12", revenue: 19.62 },
      { month: "2017-01", revenue: 138488.04 },
      { month: "2017-02", revenue: 291908.01 },
      { month: "2017-03", revenue: 449863.60 },
      { month: "2017-04", revenue: 417788.03 },
      { month: "2017-05", revenue: 592918.82 },
      { month: "2017-06", revenue: 511276.38 },
      { month: "2017-07", revenue: 592382.92 },
      { month: "2017-08", revenue: 674396.32 },
      { month: "2017-09", revenue: 727762.45 },
      { month: "2017-10", revenue: 779677.88 },
      { month: "2017-11", revenue: 1194882.80 },
      { month: "2017-12", revenue: 878401.48 },
      { month: "2018-01", revenue: 1115004.18 },
      { month: "2018-02", revenue: 992463.34 },
      { month: "2018-03", revenue: 1159652.12 },
      { month: "2018-04", revenue: 1160785.48 },
      { month: "2018-05", revenue: 1153982.15 },
      { month: "2018-06", revenue: 1023880.50 },
      { month: "2018-07", revenue: 1066540.75 },
      { month: "2018-08", revenue: 1022425.32 }
    ],
    state_details: {
      SP: { name: "Sao Paulo (SP)", sla: "8.65 Hari", orders: "41.746 Pesanan (41.9%)", rating: "4.18 / 5.0", color: "text-emerald" },
      RJ: { name: "Rio de Janeiro (RJ)", sla: "14.82 Hari", orders: "12.852 Pesanan (12.9%)", rating: "3.87 / 5.0", color: "text-amber" },
      MG: { name: "Minas Gerais (MG)", sla: "11.94 Hari", orders: "11.635 Pesanan (11.7%)", rating: "4.12 / 5.0", color: "text-emerald" },
      PR: { name: "Parana (PR)", sla: "11.91 Hari", orders: "5.045 Pesanan (5.1%)", rating: "4.19 / 5.0", color: "text-emerald" },
      RS: { name: "Rio Grande do Sul (RS)", sla: "15.16 Hari", orders: "5.466 Pesanan (5.5%)", rating: "4.10 / 5.0", color: "text-amber" },
      BA: { name: "Bahia (BA)", sla: "18.68 Hari", orders: "3.380 Pesanan (3.4%)", rating: "3.84 / 5.0", color: "text-red" },
      PE: { name: "Pernambuco (PE)", sla: "18.07 Hari", orders: "1.652 Pesanan (1.7%)", rating: "3.91 / 5.0", color: "text-red" },
      AM: { name: "Amazonas (AM)", sla: "25.65 Hari", orders: "148 Pesanan (0.1%)", rating: "4.01 / 5.0", color: "text-red" },
      RR: { name: "Roraima (RR)", sla: "29.30 Hari", orders: "46 Pesanan (<0.1%)", rating: "3.60 / 5.0", color: "text-red" }
    },
    state_delivery: [
      { state: "SP", average_days: 8.65 },
      { state: "PR", average_days: 11.91 },
      { state: "MG", average_days: 11.94 },
      { state: "DF", average_days: 12.92 },
      { state: "RJ", average_days: 14.82 },
      { state: "SC", average_days: 14.85 },
      { state: "RS", average_days: 15.16 },
      { state: "ES", average_days: 15.34 },
      { state: "GO", average_days: 15.38 },
      { state: "MS", average_days: 15.62 },
      { state: "TO", average_days: 17.66 },
      { state: "MT", average_days: 17.83 },
      { state: "PE", average_days: 18.07 },
      { state: "BA", average_days: 18.68 },
      { state: "CE", average_days: 20.17 },
      { state: "MA", average_days: 21.12 },
      { state: "PA", average_days: 23.02 },
      { state: "AM", average_days: 25.65 },
      { state: "AP", average_days: 27.20 },
      { state: "RR", average_days: 29.30 }
    ],
    delay_impact: [
      { score: "1 Bintang", avg_delivery_days: 20.20 },
      { score: "2 Bintang", avg_delivery_days: 16.31 },
      { score: "3 Bintang", avg_delivery_days: 14.02 },
      { score: "4 Bintang", avg_delivery_days: 12.15 },
      { score: "5 Bintang", avg_delivery_days: 10.61 }
    ],
    rfm_segments: [
      { segment: "Pelanggan Baru", count: 54820, pct: 57.0 },
      { segment: "Potensial Loyal", count: 18450, pct: 19.2 },
      { segment: "Pelanggan Berisiko", count: 12380, pct: 12.9 },
      { segment: "Champions (VIP)", count: 7449, pct: 7.8 },
      { segment: "Hibernating / Lost", count: 2997, pct: 3.1 }
    ]
  };

  let currentTheme = 'light';
  let charts = {};

  initScrollReveal();
  initAnimatedCounters();
  initTheme();
  initCharts();
  initStateSelector();
  initSimulator();
  initSQLExplorer();

  function initStateSelector() {
    const buttons = document.querySelectorAll('#state-selector-bar .segment-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const st = btn.dataset.state;
        const info = dashboardData.state_details[st];
        if (info) {
          const nameEl = document.getElementById('disp-state-name');
          const slaEl = document.getElementById('disp-state-sla');
          if (nameEl) nameEl.textContent = info.name;
          if (slaEl) slaEl.textContent = info.sla;
        }

        if (charts.stateDelivery) {
          const tc = getThemeColors();
          const labels = dashboardData.state_delivery.map(d => d.state);
          const days = dashboardData.state_delivery.map(d => d.average_days);
          const colors = days.map((d, i) => {
            if (labels[i] === st) return '#1d4ed8'; // highlighted active state
            return d < 12 ? 'rgba(5, 150, 105, 0.4)' : (d <= 18 ? 'rgba(217, 119, 6, 0.4)' : 'rgba(185, 28, 28, 0.4)');
          });
          charts.stateDelivery.data.datasets[0].backgroundColor = colors;
          charts.stateDelivery.update();
        }
      });
    });
  }

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  }

  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-card-value[data-target]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '2', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = target * ease;
      el.textContent = `${prefix}${val.toFixed(decimals)}${suffix}`;
      if (progress < 1.0) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  function initTheme() {
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      updateAllChartsTheme();
    });
  }

  function getThemeColors() {
    return {
      textColor: '#4b5563',
      titleColor: '#111827',
      gridColor: '#f1f3f5',
      tooltipBg: '#ffffff',
      tooltipBorder: '#e5e7eb',
      primaryBlue: '#1d4ed8',
      emerald: '#047857',
      amber: '#d97706',
      purple: '#7c3aed',
      teal: '#0d9488',
      slate: '#475569',
      red: '#b91c1c'
    };
  }

  function initStateSelector() {
    const buttons = document.querySelectorAll('#state-selector-bar .state-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const stateKey = btn.dataset.state;
        const data = dashboardData.state_details[stateKey];
        if (data) {
          document.getElementById('disp-state-name').textContent = data.name;
          const slaEl = document.getElementById('disp-state-sla');
          slaEl.textContent = data.sla;
          slaEl.className = `b-value ${data.color}`;
          document.getElementById('disp-state-orders').textContent = data.orders;
          document.getElementById('disp-state-rating').textContent = data.rating;
        }
      });
    });
  }

  function initCharts() {
    renderMonthlyTrendChart();
    renderStateDeliveryChart();
    renderDelayImpactChart();
    renderRFMDonutChart();
  }

  function renderMonthlyTrendChart() {
    const canvas = document.getElementById('monthlyTrendChart');
    if (!canvas) return;

    const tc = getThemeColors();
    const labels = dashboardData.monthly_trend.map(d => d.month);
    const data = dashboardData.monthly_trend.map(d => d.revenue / 1000);

    charts.monthlyTrend = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total GMV (R$ Ribuan)',
          data: data,
          borderColor: tc.primaryBlue,
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.2,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: tc.primaryBlue
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1000, easing: 'easeOutQuart' },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#ffffff',
            titleColor: '#0f172a',
            bodyColor: '#334155',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 10,
            boxPadding: 4,
            titleFont: { family: 'JetBrains Mono', size: 12, weight: '700' },
            bodyFont: { family: 'JetBrains Mono', size: 11 },
            callbacks: {
              label: (ctx) => ` Total GMV: R$ ${ctx.raw.toFixed(1)}K (BRL)`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: tc.textColor, font: { family: 'JetBrains Mono', size: 10 }, maxTicksLimit: 8 }
          },
          y: {
            grid: { color: tc.gridColor },
            ticks: { color: tc.textColor, font: { family: 'JetBrains Mono', size: 10 }, callback: (v) => `R$ ${v}K` }
          }
        }
      }
    });
  }

  function renderStateDeliveryChart() {
    const canvas = document.getElementById('stateDeliveryChart');
    if (!canvas) return;

    const tc = getThemeColors();
    const labels = dashboardData.state_delivery.map(d => d.state);
    const days = dashboardData.state_delivery.map(d => d.average_days);
    const colors = days.map(d => d < 12 ? tc.emerald : (d <= 18 ? tc.amber : tc.red));

    charts.stateDelivery = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: days,
          backgroundColor: colors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#ffffff',
            titleColor: '#0f172a',
            bodyColor: '#334155',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 8,
            titleFont: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
            bodyFont: { family: 'JetBrains Mono', size: 11 },
            callbacks: {
              label: (ctx) => ` Rata-rata: ${ctx.raw.toFixed(1)} Hari`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: tc.textColor, font: { family: 'JetBrains Mono', size: 10 } } },
          y: { grid: { color: tc.gridColor }, ticks: { color: tc.textColor, font: { family: 'JetBrains Mono', size: 10 }, callback: (v) => `${v}d` } }
        }
      }
    });
  }

  function renderDelayImpactChart() {
    const canvas = document.getElementById('delayImpactChart');
    if (!canvas) return;

    const tc = getThemeColors();
    const labels = dashboardData.delay_impact.map(d => d.score);
    const days = dashboardData.delay_impact.map(d => d.avg_delivery_days);

    charts.delayImpact = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: days,
          backgroundColor: [tc.red, tc.amber, '#94a3b8', tc.primaryBlue, tc.emerald],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#ffffff',
            titleColor: '#0f172a',
            bodyColor: '#334155',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 8,
            titleFont: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
            bodyFont: { family: 'JetBrains Mono', size: 11 },
            callbacks: {
              label: (ctx) => ` Waktu Kirim: ${ctx.raw.toFixed(1)} Hari`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: tc.textColor } },
          y: { grid: { color: tc.gridColor }, ticks: { color: tc.textColor, font: { family: 'JetBrains Mono', size: 10 }, callback: (v) => `${v}d` } }
        }
      }
    });
  }

  function renderRFMDonutChart() {
    const canvas = document.getElementById('rfmDonutChart');
    if (!canvas) return;

    const tc = getThemeColors();
    const labels = dashboardData.rfm_segments.map(d => d.segment);
    const data = dashboardData.rfm_segments.map(d => d.pct);

    charts.rfmDonut = new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [tc.primaryBlue, tc.teal, tc.amber, tc.purple, tc.slate],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        animation: { duration: 1000, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: tc.titleColor,
              font: { family: 'Plus Jakarta Sans', size: 11 },
              boxWidth: 8,
              boxHeight: 8,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: tc.tooltipBg,
            titleColor: tc.titleColor,
            bodyColor: tc.textColor,
            borderColor: tc.tooltipBorder,
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.raw}% (${dashboardData.rfm_segments[ctx.dataIndex].count.toLocaleString()} pembeli)`
            }
          }
        }
      }
    });
  }

  function updateAllChartsTheme() {
    Object.values(charts).forEach(c => {
      if (c) c.destroy();
    });
    initCharts();
  }

  function initSimulator() {
    const sliderSLA = document.getElementById('sim-sla-slider');
    const sliderRet = document.getElementById('sim-ret-slider');

    if (!sliderSLA || !sliderRet) return;

    function recalculate() {
      const slaVal = parseFloat(sliderSLA.value);
      const retVal = parseFloat(sliderRet.value);

      const txtSLA = document.getElementById('sim-sla-val');
      const txtRet = document.getElementById('sim-ret-val');
      if (txtSLA) txtSLA.textContent = `${slaVal} Hari`;
      if (txtRet) txtRet.textContent = `+${retVal.toFixed(1)}%`;

      const baseOrders = 99441;
      const baseAOV = 160.99;
      const extraOrders = baseOrders * (retVal / 100);
      const deltaGMV = extraOrders * baseAOV;

      const baseRating = 4.09;
      const ratingLift = (slaVal * 0.06) + (retVal * 0.02);
      const newRating = Math.min(5.0, baseRating + ratingLift);

      const ratingEl = document.getElementById('sim-res-rating');
      const gmvEl = document.getElementById('sim-res-gmv');

      if (ratingEl) ratingEl.textContent = `${newRating.toFixed(2)} / 5.0`;
      if (gmvEl) gmvEl.textContent = `+R$ ${(deltaGMV / 1000).toFixed(1)}K`;
    }

    sliderSLA.addEventListener('input', recalculate);
    sliderRet.addEventListener('input', recalculate);
    recalculate();
  }

  function initSQLExplorer() {
    const btnLogistics = document.getElementById('btn-q-logistics');
    const btnGrowth = document.getElementById('btn-q-growth');
    const btnRFM = document.getElementById('btn-q-rfm');
    const codeDisplay = document.getElementById('sql-code-display');

    const snippets = {
      logistics: `-- 1. Evaluasi Disparitas Pengiriman per Wilayah
SELECT 
    c.customer_state,
    COUNT(o.order_id) AS total_orders,
    ROUND(AVG(julianday(o.order_delivered_customer_date) - julianday(o.order_purchase_timestamp)), 1) AS avg_delivery_days,
    ROUND(AVG(r.review_score), 2) AS avg_review_score
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_reviews r ON o.order_id = r.order_id
WHERE o.order_status = 'delivered'
GROUP BY c.customer_state
ORDER BY total_orders DESC;`,

      growth: `-- 2. Analisis Pertumbuhan Pendapatan Bulanan (MoM)
WITH MonthlyGMV AS (
    SELECT 
        strftime('%Y-%m', o.order_purchase_timestamp) AS order_month,
        SUM(p.payment_value) AS gmv
    FROM orders o
    JOIN order_payments p ON o.order_id = p.order_id
    WHERE o.order_status = 'delivered'
    GROUP BY 1
)
SELECT 
    order_month,
    ROUND(gmv, 2) AS total_gmv,
    ROUND(((gmv - LAG(gmv) OVER (ORDER BY order_month)) / LAG(gmv) OVER (ORDER BY order_month)) * 100, 2) AS mom_growth_pct
FROM MonthlyGMV;`,

      rfm: `-- 3. Segmentasi Pelanggan Recency, Frequency, Monetary (RFM)
WITH CustomerRFM AS (
    SELECT 
        c.customer_unique_id,
        CAST(julianday('2018-09-01') - julianday(MAX(o.order_purchase_timestamp)) AS INT) AS recency,
        COUNT(DISTINCT o.order_id) AS frequency,
        SUM(p.payment_value) AS monetary
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN order_payments p ON o.order_id = p.order_id
    WHERE o.order_status = 'delivered'
    GROUP BY c.customer_unique_id
)
SELECT 
    customer_unique_id,
    recency,
    frequency,
    ROUND(monetary, 2) AS total_spend,
    NTILE(5) OVER (ORDER BY recency DESC) AS r_score,
    NTILE(5) OVER (ORDER BY frequency ASC) AS f_score,
    NTILE(5) OVER (ORDER BY monetary ASC) AS m_score
FROM CustomerRFM;`
    };

    function setSnippet(key, activeBtn) {
      if (codeDisplay) {
        codeDisplay.innerHTML = `<code>${snippets[key]}</code>`;
      }
      [btnLogistics, btnGrowth, btnRFM].forEach(b => {
        if (b) b.classList.remove('active');
      });
      if (activeBtn) activeBtn.classList.add('active');
    }

    if (btnLogistics) btnLogistics.addEventListener('click', () => setSnippet('logistics', btnLogistics));
    if (btnGrowth) btnGrowth.addEventListener('click', () => setSnippet('growth', btnGrowth));
    if (btnRFM) btnRFM.addEventListener('click', () => setSnippet('rfm', btnRFM));
  }

});
