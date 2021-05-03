import sqlite3
import pandas as pd
from datetime import datetime

conn = sqlite3.connect(r'C:\Users\sudhir.a.kumar.yadav\Documents\Projects\react_learning\Django_Starter\db.sqlite3')
cur = conn.cursor()

cur.execute("select name FROM sqlite_master where type='table'")
print(cur.fetchall())

ige_df = pd.read_excel(r'C:\Users\sudhir.a.kumar.yadav\Documents\G&E data\auditor_raw_dataset.xlsx')
ige_df = ige_df.fillna('')
ige_df['last_updated'] = datetime.today()

ige_df.to_sql(name='ige_igedatamodel', con=conn, if_exists="append", index=False)

inserted_df = pd.read_sql("select * from ige_igedatamodel", conn)
print(inserted_df)

conn.close()