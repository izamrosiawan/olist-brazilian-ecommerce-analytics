# Olist Brazilian E-Commerce RFM Analytics, Logistics & Customer Lifetime Segmentation

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Pandas](https://img.shields.io/badge/Pandas-Analytics-orange.svg)](https://pandas.pydata.org/)
[![Domain](https://img.shields.io/badge/Domain-E--Commerce%20Analytics-green.svg)](#)
[![Tests](https://img.shields.io/badge/Tests-Pytest%20Passing-brightgreen.svg)](#)

Repositori ini menyajikan analisis komprehensif performa bisnis marketplace, segmentasi pelanggan (*Customer Segmentation* berbasis RFM: *Recency, Frequency, Monetary*), analisis kepuasan pelanggan (*Review Score Modeling*), dan pemetaan efisiensi logistik pengiriman antar-negara bagian pada dataset publik **Olist Brazilian E-Commerce** (100.000+ transaksi pesanan dari 2016 hingga 2018).

---

## 1. Pembahasan Bisnis & Konteks Industri E-Commerce

Marketplace e-commerce menghadapi tantangan operasional yang kompleks dalam mempertahankan retensi pelanggan dan mengendalikan biaya logistik di negara dengan cakupan geografis luas seperti Brasil:
1. **Segmentasi Nilai Pelanggan**: Mengidentifikasi pelanggan loyal (*Champions & Loyal Customers*) vs pelanggan berisiko berhenti (*At-Risk / Hibernating*) untuk alokasi voucher pemasaran terarah.
2. **Efisiensi Logistik & Kepuasan Pelanggan**: Menganalisis dampak keterlambatan pengiriman terhadap penurunan skor ulasan (*review score*) pembeli.
3. **Kinerja Kategori Produk & Konsentrasi Pendapatan**: Memetakan kategori produk pendorong omzet terbesar (*revenue drivers*).

---

## 2. Struktur Proyek

```
├── .gitignore          # Konfigurasi pengabaian cache Git
├── data/               # Dataset transaksi Olist mentah & bersih (CSV)
├── images/             # Visualisasi plot komputasi 300 DPI
│   ├── sales_seasonality_trend.png
│   ├── top_10_categories_revenue.png
│   ├── top_cities_orders_revenue.png
│   ├── delivery_time_distribution.png
│   ├── delivery_time_by_state.png
│   ├── review_score_vs_delivery_time.png
│   └── payment_methods_distribution.png
├── src/                # Modular Python analytics engine (OlistRFMEngine)
├── tests/              # Automated unit tests (Pytest)
├── notebook.ipynb      # Mesin pemrosesan: Pembersihan data, kalkulasi RFM, logistik, dan visualisasi
├── requirements.txt    # Pinned stable dependencies
└── README.md           # Laporan utama: Pembahasan bisnis, rumus, tabel metrik, dan visualisasi
```

---

## 3. Metodologi & Formulasi Analisis RFM

Analisis pada `notebook.ipynb` dan `src/rfm_engine.py` menerapkan metodologi segmentasi berikut:

### A. Metrik RFM (*Recency, Frequency, Monetary*)
* **Recency ($R$)**: Selisih hari antara tanggal transaksi terakhir pelanggan dengan batas waktu observasi analisis ($T_{\text{max}} + 1$):
  $$R_i = T_{\text{max}} - \max(t_i)$$
* **Frequency ($F$)**: Total jumlah pesanan unik yang diselesaikan (*delivered*) oleh pelanggan $i$:
  $$F_i = \sum \mathbb{I}(\text{status} = \text{'delivered'})$$
* **Monetary ($M$)**: Total nilai belanja riil yang dibayarkan oleh pelanggan $i$:
  $$M_i = \sum \text{Payment\_Value}$$

### B. Segmentasi Klaster Pelanggan
Pengelompokan kuantil skor $R, F, M$ ke dalam kuadran: *Champions*, *Loyal Customers*, *Potential Loyalists*, *At Risk*, dan *Lost*.

---

## 4. Hasil Kuantitatif & Pembahasan Visualisasi

### A. Tren Penjualan Musiman & Kategori Produk Terlaris
Perkembangan volume penjualan bulanan dan kontribusi omzet per kategori barang.

![Tren Penjualan Musiman](images/sales_seasonality_trend.png)
![Top 10 Kategori Produk](images/top_10_categories_revenue.png)

*   **Pembahasan**: Penjualan mengalami lonjakan tajam pada momen Black Friday (November 2017). Kategori produk *Bed, Bath & Table*, *Health & Beauty*, dan *Sports & Leisure* menyumbang lebih dari 30% total Gross Merchandise Value (GMV).

### B. Distribusi Waktu Pengiriman & Dampak terhadap Skor Ulasan
Analisis waktu pengiriman pesanan dan korelasinya terhadap kepuasan pembeli.

![Distribusi Waktu Kirim](images/delivery_time_distribution.png)
![Review Score vs Delivery Time](images/review_score_vs_delivery_time.png)

*   **Pembahasan**: Rata-rata waktu pengiriman adalah 12,5 hari. Terdapat korelasi negatif tajam antara keterlambatan dengan skor ulasan: pesanan yang tiba dalam $<7$ hari memperoleh rata-rata skor **4.6 / 5.0**, sedangkan pesanan yang memakan waktu $>20$ hari anjlok ke rata-rata **1.8 / 5.0**.

### C. Efisiensi Logistik Regional & Metode Pembayaran
Perbedaan durasi pengiriman antar wilayah dan preferensi alat bayar pelanggan.

![Waktu Kirim per Negara Bagian](images/delivery_time_by_state.png)
![Distribusi Metode Pembayaran](images/payment_methods_distribution.png)

*   **Pembahasan**: Wilayah Tenggara (SP, RJ, MG) memiliki waktu pengiriman tercepat (6-9 hari), sementara wilayah Utara (RR, AP, AM) membutuhkan waktu hingga 25-30 hari. Kartu kredit mendominasi 73,9% transaksi, diikuti oleh Boleto bancário (19,0%).

---

## 5. Implementasi Modular & Pengujian Otomatis

Modul kalkulasi RFM tersedia di `src/rfm_engine.py`:

```python
from src.rfm_engine import OlistRFMEngine
import pandas as pd

engine = OlistRFMEngine()
df_orders = pd.read_csv('data/olist_orders_dataset.csv')
df_payments = pd.read_csv('data/olist_order_payments_dataset.csv')

rfm_df = engine.calculate_rfm(df_orders, df_payments)
print(f"Total Pelanggan Tersegmentasi: {len(rfm_df):,}")
```

Jalankan automated test:
```bash
pytest tests/
```

---

## 6. Rekomendasi Bisnis & Operasional Marketplace

1. **Pembangunan Fulfillment Center Regional**: Membangun *micro-warehouse* di wilayah Utara dan Timur Laut untuk memangkas waktu kirim dari 25 hari menjadi $<10$ hari, yang berpotensi menaikkan rating kepuasan pembeli sebesar 1.5 bintang.
2. **Program Re-aktivasi Segmen At-Risk**: Berikan insentif voucher bebas ongkir (*free shipping*) khusus kepada segmen pelanggan bernilai moneter tinggi yang belum berbelanja dalam 90 hari terakhir.
3. **Optimasi Opsi Cicilan Kartu Kredit**: Lebih dari 50% pembayaran kartu kredit menggunakan skema cicilan (*installments*), sehingga kemitraan dengan penyedia pembiayaan (*Fintech / BNPL*) penting untuk mendorong konversi keranjang belanja.

---

## 7. Cara Menjalankan

1. **Pasang Dependensi**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Eksekusi Notebook**:
   ```bash
   jupyter notebook notebook.ipynb
   ```

---
*Olist Brazilian E-Commerce Analytics Project.*
