document.addEventListener('DOMContentLoaded', () => {
  // Global variables to store dashboard data and Chart instances
  let dashboardData = null;
  const charts = {};

  // Tab Navigation Handling
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.querySelector('button').addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      
      // Update active nav class
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Update visible content panel
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${tabName}`) {
          content.classList.add('active');
        }
      });

      // Trigger Chart renders / updates in case of sizing glitches
      if (charts[tabName]) {
        charts[tabName].forEach(chart => chart.resize());
      }
    });
  });

  // Load Aggregated Dashboard Data
  fetch('dashboard_data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load dashboard data JSON.');
      }
      return response.json();
    })
    .then(data => {
      dashboardData = data;
      
      // 1. Populate Overview KPIs
      populateKPIs(data.kpis);
      
      // 2. Render Charts
      initCharts(data);
      
      // 3. Populate Top Cities Table
      populateCitiesTable(data.top_cities, data.kpis.total_revenue);
      
      // 4. Initialize Business Impact Simulator
      initSimulator(data.kpis);
    })
    .catch(error => {
      console.error('Error loading data:', error);
      alert('Error loading dashboard analytics data. Check console for logs.');
    });

  // Format Helpers
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const formatNumber = (val) => {
    return new Intl.NumberFormat('pt-BR').format(val);
  };

  // Populate KPIs
  function populateKPIs(kpis) {
    document.getElementById('kpi-revenue').textContent = formatCurrency(kpis.total_revenue);
    document.getElementById('kpi-orders').textContent = formatNumber(kpis.total_orders);
    document.getElementById('kpi-aov').textContent = formatCurrency(kpis.aov);
    document.getElementById('kpi-repeat').textContent = `${kpis.repeat_purchase_rate.toFixed(2)}%`;
    document.getElementById('kpi-delivery').textContent = `${kpis.average_delivery_time.toFixed(1)} Days`;
    document.getElementById('kpi-rating').textContent = `${kpis.average_review_score.toFixed(2)} / 5.0`;

    // Baseline details in the manifest card (Simulator Tab)
    document.getElementById('manifest-base-revenue').textContent = formatCurrency(kpis.total_revenue);
    document.getElementById('manifest-total-revenue').textContent = formatCurrency(kpis.total_revenue);
  }

  // Populate Top Cities Table
  function populateCitiesTable(cities, totalRevenue) {
    const tbody = document.querySelector('#table-top-cities tbody');
    tbody.innerHTML = '';
    
    cities.forEach((city, index) => {
      const share = (city.revenue / totalRevenue) * 100;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-mono">${index + 1}</td>
        <td><strong>${city.city}</strong></td>
        <td style="text-align: right;">${formatNumber(city.orders)}</td>
        <td style="text-align: right;">${formatCurrency(city.revenue)}</td>
        <td style="text-align: right;" class="font-mono">${share.toFixed(2)}%</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Initialize Chart.js monochrome charts
  function initCharts(data) {
    // Set custom Chart.js Defaults
    Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    Chart.defaults.color = "#000000";
    Chart.defaults.plugins.legend.labels.boxWidth = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    
    // Grid styling helper
    const gridConfig = {
      color: '#e5e7eb',
      tickBorderDash: [4, 4],
      borderColor: '#000000',
      drawTicks: true
    };

    // ----- A. Monthly Trend Line Chart (Overview Tab) -----
    const months = data.monthly_trend.map(d => d.month);
    const revenues = data.monthly_trend.map(d => d.revenue);
    
    // Find index of Black Friday Peak (November 2017) to style it uniquely
    const bfIndex = months.indexOf('2017-11');
    const pointBorderColors = months.map((m, i) => i === bfIndex ? '#d92d20' : '#000000');
    const pointBackgroundColors = months.map((m, i) => i === bfIndex ? '#d92d20' : '#ffffff');
    const pointRadii = months.map((m, i) => i === bfIndex ? 8 : 4);
    const pointHoverRadii = months.map((m, i) => i === bfIndex ? 10 : 6);

    const ctxTrend = document.getElementById('chart-monthly-trend').getContext('2d');
    const chartTrend = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Revenue (BRL)',
          data: revenues,
          borderColor: '#000000',
          borderWidth: 2,
          pointBorderColor: pointBorderColors,
          pointBackgroundColor: pointBackgroundColors,
          pointBorderWidth: 2,
          pointRadius: pointRadii,
          pointHoverRadius: pointHoverRadii,
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#000000',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            cornerRadius: 4,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += formatCurrency(context.parsed.y);
                }
                if (context.dataIndex === bfIndex) {
                  label += ' [BLACK FRIDAY PEAK]';
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "'JetBrains Mono', monospace", size: 10 },
              callback: function(val, index) {
                // Return only every 2nd month label to avoid overlap
                return index % 2 === 0 ? this.getLabelForValue(val) : '';
              }
            }
          },
          y: {
            grid: gridConfig,
            ticks: {
              font: { family: "'JetBrains Mono', monospace", size: 10 },
              callback: function(value) {
                return (value / 1000).toFixed(0) + 'k BRL';
              }
            }
          }
        }
      }
    });
    
    // Add to chart garbage collector for tabs switching
    charts['overview'] = [chartTrend];

    // ----- B. Top Categories Horizontal Bar Chart (Demand Tab) -----
    const cats = data.top_categories.map(d => d.category);
    const catRevenues = data.top_categories.map(d => d.revenue);

    const ctxCats = document.getElementById('chart-top-categories').getContext('2d');
    const chartCats = new Chart(ctxCats, {
      type: 'bar',
      data: {
        labels: cats,
        datasets: [{
          label: 'Total Revenue (BRL)',
          data: catRevenues,
          backgroundColor: '#000000',
          hoverBackgroundColor: '#333333',
          borderWidth: 0,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#000000',
            callbacks: {
              label: (ctx) => `Revenue: ${formatCurrency(ctx.parsed.x)}`
            }
          }
        },
        scales: {
          x: {
            grid: gridConfig,
            ticks: {
              font: { family: "'JetBrains Mono', monospace", size: 10 },
              callback: (value) => (value / 1000000).toFixed(1) + 'M BRL'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { size: 11 }
            }
          }
        }
      }
    });

    // ----- C. Payment Methods Donut Chart (Demand Tab) -----
    const methods = data.payment_methods.map(d => d.method);
    const methodPercentages = data.payment_methods.map(d => d.percentage);

    const ctxPay = document.getElementById('chart-payment-methods').getContext('2d');
    const chartPay = new Chart(ctxPay, {
      type: 'doughnut',
      data: {
        labels: methods,
        datasets: [{
          data: methodPercentages,
          backgroundColor: ['#000000', '#4b5563', '#9ca3af', '#e5e7eb'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: { size: 12 },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: '#000000',
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toFixed(1)}%`
            }
          }
        }
      }
    });

    charts['revenue'] = [chartCats, chartPay];

    // ----- D. Satisfaction vs Delivery Days Bar Chart (Logistics Tab) -----
    const scores = data.satisfaction_delivery.map(d => d.score);
    const delDaysByScore = data.satisfaction_delivery.map(d => d.average_days);
    
    // Color 1-star (worst) red to draw selective visual attention
    const scoreBarColors = scores.map(s => s === 1 ? '#d92d20' : '#000000');

    const ctxRevDel = document.getElementById('chart-reviews-delivery').getContext('2d');
    const chartRevDel = new Chart(ctxRevDel, {
      type: 'bar',
      data: {
        labels: scores.map(s => `${s} Star${s > 1 ? 's' : ''}`),
        datasets: [{
          data: delDaysByScore,
          backgroundColor: scoreBarColors,
          borderWidth: 0,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#000000',
            callbacks: {
              label: (ctx) => `Avg Delivery Time: ${ctx.parsed.y.toFixed(1)} Days`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: gridConfig,
            ticks: {
              font: { family: "'JetBrains Mono', monospace", size: 10 },
              callback: (value) => `${value} Days`
            }
          }
        }
      }
    });

    // ----- E. State Delivery Horizontal SLA Chart (Logistics Tab) -----
    // To keep it clean, show 5 fastest and 5 slowest states (matching notebook analysis)
    const sortedStates = [...data.state_delivery];
    const fastest5 = sortedStates.slice(0, 5);
    const slowest5 = sortedStates.slice(-5).reverse();
    
    const combinedStates = [...fastest5, { state: '---', average_days: 0 }, ...slowest5];
    const stateLabels = combinedStates.map(d => d.state);
    const stateDays = combinedStates.map(d => d.average_days);
    const stateBarColors = combinedStates.map((d, i) => {
      if (d.state === '---') return 'transparent';
      return i > 5 ? '#d92d20' : '#000000'; // highlight slow ones in red
    });

    const ctxStateDel = document.getElementById('chart-state-delivery').getContext('2d');
    const chartStateDel = new Chart(ctxStateDel, {
      type: 'bar',
      data: {
        labels: stateLabels,
        datasets: [{
          data: stateDays,
          backgroundColor: stateBarColors,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#000000',
            callbacks: {
              label: (ctx) => {
                if (ctx.label === '---') return '';
                return `Average SLA: ${ctx.parsed.x.toFixed(1)} Days`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: gridConfig,
            ticks: {
              font: { family: "'JetBrains Mono', monospace", size: 10 },
              callback: (value) => `${value}d`
            }
          },
          y: {
            grid: { display: false }
          }
        }
      }
    });

    charts['logistics'] = [chartRevDel, chartStateDel];
  }

  // Business Impact Simulator
  function initSimulator(kpis) {
    const sliderRepeat = document.getElementById('slider-repeat');
    const sliderSla = document.getElementById('slider-sla');
    const sliderBudget = document.getElementById('slider-budget');
    const btnReset = document.getElementById('btn-reset-simulator');

    const valRepeat = document.getElementById('sim-val-repeat');
    const valSla = document.getElementById('sim-val-sla');
    const valBudget = document.getElementById('sim-val-budget');

    // Outputs
    const outRetentionGains = document.getElementById('manifest-retention-gains');
    const outSlaGains = document.getElementById('manifest-sla-gains');
    const outAovGains = document.getElementById('manifest-aov-gains');
    const outNewCustomers = document.getElementById('manifest-new-customers');
    const outRatingScore = document.getElementById('manifest-rating-score');
    const outTotalRevenue = document.getElementById('manifest-total-revenue');
    const outStatus = document.getElementById('manifest-status');
    const outTimestamp = document.getElementById('manifest-timestamp');

    // Set simulator timestamp
    const now = new Date();
    outTimestamp.textContent = `DATE: ${now.getDate()}-${now.toLocaleString('en-US', { month: 'short' }).toUpperCase()}-${now.getFullYear()} // TIME: ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Mathematical modeling equations based on the notebook clean metrics
    function updateSimulation() {
      const targetRepeat = parseFloat(sliderRepeat.value);
      const targetSla = parseFloat(sliderSla.value);
      const targetBudgetShift = parseFloat(sliderBudget.value);

      // Update badge displays
      valRepeat.textContent = `${targetRepeat.toFixed(2)}%`;
      valSla.textContent = `${targetSla.toFixed(1)} Days`;
      valBudget.textContent = `${targetBudgetShift}%`;

      // 1. Customer Loyalty Calculations (Base repeat rate: 3.12%, customer count: 96,096)
      const repeatDelta = targetRepeat - 3.12;
      const additionalOrders = Math.round(kpis.total_customers * (repeatDelta / 100.0));
      const retentionRevenueUplift = additionalOrders * kpis.aov;

      // 2. Logistics SLA Review Rating Savings (Baseline SLA: 25.6 days in slow regions)
      // Slow states account for roughly 3% of total volume (approx 3,000 orders). 
      // Improving SLA saves cost of refunds, churn, and ad inefficiencies, calculated as 35,000 BRL per day saved.
      const slaReduction = 25.6 - targetSla;
      const slaRevenueUplift = slaReduction * 35000;
      
      // SLA-Rating projection formula: reducing delivery delay increases rating
      const ratingImprovement = slaReduction * 0.015;
      const projectedRating = Math.min(5.00, kpis.average_review_score + ratingImprovement);

      // 3. High AOV Budget Allocation Shift (Watches & Gifts focus)
      // Shift increases Average Order Value but can cause minor volume contraction.
      // Every 10% budget shift increases AOV by 2.5 BRL and contracts volume by 0.2%.
      const newAov = kpis.aov + (targetBudgetShift / 100.0 * 25.0);
      const orderContractionMultiplier = 1.0 - (targetBudgetShift / 100.0 * 0.02);
      const aovRevenueUplift = (newAov * kpis.total_orders * orderContractionMultiplier) - kpis.total_revenue;

      // Calculate Total simulated revenue
      const totalSimRevenue = kpis.total_revenue + retentionRevenueUplift + slaRevenueUplift + aovRevenueUplift;

      // Update Manifest output values
      outRetentionGains.textContent = `+${formatCurrency(retentionRevenueUplift)}`;
      outSlaGains.textContent = `+${formatCurrency(slaRevenueUplift)}`;
      outAovGains.textContent = aovRevenueUplift >= 0 
        ? `+${formatCurrency(aovRevenueUplift)}` 
        : `-${formatCurrency(Math.abs(aovRevenueUplift))}`;
        
      outNewCustomers.textContent = `+${formatNumber(additionalOrders)}`;
      outRatingScore.textContent = `${projectedRating.toFixed(2)} / 5.00`;
      outTotalRevenue.textContent = formatCurrency(totalSimRevenue);

      // Status indicator highlight
      if (targetRepeat > 3.12 || targetSla < 25.6 || targetBudgetShift > 0) {
        outStatus.textContent = "SIMULATED";
        outStatus.className = "manifest-stamp alert";
      } else {
        outStatus.textContent = "BASELINE";
        outStatus.className = "manifest-stamp";
      }
    }

    // Bind event listeners
    sliderRepeat.addEventListener('input', updateSimulation);
    sliderSla.addEventListener('input', updateSimulation);
    sliderBudget.addEventListener('input', updateSimulation);

    btnReset.addEventListener('click', () => {
      sliderRepeat.value = 3.12;
      sliderSla.value = 25.6;
      sliderBudget.value = 0;
      updateSimulation();
    });

    // Run initial simulation
    updateSimulation();
  }
});
