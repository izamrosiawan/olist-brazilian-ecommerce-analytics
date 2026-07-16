document.addEventListener('DOMContentLoaded', () => {
  // Global variables to store dashboard data and Chart instances
  let dashboardData = null;
  const charts = {};

  // Tab Navigation Handling (Syncing Sidebar and Campaign subtabs)
  const navItems = document.querySelectorAll('.nav-item');
  const subtabBtns = document.querySelectorAll('.subtab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabName) {
    // 1. Update active sidebar item
    navItems.forEach(nav => {
      nav.classList.remove('active');
      if (nav.getAttribute('data-tab') === tabName) {
        nav.classList.add('active');
      }
    });

    // 2. Update active campaign subtab button
    subtabBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
      }
    });

    // 3. Update visible content panel
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `tab-${tabName}`) {
        content.classList.add('active');
      }
    });

    // Trigger Chart updates in case of layout shifts
    const activeCharts = charts[tabName];
    if (activeCharts) {
      activeCharts.forEach(chart => {
        chart.resize();
        chart.update();
      });
    }
  }

  // Bind Sidebar click handlers
  navItems.forEach(item => {
    item.querySelector('button').addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Bind Campaign subtab click handlers
  subtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      switchTab(tabName);
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
      
      // 3. Populate Category Drivers List
      populateCategoryList(data.top_categories);

      // 4. Populate Top Cities Table
      populateCitiesTable(data.top_cities, data.kpis.total_revenue);
      
      // 5. Initialize Business Impact Simulator
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

    // Baseline details in the manifest card (Simulator Tab)
    document.getElementById('manifest-base-revenue').textContent = formatCurrency(kpis.total_revenue);
    document.getElementById('manifest-total-revenue').textContent = formatCurrency(kpis.total_revenue);
  }

  // Populate Product Category Drivers (Influencer style list card)
  function populateCategoryList(categories) {
    const container = document.getElementById('overview-category-list');
    container.innerHTML = '';
    
    // Display top 5 categories
    categories.slice(0, 5).forEach((cat, index) => {
      const row = document.createElement('div');
      row.className = 'list-item-row';
      row.innerHTML = `
        <div class="list-item-left">
          <div class="list-item-avatar">${String(index + 1).padStart(2, '0')}</div>
          <div class="list-item-info">
            <span class="list-item-name">${cat.category}</span>
            <span class="list-item-desc">${
              index === 0 ? 'Volume Champion' : index === 1 ? 'High Ticket Margin' : 'Core Segment'
            }</span>
          </div>
        </div>
        <span class="list-item-value">${formatCurrency(cat.revenue)}</span>
      `;
      container.appendChild(row);
    });
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

  // Initialize Chart.js modern charts
  function initCharts(data) {
    // Set custom Chart.js Defaults
    Chart.defaults.font.family = "'Inter', -apple-system, sans-serif";
    Chart.defaults.color = "#64748b";
    Chart.defaults.plugins.legend.labels.boxWidth = 10;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    
    // Grid styling helper
    const gridConfig = {
      color: '#f1f5f9',
      tickBorderDash: [0, 0],
      borderColor: '#f1f5f9',
      drawTicks: false
    };

    // ----- A. Monthly Trend Line Chart (Overview Tab & Bottom) -----
    const months = data.monthly_trend.map(d => d.month);
    const revenues = data.monthly_trend.map(d => d.revenue);
    
    const bfIndex = months.indexOf('2017-11');
    const pointBorderColors = months.map((m, i) => i === bfIndex ? '#ef4444' : '#2563eb');
    const pointBackgroundColors = months.map((m, i) => i === bfIndex ? '#ef4444' : '#ffffff');
    const pointRadii = months.map((m, i) => i === bfIndex ? 8 : 3);
    const pointHoverRadii = months.map((m, i) => i === bfIndex ? 10 : 5);

    const ctxTrend = document.getElementById('chart-monthly-trend').getContext('2d');
    
    // Create a beautiful premium blue gradient background
    const gradient = ctxTrend.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.00)');

    const chartTrend = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Revenue (BRL)',
          data: revenues,
          borderColor: '#2563eb',
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          pointBorderColor: pointBorderColors,
          pointBackgroundColor: pointBackgroundColors,
          pointBorderWidth: 2,
          pointRadius: pointRadii,
          pointHoverRadius: pointHoverRadii,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            padding: 12,
            cornerRadius: 8,
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
                  label += ' [BLACK FRIDAY SURGE]';
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
    
    charts['overview'] = [chartTrend];

    // ----- B. Mini Delivery SLA Bar Chart (Overview Bottom Card) -----
    const scores = data.satisfaction_delivery.map(d => d.score);
    const delDaysByScore = data.satisfaction_delivery.map(d => d.average_days);
    
    // Gradient representation: Excellent (green), Average (blue), Poor (red)
    const miniBarColors = scores.map(s => {
      if (s >= 4) return '#10b981'; // Emerald Green
      if (s === 3) return '#3b82f6'; // Blue
      return '#ef4444';             // Rose Red
    });

    const ctxRevMini = document.getElementById('chart-reviews-delivery-mini').getContext('2d');
    const chartRevMini = new Chart(ctxRevMini, {
      type: 'bar',
      data: {
        labels: scores.map(s => `${s}★`),
        datasets: [{
          data: delDaysByScore,
          backgroundColor: miniBarColors,
          borderWidth: 0,
          borderRadius: 4,
          barThickness: 16
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            callbacks: {
              label: (ctx) => `Delivery: ${ctx.parsed.y.toFixed(1)} Days`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: gridConfig,
            ticks: {
              font: { size: 9 },
              callback: (value) => `${value}d`
            }
          }
        }
      }
    });

    // ----- C. Mini Payment Methods Donut (Overview Bottom Card) -----
    const methods = data.payment_methods.map(d => d.method);
    const methodPercentages = data.payment_methods.map(d => d.percentage);

    const ctxPayMini = document.getElementById('chart-payment-methods-mini').getContext('2d');
    const chartPayMini = new Chart(ctxPayMini, {
      type: 'doughnut',
      data: {
        labels: methods,
        datasets: [{
          data: methodPercentages,
          backgroundColor: ['#2563eb', '#10b981', '#7c3aed', '#f59e0b'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toFixed(1)}%`
            }
          }
        }
      }
    });

    charts['overview'].push(chartRevMini, chartPayMini);

    // ----- D. Top Categories Full Bar Chart (Demand Tab) -----
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
          backgroundColor: '#2563eb',
          hoverBackgroundColor: '#1d4ed8',
          borderWidth: 0,
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#1e293b' }
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
            ticks: { font: { size: 10 } }
          }
        }
      }
    });

    // ----- E. Payment Methods Full Donut Chart (Demand Tab) -----
    const ctxPayFull = document.getElementById('chart-payment-methods-full').getContext('2d');
    const chartPayFull = new Chart(ctxPayFull, {
      type: 'doughnut',
      data: {
        labels: methods,
        datasets: [{
          data: methodPercentages,
          backgroundColor: ['#2563eb', '#10b981', '#7c3aed', '#f59e0b'],
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
            labels: { font: { size: 12 }, padding: 15 }
          },
          tooltip: { backgroundColor: '#1e293b' }
        }
      }
    });

    charts['revenue'] = [chartCats, chartPayFull];

    // ----- F. Reviews Delivery Full Bar Chart (Logistics Tab) -----
    const ctxRevDel = document.getElementById('chart-reviews-delivery').getContext('2d');
    const chartRevDel = new Chart(ctxRevDel, {
      type: 'bar',
      data: {
        labels: scores.map(s => `${s} Star${s > 1 ? 's' : ''}`),
        datasets: [{
          data: delDaysByScore,
          backgroundColor: miniBarColors,
          borderWidth: 0,
          borderRadius: 6,
          barThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#1e293b' }
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

    // ----- G. State Delivery SLA Full Chart (Logistics Tab) -----
    const sortedStates = [...data.state_delivery];
    const fastest5 = sortedStates.slice(0, 5);
    const slowest5 = sortedStates.slice(-5).reverse();
    
    const combinedStates = [...fastest5, { state: '---', average_days: 0 }, ...slowest5];
    const stateLabels = combinedStates.map(d => d.state);
    const stateDays = combinedStates.map(d => d.average_days);
    const stateBarColors = combinedStates.map((d, i) => {
      if (d.state === '---') return 'transparent';
      return i > 5 ? '#ef4444' : '#10b981';
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
          tooltip: { backgroundColor: '#1e293b' }
        },
        scales: {
          x: {
            grid: gridConfig,
            ticks: {
              font: { family: "'JetBrains Mono', monospace", size: 10 },
              callback: (value) => `${value}d`
            }
          },
          y: { grid: { display: false } }
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

    function updateSimulation() {
      const targetRepeat = parseFloat(sliderRepeat.value);
      const targetSla = parseFloat(sliderSla.value);
      const targetBudgetShift = parseFloat(sliderBudget.value);

      // Update badge displays
      valRepeat.textContent = `${targetRepeat.toFixed(2)}%`;
      valSla.textContent = `${targetSla.toFixed(1)} Days`;
      valBudget.textContent = `${targetBudgetShift}%`;

      // 1. Customer Loyalty Calculations
      const repeatDelta = targetRepeat - 3.12;
      const additionalOrders = Math.round(kpis.total_customers * (repeatDelta / 100.0));
      const retentionRevenueUplift = additionalOrders * kpis.aov;

      // 2. Logistics SLA Review Rating Savings
      const slaReduction = 25.6 - targetSla;
      const slaRevenueUplift = slaReduction * 35000;
      
      const ratingImprovement = slaReduction * 0.015;
      const projectedRating = Math.min(5.00, kpis.average_review_score + ratingImprovement);

      // 3. High AOV Budget Allocation Shift
      const newAov = kpis.aov + (targetBudgetShift / 100.0 * 25.0);
      const orderContractionMultiplier = 1.0 - (targetBudgetShift / 100.0 * 0.02);
      const aovRevenueUplift = (newAov * kpis.total_orders * orderContractionMultiplier) - kpis.total_revenue;

      // Total simulated revenue
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
        outStatus.textContent = "Simulated";
        outStatus.className = "manifest-pass-status";
      } else {
        outStatus.textContent = "Baseline";
        outStatus.className = "manifest-pass-status";
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
