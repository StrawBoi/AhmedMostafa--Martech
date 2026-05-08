import fitz
import os

base_folder = os.path.join(os.getcwd(), "frontend", "public", "projects", "volvo")
pdf_files = [os.path.join(base_folder, fn) for fn in os.listdir(base_folder) if fn.lower().endswith('.pdf')]

if not pdf_files:
    print('No PDF files found in', base_folder)
    raise SystemExit(1)

os.makedirs(base_folder, exist_ok=True)

extracted = []
count = 0
for pdf in pdf_files:
    name = os.path.splitext(os.path.basename(pdf))[0]
    print('Processing:', pdf)
    doc = fitz.open(pdf)
    for pno in range(len(doc)):
        page = doc[pno]
        images = page.get_images(full=True)
        if images:
            for i, img in enumerate(images, start=1):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                ext = base_image.get("ext", "png")
                out_name = f"{name}_page{pno+1}_img{i}.{ext}"
                out_path = os.path.join(base_folder, out_name)
                with open(out_path, 'wb') as f:
                    f.write(image_bytes)
                extracted.append(out_path)
                count += 1
                print('Saved image:', out_name)
        else:
            # render the page to an image
            pix = page.get_pixmap(dpi=150)
            out_name = f"{name}_page{pno+1}.png"
            out_path = os.path.join(base_folder, out_name)
            pix.save(out_path)
            extracted.append(out_path)
            count += 1
            print('Rendered page to image:', out_name)
    doc.close()

print('\nDone. Extracted', count, 'images:')
for p in extracted:
    print('-', os.path.relpath(p, os.getcwd()))
