import nbformat

with open(r"c:\Users\LENOVO\Documents\GitHub\olist-brazilian-ecommerce-analytics\notebook.ipynb", encoding='utf-8') as f:
    nb = nbformat.read(f, as_version=4)

for i, cell in enumerate(nb.cells):
    if cell.cell_type == 'code':
        source = cell.source
        if 'df_orders_merged =' in source or 'df_full =' in source or 'pd.merge' in source:
            print(f"Cell {i} (Code):")
            print(source[:500])
            print("...\n")
