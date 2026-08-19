import pytest
import pandas as pd
import numpy as np
from src.rfm_engine import OlistRFMEngine

def test_rfm_calculation_logic():
    engine = OlistRFMEngine()
    
    df_orders = pd.DataFrame([
        {'order_id': 'o1', 'customer_id': 'c1', 'order_status': 'delivered', 'order_purchase_timestamp': '2018-01-01 10:00:00'},
        {'order_id': 'o2', 'customer_id': 'c1', 'order_status': 'delivered', 'order_purchase_timestamp': '2018-01-10 10:00:00'},
        {'order_id': 'o3', 'customer_id': 'c2', 'order_status': 'delivered', 'order_purchase_timestamp': '2018-01-05 10:00:00'},
        {'order_id': 'o4', 'customer_id': 'c3', 'order_status': 'canceled', 'order_purchase_timestamp': '2018-01-08 10:00:00'},
    ])
    
    df_payments = pd.DataFrame([
        {'order_id': 'o1', 'payment_value': 100.0},
        {'order_id': 'o2', 'payment_value': 150.0},
        {'order_id': 'o3', 'payment_value': 80.0},
        {'order_id': 'o4', 'payment_value': 50.0},
    ])
    
    rfm = engine.calculate_rfm(df_orders, df_payments)
    
    assert len(rfm) == 2 # Hanya customer c1 dan c2 yang delivered
    c1 = rfm[rfm['customer_id'] == 'c1'].iloc[0]
    assert c1['frequency'] == 2
    assert c1['monetary'] == 250.0
    assert c1['recency'] == 1 # Tanggal max adalah 2018-01-10 + 1 hari
