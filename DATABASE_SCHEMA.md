# 🗄️ DATABASE SCHEMA - GROUPNHADAT.VN

## Tổng quan
Database được thiết kế cho website bất động sản **groupnhadat.vn** sử dụng **MongoDB với Mongoose**.

---

## 📋 DANH SÁCH COLLECTIONS

### 1. **Users** (Người dùng)
Quản lý thông tin người dùng, bao gồm user thường, agent/môi giới, và admin.

**Các trường chính:**
- Thông tin cơ bản: `name`, `email`, `password`, `phone`, `zaloNumber`, `avatar`
- Địa chỉ: `address` (street, ward, district, city)
- Vai trò: `role` (user, agent, admin)
- Thông tin Agent: `agentInfo` (companyName, businessLicense, specializations, serviceAreas)
- Xác thực: `verification` (email, phone, identity verification)
- Thống kê: `statistics` (totalProperties, totalViews, rating, successfulDeals)
- Trạng thái: `isActive`, `isVerified`, `lastLoginAt`

**Virtual Fields:**
- `properties`: Danh sách BĐS của user
- `favorites`: Danh sách yêu thích
- `subscriptions`: Danh sách gói đã đăng ký

---

### 2. **Properties** (Bất động sản)
Quản lý thông tin tin đăng bất động sản.

**Các trường chính:**
- Thông tin cơ bản: `title`, `description`, `price`, `area`
- Địa chỉ: `address` (street, ward, district, city, coordinates)
- Phân loại: `type` (apartment, house, land, villa, office, commercial, room)
- Loại giao dịch: `listingType` (sale, rent)
- Trạng thái: `status` (available, sold, rented, pending, expired)
- Giá: `priceNegotiable` (thoả thuận hay không)
- Hướng nhà: `direction` (east, west, south, north, northeast, northwest, southeast, southwest)
- Đặc điểm: `features` (bedrooms, bathrooms, floors, furniture, parking, balcony, elevator, frontWidth)
- Media: `images[]`, `videoUrl`
- Liên hệ: `contactInfo` (phoneNumber, zaloNumber, showPhoneNumber)
- Người đăng: `owner` (ref User)
- Thống kê: `views`
- Ưu tiên: `priority` (0-10), `expiresAt`, `isVerified`

**Indexes:**
- Text search: `title`, `description`
- Location: `address.city`, `address.district`
- Filter: `type`, `status`, `listingType`, `price`, `area`, `direction`, `features.bedrooms`
- Display: `priority`, `createdAt`

---

### 3. **Favorites** (Yêu thích)
Lưu danh sách BĐS yêu thích của người dùng.

**Các trường chính:**
- `user` (ref User)
- `property` (ref Property)
- `createdAt`

**Unique Index:** `user + property` (đảm bảo không trùng lặp)

---

### 4. **ViewHistory** (Lịch sử xem)
Theo dõi lịch sử xem tin đăng (có thể là user đã login hoặc guest).

**Các trường chính:**
- `user` (ref User - optional)
- `property` (ref Property)
- `sessionId` (cho guest users)
- `ipAddress`, `userAgent`
- `viewDuration` (thời gian xem - giây)
- `createdAt`

**TTL Index:** Tự động xóa sau 90 ngày

---

### 5. **Contact** (Liên hệ)
Lưu thông tin liên hệ giữa người mua và người bán.

**Các trường chính:**
- `property` (ref Property)
- `buyer` (ref User)
- `seller` (ref User)
- `contactType` (phone, zalo, message, email)
- `message`, `phoneNumber`
- `status` (pending, contacted, interested, not_interested)
- `notes`

---

### 6. **Report** (Báo cáo)
Quản lý báo cáo vi phạm tin đăng.

**Các trường chính:**
- `property` (ref Property)
- `reporter` (ref User)
- `reason`, `reasonType` (spam, fraud, inappropriate, duplicate, sold, wrong_info, other)
- `description`
- `status` (pending, reviewing, resolved, rejected)
- `reviewedBy` (ref User - admin)
- `reviewNotes`, `resolvedAt`

---

### 7. **Package** (Gói dịch vụ)
Định nghĩa các gói dịch vụ đăng tin.

**Các trường chính:**
- `name`, `description`
- `price`, `duration` (số ngày)
- `features`:
  - `maxProperties`: Số tin tối đa
  - `priorityLevel`: Mức độ ưu tiên (0-10)
  - `featuredListing`: Tin nổi bật
  - `hotListing`: Tin hot
  - `autoRenewal`: Tự động gia hạn
  - `highlightColor`, `badge`
  - `showOnTop`: Hiển thị đầu
  - `socialMediaSharing`, `analyticsAccess`
- `isActive`, `displayOrder`

**Ví dụ gói:**
- **Gói Miễn phí**: 0đ, 7 ngày, 1 tin
- **Gói Cơ bản**: 100k, 30 ngày, 5 tin, priority 3
- **Gói Vàng**: 300k, 30 ngày, 20 tin, priority 7, nổi bật
- **Gói Kim cương**: 1000k, 30 ngày, 100 tin, priority 10, hot

---

### 8. **Subscription** (Đăng ký gói)
Quản lý việc người dùng đăng ký gói dịch vụ.

**Các trường chính:**
- `user` (ref User)
- `package` (ref Package)
- `startDate`, `endDate`
- `status` (active, expired, cancelled, pending)
- `paymentStatus` (pending, paid, failed, refunded)
- `paymentMethod`, `transactionId`
- `amount`
- `propertiesUsed`, `propertiesLimit`
- `autoRenew`
- `cancelledAt`, `cancelReason`

---

### 9. **SavedSearch** (Lưu tìm kiếm)
Lưu các bộ lọc tìm kiếm của người dùng.

**Các trường chính:**
- `user` (ref User)
- `name` (tên bộ lọc)
- `searchCriteria`:
  - `listingType`, `type[]`
  - `priceMin`, `priceMax`
  - `areaMin`, `areaMax`
  - `city`, `district`, `ward`
  - `bedrooms`, `bathrooms`
  - `direction[]`, `furniture`
  - `keywords`
- `notificationEnabled` (nhận thông báo khi có tin mới)
- `lastNotifiedAt`
- `searchCount` (số lần sử dụng)

---

### 10. **Notification** (Thông báo)
Quản lý thông báo cho người dùng.

**Các trường chính:**
- `user` (ref User)
- `type` (property, contact, subscription, system, message, favorite, price_change)
- `title`, `message`
- `relatedProperty` (ref Property)
- `relatedUser` (ref User)
- `link`, `icon`
- `isRead`, `readAt`
- `priority` (low, normal, high, urgent)

**TTL Index:** Tự động xóa sau 30 ngày

---

## 🔗 QUAN HỆ GIỮA CÁC COLLECTIONS

```
User (1) ─── (N) Properties
  │
  ├─── (N) Favorites ─── (1) Property
  │
  ├─── (N) ViewHistory ─── (1) Property
  │
  ├─── (N) Contact
  │     ├─── (1) Property
  │     └─── (1) User (seller)
  │
  ├─── (N) Report ─── (1) Property
  │
  ├─── (N) Subscription ─── (1) Package
  │
  ├─── (N) SavedSearch
  │
  └─── (N) Notification
        ├─── (1) Property (optional)
        └─── (1) User (optional)
```

---

## 📊 INDEXES & PERFORMANCE

### Indexes quan trọng đã được tạo:

**Properties:**
- Text search: `title`, `description`
- Geo: `address.city`, `address.district`
- Filter: `type + status + listingType`, `price`, `area`, `direction`, `bedrooms`
- Sort: `priority + createdAt`, `createdAt`

**Users:**
- `email` (unique)
- `role + isActive`
- `address.city + district`
- `verification.isIdentityVerified`
- `statistics.rating`

**Favorites:**
- `user + property` (unique)
- `user + createdAt`

**ViewHistory:**
- `user + createdAt`
- `property + createdAt`
- `sessionId + property`
- TTL: `createdAt` (90 days)

**Contact:**
- `property + createdAt`
- `buyer + createdAt`
- `seller + status + createdAt`

**Report:**
- `property + status`
- `reporter + createdAt`
- `status + createdAt`

**Subscription:**
- `user + status + endDate`
- `status + endDate`
- `transactionId` (unique)

**Notification:**
- `user + isRead + createdAt`
- `user + type + createdAt`
- TTL: `createdAt` (30 days)

---

## 🚀 CÁC TÍNH NĂNG ĐƯỢC HỖ TRỢ

### ✅ Tính năng chính:
1. **Đăng tin mua/bán/cho thuê BĐS**
2. **Tìm kiếm & lọc nâng cao** (giá, diện tích, vị trí, hướng, số phòng)
3. **Lưu tin yêu thích**
4. **Lịch sử xem tin**
5. **Liên hệ người bán** (Phone, Zalo)
6. **Báo cáo tin vi phạm**
7. **Gói dịch vụ đăng tin**
8. **Thanh toán & quản lý subscription**
9. **Lưu bộ lọc tìm kiếm**
10. **Thông báo realtime**
11. **Xác thực người dùng** (Email, Phone, Identity)
12. **Thống kê & Analytics** (views, contacts, deals)
13. **Phân quyền User/Agent/Admin**
14. **Tin nổi bật/ưu tiên**
15. **Video & Multiple images**

---

## 📝 GHI CHÚ QUAN TRỌNG

### 1. **TTL (Time To Live):**
- **ViewHistory**: Tự động xóa sau 90 ngày
- **Notification**: Tự động xóa sau 30 ngày

### 2. **Virtual Fields:**
- User có virtual fields: `properties`, `favorites`, `subscriptions`
- Cần sử dụng `.populate()` để lấy dữ liệu

### 3. **Soft Delete:**
- Sử dụng `isActive` flag thay vì xóa thật
- Properties có `expiresAt` để tự động hết hạn

### 4. **Security:**
- Password được hash bằng bcrypt
- User model không trả về password mặc định (`select: false`)
- JWT tokens cho authentication

### 5. **Performance:**
- Đã tối ưu indexes cho các query phổ biến
- Text search cho title & description
- Geospatial queries ready (coordinates)

---

## 🔧 NEXT STEPS

### Các bước triển khai tiếp theo:

1. **Tạo Types/Interfaces** cho TypeScript
2. **Tạo Controllers** cho từng model
3. **Tạo Routes** cho API endpoints
4. **Tạo Validation Schemas** (Yup)
5. **Implement Authentication & Authorization**
6. **Tạo Services** cho business logic
7. **Setup Payment Gateway** (VNPay, Momo)
8. **Implement File Upload** (Cloudinary)
9. **Setup Real-time Notifications** (Socket.io)
10. **Create Admin Dashboard**

---

## 📞 SUPPORT

Nếu có thắc mắc về database schema, hãy liên hệ team phát triển.

**Version:** 1.0.0  
**Last Updated:** 2026-01-19  
**Database:** MongoDB with Mongoose
