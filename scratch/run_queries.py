import os
import sqlite3
import pandas as pd

def run_sql_queries():
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/olist_portfolio.db'))
    sql_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../sql'))
    
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}! Please run build_database.py first.")
        return
        
    conn = sqlite3.connect(db_path)
    
    sql_files = [f for f in os.listdir(sql_dir) if f.endswith('.sql')]
    
    for file in sorted(sql_files):
        file_path = os.path.join(sql_dir, file)
        print("\n" + "="*60)
        print(f"Executing: {file}")
        print("="*60)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            query = f.read()
            
        try:
            df = pd.read_sql_query(query, conn)
            print(f"Returned {len(df)} rows.")
            print(df.head(10).to_string(index=False))
        except Exception as e:
            print(f"Error executing {file}: {e}")
            
    conn.close()

if __name__ == '__main__':
    run_sql_queries()
