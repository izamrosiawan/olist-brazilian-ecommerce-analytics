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

  // Translations dictionary
  const translations = {
    en: {
      "live-network": "LIVE NETWORK: ACTIVE",
      "workspace-ticker": "WORKSPACE: OLIST_BR // SP_HUB_ACTIVE",
      "avg-sla-ticker": "AVG SLA: 12.3d // LOYALTY RATE: 3.12%",
      "brand-subtitle": "OPERATIONAL SYSTEM v1.0",
      "nav-overview": "OVERVIEW",
      "nav-revenue": "DEMAND & REVENUE",
      "nav-logistics": "LOGISTICS & SLA",
      "nav-simulator": "IMPACT SIMULATOR",
      "footer-workspace": "WORKSPACE: OLIST_BR",
      "footer-status": "STATUS: STABLE // OFFLINE",
      "footer-period": "DATA PERIOD: 2016 - 2018",
      "manifest-id": "MANIFEST ID: BR-2018-09",
      "overview-title": "Executive Performance Overview",
      "refresh-time-prefix": "LATEST REFRESH: ",
      "kpi-label-revenue": "Revenue",
      "kpi-sub-revenue": "Total payment values processed",
      "kpi-label-orders": "Orders",
      "kpi-sub-orders": "Total unique customer purchases",
      "kpi-label-aov": "Average Ticket",
      "kpi-sub-aov": "Average Order Value in BRL",
      "kpi-label-repeat": "Repeat Rate",
      "kpi-sub-repeat": "Percentage of multi-order buyers",
      "kpi-label-delivery": "Avg Shipping",
      "kpi-sub-delivery": "National average delivery days",
      "kpi-label-rating": "Satisfaction",
      "kpi-sub-rating": "Average review score (1 to 5)",
      "chart-trend-title": "Monthly E-Commerce Revenue Growth",
      "chart-trend-sub": "Steady climb punctuated by the Black Friday peak in November 2017",
      "chip-line-graph": "LINE_GRAPH",
      "module-revenue-id": "MODULE ID: BR-DEMAND-02",
      "revenue-title": "Demand Hotspots & Category Drivers",
      "filter-products": "FILTER: ALL PRODUCTS",
      "chart-cats-title": "Revenue by Product Category",
      "chart-cats-sub": "Watches and health/beauty drive major volume and AOV",
      "chip-top-15": "TOP_15",
      "chart-pay-title": "Payment Methods Distribution",
      "chart-pay-sub": "Credit cards represent almost three-quarters of customer checkouts",
      "chip-pay-methods": "PAY_METHODS",
      "table-cities-title": "Top 10 Cities by Revenue & Volume",
      "table-cities-sub": "São Paulo is the commercial core, followed by Rio de Janeiro and Belo Horizonte",
      "chip-regional-perf": "REGIONAL_PERF",
      "th-city": "City",
      "th-orders": "Orders",
      "th-revenue": "Total Revenue (BRL)",
      "th-share": "Market Share",
      "module-logistics-id": "MODULE ID: BR-SLA-03",
      "logistics-title": "Shipping SLAs & Customer Satisfaction",
      "status-sla": "STATUS: SLA BREAKDOWN",
      "chart-reviews-title": "Average Delivery Days vs Review Score",
      "chart-reviews-sub": "Clear negative correlation (-0.31): late orders trigger 1-star ratings",
      "chip-satisfaction-gap": "SATISFACTION_GAP",
      "chart-state-title": "Delivery SLA by Brazilian State",
      "chart-state-sub": "Average delivery speed (days) across fast and slow states",
      "chip-geo-sla": "GEO_SLA",
      "diagnosis-title": "Operational Logistics Diagnosis",
      "diagnosis-sub": "Analysis of shipping delays and customer impact",
      "chip-action-required": "ACTION_REQUIRED",
      "insight-north-title": "Northern Region SLA Bottleneck",
      "insight-north-desc": "Average delivery times in remote states like Amazonas (AM) and Amapá (AP) average <strong>25.6</strong> and <strong>24.8 days</strong> respectively. Compare this with São Paulo (SP) at <strong>8.7 days</strong>.",
      "insight-retention-title": "Customer Retention Deficit",
      "insight-retention-desc": "Over <strong>96.8%</strong> of purchasers are one-time buyers. The repeat rate is static at <strong>3.12%</strong>. Solving logistics friction is the primary prerequisite to launch effective retention marketing.",
      "insight-corr-title": "SLA-Rating Correlation",
      "insight-corr-desc": "Orders resulting in 5-star ratings arrive in <strong>10.6 days</strong>. Orders resulting in 1-star ratings take <strong>20.2 days</strong> on average. Late shipping is the single largest structural source of customer churn.",
      "module-model-id": "MODULE ID: BR-MODEL-04",
      "simulator-title": "Business Impact Simulator",
      "sim-mode": "SIMULATION MODE: RUNNING",
      "sim-ctrl-title": "Target Variables",
      "sim-ctrl-sub": "Adjust the operational parameters to simulate strategic changes and calculate potential revenue uplifts.",
      "slider-repeat-title": "Repeat Purchase Rate (%)",
      "slider-repeat-base": "Baseline: 3.12%",
      "slider-repeat-target": "Target: 15.00%",
      "slider-sla-title": "Northern SLA Reduction (Days)",
      "slider-sla-target": "Fulfillment Hubs (10d)",
      "slider-sla-base": "Baseline (25.6d)",
      "slider-budget-title": "Marketing Shift to High AOV (%)",
      "slider-budget-base": "Balanced (0%)",
      "slider-budget-target": "Max High-Value Focus (100%)",
      "btn-reset": "Reset Simulator",
      "manifest-card-title": "Olist operational manifest",
      "manifest-status-base": "BASELINE",
      "manifest-status-sim": "SIMULATED",
      "manifest-row-base": "Primary Base Revenue:",
      "manifest-row-retention": "Loyalty Retention Gains:",
      "manifest-row-sla": "Logistics Review SLA Uplift:",
      "manifest-row-aov": "AOV Optimization Delta:",
      "manifest-row-repeat-cust": "Generated Repeat Customers:",
      "manifest-row-csat": "Projected Customer CSAT:",
      "manifest-row-proj-revenue": "PROJECTED REVENUE:",
      "manifest-footer-note": "OLIST SYSTEM SIMULATED METRICS EST. +/- 5% MARGIN OF ERROR.",
      "btn-print": "Print manifest",
      "sim-repeat-tooltip": "Simulates repeat purchase rate growth through CRM and loyalty systems.",
      "sim-sla-tooltip": "Reduces shipping times in Northern states (AM/AP) by setting up regional hubs.",
      "sim-budget-tooltip": "Shifts ad spend towards high average order value (AOV) product categories.",
      "chart-legend-revenue": "Monthly Revenue (BRL)",
      "chart-legend-top-revenue": "Total Revenue (BRL)",
      "chart-legend-delivery-time": "Avg Delivery Time",
      "chart-legend-sla": "Average SLA",
      "user-role": "SYSTEM MONITOR",
      "logs-panel-title": "Live Network Transactions & SLA Feed",
      "logs-panel-sub": "Real-time simulation of operational checkpoints and logistics processing",
      "chip-live-feed": "LIVE_FEED",
      "manifest-gauge-label": "Revenue Growth Target",
      "search-city-placeholder": "Search city...",
      "inspector-badge": "CATEGORY INSPECTOR",
      "inspect-stat-revenue": "Category Revenue",
      "inspect-stat-share": "Platform Share",
      "inspect-rec-title": "Operational Strategy",
      "nav-sql": "SQL PLAYGROUND",
      "module-sql-id": "MODULE ID: BR-SQL-05",
      "sql-title": "SQL Operational Sandbox",
      "sql-db-status-unloaded": "DATABASE: CLICK TO INITIALIZE",
      "sql-controls-title": "Query Control",
      "sql-controls-sub": "Select a pre-configured scenario or write a custom SQLite query to run against the Olist dataset.",
      "sql-preset-label": "Choose Preset Scenario",
      "preset-opt-custom": "-- Custom Query --",
      "preset-opt-mom": "Scenario A: Month-over-Month Revenue Growth",
      "preset-opt-cohort": "Scenario B: Customer Cohort Retention (First 3 Months)",
      "preset-opt-categories": "Scenario C: Top 10 Product Categories by Revenue vs Rating",
      "sql-schema-label": "Quick Schema Reference",
      "sql-editor-title": "SQL Query Console",
      "sql-editor-sub": "Write SQLite-compatible syntax. Remember to end queries with a semicolon.",
      "sql-status-idle": "Console ready.",
      "btn-export-csv": "Export CSV",
      "btn-run-query": "Run Query",
      "sql-results-title": "Output Dataset",
      "sql-results-sub": "Execute a query to populate the result table.",
      "sql-loader-loading-db": "Downloading operational database (68MB)... This might take a moment."
    },
    id: {
      "live-network": "JARINGAN AKTIF: ONLINE",
      "workspace-ticker": "RUANG KERJA: OLIST_BR // HUB_SP_AKTIF",
      "avg-sla-ticker": "RATA SLA: 12.3h // TINGKAT LOYALITAS: 3.12%",
      "brand-subtitle": "SISTEM OPERASIONAL v1.0",
      "nav-overview": "RINGKASAN",
      "nav-revenue": "PERMINTAAN & PENDAPATAN",
      "nav-logistics": "LOGISTIK & SLA",
      "nav-simulator": "SIMULATOR DAMPAK",
      "footer-workspace": "RUANG KERJA: OLIST_BR",
      "footer-status": "STATUS: STABIL // OFFLINE",
      "footer-period": "PERIODE DATA: 2016 - 2018",
      "manifest-id": "ID MANIFEST: BR-2018-09",
      "overview-title": "Ringkasan Kinerja Eksekutif",
      "refresh-time-prefix": "REFRESH TERAKHIR: ",
      "kpi-label-revenue": "Pendapatan",
      "kpi-sub-revenue": "Total nilai pembayaran diproses",
      "kpi-label-orders": "Pesanan",
      "kpi-sub-orders": "Total pembelian unik pelanggan",
      "kpi-label-aov": "Rata-rata Keranjang",
      "kpi-sub-aov": "Rata-rata Nilai Pesanan (BRL)",
      "kpi-label-repeat": "Tingkat Retensi",
      "kpi-sub-repeat": "Persentase pembeli berulang",
      "kpi-label-delivery": "Rata Pengiriman",
      "kpi-sub-delivery": "Rata-rata hari pengiriman nasional",
      "kpi-label-rating": "Kepuasan",
      "kpi-sub-rating": "Rata-rata skor ulasan (1 s.d 5)",
      "chart-trend-title": "Pertumbuhan Pendapatan E-Commerce Bulanan",
      "chart-trend-sub": "Peningkatan stabil dengan puncak Black Friday di November 2017",
      "chip-line-graph": "GRAFIK_GARIS",
      "module-revenue-id": "ID MODUL: BR-DEMAND-02",
      "revenue-title": "Titik Panas Permintaan & Kategori Utama",
      "filter-products": "FILTER: SEMUA PRODUK",
      "chart-cats-title": "Pendapatan berdasarkan Kategori Produk",
      "chart-cats-sub": "Jam tangan dan kesehatan/kecantikan mendominasi volume & AOV",
      "chip-top-15": "15_TERATAS",
      "chart-pay-title": "Distribusi Metode Pembayaran",
      "chart-pay-sub": "Kartu kredit mencakup hampir tiga perempat transaksi pelanggan",
      "chip-pay-methods": "METODE_BAYAR",
      "table-cities-title": "10 Kota Teratas berdasarkan Pendapatan & Volume",
      "table-cities-sub": "São Paulo adalah pusat komersial, diikuti Rio de Janeiro dan Belo Horizonte",
      "chip-regional-perf": "PERF_REGIONAL",
      "th-city": "Kota",
      "th-orders": "Pesanan",
      "th-revenue": "Total Pendapatan (BRL)",
      "th-share": "Pangsa Pasar",
      "module-logistics-id": "ID MODUL: BR-SLA-03",
      "logistics-title": "SLA Pengiriman & Kepuasan Pelanggan",
      "status-sla": "STATUS: RINCIAN SLA",
      "chart-reviews-title": "Rata-rata Hari Pengiriman vs Skor Ulasan",
      "chart-reviews-sub": "Korelasi negatif jelas (-0.31): keterlambatan memicu ulasan bintang 1",
      "chip-satisfaction-gap": "GAP_KEPUASAN",
      "chart-state-title": "SLA Pengiriman per Negara Bagian Brasil",
      "chart-state-sub": "Rata-rata kecepatan kirim (hari) di wilayah cepat dan lambat",
      "chip-geo-sla": "SLA_GEOGRAFIS",
      "diagnosis-title": "Diagnosis Logistik Operasional",
      "diagnosis-sub": "Analisis keterlambatan pengiriman dan dampaknya pada pelanggan",
      "chip-action-required": "BUTUH_TINDAKAN",
      "insight-north-title": "Hambatan SLA Wilayah Utara",
      "insight-north-desc": "Rata-rata pengiriman di negara bagian terpencil seperti Amazonas (AM) dan Amapá (AP) mencapai masing-masing <strong>25,6</strong> dan <strong>24,8 hari</strong>. Bandingkan dengan São Paulo (SP) di angka <strong>8,7 hari</strong>.",
      "insight-retention-title": "Defisit Retensi Pelanggan",
      "insight-retention-desc": "Lebih dari <strong>96,8%</strong> pembeli adalah pembeli satu kali. Tingkat pembelian ulang statis di <strong>3,12%</strong>. Mengatasi hambatan logistik adalah syarat utama sebelum meluncurkan pemasaran retensi.",
      "insight-corr-title": "Korelasi SLA-Rating",
      "insight-corr-desc": "Pesanan dengan ulasan bintang 5 sampai dalam <strong>10,6 hari</strong>. Ulasan bintang 1 memakan waktu rata-rata <strong>20,2 hari</strong>. Keterlambatan pengiriman adalah penyebab struktural terbesar dari churn pelanggan.",
      "module-model-id": "ID MODUL: BR-MODEL-04",
      "simulator-title": "Simulator Dampak Bisnis",
      "sim-mode": "MODE SIMULASI: AKTIF",
      "sim-ctrl-title": "Variabel Target",
      "sim-ctrl-sub": "Sesuaikan parameter operasional untuk mensimulasikan perubahan strategis dan menghitung kenaikan pendapatan.",
      "slider-repeat-title": "Tingkat Pembelian Berulang (%)",
      "slider-repeat-base": "Dasar: 3.12%",
      "slider-repeat-target": "Target: 15.00%",
      "slider-sla-title": "Pengurangan SLA Negara Bagian",
      "slider-sla-target": "Fulfillment Hub (10h)",
      "slider-sla-base": "Dasar (25.6h)",
      "slider-budget-title": "Pengalihan Pemasaran ke AOV Tinggi (%)",
      "slider-budget-base": "Seimbang (0%)",
      "slider-budget-target": "Fokus Nilai Tinggi Maksimal (100%)",
      "btn-reset": "Reset Simulator",
      "manifest-card-title": "Manifest Operasional Olist",
      "manifest-status-base": "DASAR",
      "manifest-status-sim": "SIMULASI",
      "manifest-row-base": "Pendapatan Dasar Utama:",
      "manifest-row-retention": "Loyalitas Retensi Keuntungan:",
      "manifest-row-sla": "Peningkatan SLA Logistik:",
      "manifest-row-aov": "Delta Optimasi AOV:",
      "manifest-row-repeat-cust": "Tambahan Pelanggan Berulang:",
      "manifest-row-csat": "Proyeksi CSAT Pelanggan:",
      "manifest-row-proj-revenue": "PROYEKSI PENDAPATAN:",
      "manifest-footer-note": "METRIK SIMULASI SISTEM OLIST DENGAN ESTIMASI +- 5% BATAS EROR.",
      "btn-print": "Cetak Manifest",
      "sim-repeat-tooltip": "Mensimulasikan pertumbuhan pembelian berulang lewat program CRM & loyalitas.",
      "sim-sla-tooltip": "Memangkas waktu kirim negara bagian yang dipilih dengan mendirikan gudang regional.",
      "sim-budget-tooltip": "Menggeser fokus iklan digital pada produk bernilai tinggi (AOV tinggi).",
      "chart-legend-revenue": "Pendapatan Bulanan (BRL)",
      "chart-legend-top-revenue": "Total Pendapatan (BRL)",
      "chart-legend-delivery-time": "Rata Waktu Pengiriman",
      "chart-legend-sla": "Rata-rata SLA",
      "user-role": "PEMANTAU SISTEM",
      "logs-panel-title": "Aliran SLA & Transaksi Jaringan Langsung",
      "logs-panel-sub": "Simulasi waktu-nyata pos pemeriksaan operasional dan pemrosesan logistik",
      "chip-live-feed": "ALIRAN_LANGSUNG",
      "manifest-gauge-label": "Target Pertumbuhan Pendapatan",
      "search-city-placeholder": "Cari kota...",
      "inspector-badge": "INSPEKTUR KATEGORI",
      "inspect-stat-revenue": "Pendapatan Kategori",
      "inspect-stat-share": "Pangsa Platform",
      "inspect-rec-title": "Strategi Operasional",
      "nav-sql": "SQL PLAYGROUND",
      "module-sql-id": "ID MODUL: BR-SQL-05",
      "sql-title": "Operational Sandbox SQL",
      "sql-db-status-unloaded": "DATABASE: KLIK UNTUK INISIALISASI",
      "sql-controls-title": "Kontrol Kueri",
      "sql-controls-sub": "Pilih skenario konfigurasi atau tulis kueri SQLite kustom untuk dijalankan pada dataset Olist.",
      "sql-preset-label": "Pilih Skenario Presets",
      "preset-opt-custom": "-- Kueri Kustom --",
      "preset-opt-mom": "Skenario A: Pertumbuhan Pendapatan Bulanan (MoM)",
      "preset-opt-cohort": "Skenario B: Retensi Kohort Pelanggan (3 Bulan Pertama)",
      "preset-opt-categories": "Skenario C: 10 Kategori Teratas berdasarkan Pendapatan vs Rating",
      "sql-schema-label": "Referensi Cepat Skema",
      "sql-editor-title": "Konsol Kueri SQL",
      "sql-editor-sub": "Tulis sintaks SQLite yang kompatibel. Ingat untuk mengakhiri kueri dengan titik koma.",
      "sql-status-idle": "Konsol siap.",
      "btn-export-csv": "Ekspor CSV",
      "btn-run-query": "Jalankan Kueri",
      "sql-results-title": "Output Dataset",
      "sql-results-sub": "Jalankan kueri untuk mengisi data tabel hasil.",
      "sql-loader-loading-db": "Mengunduh database operasional (68MB)... Ini memerlukan waktu sesaat."
    }
  };

  const categoryTranslations = {
    id: {
      "Health Beauty": "Kesehatan & Kecantikan",
      "Watches Gifts": "Jam Tangan & Hadiah",
      "Bed Bath Table": "Peralatan Kamar & Mandi",
      "Sports Leisure": "Olahraga & Rekreasi",
      "Computers Accessories": "Komputer & Aksesori",
      "Furniture Decor": "Dekorasi Furnitur",
      "Cool Stuff": "Barang Keren",
      "Housewares": "Peralatan Rumah Tangga",
      "Auto": "Otomotif",
      "Garden Tools": "Peralatan Kebun",
      "Toys": "Mainan Anak",
      "Baby": "Perlengkapan Bayi",
      "Perfumery": "Parfum",
      "Telephony": "Telepon Seluler",
      "Office Furniture": "Furnitur Kantor"
    },
    en: {
      "Health Beauty": "Health & Beauty",
      "Watches Gifts": "Watches & Gifts",
      "Bed Bath Table": "Bed Bath Table",
      "Sports Leisure": "Sports & Leisure",
      "Computers Accessories": "Computers Accessories",
      "Furniture Decor": "Furniture & Decor",
      "Cool Stuff": "Cool Stuff",
      "Housewares": "Housewares",
      "Auto": "Auto",
      "Garden Tools": "Garden Tools",
      "Toys": "Toys",
      "Baby": "Baby",
      "Perfumery": "Perfumery",
      "Telephony": "Telephony",
      "Office Furniture": "Office Furniture"
    }
  };

  const paymentTranslations = {
    id: {
      "Credit Card": "Kartu Kredit",
      "Boleto": "Boleto",
      "Voucher": "Voucher",
      "Debit Card": "Kartu Debit"
    },
    en: {
      "Credit Card": "Credit Card",
      "Boleto": "Boleto",
      "Voucher": "Voucher",
      "Debit Card": "Debit Card"
    }
  };

  const stateMetadata = {
    "AM": { orders: 148, revenue: 27966.38, name: "Amazonas", baseSLA: 25.645 },
    "AP": { orders: 68, revenue: 13474.30, name: "Amapá", baseSLA: 24.760 },
    "RR": { orders: 46, revenue: 7829.12, name: "Roraima", baseSLA: 23.357 },
    "PA": { orders: 975, revenue: 178947.81, name: "Pará", baseSLA: 23.020 },
    "AL": { orders: 413, revenue: 80314.15, name: "Alagoas", baseSLA: 24.140 },
    "MA": { orders: 747, revenue: 119548.80, name: "Maranhão", baseSLA: 21.115 },
    "SE": { orders: 350, revenue: 58947.21, name: "Sergipe", baseSLA: 20.332 },
    "CE": { orders: 1336, revenue: 227258.90, name: "Ceará", baseSLA: 20.171 }
  };

  const categoryDetails = {
    "Health Beauty": {
      id: {
        rec: "Kategori dengan volume tertinggi. Direkomendasikan untuk menempatkan inventaris di gudang regional São Paulo dan Rio untuk mempercepat pengiriman hingga < 3 hari, serta menawarkan paket bundling produk kecantikan untuk menaikkan AOV."
      },
      en: {
        rec: "High volume category. Recommended to pre-stock inventory in São Paulo and Rio fulfillment hubs to achieve < 3 day SLA, and offer cosmetic product bundles to boost average transaction value."
      },
      aov: 130.40,
      share: 7.86
    },
    "Watches Gifts": {
      id: {
        rec: "Kategori dengan nilai transaksi rata-rata (AOV) tertinggi. Paling diuntungkan jika dialokasikan budget iklan digital tambahan untuk menjangkau segmen premium dan memaksimalkan ROI kampanye."
      },
      en: {
        rec: "Highest Average Order Value (AOV) driver. Highly recommended to shift digital ad spend to this segment to acquire premium clients and maximize platform campaign ROI."
      },
      aov: 201.20,
      share: 7.53
    },
    "Bed Bath Table": {
      id: {
        rec: "Volume penjualan tinggi namun sering mengalami keterlambatan pengiriman karena dimensi paket yang besar. Gunakan kurir kargo khusus regional untuk menekan biaya pengiriman."
      },
      en: {
        rec: "High volume but experiences shipping delays due to bulk sizes. Recommended to transition to regional cargo carrier networks to reduce freight costs and match SLAs."
      },
      aov: 110.10,
      share: 6.48
    },
    "default": {
      id: {
        rec: "Segmen stabil. Optimalkan manajemen rantai pasokan seller dan sediakan dukungan promosi saat musim perayaan atau kampanye akhir bulan."
      },
      en: {
        rec: "Stable segment. Optimize seller supply chain logistics and provide promotional marketing push during seasonality peaks."
      },
      aov: 140.00,
      share: 3.50
    }
  };

  let activeLang = 'en';
  const charts = {};
  const chartInstances = {};

  // Date constants
  const now = new Date();

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

  // Date Formatting for Multi-Language
  const formatDateForTicker = (date, lang) => {
    const monthsEN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthsID = ["JAN", "PEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGS", "SEP", "OKT", "NOP", "DES"];
    const months = lang === 'id' ? monthsID : monthsEN;
    return `DATE: ${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()} // UTC-03:00`;
  };

  const formatRefreshTimestamp = (date, lang) => {
    const label = translations[lang]["refresh-time-prefix"];
    const monthsEN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthsID = ["JAN", "PEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGS", "SEP", "OKT", "NOP", "DES"];
    const months = lang === 'id' ? monthsID : monthsEN;
    return `${label}${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
  };

  const formatManifestTimestamp = (date, lang) => {
    const monthsEN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthsID = ["JAN", "PEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGS", "SEP", "OKT", "NOP", "DES"];
    const months = lang === 'id' ? monthsID : monthsEN;
    const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return `DATE: ${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()} // TIME: ${timeStr}`;
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

      // Lazy load SQLite database if SQL tab is activated
      if (tabName === 'sql') {
        loadSqlDatabase();
      }

      // Trigger Chart renders / updates in case of sizing glitches
      if (charts[tabName]) {
        charts[tabName].forEach(chart => {
          if (chart && typeof chart.resize === 'function') {
            chart.resize();
          }
        });
      }
    });
  });

  // 1. Populate Overview KPIs
  populateKPIs(dashboardData.kpis);
  
  // 2. Render Charts (with default activeLang)
  initCharts(dashboardData, activeLang);
  
  // 3. Populate Top Cities Table
  populateCitiesTable(dashboardData.top_cities, dashboardData.kpis.total_revenue);
  
  // 4. Initialize Business Impact Simulator
  initSimulator(dashboardData.kpis);

  // 5. Initialize Language Toggle Listeners
  initLanguageSwitcher();

  // 6. Initialize Theme Management
  initThemeManager();

  // 7. Initialize Live Logging Ticker
  initLogger();

  // 8. Initialize City Table Search
  initCitySearch();

  // 9. Initialize SQL Playground Manager
  initSqlPlaygroundManager();

  // Populate KPIs
  function populateKPIs(kpis) {
    document.getElementById('kpi-revenue').textContent = formatCurrency(kpis.total_revenue);
    document.getElementById('kpi-orders').textContent = formatNumber(kpis.total_orders);
    document.getElementById('kpi-aov').textContent = formatCurrency(kpis.aov);
    document.getElementById('kpi-repeat').textContent = `${kpis.repeat_purchase_rate.toFixed(2)}%`;
    document.getElementById('kpi-delivery').textContent = `${kpis.average_delivery_time.toFixed(1)} ${activeLang === 'id' ? 'Hari' : 'Days'}`;
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

  // Initialize Chart.js premium gradient charts
  function initCharts(data, lang) {
    if (typeof Chart === 'undefined') {
      console.error("Chart.js failed to load. Visualizations cannot be initialized.");
      return;
    }

    // Set custom Chart.js Defaults with SF Pro display styling
    Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Segoe UI', Roboto, 'Inter', sans-serif";
    
    // Determine active colors based on theme
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    Chart.defaults.color = theme === 'dark' ? '#f5f5f7' : '#1d1d1f';
    const gridColor = theme === 'dark' ? '#2c2c2e' : '#e5e7eb';
    
    // Grid styling helper
    const gridConfig = {
      color: gridColor,
      tickBorderDash: [3, 3],
      borderColor: gridColor,
      drawTicks: true
    };

    // Clean up existing instances
    if (chartInstances.monthlyTrend) chartInstances.monthlyTrend.destroy();
    if (chartInstances.topCategories) chartInstances.topCategories.destroy();
    if (chartInstances.paymentMethods) chartInstances.paymentMethods.destroy();
    if (chartInstances.reviewsDelivery) chartInstances.reviewsDelivery.destroy();
    if (chartInstances.stateDelivery) chartInstances.stateDelivery.destroy();

    // ----- A. Monthly Trend Line Chart (Overview Tab) -----
    const months = data.monthly_trend.map(d => d.month);
    const revenues = data.monthly_trend.map(d => d.revenue);
    
    const bfIndex = months.indexOf('2017-11');
    const pointBorderColors = months.map((m, i) => i === bfIndex ? '#d70015' : '#0071e3');
    const pointBackgroundColors = months.map((m, i) => i === bfIndex ? '#d70015' : '#ffffff');
    const pointRadii = months.map((m, i) => i === bfIndex ? 8 : 4);
    const pointHoverRadii = months.map((m, i) => i === bfIndex ? 10 : 6);

    const ctxTrend = document.getElementById('chart-monthly-trend').getContext('2d');
    
    // Modern gradient fill for line chart area
    const gradientTrendFill = ctxTrend.createLinearGradient(0, 0, 0, 360);
    if (theme === 'dark') {
      gradientTrendFill.addColorStop(0, 'rgba(10, 132, 255, 0.4)');
      gradientTrendFill.addColorStop(1, 'rgba(10, 132, 255, 0.0)');
    } else {
      gradientTrendFill.addColorStop(0, 'rgba(0, 113, 227, 0.25)');
      gradientTrendFill.addColorStop(1, 'rgba(0, 113, 227, 0.0)');
    }

    const lineColor = theme === 'dark' ? '#0a84ff' : '#0071e3';

    chartInstances.monthlyTrend = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: translations[lang]["chart-legend-revenue"],
          data: revenues,
          borderColor: lineColor,
          borderWidth: 2,
          pointBorderColor: pointBorderColors,
          pointBackgroundColor: pointBackgroundColors,
          pointBorderWidth: 2,
          pointRadius: pointRadii,
          pointHoverRadius: pointHoverRadii,
          fill: true,
          backgroundColor: gradientTrendFill,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: theme === 'dark' ? '#2c2c2e' : '#1d1d1f',
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
                  label += lang === 'id' ? ' [PUNCAK BLACK FRIDAY]' : ' [BLACK FRIDAY PEAK]';
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
              color: Chart.defaults.color,
              callback: function(val, index) {
                return index % 2 === 0 ? this.getLabelForValue(val) : '';
              }
            }
          },
          y: {
            grid: gridConfig,
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              color: Chart.defaults.color,
              callback: function(value) {
                return (value / 1000).toFixed(0) + 'k BRL';
              }
            }
          }
        }
      }
    });

    // ----- B. Top Categories Horizontal Bar Chart (Demand Tab) -----
    const cats = data.top_categories.map(d => categoryTranslations[lang][d.category] || d.category);
    const catRevenues = data.top_categories.map(d => d.revenue);

    const ctxCats = document.getElementById('chart-top-categories').getContext('2d');
    
    // Smooth horizontal gradient
    const gradientCats = ctxCats.createLinearGradient(0, 0, 400, 0);
    if (theme === 'dark') {
      gradientCats.addColorStop(0, '#0a84ff');
      gradientCats.addColorStop(1, '#5fc9f8');
    } else {
      gradientCats.addColorStop(0, '#0071e3');
      gradientCats.addColorStop(1, '#5fc9f8');
    }

    chartInstances.topCategories = new Chart(ctxCats, {
      type: 'bar',
      data: {
        labels: cats,
        datasets: [{
          label: translations[lang]["chart-legend-top-revenue"],
          data: catRevenues,
          backgroundColor: gradientCats,
          hoverBackgroundColor: theme === 'dark' ? '#0064d2' : '#0066cc',
          borderWidth: 0,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const label = chartInstances.topCategories.data.labels[index];
            const originalCat = data.top_categories[index];
            showCategoryDetails(originalCat, label, activeLang);
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: theme === 'dark' ? '#2c2c2e' : '#1d1d1f',
            cornerRadius: 4,
            callbacks: {
              label: (ctx) => `${translations[lang]["chart-legend-top-revenue"]}: ${formatCurrency(ctx.parsed.x)}`
            }
          }
        },
        scales: {
          x: {
            grid: gridConfig,
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              color: Chart.defaults.color,
              callback: (value) => (value / 1000000).toFixed(1) + 'M BRL'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              color: Chart.defaults.color
            }
          }
        }
      }
    });

    // Close Category Inspector when clicking close button
    const btnCloseInspect = document.getElementById('btn-inspector-close');
    if (btnCloseInspect) {
      btnCloseInspect.addEventListener('click', () => {
        document.getElementById('category-inspector').classList.remove('active');
      });
    }

    // ----- C. Payment Methods Donut Chart (Demand Tab) -----
    const methods = data.payment_methods.map(d => paymentTranslations[lang][d.method] || d.method);
    const methodPercentages = data.payment_methods.map(d => d.percentage);

    const ctxPay = document.getElementById('chart-payment-methods').getContext('2d');
    
    const donutColors = theme === 'dark' 
      ? ['#0a84ff', '#30d158', '#ffd60a', '#3a3a3c']
      : ['#0071e3', '#32ade6', '#5fc9f8', '#e5e7eb'];

    chartInstances.paymentMethods = new Chart(ctxPay, {
      type: 'doughnut',
      data: {
        labels: methods,
        datasets: [{
          data: methodPercentages,
          backgroundColor: donutColors,
          borderColor: theme === 'dark' ? '#1c1c1e' : '#ffffff',
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
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 11 },
              color: Chart.defaults.color,
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: theme === 'dark' ? '#2c2c2e' : '#1d1d1f',
            cornerRadius: 4,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toFixed(1)}%`
            }
          }
        }
      }
    });

    // ----- D. Satisfaction vs Delivery Days Bar Chart (Logistics Tab) -----
    const scores = data.satisfaction_delivery.map(d => d.score);
    const delDaysByScore = data.satisfaction_delivery.map(d => d.average_days);
    
    const ctxRevDel = document.getElementById('chart-reviews-delivery').getContext('2d');
    
    // Vertical gradients
    const gradientRevNormal = ctxRevDel.createLinearGradient(0, 0, 0, 240);
    if (theme === 'dark') {
      gradientRevNormal.addColorStop(0, '#0a84ff');
      gradientRevNormal.addColorStop(1, '#5fc9f8');
    } else {
      gradientRevNormal.addColorStop(0, '#0071e3');
      gradientRevNormal.addColorStop(1, '#5fc9f8');
    }

    const gradientRevAlert = ctxRevDel.createLinearGradient(0, 0, 0, 240);
    if (theme === 'dark') {
      gradientRevAlert.addColorStop(0, '#ff453a');
      gradientRevAlert.addColorStop(1, '#ff9f0a');
    } else {
      gradientRevAlert.addColorStop(0, '#d70015');
      gradientRevAlert.addColorStop(1, '#ff9500');
    }

    const scoreBarColors = scores.map(s => s === 1 ? gradientRevAlert : gradientRevNormal);

    const labelStars = lang === 'id' ? 'Bintang' : 'Star';
    chartInstances.reviewsDelivery = new Chart(ctxRevDel, {
      type: 'bar',
      data: {
        labels: scores.map(s => `${s} ${labelStars}`),
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
            backgroundColor: theme === 'dark' ? '#2c2c2e' : '#1d1d1f',
            cornerRadius: 4,
            callbacks: {
              label: (ctx) => `${translations[lang]["chart-legend-delivery-time"]}: ${ctx.parsed.y.toFixed(1)} ${lang === 'id' ? 'Hari' : 'Days'}`
            }
          }
        },
        scales: {
          x: { 
            grid: { display: false },
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              color: Chart.defaults.color
            }
          },
          y: {
            grid: gridConfig,
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              color: Chart.defaults.color,
              callback: (value) => `${value} ${lang === 'id' ? 'Hari' : 'Days'}`
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

    const ctxStateDel = document.getElementById('chart-state-delivery').getContext('2d');
    
    const gradientStateFast = ctxStateDel.createLinearGradient(0, 0, 300, 0);
    if (theme === 'dark') {
      gradientStateFast.addColorStop(0, '#0a84ff');
      gradientStateFast.addColorStop(1, '#5fc9f8');
    } else {
      gradientStateFast.addColorStop(0, '#0071e3');
      gradientStateFast.addColorStop(1, '#5fc9f8');
    }

    const gradientStateSlow = ctxStateDel.createLinearGradient(0, 0, 300, 0);
    if (theme === 'dark') {
      gradientStateSlow.addColorStop(0, '#ff453a');
      gradientStateSlow.addColorStop(1, '#ff9f0a');
    } else {
      gradientStateSlow.addColorStop(0, '#d70015');
      gradientStateSlow.addColorStop(1, '#ff9500');
    }

    const stateBarColors = combinedStates.map((d, i) => {
      if (d.state === '---') return 'transparent';
      return i > 5 ? gradientStateSlow : gradientStateFast;
    });

    chartInstances.stateDelivery = new Chart(ctxStateDel, {
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
            backgroundColor: theme === 'dark' ? '#2c2c2e' : '#1d1d1f',
            cornerRadius: 4,
            callbacks: {
              label: (ctx) => {
                if (ctx.label === '---') return '';
                return `${translations[lang]["chart-legend-sla"]}: ${ctx.parsed.x.toFixed(1)} ${lang === 'id' ? 'Hari' : 'Days'}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: gridConfig,
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              color: Chart.defaults.color,
              callback: (value) => `${value}h`
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", size: 10 },
              color: Chart.defaults.color
            }
          }
        }
      }
    });

    // Save references to global registry for navigation resizes
    charts['overview'] = [chartInstances.monthlyTrend];
    charts['revenue'] = [chartInstances.topCategories, chartInstances.paymentMethods];
    charts['logistics'] = [chartInstances.reviewsDelivery, chartInstances.stateDelivery];
  }

  // Visual Category Details display panel renderer
  function showCategoryDetails(originalCat, label, lang) {
    const inspector = document.getElementById('category-inspector');
    if (!inspector) return;
    
    const nameEl = document.getElementById('inspect-name');
    const revEl = document.getElementById('inspect-revenue');
    const shareEl = document.getElementById('inspect-share');
    const recEl = document.getElementById('inspect-rec-text');
    
    const details = categoryDetails[originalCat.category] || categoryDetails["default"];
    const textObj = details[lang] || details['en'];
    
    nameEl.textContent = label;
    revEl.textContent = formatCurrency(originalCat.revenue);
    shareEl.textContent = `${details.share.toFixed(2)}%`;
    recEl.textContent = textObj.rec;
    
    inspector.classList.add('active');
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

    // Gauge bar elements
    const gaugeFill = document.getElementById('manifest-growth-fill');
    const gaugePercentText = document.getElementById('manifest-growth-percent');

    // State Selector Dropdown Elements
    const selectState = document.getElementById('select-sla-state');
    const labelState = document.getElementById('sim-state-label');
    const labelBaseline = document.getElementById('sim-state-baseline');

    // Run dynamic clock
    outTimestamp.textContent = formatManifestTimestamp(now, activeLang);

    // Bind selector dropdown events
    selectState.addEventListener('change', () => {
      const state = selectState.value;
      const meta = stateMetadata[state];
      
      // Update slider bounds dynamically
      sliderSla.max = meta.baseSLA.toFixed(1);
      sliderSla.value = meta.baseSLA.toFixed(1);
      
      labelState.textContent = activeLang === 'id' ? `SLA AKTIF: ${meta.name}` : `ACTIVE SLA: ${meta.name}`;
      labelBaseline.textContent = activeLang === 'id' ? `Dasar (${meta.baseSLA.toFixed(1)}h)` : `Baseline (${meta.baseSLA.toFixed(1)}d)`;
      
      updateSimulation();
    });

    function updateSimulation() {
      const targetRepeat = parseFloat(sliderRepeat.value);
      const targetSla = parseFloat(sliderSla.value);
      const targetBudgetShift = parseFloat(sliderBudget.value);

      const activeState = selectState.value;
      const meta = stateMetadata[activeState];

      // Update display values
      valRepeat.textContent = `${targetRepeat.toFixed(2)}%`;
      valSla.textContent = `${targetSla.toFixed(1)} ${activeLang === 'id' ? 'Hari' : 'Days'}`;
      valBudget.textContent = `${targetBudgetShift}%`;

      // 1. Customer Loyalty Calculations
      const repeatDelta = targetRepeat - 3.12;
      const additionalOrders = Math.round(kpis.total_customers * (repeatDelta / 100.0));
      const retentionRevenueUplift = additionalOrders * kpis.aov;

      // 2. Logistics State-Specific SLA Reduction Gains
      const stateBaseSla = meta.baseSLA;
      const stateReduction = Math.max(0, stateBaseSla - targetSla);
      
      // Calculate impact on overall national average SLA
      const nationalSlaReduction = (stateReduction * meta.orders) / kpis.total_orders;
      
      // Estimated cost savings of BRL 120 per day delayed per order
      const slaRevenueUplift = stateReduction * meta.orders * 120;
      
      // SLA-Rating overall shift
      const ratingImprovement = nationalSlaReduction * 0.4;
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

      // 4. Update Target Progress Gauge
      const growthPercent = ((totalSimRevenue - kpis.total_revenue) / kpis.total_revenue) * 100.0;
      const targetMaxPercent = 10.0; // 10% max growth scale for visualization
      const barFillWidth = Math.min(100, Math.max(0, (growthPercent / targetMaxPercent) * 100.0));
      
      gaugePercentText.textContent = `+${growthPercent.toFixed(2)}%`;
      gaugeFill.style.width = `${barFillWidth.toFixed(1)}%`;

      // Status indicator highlight
      if (targetRepeat > 3.12 || stateReduction > 0 || targetBudgetShift > 0) {
        outStatus.textContent = translations[activeLang]["manifest-status-sim"];
        outStatus.className = "manifest-stamp alert";
      } else {
        outStatus.textContent = translations[activeLang]["manifest-status-base"];
        outStatus.className = "manifest-stamp";
      }
    }

    // Bind event listeners
    sliderRepeat.addEventListener('input', updateSimulation);
    sliderSla.addEventListener('input', updateSimulation);
    sliderBudget.addEventListener('input', updateSimulation);

    btnReset.addEventListener('click', () => {
      selectState.value = "AM";
      const meta = stateMetadata["AM"];
      sliderSla.max = meta.baseSLA.toFixed(1);
      sliderSla.value = meta.baseSLA.toFixed(1);
      labelState.textContent = activeLang === 'id' ? `SLA AKTIF: ${meta.name}` : `ACTIVE SLA: ${meta.name}`;
      labelBaseline.textContent = activeLang === 'id' ? `Dasar (${meta.baseSLA.toFixed(1)}h)` : `Baseline (${meta.baseSLA.toFixed(1)}d)`;
      
      sliderRepeat.value = 3.12;
      sliderBudget.value = 0;
      updateSimulation();
    });

    // Make updateSimulation globally hookable for language toggles
    window.triggerSimulatorUpdate = updateSimulation;
    window.triggerStateLabelUpdate = () => {
      const state = selectState.value;
      const meta = stateMetadata[state];
      labelState.textContent = activeLang === 'id' ? `SLA AKTIF: ${meta.name}` : `ACTIVE SLA: ${meta.name}`;
      labelBaseline.textContent = activeLang === 'id' ? `Dasar (${meta.baseSLA.toFixed(1)}h)` : `Baseline (${meta.baseSLA.toFixed(1)}d)`;
    };

    // Run initial simulation
    updateSimulation();
  }

  // Language Switcher Controller
  function initLanguageSwitcher() {
    const btnEn = document.getElementById('btn-lang-en');
    const btnId = document.getElementById('btn-lang-id');

    function applyLanguage(lang) {
      activeLang = lang;

      // Toggle buttons style
      if (lang === 'en') {
        btnEn.classList.add('active');
        btnId.classList.remove('active');
      } else {
        btnId.classList.add('active');
        btnEn.classList.remove('active');
      }

      // Translate all data-translate elements
      document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
          if (el.classList.contains('tooltip')) {
            el.setAttribute('data-tooltip-text', translations[lang][key]);
          } else {
            el.innerHTML = translations[lang][key];
          }
        }
      });

      // Translate inputs placeholder dynamically
      document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
          el.setAttribute('placeholder', translations[lang][key]);
        }
      });

      // Update dynamic timestamps and elements
      document.getElementById('refresh-timestamp').textContent = formatRefreshTimestamp(now, lang);
      document.getElementById('ticker-date').textContent = formatDateForTicker(now, lang);
      document.getElementById('kpi-delivery').textContent = `${dashboardData.kpis.average_delivery_time.toFixed(1)} ${lang === 'id' ? 'Hari' : 'Days'}`;

      // Set tooltips explicitly for simulator sliders
      document.querySelectorAll('.tooltip-icon').forEach(icon => {
        const tooltipKey = icon.getAttribute('data-tooltip');
        if (translations[lang] && translations[lang][tooltipKey]) {
          icon.setAttribute('data-tooltip-text', translations[lang][tooltipKey]);
        }
      });

      // Update ticker content details
      const tickerSLA = document.getElementById('ticker-sla');
      tickerSLA.textContent = lang === 'id' 
        ? `RATA SLA: 12.3h // TINGKAT LOYALITAS: 3.12%`
        : `AVG SLA: 12.3d // LOYALTY RATE: 3.12%`;

      // Update dynamic greeting based on active language
      applyGreeting(lang);

      // Trigger simulator label refresh
      if (typeof window.triggerStateLabelUpdate === 'function') {
        window.triggerStateLabelUpdate();
      }

      // Redraw charts with new language configurations
      initCharts(dashboardData, lang);

      // Trigger simulator recalculations
      if (typeof window.triggerSimulatorUpdate === 'function') {
        window.triggerSimulatorUpdate();
      }
    }

    // Set defaults and bindings
    btnEn.addEventListener('click', () => applyLanguage('en'));
    btnId.addEventListener('click', () => applyLanguage('id'));

    // Set current active state
    applyLanguage(activeLang);
  }

  // User Greeting Setter
  function applyGreeting(lang) {
    const hour = now.getHours();
    let greet = "";
    if (lang === 'id') {
      if (hour < 12) greet = "Selamat Pagi, Admin";
      else if (hour < 15) greet = "Selamat Siang, Admin";
      else if (hour < 18) greet = "Selamat Sore, Admin";
      else greet = "Selamat Malam, Admin";
    } else {
      if (hour < 12) greet = "Good Morning, Admin";
      else if (hour < 17) greet = "Good Afternoon, Admin";
      else greet = "Good Evening, Admin";
    }
    document.getElementById('user-greeting').textContent = greet;
  }

  // Theme Manager (Dark/Light mode switch)
  function initThemeManager() {
    const btnTheme = document.getElementById('btn-theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');
    
    // Get saved theme or system preference
    let savedTheme = localStorage.getItem('theme') || 'light';
    
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
      
      // Update charts scale/grid colors
      initCharts(dashboardData, activeLang);
    };
    
    applyTheme(savedTheme);
    
    btnTheme.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Live Logging Ticker Simulation
  function initLogger() {
    const container = document.getElementById('logger-container');
    if (!container) return;
    
    const logTemplates = {
      en: [
        { level: 'info', text: 'São Paulo (SP) processing hub dispatched order #{{order}} successfully (Transit SLA: 8.7 days)' },
        { level: 'success', text: 'Order #{{order}} delivered to customer in Curitiba (PR) // SLA matched: 11.9 days' },
        { level: 'warn', text: 'Northern delivery alert: order #{{order}} to Amazonas (AM) transit exceeds SLA (25.6 days)' },
        { level: 'success', text: 'Rio de Janeiro (RJ) express delivery cleared in 14.8 days for order #{{order}}' },
        { level: 'info', text: 'Bahia (BA) dispatch terminal cleared order #{{order}} (Transit SLA: 18.6 days)' },
        { level: 'info', text: 'Credit Card checkout processed for BRL {{revenue}}' },
        { level: 'success', text: 'Boleto transaction verified for BRL {{revenue}}' },
        { level: 'success', text: 'Repeat purchase detected for customer unique ID {{cust}}' },
        { level: 'info', text: 'Customer loyalty coupon L2-RETENTION applied for order #{{order}}' }
      ],
      id: [
        { level: 'info', text: 'Pusat pemrosesan São Paulo (SP) berhasil mengirimkan pesanan #{{order}} (SLA Transit: 8,7 hari)' },
        { level: 'success', text: 'Pesanan #{{order}} berhasil diterima pelanggan di Curitiba (PR) // SLA sesuai: 11,9 hari' },
        { level: 'warn', text: 'Peringatan pengiriman Utara: transit pesanan #{{order}} ke Amazonas (AM) melampaui SLA (25,6 hari)' },
        { level: 'success', text: 'Pengiriman ekspres Rio de Janeiro (RJ) selesai dalam 14,8 hari untuk pesanan #{{order}}' },
        { level: 'info', text: 'Terminal pengiriman Bahia (BA) memproses pesanan #{{order}} (SLA Transit: 18,6 hari)' },
        { level: 'info', text: 'Pembayaran Kartu Kredit berhasil diproses sebesar BRL {{revenue}}' },
        { level: 'success', text: 'Transaksi Boleto berhasil diverifikasi sebesar BRL {{revenue}}' },
        { level: 'success', text: 'Pembelian berulang terdeteksi untuk ID unik pelanggan {{cust}}' },
        { level: 'info', text: 'Kupon retensi pelanggan L2-LOYALTY diterapkan untuk pesanan #{{order}}' }
      ]
    };

    const generateLog = () => {
      const templateList = logTemplates[activeLang] || logTemplates['en'];
      const selected = templateList[Math.floor(Math.random() * templateList.length)];
      
      const orderNum = Math.floor(1000 + Math.random() * 9000);
      const revVal = (10 + Math.random() * 400).toFixed(2);
      const custId = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      let message = selected.text
        .replace('{{order}}', orderNum)
        .replace('{{revenue}}', revVal)
        .replace('{{cust}}', custId);
        
      const time = new Date();
      const timeStr = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
      
      // Create log row elements
      const logLine = document.createElement('div');
      logLine.className = 'log-line';
      logLine.innerHTML = `
        <span class="log-timestamp">[${timeStr}]</span>
        <span class="log-level ${selected.level}">${selected.level}</span>
        <span class="log-text">${message}</span>
      `;
      
      container.appendChild(logLine);
      
      // Scroll to bottom
      const wrap = document.querySelector('.logger-wrap');
      if (wrap) {
        wrap.scrollTop = wrap.scrollHeight;
      }
      
      // Keep feed tidy
      if (container.children.length > 25) {
        container.removeChild(container.firstChild);
      }
    };

    // Fill initial logs
    for (let i = 0; i < 4; i++) {
      generateLog();
    }
    
    // Dynamic periodic stream
    setInterval(generateLog, 6000);
  }

  // Real-time Top Cities table Search filter handler
  function initCitySearch() {
    const searchInput = document.getElementById('search-city');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      const tbody = document.querySelector('#table-top-cities tbody');
      if (!tbody) return;
      
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(row => {
        const cityName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (cityName.includes(query)) {
          row.style.display = '';
          row.style.opacity = '1';
        } else {
          row.style.display = 'none';
          row.style.opacity = '0';
        }
      });
    });
  }

  // ==========================================================================
  // SQL Playground Logic
  // ==========================================================================

  // SQL Playground State
  let dbInstance = null;
  let sqlJsInitialized = false;

  const presetQueries = {
    mom_revenue: `-- Scenario A: Month-over-Month Revenue Growth
-- Calculates monthly total sales and compares it with the previous month's revenue
-- using the LAG window function to compute month-over-month growth rate percentage.

WITH MonthlyRevenue AS (
    SELECT 
        strftime('%Y-%m', o.order_purchase_timestamp) AS order_month,
        SUM(p.payment_value) AS total_revenue
    FROM orders o
    JOIN order_payments p ON o.order_id = p.order_id
    WHERE o.order_status = 'delivered'
    GROUP BY 1
),
RevenueWithLag AS (
    SELECT 
        order_month,
        total_revenue,
        LAG(total_revenue, 1) OVER (ORDER BY order_month) AS previous_month_revenue
    FROM MonthlyRevenue
)
SELECT 
    order_month,
    ROUND(total_revenue, 2) AS current_month_revenue,
    ROUND(previous_month_revenue, 2) AS last_month_revenue,
    ROUND(
        ((total_revenue - previous_month_revenue) / previous_month_revenue * 100), 
        2
    ) AS mom_growth_percentage
FROM RevenueWithLag
ORDER BY order_month;`,

    cohort_retention: `-- Scenario B: Customer Cohort Retention (First 3 Months)
-- Identifies cohorts based on the user's first purchase month.
-- Analyzes subsequent orders by those same users to compute retention for months 1, 2, and 3.

WITH CustomerFirstPurchase AS (
    SELECT 
        c.customer_unique_id,
        strftime('%Y-%m-01', MIN(o.order_purchase_timestamp)) AS cohort_month
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE o.order_status = 'delivered'
    GROUP BY 1
),
Activity AS (
    SELECT 
        c.customer_unique_id,
        cfp.cohort_month,
        (
            (CAST(strftime('%Y', o.order_purchase_timestamp) AS INTEGER) - CAST(strftime('%Y', cfp.cohort_month) AS INTEGER)) * 12 +
            (CAST(strftime('%m', o.order_purchase_timestamp) AS INTEGER) - CAST(strftime('%m', cfp.cohort_month) AS INTEGER))
        ) AS cohort_index
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN CustomerFirstPurchase cfp ON c.customer_unique_id = cfp.customer_unique_id
    WHERE o.order_status = 'delivered'
)
SELECT 
    cohort_month,
    COUNT(DISTINCT customer_unique_id) AS cohort_size,
    COUNT(DISTINCT CASE WHEN cohort_index = 1 THEN customer_unique_id END) AS month_1_retained,
    COUNT(DISTINCT CASE WHEN cohort_index = 2 THEN customer_unique_id END) AS month_2_retained,
    COUNT(DISTINCT CASE WHEN cohort_index = 3 THEN customer_unique_id END) AS month_3_retained
FROM Activity
GROUP BY 1
ORDER BY 1;`,

    top_categories_reviews: `-- Scenario C: Top 10 Product Categories by Revenue vs Rating
-- Links products, categories, orders, payments, and reviews to list
-- top selling categories, average scores, and percentage of bad reviews.

SELECT 
    t.product_category_name_english AS product_category,
    COUNT(DISTINCT oi.order_id) AS total_orders,
    ROUND(SUM(oi.price), 2) AS total_sales,
    ROUND(AVG(r.review_score), 2) AS avg_review_score,
    ROUND(
        (COUNT(CASE WHEN r.review_score <= 2 THEN 1 END) * 100.0 / COUNT(r.review_id)), 
        2
    ) AS negative_review_percentage
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
LEFT JOIN product_category_name_translation t ON p.product_category_name = t.product_category_name
JOIN order_reviews r ON oi.order_id = r.order_id
GROUP BY 1
HAVING COUNT(DISTINCT oi.order_id) >= 100
ORDER BY total_sales DESC
LIMIT 10;`
  };

  async function loadSqlDatabase() {
    if (sqlJsInitialized) return;
    sqlJsInitialized = true;

    const loader = document.getElementById('sql-loader');
    const loaderText = document.getElementById('sql-loader-text');
    const statusBadge = document.getElementById('sql-db-status');
    const btnRun = document.getElementById('btn-run-sql');
    
    loader.style.display = 'flex';
    btnRun.disabled = true;
    
    statusBadge.textContent = activeLang === 'id' ? "DATABASE: MENGUNDUH..." : "DATABASE: DOWNLOADING...";
    statusBadge.className = "caption font-mono alert";

    try {
      // 1. Init sql.js
      loaderText.textContent = activeLang === 'id' ? "Menginisialisasi mesin SQLite WASM..." : "Initializing SQLite WASM engine...";
      const SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
      });

      // 2. Fetch database
      loaderText.textContent = activeLang === 'id' ? "Mengunduh database operasional (68MB)... Ini memerlukan waktu sesaat." : "Downloading database...";
      const response = await fetch('data/olist_portfolio.db');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const buffer = await response.arrayBuffer();
      dbInstance = new SQL.Database(new Uint8Array(buffer));

      // Success
      loader.style.display = 'none';
      statusBadge.textContent = activeLang === 'id' ? "DATABASE: TERHUBUNG (ONLINE)" : "DATABASE: LOADED (ONLINE)";
      statusBadge.className = "caption font-mono success";
      
      btnRun.disabled = false;
      document.getElementById('sql-execution-status').textContent = activeLang === 'id' ? "Database terhubung. Silakan masukkan kueri Anda." : "Database connected. Ready for query input.";
    } catch (err) {
      console.error(err);
      loader.style.display = 'none';
      statusBadge.textContent = activeLang === 'id' ? "DATABASE: GAGAL" : "DATABASE: ERROR";
      statusBadge.className = "caption font-mono alert";
      
      const errBanner = document.getElementById('sql-error-banner');
      errBanner.textContent = `Error loading database: ${err.message}`;
      errBanner.style.display = 'block';
    }
  }

  function initSqlPlaygroundManager() {
    const btnRun = document.getElementById('btn-run-sql');
    const btnExport = document.getElementById('btn-export-sql-csv');
    const selectPreset = document.getElementById('select-preset-query');
    const editor = document.getElementById('sql-editor');

    if (!btnRun) return;

    btnRun.addEventListener('click', runSqlQuery);
    btnExport.addEventListener('click', exportSqlToCsv);

    selectPreset.addEventListener('change', () => {
      const selected = selectPreset.value;
      if (selected !== 'custom' && presetQueries[selected]) {
        editor.value = presetQueries[selected];
        runSqlQuery();
      }
    });
  }

  let lastQueryResults = null;

  function runSqlQuery() {
    if (!dbInstance) {
      alert(activeLang === 'id' ? "Database belum siap!" : "Database is not loaded yet!");
      return;
    }

    const editor = document.getElementById('sql-editor');
    const query = editor.value.trim();
    const resultsTable = document.getElementById('table-sql-results');
    const errorBanner = document.getElementById('sql-error-banner');
    const rowCountBadge = document.getElementById('sql-row-count-badge');
    const execStatus = document.getElementById('sql-execution-status');
    const btnExport = document.getElementById('btn-export-sql-csv');

    errorBanner.style.display = 'none';
    resultsTable.innerHTML = '';
    rowCountBadge.textContent = "0 ROWS";
    btnExport.disabled = true;
    lastQueryResults = null;

    if (!query) {
      execStatus.textContent = activeLang === 'id' ? "Konsol kosong." : "Console is empty.";
      return;
    }

    execStatus.textContent = activeLang === 'id' ? "Menjalankan kueri..." : "Running query...";
    
    // Defer execution slightly to let browser render query status
    setTimeout(() => {
      const startTime = performance.now();
      try {
        const res = dbInstance.exec(query);
        const endTime = performance.now();
        const elapsed = (endTime - startTime).toFixed(1);

        if (res.length === 0) {
          execStatus.textContent = activeLang === 'id' ? `Kueri berhasil dijalankan dalam ${elapsed}ms (0 baris).` : `Query completed in ${elapsed}ms (0 rows returned).`;
          rowCountBadge.textContent = "0 ROWS";
          return;
        }

        lastQueryResults = res[0];
        const columns = res[0].columns;
        const values = res[0].values;

        // Render headers
        const thead = document.createElement('thead');
        const hRow = document.createElement('tr');
        columns.forEach(col => {
          const th = document.createElement('th');
          th.textContent = col;
          hRow.appendChild(th);
        });
        thead.appendChild(hRow);
        resultsTable.appendChild(thead);

        // Render body
        const tbody = document.createElement('tbody');
        values.forEach(row => {
          const rRow = document.createElement('tr');
          row.forEach(val => {
            const td = document.createElement('td');
            td.textContent = val === null ? 'NULL' : val;
            rRow.appendChild(td);
          });
          tbody.appendChild(rRow);
        });
        resultsTable.appendChild(tbody);

        rowCountBadge.textContent = `${values.length} ROWS`;
        execStatus.textContent = activeLang === 'id' ? `Kueri selesai dalam ${elapsed}ms` : `Query completed in ${elapsed}ms`;
        btnExport.disabled = false;

      } catch (err) {
        console.error(err);
        execStatus.textContent = activeLang === 'id' ? "Kueri gagal." : "Query failed.";
        errorBanner.textContent = err.message;
        errorBanner.style.display = 'block';
      }
    }, 50);
  }

  function exportSqlToCsv() {
    if (!lastQueryResults) return;

    const columns = lastQueryResults.columns;
    const values = lastQueryResults.values;

    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header row
    csvContent += columns.map(c => `"${c.replace(/"/g, '""')}"`).join(",") + "\r\n";
    
    // Data rows
    values.forEach(row => {
      const rowStr = row.map(v => {
        if (v === null) return "NULL";
        const valStr = String(v);
        return `"${valStr.replace(/"/g, '""')}"`;
      }).join(",");
      csvContent += rowStr + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "olist_query_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
