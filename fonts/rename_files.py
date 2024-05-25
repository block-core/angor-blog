import os

folder_path = '.'

for filename in os.listdir(folder_path):
    if filename.startswith("KaTeX_"):
        new_filename = filename.replace("KaTeX_", "", 1)
        os.rename(os.path.join(folder_path, filename), os.path.join(folder_path, new_filename))

print("تغییر نام فایل‌ها با موفقیت انجام شد.")
