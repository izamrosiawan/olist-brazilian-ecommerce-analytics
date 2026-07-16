import nbformat

with open(r"c:\Users\LENOVO\Documents\GitHub\olist-brazilian-ecommerce-analytics\notebook.ipynb", encoding='utf-8') as f:
    nb = nbformat.read(f, as_version=4)

cells_to_print = [8, 22, 25, 29, 32]
for idx in cells_to_print:
    print(f"\n==================== CELL {idx} ====================")
    print(nb.cells[idx].source)
