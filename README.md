# Olist Brazilian E-Commerce RFM Analytics & Customer Segmentation

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Pandas](https://img.shields.io/badge/Pandas-Analytics-orange.svg)](https://pandas.pydata.org/)
[![Domain](https://img.shields.io/badge/Domain-E--Commerce%20Analytics-green.svg)](#)
[![Tests](https://img.shields.io/badge/Tests-Pytest%20Passing-brightgreen.svg)](#)

Repositori ini menyajikan analisis komprehensif segmentasi pelanggan (*Customer Segmentation*), metrik RFM (*Recency, Frequency, Monetary*), serta performa logistik pengiriman pada dataset transaksi publik **Olist Brazilian E-Commerce** (100.000+ pesanan dari 2016 hingga 2018).

---

## Struktur Proyek

```
├── .gitignore          # Konfigurasi pengabaian cache Git
├── data/               # Dataset e-commerce Olist mentah & bersih (CSV)
├── images/             # Visualisasi plot komputasi 300 DPI
├── src/                # Modular Python analytics engine (OlistRFMEngine)
├── tests/              # Automated unit tests (Pytest: validasi kalkulasi RFM)
├── notebook.ipynb      # Jupyter Notebook: Pemrosesan data, kalkulasi RFM, visualisasi, dan segmentasi
├── requirements.txt    # Pinned stable dependencies
└── README.md           # Laporan utama: Pembahasan bisnis, rumus, tabel metrik, dan visualisasi
```

---

## Metodologi & Formulasi RFM

Pengolahan data pada `notebook.ipynb` dan `src/rfm_engine.py` menerapkan segmentasi RFM standar:

1. **Recency ($R$)**: Jumlah hari sejak transaksi pembelian terakhir nasabah hingga titik waktu analisis ($T_{\text{max}} + 1$).
2. **Frequency ($F$)**: Total jumlah pesanan unik dengan status *delivered* yang diselesaikan oleh pelanggan.
3. **Monetary ($M$)**: Total akumulasi nilai pembayaran (*payment value*) yang dibelanjakan pelanggan.

---

## Implementasi Modular & Pengujian Otomatis

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

## Cara Menjalankan

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

