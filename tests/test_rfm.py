import unittest
import pandas as pd
import numpy as np
from src.rfm_engine import OlistRFMEngine

class TestOlistRFMEngine(unittest.TestCase):
    def setUp(self):
        self.df_orders = pd.DataFrame([
            {
                'order_id': 'o1', 'customer_id': 'c1', 'order_status': 'delivered',
                'order_purchase_timestamp': '2018-01-01 10:00:00',
                'order_delivered_customer_date': '2018-01-05 10:00:00',
                'order_estimated_delivery_date': '2018-01-08 00:00:00'
            },
            {
                'order_id': 'o2', 'customer_id': 'c1', 'order_status': 'delivered',
                'order_purchase_timestamp': '2018-01-10 10:00:00',
                'order_delivered_customer_date': '2018-01-15 10:00:00',
                'order_estimated_delivery_date': '2018-01-12 00:00:00' # Delayed!
            },
            {
                'order_id': 'o3', 'customer_id': 'c2', 'order_status': 'delivered',
                'order_purchase_timestamp': '2018-01-05 10:00:00',
                'order_delivered_customer_date': '2018-01-07 10:00:00',
                'order_estimated_delivery_date': '2018-01-10 00:00:00'
            },
            {
                'order_id': 'o4', 'customer_id': 'c3', 'order_status': 'canceled',
                'order_purchase_timestamp': '2018-01-08 10:00:00',
                'order_delivered_customer_date': None,
                'order_estimated_delivery_date': '2018-01-15 00:00:00'
            },
        ])
        
        self.df_payments = pd.DataFrame([
            {'order_id': 'o1', 'payment_value': 100.0},
            {'order_id': 'o2', 'payment_value': 150.0},
            {'order_id': 'o3', 'payment_value': 80.0},
            {'order_id': 'o4', 'payment_value': 50.0},
        ])
        
        self.engine = OlistRFMEngine()

    def test_rfm_calculation_logic(self):
        rfm = self.engine.calculate_rfm(self.df_orders, self.df_payments)
        self.assertEqual(len(rfm), 2)  # c1 and c2 (c3 canceled)
        
        c1 = rfm[rfm['customer_id'] == 'c1'].iloc[0]
        self.assertEqual(c1['frequency'], 2)
        self.assertEqual(c1['monetary'], 250.0)
        
        c2 = rfm[rfm['customer_id'] == 'c2'].iloc[0]
        self.assertEqual(c2['frequency'], 1)
        self.assertEqual(c2['monetary'], 80.0)

    def test_clv_estimation(self):
        rfm = self.engine.calculate_rfm(self.df_orders, self.df_payments)
        clv_df = self.engine.calculate_clv_score(rfm, profit_margin=0.20)
        self.assertIn('clv_score', clv_df.columns)
        
        c1_clv = clv_df[clv_df['customer_id'] == 'c1'].iloc[0]['clv_score']
        c2_clv = clv_df[clv_df['customer_id'] == 'c2'].iloc[0]['clv_score']
        self.assertGreater(c1_clv, c2_clv)

    def test_delivery_delay_risk(self):
        delay_df = self.engine.calculate_delivery_delay_risk(self.df_orders)
        self.assertEqual(len(delay_df), 3)  # Only delivered orders
        
        # o2 is delayed (delivered 15th, estimated 12th)
        o2_row = delay_df[delay_df['order_id'] == 'o2'].iloc[0]
        self.assertTrue(o2_row['is_delayed'])
        self.assertGreater(o2_row['delay_days'], 0)
        
        # o1 is on time (delivered 5th, estimated 8th)
        o1_row = delay_df[delay_df['order_id'] == 'o1'].iloc[0]
        self.assertFalse(o1_row['is_delayed'])

if __name__ == '__main__':
    unittest.main()
