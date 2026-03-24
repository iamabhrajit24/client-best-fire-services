import os
import re

files = ['index.html', 'about.html', 'services.html', 'products.html', 'blog.html', 'contact.html', 'blog-post-1.html']

for f_name in files:
    if not os.path.exists(f_name): continue
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the existing favicon
    pattern = r'<link rel="icon"[^>]*>'
    replacement = '<link rel="icon" type="image/png" href="/assets/images/logo.png">\n    <link rel="apple-touch-icon" href="/assets/images/logo.png">'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, replacement, content, count=1)
    else:
        # If not found, insert before </head>
        new_content = content.replace('</head>', replacement + '\n</head>')

    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Updated favicons")
