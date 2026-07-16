import nbformat

with open(r"c:\Users\LENOVO\Documents\GitHub\olist-brazilian-ecommerce-analytics\notebook.ipynb", encoding='utf-8') as f:
    nb = nbformat.read(f, as_version=4)

for i, cell in enumerate(nb.cells):
    if cell.cell_type == 'markdown':
        # Print headings
        lines = cell.source.split('\n')
        headings = [l for l in lines if l.startswith('#')]
        if headings:
            print(f"Cell {i} (MD):", headings[0])
    elif cell.cell_type == 'code':
        # Check if cell contains search keywords
        source = cell.source.lower()
        if any(w in source for w in ['retensi', 'repeat', 'customer_unique_id', 'deliv', 'payment_type', 'november_2017']):
            first_line = cell.source.split('\n')[0] if cell.source else ""
            print(f"Cell {i} (Code, match): {first_line[:80]}")
