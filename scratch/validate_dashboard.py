import html.parser
import re

class HTMLValidator(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        # We don't track self-closing tags in HTML5
        self_closing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
                        'link', 'meta', 'param', 'source', 'track', 'wbr']
        if tag not in self_closing:
            self.tags.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        self_closing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
                        'link', 'meta', 'param', 'source', 'track', 'wbr']
        if tag in self_closing:
            return
        if not self.tags:
            self.errors.append(f"Unexpected end tag </{tag}> at line {self.getpos()[0]}")
            return
        expected, pos = self.tags.pop()
        if expected != tag:
            self.errors.append(f"Mismatched end tag </{tag}> at line {self.getpos()[0]} (expected </{expected}> opened at line {pos[0]})")

def check_html():
    print("--- HTML VALIDATION ---")
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
        parser = HTMLValidator()
        parser.feed(content)
        if parser.errors:
            for err in parser.errors:
                print(f"Error: {err}")
        else:
            print("index.html: No major structure or tag mismatch errors found.")
    except Exception as e:
        print(f"Failed to read index.html: {e}")

def check_css():
    print("\n--- CSS VALIDATION ---")
    try:
        with open('index.css', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check braces matching
        open_braces = content.count('{')
        close_braces = content.count('}')
        print(f"Braces count: '{'{'}' is {open_braces}, '{'}'}' is {close_braces}")
        if open_braces != close_braces:
            print("Error: Braces mismatch in CSS!")
        
        # Look for syntax anomalies
        lines = content.split('\n')
        for i, line in enumerate(lines):
            # Check for double semicolons
            if ';;' in line:
                print(f"Warning: Double semicolon on line {i+1}: {line.strip()}")
            # Check for unclosed statements in selectors
            if ':' in line and not line.strip().endswith(';') and not line.strip().endswith('{') and not line.strip().endswith('}') and not line.strip().startswith('@') and not line.strip().startswith('/*') and line.strip() != "":
                # filter out pseudo classes or transition definitions or comments
                clean_line = re.sub(r'/\*.*?\*/', '', line).strip()
                if clean_line and not clean_line.endswith(';') and not clean_line.endswith('{') and not clean_line.endswith('}'):
                    print(f"Warning: Line {i+1} might be missing a semicolon: {line.strip()}")
        print("CSS check finished.")
    except Exception as e:
        print(f"Failed to read index.css: {e}")

def check_js():
    print("\n--- JS VALIDATION ---")
    try:
        with open('index.js', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Basic brace matching
        curly_open = content.count('{')
        curly_close = content.count('}')
        paren_open = content.count('(')
        paren_close = content.count(')')
        bracket_open = content.count('[')
        bracket_close = content.count(']')
        
        print(f"Curly braces: {curly_open} open, {curly_close} close")
        print(f"Parentheses: {paren_open} open, {paren_close} close")
        print(f"Square brackets: {bracket_open} open, {bracket_close} close")
        
        if curly_open != curly_close:
            print("Error: Curly braces mismatch in index.js!")
        if paren_open != paren_close:
            print("Error: Parentheses mismatch in index.js!")
        if bracket_open != bracket_close:
            print("Error: Square brackets mismatch in index.js!")
            
        print("JS check finished.")
    except Exception as e:
        print(f"Failed to read index.js: {e}")

if __name__ == '__main__':
    check_html()
    check_css()
    check_js()
