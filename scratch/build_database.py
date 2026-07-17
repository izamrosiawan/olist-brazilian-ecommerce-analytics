import os
import sqlite3
import pandas as pd

def build_db():
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/olist_portfolio.db'))
    data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data'))
    
    print(f"Connecting to database at: {db_path}")
    conn = sqlite3.connect(db_path)
    
    csv_files = [f for f in os.listdir(data_dir) if f.endswith('.csv')]
    
    for file in csv_files:
        table_name = file.replace('olist_', '').replace('_dataset', '').replace('.csv', '')
        file_path = os.path.join(data_dir, file)
        
        print(f"Reading {file}...")
        df = pd.read_csv(file_path)
        
        print(f"Writing to table '{table_name}' in SQLite...")
        df.to_sql(table_name, conn, if_exists='replace', index=False)
        
    print("Creating indexes to optimize query execution...")
    cursor = conn.cursor()
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_orders_id ON orders(order_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_order_payments_order ON order_payments(order_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_order_reviews_order ON order_reviews(order_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_customers_unique ON customers(customer_unique_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_customers_id ON customers(customer_id);")
    conn.commit()
        
    conn.close()
    print("Database built and indexed successfully!")

if __name__ == '__main__':
    build_db()
