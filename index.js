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
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 1200;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1.0);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = target * easeProgress;
        
        counter.textContent = currentVal.toFixed(decimals);

        if (progress < 1.0) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      }

      requestAnimationFrame(updateCounter);
    });
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

  function getSeabornTheme() {
    const isDark = currentTheme === 'dark';
    return {
      textColor: isDark ? '#94a3b8' : '#333333',
      titleColor: isDark ? '#f8fafc' : '#111111',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      tooltipBg: isDark ? '#101726' : '#ffffff',
      tooltipBorder: isDark ? '#1e293b' : '#d4d4d8',
      // Seaborn Notebook Palette Matches
      tealLine: '#008080',
      notebookColors: ['#4F81BD', '#C0504D', '#9BBB59', '#8064A2', '#4BACC6'],
      rdYlGn: ['#dc2626', '#f59e0b', '#eab308', '#84cc16', '#10b981'],
      crestGradient: [
        '#2b5c8f', '#316999', '#38779b', '#3f859d', '#46939f',
        '#4da1a1', '#54afa3', '#5bbda5', '#62cba7', '#69d9a9',
        '#70e7ab', '#77f5ad', '#84f7b5', '#91f9bd', '#9efbc5',
        '#abfdcd', '#b8ffd5', '#c5ffdd', '#d2ffe5', '#dffff0'
      ]
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

    const st = getSeabornTheme();
    const labels = dashboardData.monthly_trend.map(d => d.month);
    const data = dashboardData.monthly_trend.map(d => d.revenue / 1000);

    // Matching notebook plot: linewidth 3, color #008080 (Teal), marker circle
    charts.monthlyTrend = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Payments (BRL Ribuan)',
          data: data,
          borderColor: st.tealLine,
          backgroundColor: 'rgba(0, 128, 128, 0.06)',
          borderWidth: 3,
          fill: true,
          tension: 0.1,
          pointRadius: 4,
          pointBackgroundColor: st.tealLine,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#dc2626'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: st.tooltipBg,
            titleColor: st.titleColor,
            bodyColor: st.textColor,
            borderColor: st.tooltipBorder,
            borderWidth: 1,
            titleFont: { family: 'JetBrains Mono', size: 12 },
            bodyFont: { family: 'JetBrains Mono', size: 11 },
            callbacks: {
              label: (ctx) => ` Total GMV: ${ctx.raw.toFixed(1)}K BRL`
            }
          }
        },
        scales: {
          x: {
            grid: { display: true, color: st.gridColor, borderDash: [3, 3] },
            ticks: { color: st.textColor, font: { family: 'JetBrains Mono', size: 10 }, maxTicksLimit: 8 }
          },
          y: {
            grid: { display: true, color: st.gridColor, borderDash: [3, 3] },
            ticks: { color: st.textColor, font: { family: 'JetBrains Mono', size: 10 }, callback: (v) => `${v}K BRL` }
          }
        },
        onHover: (event, elements, chart) => {
          const readout = document.getElementById('hover-revenue-readout');
          if (!readout) return;
          if (elements && elements.length > 0) {
            const idx = elements[0].index;
            const month = chart.data.labels[idx];
            const val = chart.data.datasets[0].data[idx];
            readout.textContent = `${month}  |  Total GMV: R$ ${val.toFixed(2)} Ribu`;
          }
        }
      }
    });
  }

  function renderStateDeliveryChart() {
    const canvas = document.getElementById('stateDeliveryChart');
    if (!canvas) return;

    const st = getSeabornTheme();
    const labels = dashboardData.state_delivery.map(d => d.state);
    const days = dashboardData.state_delivery.map(d => d.average_days);

    // Matching notebook seaborn 'crest' palette
    charts.stateDelivery = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: days,
          backgroundColor: st.crestGradient,
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: 'rgba(0,0,0,0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: st.tooltipBg,
            titleColor: st.titleColor,
            bodyColor: st.textColor,
            borderColor: st.tooltipBorder,
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` Rata-rata: ${ctx.raw.toFixed(1)} Hari`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: st.textColor, font: { family: 'JetBrains Mono', size: 10 } } },
          y: { grid: { display: true, color: st.gridColor, borderDash: [3, 3] }, ticks: { color: st.textColor, font: { family: 'JetBrains Mono', size: 10 }, callback: (v) => `${v}d` } }
        }
      }
    });
  }

  function renderDelayImpactChart() {
    const canvas = document.getElementById('delayImpactChart');
    if (!canvas) return;

    const st = getSeabornTheme();
    const labels = dashboardData.delay_impact.map(d => d.score);
    const days = dashboardData.delay_impact.map(d => d.avg_delivery_days);

    // Matching notebook Seaborn 'RdYlGn' palette (Review Score vs Delivery Time)
    charts.delayImpact = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: days,
          backgroundColor: st.rdYlGn,
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: 'rgba(0,0,0,0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: st.tooltipBg,
            titleColor: st.titleColor,
            bodyColor: st.textColor,
            borderColor: st.tooltipBorder,
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` Rata-rata: ${ctx.raw.toFixed(1)} Hari Pengiriman`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: st.textColor, font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } } },
          y: { grid: { display: true, color: st.gridColor, borderDash: [3, 3] }, ticks: { color: st.textColor, font: { family: 'JetBrains Mono', size: 10 }, callback: (v) => `${v}d` } }
        }
      }
    });
  }

  function renderRFMDonutChart() {
    const canvas = document.getElementById('rfmDonutChart');
    if (!canvas) return;

    const st = getSeabornTheme();
    const labels = dashboardData.rfm_segments.map(d => d.segment);
    const data = dashboardData.rfm_segments.map(d => d.pct);

    // Matching notebook exact 5-color palette: ['#4F81BD', '#C0504D', '#9BBB59', '#8064A2', '#4BACC6']
    charts.rfmDonut = new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: st.notebookColors,
          borderWidth: 2,
          borderColor: st.tooltipBg
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        animation: { duration: 900, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: st.titleColor,
              font: { family: 'Plus Jakarta Sans', size: 11, weight: '500' },
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: st.tooltipBg,
            titleColor: st.titleColor,
            bodyColor: st.textColor,
            borderColor: st.tooltipBorder,
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
    const sliderRepeat = document.getElementById('slider-sim-repeat');
    const sliderDelivery = document.getElementById('slider-sim-delivery');
    const sliderAOV = document.getElementById('slider-sim-aov');
    const btnReset = document.getElementById('btn-reset-sim');

    if (!sliderRepeat || !sliderDelivery || !sliderAOV) return;

    function recalculate() {
      const repeatVal = parseFloat(sliderRepeat.value);
      const deliveryReduction = parseFloat(sliderDelivery.value);
      const aovIncreasePct = parseFloat(sliderAOV.value);

      document.getElementById('txt-sim-repeat').textContent = `${repeatVal.toFixed(2)}%`;
      document.getElementById('txt-sim-delivery').textContent = `-${deliveryReduction.toFixed(1)} Hari`;
      document.getElementById('txt-sim-aov').textContent = `+${aovIncreasePct}%`;

      const baseGMV = 16008872.12;
      const baseOrders = 99441;
      const baseAOV = 160.99;

      const extraRepeatOrders = baseOrders * ((repeatVal - 3.12) / 100);
      const newAOV = baseAOV * (1 + aovIncreasePct / 100);
      const newOrders = baseOrders + extraRepeatOrders;
      const projectedGMV = newOrders * newAOV;
      const deltaGMV = projectedGMV - baseGMV;

      const baseRating = 4.09;
      const ratingLift = (deliveryReduction * 0.08) + ((repeatVal - 3.12) * 0.02);
      const projectedRating = Math.min(5.0, baseRating + ratingLift);

      document.getElementById('sim-projected-gmv').textContent = `R$ ${(projectedGMV / 1e6).toFixed(2)}M`;
      document.getElementById('sim-delta-gmv').textContent = `+R$ ${(deltaGMV / 1e6).toFixed(2)}M`;
      document.getElementById('sim-projected-rating').textContent = `${projectedRating.toFixed(2)} / 5.0`;
    }

    sliderRepeat.addEventListener('input', recalculate);
    sliderDelivery.addEventListener('input', recalculate);
    sliderAOV.addEventListener('input', recalculate);

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        sliderRepeat.value = 3.12;
        sliderDelivery.value = 0;
        sliderAOV.value = 0;
        recalculate();
      });
    }
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
