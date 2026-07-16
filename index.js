document.addEventListener('DOMContentLoaded', () => {
  // Embed data directly to prevent CORS fetch errors when opening HTML via file:// protocol
  const dashboardData = {
    "kpis": {
      "total_orders": 99441,
      "total_revenue": 16008872.12,
      "aov": 160.98864774087147,
      "repeat_purchase_rate": 3.1187562437562435,
      "average_delivery_time": 12.322628908732218,
      "median_delivery_time": 10.198090277777776,
      "average_review_score": 4.08642062404257,
      "total_customers": 96096,
      "repeat_buyers": 2997
    },
    "monthly_trend": [
      { "month": "2016-09", "revenue": 252.24 },
      { "month": "2016-10", "revenue": 59090.48 },
      { "month": "2016-12", "revenue": 19.62 },
      { "month": "2017-01", "revenue": 138488.04 },
      { "month": "2017-02", "revenue": 291908.01 },
      { "month": "2017-03", "revenue": 449863.6 },
      { "month": "2017-04", "revenue": 417788.03 },
      { "month": "2017-05", "revenue": 592918.82 },
      { "month": "2017-06", "revenue": 511276.38 },
      { "month": "2017-07", "revenue": 592382.92 },
      { "month": "2017-08", "revenue": 674396.32 },
      { "month": "2017-09", "revenue": 727762.45 },
      { "month": "2017-10", "revenue": 779677.88 },
      { "month": "2017-11", "revenue": 1194882.8 },
      { "month": "2017-12", "revenue": 878401.48 },
      { "month": "2018-01", "revenue": 1115004.18 },
      { "month": "2018-02", "revenue": 992463.34 },
      { "month": "2018-03", "revenue": 1159652.12 },
      { "month": "2018-04", "revenue": 1160785.48 },
      { "month": "2018-05", "revenue": 1153982.15 },
      { "month": "2018-06", "revenue": 1023880.5 },
      { "month": "2018-07", "revenue": 1066540.75 },
      { "month": "2018-08", "revenue": 1022425.32 }
    ],
    "top_categories": [
      { "category": "Health Beauty", "revenue": 1258681.34 },
      { "category": "Watches Gifts", "revenue": 1205005.68 },
      { "category": "Bed Bath Table", "revenue": 1036988.68 },
      { "category": "Sports Leisure", "revenue": 988048.97 },
      { "category": "Computers Accessories", "revenue": 911954.32 },
      { "category": "Furniture Decor", "revenue": 729762.49 },
      { "category": "Cool Stuff", "revenue": 635290.85 },
      { "category": "Housewares", "revenue": 632248.66 },
      { "category": "Auto", "revenue": 592720.11 },
      { "category": "Garden Tools", "revenue": 485256.46 },
      { "category": "Toys", "revenue": 483946.6 },
      { "category": "Baby", "revenue": 411764.89 },
      { "category": "Perfumery", "revenue": 399124.87 },
      { "category": "Telephony", "revenue": 323667.53 },
      { "category": "Office Furniture", "revenue": 273960.7 }
    ],
    "top_cities": [
      { "city": "Sao Paulo", "orders": 15540, "revenue": 2203373.09 },
      { "city": "Rio De Janeiro", "orders": 6882, "revenue": 1161927.36 },
      { "city": "Belo Horizonte", "orders": 2773, "revenue": 421765.12 },
      { "city": "Brasilia", "orders": 2131, "revenue": 354216.78 },
      { "city": "Curitiba", "orders": 1521, "revenue": 247392.48 },
      { "city": "Campinas", "orders": 1444, "revenue": 216248.43 },
      { "city": "Porto Alegre", "orders": 1379, "revenue": 224731.42 },
      { "city": "Salvador", "orders": 1245, "revenue": 218071.5 },
      { "city": "Guarulhos", "orders": 1189, "revenue": 165121.99 },
      { "city": "Sao Bernardo Do Campo", "orders": 938, "revenue": 120434.84 }
    ],
    "state_delivery": [
      { "state": "SP", "average_days": 8.654116048802692 },
      { "state": "PR", "average_days": 11.91387570475448 },
      { "state": "MG", "average_days": 11.938611429438959 },
      { "state": "DF", "average_days": 12.918143658877838 },
      { "state": "RJ", "average_days": 14.820671594714003 },
      { "state": "SC", "average_days": 14.851220811499157 },
      { "state": "RS", "average_days": 15.155897997559332 },
      { "state": "ES", "average_days": 15.343542954617508 },
      { "state": "GO", "average_days": 15.376393013597315 },
      { "state": "MS", "average_days": 15.618319018465684 },
      { "state": "TO", "average_days": 17.65806260982698 },
      { "state": "MT", "average_days": 17.826486940455194 },
      { "state": "PE", "average_days": 18.06893156098017 },
      { "state": "PI", "average_days": 18.512998984816385 },
      { "state": "RN", "average_days": 18.51655499782832 },
      { "state": "BA", "average_days": 18.679880716760753 },
      { "state": "RO", "average_days": 19.37203651310776 },
      { "state": "AC", "average_days": 19.79110754985755 },
      { "state": "PB", "average_days": 19.895521760163483 },
      { "state": "CE", "average_days": 20.17100791125254 },
      { "state": "SE", "average_days": 20.332147583389112 },
      { "state": "MA", "average_days": 21.115056927538493 },
      { "state": "PA", "average_days": 23.020543993873424 },
      { "state": "RR", "average_days": 23.35747136939571 },
      { "state": "AL", "average_days": 24.140201459390862 },
      { "state": "AP", "average_days": 24.760546787317622 },
      { "state": "AM", "average_days": 25.645075633359053 }
    ],
    "payment_methods": [
      { "method": "Credit Card", "count": 76795, "percentage": 73.92451122897874 },
      { "method": "Boleto", "count": 19784, "percentage": 19.044501987813213 },
      { "method": "Voucher", "count": 5775, "percentage": 5.559138646361773 },
      { "method": "Debit Card", "count": 1529, "percentage": 1.4718481368462597 }
    ],
    "satisfaction_delivery": [
      { "score": 1, "average_days": 20.197268301955802 },
      { "score": 2, "average_days": 16.30603910603081 },
      { "score": 3, "average_days": 14.024905564177823 },
      { "score": 4, "average_days": 12.15400748949547 },
      { "score": 5, "average_days": 10.612183776266956 }
    ]
  };

  const charts = {};

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

  // 1. Populate Overview KPIs
  populateKPIs(dashboardData.kpis);
  
  // 2. Render Charts
  initCharts(dashboardData);
  
  // 3. Populate Top Cities Table
  populateCitiesTable(dashboardData.top_cities, dashboardData.kpis.total_revenue);
  
  // 4. Initialize Business Impact Simulator
  initSimulator(dashboardData.kpis);
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
    // Prevent errors if Chart.js fails to load
    if (typeof Chart === 'undefined') {
      console.error("Chart.js failed to load. Visualizations cannot be initialized.");
      return;
    }

    // Set custom Chart.js Defaults with SF Pro display styling
    Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Segoe UI', Roboto, 'Inter', sans-serif";
    Chart.defaults.color = "#1d1d1f";
    Chart.defaults.plugins.legend.labels.boxWidth = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    
    // Grid styling helper
    const gridConfig = {
      color: '#e5e7eb',
      tickBorderDash: [3, 3],
      borderColor: '#e5e7eb',
      drawTicks: true
    };

    // ----- A. Monthly Trend Line Chart (Overview Tab) -----
    const months = data.monthly_trend.map(d => d.month);
    const revenues = data.monthly_trend.map(d => d.revenue);
    
    // Find index of Black Friday Peak (November 2017) to style it uniquely
    const bfIndex = months.indexOf('2017-11');
    const pointBorderColors = months.map((m, i) => i === bfIndex ? '#d70015' : '#0071e3');
    const pointBackgroundColors = months.map((m, i) => i === bfIndex ? '#d70015' : '#ffffff');
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
          borderColor: '#0071e3',
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
            backgroundColor: '#1d1d1f',
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
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              callback: function(val, index) {
                return index % 2 === 0 ? this.getLabelForValue(val) : '';
              }
            }
          },
          y: {
            grid: gridConfig,
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              callback: function(value) {
                return (value / 1000).toFixed(0) + 'k BRL';
              }
            }
          }
        }
      }
    });
    
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
          backgroundColor: '#0071e3',
          hoverBackgroundColor: '#0066cc',
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
            backgroundColor: '#1d1d1f',
            cornerRadius: 4,
            callbacks: {
              label: (ctx) => `Revenue: ${formatCurrency(ctx.parsed.x)}`
            }
          }
        },
        scales: {
          x: {
            grid: gridConfig,
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              callback: (value) => (value / 1000000).toFixed(1) + 'M BRL'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 11 }
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
          backgroundColor: ['#0071e3', '#32ade6', '#5fc9f8', '#e5e7eb'],
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
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 12 },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: '#1d1d1f',
            cornerRadius: 4,
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
    const scoreBarColors = scores.map(s => s === 1 ? '#d70015' : '#0071e3');

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
            backgroundColor: '#1d1d1f',
            cornerRadius: 4,
            callbacks: {
              label: (ctx) => `Avg Delivery Time: ${ctx.parsed.y.toFixed(1)} Days`
            }
          }
        },
        scales: {
          x: { 
            grid: { display: false },
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 }
            }
          },
          y: {
            grid: gridConfig,
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              callback: (value) => `${value} Days`
            }
          }
        }
      }
    });

    // ----- E. State Delivery Horizontal SLA Chart (Logistics Tab) -----
    const sortedStates = [...data.state_delivery];
    const fastest5 = sortedStates.slice(0, 5);
    const slowest5 = sortedStates.slice(-5).reverse();
    
    const combinedStates = [...fastest5, { state: '---', average_days: 0 }, ...slowest5];
    const stateLabels = combinedStates.map(d => d.state);
    const stateDays = combinedStates.map(d => d.average_days);
    const stateBarColors = combinedStates.map((d, i) => {
      if (d.state === '---') return 'transparent';
      return i > 5 ? '#d70015' : '#0071e3';
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
            backgroundColor: '#1d1d1f',
            cornerRadius: 4,
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
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              callback: (value) => `${value}d`
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 }
            }
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

    function updateSimulation() {
      const targetRepeat = parseFloat(sliderRepeat.value);
      const targetSla = parseFloat(sliderSla.value);
      const targetBudgetShift = parseFloat(sliderBudget.value);

      // Update display values
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
