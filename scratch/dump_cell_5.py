import nbformat

with open(r"c:\Users\LENOVO\Documents\GitHub\olist-brazilian-ecommerce-analytics\notebook.ipynb", encoding='utf-8') as f:
    nb = nbformat.read(f, as_version=4)

print(nb.cells[5].source)
