import os
import pandas as pd
import numpy as np

class OlistRFMEngine:
    """
    Modular E-Commerce Analytics Engine for Olist Brazilian Marketplace:
    - RFM (Recency, Frequency, Monetary) Customer Segmentation
    - Customer Lifetime Value (CLV) Scoring & Retention Prioritization
    - Logistics Delivery Delay Risk Analysis
    """
    def __init__(self, data_dir: str = None):
        if data_dir is None:
            data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
        self.data_dir = data_dir

    def calculate_rfm(self, df_orders: pd.DataFrame, df_payments: pd.DataFrame) -> pd.DataFrame:
        """Computes customer-level Recency, Frequency, and Monetary metrics."""
        df_orders = df_orders[df_orders['order_status'] == 'delivered'].copy()
        df_orders['order_purchase_timestamp'] = pd.to_datetime(df_orders['order_purchase_timestamp'])
        
        merged = pd.merge(df_orders, df_payments, on='order_id', how='inner')
        max_date = df_orders['order_purchase_timestamp'].max() + pd.Timedelta(days=1)
        
        rfm = merged.groupby('customer_id').agg(
            recency=('order_purchase_timestamp', lambda d: int((max_date - d.max()).days)),
            frequency=('order_id', 'nunique'),
            monetary=('payment_value', 'sum')
        ).reset_index()
        return rfm

    def assign_rfm_segments(self, rfm_df: pd.DataFrame) -> pd.DataFrame:
        """Assigns customer segments using vectorized score mapping."""
        df = rfm_df.copy()
        
        # Rank-based quantile scoring with duplicate handling
        df['R_score'] = pd.qcut(df['recency'].rank(method='first'), 5, labels=[5, 4, 3, 2, 1]).astype(int)
        df['F_score'] = pd.qcut(df['frequency'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5]).astype(int)
        df['M_score'] = pd.qcut(df['monetary'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5]).astype(int)
        
        # Vectorized segment assignment via np.select
        conditions = [
            (df['R_score'] >= 4) & (df['F_score'] >= 4),
            (df['R_score'] >= 3) & (df['F_score'] >= 3),
            (df['R_score'] >= 3) & (df['F_score'] <= 2),
            (df['R_score'] <= 2) & (df['F_score'] >= 3),
        ]
        choices = [
            'Champions',
            'Loyal Customers',
            'Potential Loyalists',
            'At Risk'
        ]
        df['segment'] = np.select(conditions, choices, default='Lost / Hibernating')
        return df

    def calculate_clv_score(self, rfm_df: pd.DataFrame, profit_margin: float = 0.15, monthly_discount_rate: float = 0.01) -> pd.DataFrame:
        """
        Estimates Customer Lifetime Value (CLV) proxy:
        CLV = (Average Order Value * Annual Frequency * Profit Margin) / (Churn Risk Weight)
        """
        df = rfm_df.copy()
        aov = df['monetary'] / np.maximum(df['frequency'], 1)
        # Recency decay factor (higher recency = higher churn risk)
        recency_factor = 1.0 / np.log(df['recency'] + np.e)
        
        df['aov'] = aov.round(2)
        df['clv_score'] = (df['monetary'] * profit_margin * (1.0 / (1.0 + monthly_discount_rate)) * recency_factor).round(2)
        return df

    def calculate_delivery_delay_risk(self, df_orders: pd.DataFrame) -> pd.DataFrame:
        """Analyzes logistics delivery delay vs customer promised estimated date."""
        df = df_orders[df_orders['order_status'] == 'delivered'].copy()
        df['delivered_customer_date'] = pd.to_datetime(df['order_delivered_customer_date'])
        df['estimated_delivery_date'] = pd.to_datetime(df['order_estimated_delivery_date'])
        
        # Positive value indicates delay beyond estimate
        delay_days = (df['delivered_customer_date'] - df['estimated_delivery_date']).dt.total_seconds() / 86400.0
        df['delay_days'] = delay_days.round(2)
        df['is_delayed'] = (df['delay_days'] > 0).astype(int)
        
        return df[['order_id', 'customer_id', 'delivered_customer_date', 'estimated_delivery_date', 'delay_days', 'is_delayed']]
