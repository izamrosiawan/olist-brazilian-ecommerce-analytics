# Olist Brasil E-Commerce Performance & Customer Behavior Analysis

[English](#english) | [Bahasa Indonesia](#bahasa-indonesia)

---

<a name="english"></a>
## 🇬🇧 English Version

### 🎯 Business Problem Statement
In a highly competitive e-commerce landscape, marketplace platforms must optimize their logistics operations, identify high-margin revenue drivers, and increase customer retention. This project analyzes transaction records to resolve logistical bottlenecks and design retention programs that directly increase Customer Lifetime Value (LTV).

---

### 📌 Executive Summary (30-Second Read)
* **Objective**: Analyzed **100,000+ transaction records** (late 2016 to mid 2018) from **Olist**, Brazil's leading e-commerce platform, to identify revenue drivers, optimize logistics, and improve customer satisfaction.
* **Key Findings**:
  - **Revenue Drivers**: High-performance categories dominate sales, with *Health & Beauty* (high volume) and *Watches & Gifts* (high AOV) generating over **1.2M BRL** each.
  - **Regional Concentration**: São Paulo is the commercial hub, accounting for **15,540 orders** and over **2.2M BRL** in revenue.
  - **Logistics Bottleneck**: Average national shipping time is **12.3 days**, but remote states like Amazonas (AM) average **25.6 days**.
  - **Satisfaction & Speed**: Delivery delay is the primary driver of low review scores. 5-star orders arrive in **10.6 days** on average, whereas 1-star orders take **20.2 days** (negative correlation of **-0.31**).
  - **Retention Gap**: Repeat purchase rate is extremely low at **3.12%** (over 96.8% are one-time buyers).
* **Actionable Recommendations**:
  - **Logistics SLA Optimization**: Establish regional fulfillment hubs or local carrier partnerships in Northern states (AM, AP) to reduce delivery times from 25+ days to under 15 days.
  - **Targeted Inventory & Ads**: Allocate more marketing budget (ROAS-driven) and stock to high-margin/high-AOV categories (e.g., Watches & Gifts).
  - **Customer Retention Program**: Implement automated email campaigns, personalized coupons for the second purchase, and a loyalty program to boost the repeat rate from 3.12% to a target of 8%.

---

### 🛡️ Data Quality & Assumptions
* **Missing Values**: Missing values in product specifications (e.g., dimensions, description lengths) were imputed using category-specific medians. Unfilled customer review messages were kept as-is since their missingness did not affect the numerical rating scores.
* **Outlier Treatment**: Operational time logs containing negative delivery durations (due to manual carrier input errors) and orders with shipping times exceeding 60 days were removed to prevent distortion of averages.
* **Assumptions**: We assume that carrier-logged timestamps are accurate, and that `delivered_to_customer_date` represents the actual date the customer received the parcel.

---

### 📊 Key Insights & Visualizations

#### 1. Revenue Drivers by Product Category
A small group of product categories drives the majority of Olist's revenue. **Health & Beauty** and **Watches & Gifts** lead the platform, each contributing over **1.2M BRL**. While Health & Beauty is volume-driven, Watches & Gifts succeeds due to a higher Average Order Value (AOV).
![Top Categories by Revenue](images/top_10_categories_revenue.png)

#### 2. Regional Demand Hotspots
Demand is heavily concentrated in Brazil's Southeast region. **São Paulo** represents the largest market, contributing **15,540 orders** and generating **2.2M BRL** in revenue. Rio de Janeiro follows as the second-largest market.
![Top Cities by Orders and Revenue](images/top_cities_orders_revenue.png)

#### 3. Seasonality & Black Friday Spike
Sales grew steadily from 2017 to 2018. A massive surge occurred in **November 2017**, reaching **1.19M BRL**—a **53% month-over-month increase** driven by **Black Friday** promotions.
![Monthly Sales Trend](images/sales_seasonality_trend.png)

#### 4. Shipping SLA & Delivery Times
While the national median delivery time is **10.2 days** (average **12.3 days**), regional disparities are severe:
* **Southeast (Fastest)**: São Paulo averages **8.7 days**.
* **North (Slowest)**: Amazonas (AM) averages **25.6 days** and Amapá (AP) averages **24.8 days**.
![Delivery Days by State](images/delivery_time_by_state.png)

#### 5. Payment Methods
**Credit Cards** are the dominant payment method, accounting for **73.9%** of transactions, followed by **Boleto** at **19.0%**.
![Payment Methods Distribution](images/payment_methods_distribution.png)

#### 6. Satisfaction vs. Delivery Time
There is a clear negative correlation (**-0.31**) between delivery times and customer review scores. Delayed deliveries are the main cause of 1-star ratings:
* **5-Star Reviews**: Average delivery time of **10.6 days**.
* **1-Star Reviews**: Average delivery time of **20.2 days**.
![Delivery Time vs Review Score](images/review_score_vs_delivery_time.png)

---

### ⚠️ Limitations & Next Steps
* **Limitations**: The dataset lack marketing acquisition metrics (e.g., Customer Acquisition Cost / CAC, ad spend per channel), preventing us from calculating exact return on ad spend (ROAS) or marketing efficiency ratios.
* **Next Steps**:
  1. Integrate clickstream data to analyze pre-purchase customer behavior.
  2. Implement a machine learning model to predict customer churn based on delivery delays.

---

### 🔄 Reproducibility
* **Environment**: Python 3.11.x (requirements specified in [requirements.txt](requirements.txt)).
* **Execution Sequence**:
  1. Extract and store CSV datasets in the `data/` folder.
  2. Run the data preparation and cleaning cells in [notebook.ipynb](notebook.ipynb).
  3. Execute the analysis cells sequentially.
* **Random Seeds**: For reproducibility, `random_state = 42` is used for all train-test splits and data sampling.

---

### 🔗 Key Notebook Directory
- [Data Preprocessing & Cleaning](notebook.ipynb#4.-Pembersihan-Data-&-Validasi)
- [Exploratory Data Analysis (EDA)](notebook.ipynb#5.-Exploratory-Data-Analysis-(EDA))
- [Shipping & SLA Analysis](notebook.ipynb#D.-Analisis-Waktu-Pengiriman)
- [Retention & Loyalty Analysis](notebook.ipynb#E.-Retensi-Pelanggan-&-Pembelian-Berulang)

---

<a name="bahasa-indonesia"></a>
## 🇮🇩 Versi Bahasa Indonesia

### 🎯 Business Problem Statement
Dalam industri e-commerce yang kompetitif, platform marketplace harus mengoptimalkan operasional logistik, mengidentifikasi pendorong pendapatan berkinerja tinggi, dan meningkatkan retensi pelanggan. Proyek ini menganalisis data transaksi untuk mengatasi hambatan logistik dan merancang program retensi yang meningkatkan Customer Lifetime Value (LTV).

---

### 📌 Ringkasan Eksekutif (30 Detik Baca)
* **Tujuan**: Menganalisis **lebih dari 100.000 catatan transaksi** (akhir 2016 hingga pertengahan 2018) dari **Olist**, platform integrasi e-commerce terbesar di Brasil, untuk menemukan pendorong pendapatan, mengoptimalkan logistik, dan meningkatkan kepuasan pelanggan.
* **Temuan Utama**:
  - **Pendorong Pendapatan**: Penjualan didominasi oleh kategori berkinerja tinggi, yaitu *Health & Beauty* (volume tinggi) dan *Watches & Gifts* (AOV tinggi) dengan kontribusi masing-masing di atas **1,2 juta BRL**.
  - **Konsentrasi Regional**: Wilayah São Paulo merupakan pusat pasar terbesar dengan kontribusi **15.540 pesanan** dan total pendapatan lebih dari **2,2 juta BRL**.
  - **Masalah Logistik**: Rata-rata pengiriman nasional adalah **12,3 hari**, namun negara bagian terpencil di Utara seperti Amazonas (AM) memakan waktu rata-rata **25,6 hari**.
  - **Kepuasan & Kecepatan**: Keterlambatan pengiriman adalah faktor utama ulasan buruk. Pesanan dengan rating bintang 5 rata-rata sampai dalam **10,6 hari**, sedangkan rating bintang 1 memakan waktu **20,2 hari** (korelasi negatif **-0,31**).
  - **Rendahnya Retensi**: Tingkat pembelian berulang (*repeat purchase rate*) sangat rendah, hanya sebesar **3,12%** (lebih dari 96,8% pelanggan adalah pembeli satu kali).
* **Rekomendasi Bisnis**:
  - **Optimasi SLA Logistik**: Bangun kemitraan dengan kurir lokal atau posisikan gudang regional di wilayah Utara (AM, AP) untuk memangkas waktu kirim dari 25+ hari menjadi di bawah 15 hari.
  - **Prioritas Iklan & Stok**: Alokasikan budget iklan (berbasis ROAS) dan inventaris produk pada kategori bernilai tinggi (*Watches & Gifts* dan *Health & Beauty*).
  - **Program Retensi Pelanggan**: Terapkan kampanye email otomatis, kupon belanja kedua, dan program loyalitas untuk menaikkan tingkat pembelian berulang dari 3,12% menjadi target 8%.

---

### 🛡️ Kualitas Data & Asumsi
* **Missing Values**: Data spesifikasi produk yang kosong (seperti dimensi dan panjang deskripsi) diimputasi menggunakan nilai median berdasarkan kategori produk masing-masing. Review teks pelanggan yang kosong dibiarkan karena tidak berdampak pada penilaian rating numerik.
* **Outlier Treatment**: Rekaman pengiriman yang memiliki durasi pengiriman negatif (akibat kesalahan input kurir) dan pesanan dengan waktu kirim di atas 60 hari dihapus agar tidak mendistorsi analisis rata-rata.
* **Asumsi**: Kami mengasumsikan log stempel waktu kurir akurat, dan data `delivered_to_customer_date` merepresentasikan waktu aktual saat pelanggan menerima paket.

---

### 📊 Wawasan Utama & Visualisasi

#### 1. Kategori Produk Pendorong Pendapatan
Sebagian besar nilai penjualan dihasilkan oleh sekelompok kecil kategori produk. **Health & Beauty** dan **Watches & Gifts** adalah kategori utama, masing-masing menghasilkan lebih dari **1,2 juta BRL**.
![Top Categories by Revenue](images/top_10_categories_revenue.png)

#### 2. Titik Panas Kinerja Regional
Permintaan sangat terkonsentrasi di wilayah Tenggara Brasil. **São Paulo** menyumbang **15.540 pesanan** dan menghasilkan lebih dari **2,2 juta BRL**.
![Top Cities by Orders and Revenue](images/top_cities_orders_revenue.png)

#### 3. Musiman & Pertumbuhan Penjualan
Penjualan tumbuh secara konsisten dari awal tahun 2017 hingga pertengahan 2018. Lonjakan signifikan terjadi pada **November 2017**, mencapai **1,19 juta BRL** (naik **53%** bulanan) karena promosi **Black Friday**.
![Monthly Sales Trend](images/sales_seasonality_trend.png)

#### 4. Waktu Pengiriman Regional
Rata-rata waktu pengiriman di seluruh Brasil adalah **12,3 hari** (median: 10,2 hari):
* **Tercepat**: São Paulo rata-rata **8,7 hari**.
* **Terlambat**: Amazonas (AM) rata-rata **25,6 hari** dan Amapá (AP) rata-rata **24,8 hari**.
![Delivery Days by State](images/delivery_time_by_state.png)

#### 5. Metode Pembayaran
**Kartu Kredit** mendominasi pembayaran sebesar **73,9%**, diikuti oleh **Boleto** sebesar **19,0%**.
![Payment Methods Distribution](images/payment_methods_distribution.png)

#### 6. Dampak Kecepatan Pengiriman pada Ulasan Pelanggan
Analisis menunjukkan korelasi negatif yang jelas (**-0,31**) antara waktu pengiriman dan skor ulasan pelanggan:
* **Ulasan Bintang 5**: Dikirim dalam rata-rata **10,6 hari**.
* **Ulasan Bintang 1**: Dikirim dalam rata-rata **20,2 hari**.
![Delivery Time vs Review Score](images/review_score_vs_delivery_time.png)

---

### ⚠️ Keterbatasan & Langkah Selanjutnya
* **Keterbatasan**: Dataset tidak memiliki metrik biaya akuisisi (CAC) dan biaya iklan per kanal, sehingga ROI pemasaran secara detail tidak dapat dihitung.
* **Langkah Selanjutnya**:
  1. Integrasikan data clickstream untuk menganalisis corong pembelian (purchase funnel) pelanggan.
  2. Bangun model prediktif untuk mendeteksi potensi churn pelanggan akibat keterlambatan pengiriman.

---

### 🔄 Reproduksibilitas
* **Lingkungan**: Python 3.11.x (daftar pustaka di [requirements.txt](requirements.txt)).
* **Urutan Eksekusi**:
  1. Unduh dan simpan dataset CSV di folder `data/`.
  2. Jalankan cell pembersihan data di [notebook.ipynb](notebook.ipynb).
  3. Jalankan analisis visualisasi dan analisis lanjut secara berurutan.
* **Random Seeds**: Nilai seed `random_state = 42` disematkan pada seluruh split data dan pemodelan untuk hasil yang konsisten.

---

### 🔗 Direktori Notebook
- [Pembersihan & Validasi Data](notebook.ipynb#4.-Pembersihan-Data-&-Validasi)
- [Analisis Data Eksploratif (EDA)](notebook.ipynb#5.-Exploratory-Data-Analysis-(EDA))
- [Analisis Logistik & SLA](notebook.ipynb#D.-Analisis-Waktu-Pengiriman)
- [Analisis Retensi & Pembelian Berulang](notebook.ipynb#E.-Retensi-Pelanggan-&-Pembelian-Berulang)

---

## 🗄️ Skema Dataset (ERD)
Dataset ini terdiri dari 9 tabel yang saling terhubung, di-host di Kaggle:

```mermaid
erDiagram
    olist_customers_dataset {
        string customer_id PK
        string customer_unique_id
        string customer_zip_code_prefix FK
        string customer_city
        string customer_state
    }
    olist_orders_dataset {
        string order_id PK
        string customer_id FK
        string order_status
        timestamp order_purchase_timestamp
        timestamp order_approved_at
        timestamp order_delivered_carrier_date
        timestamp order_delivered_customer_date
        timestamp order_estimated_delivery_date
    }
    olist_order_items_dataset {
        string order_id PK, FK
        int order_item_id PK
        string product_id FK
        string seller_id FK
        timestamp shipping_limit_date
        float price
        float freight_value
    }
    olist_order_payments_dataset {
        string order_id PK, FK
        int payment_sequential PK
        string payment_type
        int payment_installments
        float payment_value
    }
    olist_order_reviews_dataset {
        string review_id PK
        string order_id FK
        int review_score
        string review_comment_title
        string review_comment_message
        timestamp review_creation_date
        timestamp review_answer_timestamp
    }
    olist_products_dataset {
        string product_id PK
        string product_category_name FK
        int product_name_length
        int product_description_length
        int product_photos_qty
        float product_weight_g
        float product_length_cm
        float product_height_cm
        float product_width_cm
    }
    olist_sellers_dataset {
        string seller_id PK
        string seller_zip_code_prefix FK
        string seller_city
        string seller_state
    }
    product_category_name_translation {
        string product_category_name PK
        string product_category_name_english
    }
    olist_geolocation_dataset {
        string geolocation_zip_code_prefix PK
        float geolocation_lat
        float geolocation_lng
        string geolocation_city
        string geolocation_state
    }

    olist_customers_dataset ||--|| olist_orders_dataset : "customer_id"
    olist_orders_dataset ||--|{ olist_order_items_dataset : "order_id"
    olist_orders_dataset ||--|{ olist_order_payments_dataset : "order_id"
    olist_orders_dataset ||--o| olist_order_reviews_dataset : "order_id"
    olist_products_dataset ||--|{ olist_order_items_dataset : "product_id"
    olist_sellers_dataset ||--|{ olist_order_items_dataset : "seller_id"
    product_category_name_translation ||--|{ olist_products_dataset : "product_category_name"
    olist_geolocation_dataset ||--|{ olist_customers_dataset : "customer_zip_code_prefix = geolocation_zip_code_prefix"
    olist_geolocation_dataset ||--|{ olist_sellers_dataset : "seller_zip_code_prefix = geolocation_zip_code_prefix"
```
