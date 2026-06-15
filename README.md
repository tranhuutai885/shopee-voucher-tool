# Shopee Voucher Tool

Công cụ chuyển đổi link Shopee sang affiliate link để nhận voucher Facebook độc quyền.

## Deploy lên Vercel (miễn phí)

### Bước 1 — Tạo repo GitHub
1. Vào github.com → New repository → đặt tên `shopee-voucher-tool`
2. Upload toàn bộ folder này lên (kéo thả hoặc dùng GitHub Desktop)

### Bước 2 — Deploy lên Vercel
1. Vào vercel.com → Sign up bằng GitHub account
2. "Add New Project" → chọn repo `shopee-voucher-tool`
3. **Quan trọng:** Trước khi deploy, vào "Environment Variables" và thêm:
   - `SHOPEE_APP_ID` = APP_ID của bạn
   - `SHOPEE_SECRET_KEY` = SECRET_KEY của bạn
4. Bấm Deploy → xong, có URL live ngay

### Bước 3 — Dùng tool
1. Copy URL Vercel vừa tạo (vd: `https://shopee-voucher-tool.vercel.app`)
2. **Đăng URL đó lên Facebook** (group, bài viết, comment)
3. User click từ Facebook → fbclid tự gắn vào → claim được voucher ✅

## Lưu ý quan trọng
- User **phải** vào tool từ link Facebook mới claim được mã
- Nếu gõ URL trực tiếp trên browser thì không có fbclid → không claim được
- SECRET_KEY không bao giờ lộ ra browser — chỉ chạy trên server
