import os
import pandas as pd
import numpy as np

class OlistRFMEngine:
    def __init__(self, data_dir: str = None):
        if data_dir is None:
            data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
        self.data_dir = data_dir

    def calculate_rfm(self, df_orders: pd.DataFrame, df_payments: pd.DataFrame) -> pd.DataFrame:
        df_orders = df_orders[df_orders['order_status'] == 'delivered'].copy()
        df_orders['order_purchase_timestamp'] = pd.to_datetime(df_orders['order_purchase_timestamp'])
        
        merged = pd.merge(df_orders, df_payments, on='order_id', how='inner')
        max_date = df_orders['order_purchase_timestamp'].max() + pd.Timedelta(days=1)
        
        rfm = merged.groupby('customer_id').agg(
            recency=('order_purchase_timestamp', lambda d: (max_date - d.max()).days),
            frequency=('order_id', 'nunique'),
            monetary=('payment_value', 'sum')
        ).reset_index()
        return rfm
