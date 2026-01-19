# 🎨 DATABASE ERD - GROUPNHADAT.VN

## Entity Relationship Diagram (Text-based)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USERS                                       │
├─────────────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (PK)                                                       │
│ name: String                                                             │
│ email: String (Unique)                                                   │
│ password: String (Hashed)                                                │
│ phone: String                                                            │
│ zaloNumber: String                                                       │
│ avatar: String                                                           │
│ address: {street, ward, district, city}                                 │
│ bio: String                                                              │
│ role: Enum (user, agent, admin)                                         │
│ agentInfo: {companyName, businessLicense, specializations, ...}         │
│ verification: {isEmailVerified, isPhoneVerified, ...}                   │
│ statistics: {totalProperties, totalViews, rating, ...}                  │
│ isActive: Boolean                                                        │
│ isVerified: Boolean                                                      │
│ lastLoginAt: Date                                                        │
│ createdAt: Date                                                          │
│ updatedAt: Date                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1:N
                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           PROPERTIES                                     │
├─────────────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (PK)                                                       │
│ title: String                                                            │
│ description: String                                                      │
│ price: Number                                                            │
│ priceNegotiable: Boolean                                                 │
│ area: Number                                                             │
│ address: {street, ward, district, city, coordinates}                    │
│ type: Enum (apartment, house, land, villa, office, ...)                 │
│ listingType: Enum (sale, rent)                                          │
│ status: Enum (available, sold, rented, pending, expired)                │
│ direction: Enum (east, west, south, north, ...)                         │
│ features: {bedrooms, bathrooms, floors, furniture, frontWidth, ...}     │
│ images: String[]                                                         │
│ videoUrl: String                                                         │
│ contactInfo: {phoneNumber, zaloNumber, showPhoneNumber}                 │
│ owner: ObjectId (FK → Users)                                            │
│ views: Number                                                            │
│ priority: Number (0-10)                                                  │
│ expiresAt: Date                                                          │
│ verifiedBy: ObjectId (FK → Users)                                       │
│ isVerified: Boolean                                                      │
│ isActive: Boolean                                                        │
│ createdAt: Date                                                          │
│ updatedAt: Date                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┬──────────────┬──────────────┐
    │               │               │              │              │
    │ N:1           │ N:1           │ N:1          │ N:1          │ N:1
    ▼               ▼               ▼              ▼              ▼
┌─────────┐   ┌─────────────┐  ┌─────────┐  ┌──────────┐  ┌──────────────┐
│FAVORITES│   │VIEW_HISTORY │  │CONTACTS │  │ REPORTS  │  │NOTIFICATIONS │
├─────────┤   ├─────────────┤  ├─────────┤  ├──────────┤  ├──────────────┤
│_id      │   │_id          │  │_id      │  │_id       │  │_id           │
│user (FK)│   │user (FK)    │  │property │  │property  │  │user (FK)     │
│property │   │property (FK)│  │buyer(FK)│  │reporter  │  │type          │
│createdAt│   │sessionId    │  │seller   │  │reason    │  │title         │
└─────────┘   │ipAddress    │  │type     │  │status    │  │message       │
              │userAgent    │  │message  │  │reviewedBy│  │relatedProp   │
              │viewDuration │  │status   │  │resolvedAt│  │relatedUser   │
              │createdAt    │  │createdAt│  │createdAt │  │isRead        │
              └─────────────┘  └─────────┘  └──────────┘  │priority      │
                                                           │createdAt     │
                                                           └──────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                            PACKAGES                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (PK)                                                       │
│ name: String                                                             │
│ description: String                                                      │
│ price: Number                                                            │
│ duration: Number (days)                                                  │
│ features: {                                                              │
│   maxProperties: Number                                                  │
│   priorityLevel: Number                                                  │
│   featuredListing: Boolean                                               │
│   hotListing: Boolean                                                    │
│   autoRenewal: Boolean                                                   │
│   highlightColor: String                                                 │
│   badge: String                                                          │
│   showOnTop: Boolean                                                     │
│   socialMediaSharing: Boolean                                            │
│   analyticsAccess: Boolean                                               │
│ }                                                                        │
│ isActive: Boolean                                                        │
│ displayOrder: Number                                                     │
│ createdAt: Date                                                          │
│ updatedAt: Date                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1:N
                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUBSCRIPTIONS                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (PK)                                                       │
│ user: ObjectId (FK → Users)                                             │
│ package: ObjectId (FK → Packages)                                       │
│ startDate: Date                                                          │
│ endDate: Date                                                            │
│ status: Enum (active, expired, cancelled, pending)                      │
│ paymentStatus: Enum (pending, paid, failed, refunded)                   │
│ paymentMethod: String                                                    │
│ transactionId: String                                                    │
│ amount: Number                                                           │
│ propertiesUsed: Number                                                   │
│ propertiesLimit: Number                                                  │
│ autoRenew: Boolean                                                       │
│ cancelledAt: Date                                                        │
│ cancelReason: String                                                     │
│ notes: String                                                            │
│ createdAt: Date                                                          │
│ updatedAt: Date                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         SAVED_SEARCHES                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (PK)                                                       │
│ user: ObjectId (FK → Users)                                             │
│ name: String                                                             │
│ searchCriteria: {                                                        │
│   listingType: Enum (sale, rent)                                        │
│   type: String[]                                                         │
│   priceMin: Number                                                       │
│   priceMax: Number                                                       │
│   areaMin: Number                                                        │
│   areaMax: Number                                                        │
│   city: String                                                           │
│   district: String                                                       │
│   ward: String                                                           │
│   bedrooms: Number                                                       │
│   bathrooms: Number                                                      │
│   direction: String[]                                                    │
│   furniture: String                                                      │
│   keywords: String                                                       │
│ }                                                                        │
│ notificationEnabled: Boolean                                             │
│ lastNotifiedAt: Date                                                     │
│ searchCount: Number                                                      │
│ createdAt: Date                                                          │
│ updatedAt: Date                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 RELATIONSHIPS SUMMARY

### **Users → Properties** (1:N)
- Một user có thể đăng nhiều properties
- Mỗi property thuộc về một user (owner)

### **Users → Favorites** (1:N)
- Một user có thể lưu nhiều properties yêu thích
- Mỗi favorite link 1 user với 1 property

### **Users → ViewHistory** (1:N)
- Một user có thể xem nhiều properties
- Track lịch sử xem cho analytics

### **Properties → ViewHistory** (1:N)
- Mỗi property có thể được xem nhiều lần
- Dùng để đếm views

### **Users ↔ Contact ↔ Properties** (N:N through Contact)
- Buyers liên hệ với Sellers về Properties
- Lưu trữ tất cả interactions

### **Users → Reports** (1:N)
- User có thể báo cáo nhiều properties vi phạm
- Admin review và xử lý

### **Packages → Subscriptions** (1:N)
- Một package có thể được mua nhiều lần
- Subscription track việc user mua gói

### **Users → Subscriptions** (1:N)
- User có thể mua nhiều subscriptions
- Track payment và usage

### **Users → SavedSearches** (1:N)
- User lưu các bộ lọc tìm kiếm
- Nhận notification khi có tin mới match

### **Users → Notifications** (1:N)
- User nhận nhiều notifications
- Link đến Property hoặc User khác

---

## 📊 COLLECTION SIZES (Estimated)

| Collection | Estimated Size | Growth Rate |
|-----------|---------------|-------------|
| Users | ~10,000 | Medium |
| Properties | ~100,000 | High |
| Favorites | ~50,000 | High |
| ViewHistory | ~1,000,000 | Very High (TTL 90d) |
| Contact | ~20,000 | Medium |
| Report | ~1,000 | Low |
| Packages | ~10 | Very Low |
| Subscriptions | ~5,000 | Medium |
| SavedSearches | ~15,000 | Medium |
| Notifications | ~200,000 | High (TTL 30d) |

---

## 🎯 KEY INDEXES

### High-Priority Indexes (Must Have):
```
Users:
  - email (unique)
  - role + isActive
  - statistics.rating

Properties:
  - owner + isActive
  - type + status + listingType
  - priority + createdAt (DESC)
  - address.city + address.district
  - price, area, direction, features.bedrooms
  - (title, description) text search

Favorites:
  - user + property (unique)
  - user + createdAt (DESC)

ViewHistory:
  - property + createdAt (DESC)
  - user + createdAt (DESC)

Subscriptions:
  - user + status + endDate
  - status + endDate (for cron jobs)

Notifications:
  - user + isRead + createdAt (DESC)
```

---

## 💡 DESIGN DECISIONS

### 1. **Embedded vs Referenced Documents**
- **Embedded**: `address`, `features`, `contactInfo` (không cần query riêng)
- **Referenced**: `owner`, `package`, `relatedProperty` (cần populate)

### 2. **Denormalization**
- User statistics được lưu trong User model để query nhanh
- Trade-off: Cần update khi có thay đổi

### 3. **Soft Delete**
- Sử dụng `isActive` flag
- Không xóa data thật để giữ lịch sử

### 4. **TTL Collections**
- ViewHistory: 90 days
- Notifications: 30 days
- Giảm storage cost, tăng performance

### 5. **Text Search**
- MongoDB text index cho Properties
- Hỗ trợ tìm kiếm tiếng Việt có dấu

### 6. **Geospatial Ready**
- `coordinates` sẵn sàng cho 2dsphere index
- Có thể implement "Tìm BĐS gần tôi"

---

## 🚨 IMPORTANT NOTES

1. **Always use indexes** cho queries thường xuyên
2. **Monitor slow queries** bằng MongoDB Atlas/Profiler
3. **Use aggregation pipeline** cho complex queries
4. **Implement caching** (Redis) cho hot data
5. **Paginate results** để tránh load toàn bộ data
6. **Validate data** ở application layer (Yup schemas)
7. **Use transactions** cho operations liên quan nhiều collections
8. **Backup regularly** - MongoDB Atlas Backup hoặc mongodump
9. **Monitor disk space** - Đặc biệt cho ViewHistory & Notifications
10. **Plan for scaling** - Sharding cho Properties collection

---

## 📈 SCALABILITY CONSIDERATIONS

### Horizontal Scaling (Sharding):
```
Properties: Shard by address.city (geographic distribution)
ViewHistory: Shard by property (distribute load)
Notifications: Shard by user (distribute user activity)
```

### Vertical Scaling:
- Tăng RAM cho indexes
- Tăng IOPS cho disk
- Use SSD for better performance

### Read Replicas:
- Analytics queries → Read Replica
- User-facing queries → Primary
- Reduce load on primary

---

**Last Updated:** 2026-01-19  
**Version:** 1.0.0
