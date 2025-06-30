import re

def bersihkan_sql(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    clean_lines = []
    for line in lines:
        stripped = line.strip()

        # Lewati baris kosong
        if stripped == '':
            continue
        
        # Lewati baris yang isinya hanya komentar strip atau strip panjang
        if re.match(r'^--\s*-*$', stripped):
            continue
        
        # Lewati baris komentar kosong seperti: -- 
        if stripped == '--':
            continue

        clean_lines.append(line)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(clean_lines)

    print(f"File SQL sudah dibersihkan dan disimpan di: {output_file}")

# Contoh penggunaan
input_path = './db_sistem_pendaftaran.sql'
output_path = 'db_sistem_pendaftaran1.sql'
bersihkan_sql(input_path, output_path)
