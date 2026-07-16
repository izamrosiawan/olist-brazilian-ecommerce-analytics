import pandas as pd
import json
import os

def run_aggregation():
    data_dir = r"c:\Users\LENOVO\Documents\GitHub\olist-brazilian-ecommerce-analytics\data"
    
    print("Loading datasets...")
    df_customers = pd.read_csv(os.path.join(data_dir, 'olist_customers_dataset.csv'))
    df_orders = pd.read_csv(os.path.join(data_dir, 'olist_orders_dataset.csv'))
    df_items = pd.read_csv(os.path.join(data_dir, 'olist_order_items_dataset.csv'))
    df_payments = pd.read_csv(os.path.join(data_dir, 'olist_order_payments_dataset.csv'))
    df_reviews = pd.read_csv(os.path.join(data_dir, 'olist_order_reviews_dataset.csv'))
    df_products = pd.read_csv(os.path.join(data_dir, 'olist_products_dataset.csv'))
    df_sellers = pd.read_csv(os.path.join(data_dir, 'olist_sellers_dataset.csv'))
    df_category_translation = pd.read_csv(os.path.join(data_dir, 'product_category_name_translation.csv'))
    
    print("Data types conversion and anomalies removal...")
    datetime_cols = [
        'order_purchase_timestamp', 
        'order_approved_at', 
        'order_delivered_carrier_date', 
        'order_delivered_customer_date', 
        'order_estimated_delivery_date'
    ]
    for col in datetime_cols:
        df_orders[col] = pd.to_datetime(df_orders[col])
        
    anomalies = df_orders[df_orders['order_delivered_customer_date'] < df_orders['order_purchase_timestamp']]
    if len(anomalies) > 0:
        df_orders = df_orders.drop(anomalies.index)
        print(f"Removed {len(anomalies)} date anomalies.")
        
    print("Merging datasets...")
    # Aggregate payments
    df_payments_agg = df_payments.groupby('order_id').agg({
        'payment_value': 'sum',
        'payment_installments': 'max'
    }).reset_index()
    
    # Clean and average reviews
    df_reviews_cleaned = df_reviews.groupby('order_id')['review_score'].mean().reset_index()
    
    # Translate products
    df_products_translated = pd.merge(df_products, df_category_translation, on='product_category_name', how='left')
    df_products_translated['product_category_name_english'] = df_products_translated['product_category_name_english'].fillna(
        df_products_translated['product_category_name'].fillna('unknown')
    )
    
    # Orders merged
    df_orders_merged = pd.merge(df_orders, df_customers, on='customer_id', how='left')
    df_orders_merged = pd.merge(df_orders_merged, df_payments_agg, on='order_id', how='left')
    df_orders_merged = pd.merge(df_orders_merged, df_reviews_cleaned, on='order_id', how='left')
    
    # Full merge for item-level analysis
    df_items_prod = pd.merge(df_items, df_products_translated, on='product_id', how='left')
    df_full = pd.merge(df_items_prod, df_orders_merged, on='order_id', how='left')
    
    print("Computing KPIs...")
    # 1. Total Orders
    total_orders = int(df_orders['order_id'].nunique())
    
    # 2. Total Revenue (sum of payment values)
    total_revenue = float(df_payments['payment_value'].sum())
    
    # 3. Average Order Value
    aov = total_revenue / total_orders
    
    # 4. Repeat Purchase Rate
    order_counts = df_orders_merged.groupby('customer_unique_id')['order_id'].nunique()
    total_customers = len(order_counts)
    repeat_customers = int((order_counts > 1).sum())
    repeat_rate = (repeat_customers / total_customers) * 100
    
    # 5. Delivery times (SLA)
    df_delivered = df_orders_merged.dropna(subset=['order_delivered_customer_date', 'order_purchase_timestamp']).copy()
    df_delivered['delivery_days'] = (df_delivered['order_delivered_customer_date'] - df_delivered['order_purchase_timestamp']).dt.total_seconds() / 86400.0
    df_delivered = df_delivered[(df_delivered['delivery_days'] >= 0) & (df_delivered['delivery_days'] <= 60)]
    
    avg_delivery = float(df_delivered['delivery_days'].mean())
    med_delivery = float(df_delivered['delivery_days'].median())
    
    # 6. Average Review Score
    avg_review = float(df_reviews['review_score'].mean())
    
    print("Computing visualizations...")
    # A. Top Categories by Revenue
    category_revenue = df_full.groupby('product_category_name_english')['price'].sum().sort_values(ascending=False).head(15)
    categories_list = [{"category": cat.replace('_', ' ').title(), "revenue": float(rev)} for cat, rev in category_revenue.items()]
    
    # B. Top Cities by Orders & Revenue
    df_unique_orders = df_orders_merged.dropna(subset=['customer_city'])
    city_orders = df_unique_orders['customer_city'].value_counts().head(10)
    city_revenue_map = df_unique_orders.groupby('customer_city')['payment_value'].sum()
    cities_list = [{
        "city": city.title(), 
        "orders": int(city_orders[city]), 
        "revenue": float(city_revenue_map.get(city, 0.0))
    } for city in city_orders.index]
    
    # C. Seasonality & Trend (2017 to 2018)
    df_time_filtered = df_orders_merged[df_orders_merged['order_purchase_timestamp'] < '2018-09-01'].copy()
    df_time_filtered['purchase_month_period'] = df_time_filtered['order_purchase_timestamp'].dt.to_period('M')
    monthly_sales = df_time_filtered.groupby('purchase_month_period')['payment_value'].sum()
    monthly_trend = [{"month": str(m), "revenue": float(val)} for m, val in monthly_sales.items()]
    
    # D. Delivery days by state
    state_delivery = df_delivered.groupby('customer_state')['delivery_days'].mean().sort_values()
    state_delivery_list = [{"state": state, "average_days": float(days)} for state, days in state_delivery.items()]
    
    # E. Payment methods
    payment_counts = df_payments['payment_type'].value_counts()
    payment_counts = payment_counts[payment_counts.index != 'not_defined']
    total_payments_count = payment_counts.sum()
    payment_methods_list = [{
        "method": method.replace('_', ' ').title(), 
        "count": int(count), 
        "percentage": float((count / total_payments_count) * 100)
    } for method, count in payment_counts.items()]
    
    # F. Satisfaction vs Delivery Time
    df_reviews_delivery = pd.merge(
        df_orders_merged[['order_id', 'order_purchase_timestamp', 'order_delivered_customer_date']], 
        df_reviews_cleaned, 
        on='order_id'
    )
    df_reviews_delivery['delivery_days'] = (
        df_reviews_delivery['order_delivered_customer_date'] - df_reviews_delivery['order_purchase_timestamp']
    ).dt.total_seconds() / 86400.0
    df_reviews_delivery = df_reviews_delivery[(df_reviews_delivery['delivery_days'] >= 0) & (df_reviews_delivery['delivery_days'] <= 60)]
    df_reviews_delivery['review_score_int'] = df_reviews_delivery['review_score'].round().astype(int)
    avg_delivery_by_score = df_reviews_delivery.groupby('review_score_int')['delivery_days'].mean()
    satisfaction_delivery_list = [{"score": int(score), "average_days": float(days)} for score, days in avg_delivery_by_score.items()]
    
    # Put it all together
    dashboard_data = {
        "kpis": {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "aov": aov,
            "repeat_purchase_rate": repeat_rate,
            "average_delivery_time": avg_delivery,
            "median_delivery_time": med_delivery,
            "average_review_score": avg_review,
            "total_customers": total_customers,
            "repeat_buyers": repeat_customers
        },
        "monthly_trend": monthly_trend,
        "top_categories": categories_list,
        "top_cities": cities_list,
        "state_delivery": state_delivery_list,
        "payment_methods": payment_methods_list,
        "satisfaction_delivery": satisfaction_delivery_list
    }
    
    output_path = r"c:\Users\LENOVO\Documents\GitHub\olist-brazilian-ecommerce-analytics\dashboard_data.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard_data, f, indent=2)
        
    print(f"Successfully aggregated data and saved to {output_path}")

if __name__ == '__main__':
    run_aggregation()
