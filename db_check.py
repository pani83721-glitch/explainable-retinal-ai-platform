import sqlite3
import os

db_path = 'healthcare.db'

if not os.path.exists(db_path):
    print(f"Error: {db_path} not found.")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [t[0] for t in cursor.fetchall()]
    print(f"Tables in database: {tables}")
    
    for table in tables:
        print(f"\n--- Table: {table} ---")
        # Get column names
        cursor.execute(f"PRAGMA table_info({table});")
        columns = [c[1] for c in cursor.fetchall()]
        print(f"Columns: {columns}")
        
        # Get sample data
        cursor.execute(f"SELECT * FROM {table} LIMIT 5;")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
            
    conn.close()
