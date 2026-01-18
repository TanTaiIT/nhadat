# 🚀 Quick Start - Redux Toolkit & React Query

## ⚡ Bắt Đầu Nhanh (5 phút)

### 1. Khởi động server

```bash
npm run dev
```

### 2. Mở browser

```
http://localhost:3000
```

### 3. Test đăng nhập

1. Click "Đăng ký" ở header
2. Điền form và submit
3. Kiểm tra Redux DevTools (F12 → Redux tab)
4. Kiểm tra React Query DevTools (icon góc dưới)

## 💡 Cách Sử Dụng

### Authentication

```typescript
// Login
import { useLogin } from '@/hooks/queries';

const login = useLogin();
await login.mutateAsync({ email, password });

// Current user
import { useCurrentUser } from '@/hooks/queries';

const { data: user } = useCurrentUser();

// Logout
import { useLogout } from '@/hooks/queries';

const logout = useLogout();
logout.mutate();
```

### Redux State

```typescript
// Get user from Redux
import { useAppSelector } from '@/store';
import { selectUser, selectIsAuthenticated } from '@/store/slices/authSlice';

const user = useAppSelector(selectUser);
const isAuthenticated = useAppSelector(selectIsAuthenticated);
```

### Properties (Template - cần implement API)

```typescript
// List properties
import { useProperties } from '@/hooks/queries';

const { data: properties, isLoading } = useProperties({
  page: 1,
  limit: 10,
});

// Single property
import { useProperty } from '@/hooks/queries';

const { data: property } = useProperty(id);

// Create property
import { useCreateProperty } from '@/hooks/queries';

const createProperty = useCreateProperty();
await createProperty.mutateAsync(data);
```

## 🔍 DevTools

### Redux DevTools

1. Mở F12
2. Chuyển sang tab "Redux"
3. Xem state tree, actions, time-travel debugging

### React Query DevTools

1. Click icon React Query ở góc dưới màn hình
2. Xem queries, mutations, cache
3. Manual refetch, invalidate cache

## 📂 File Structure

```
├── store/
│   ├── index.ts              # Redux store
│   └── slices/
│       └── authSlice.ts      # Auth state
├── hooks/
│   └── queries/
│       ├── useAuth.ts        # Auth hooks
│       └── useProperties.ts  # Property hooks
└── providers/
    └── AppProviders.tsx      # Redux + React Query providers
```

## 🎯 Khi Nào Dùng Gì?

### Redux (Client State)

```typescript
// ✅ Dùng cho state client-side
const theme = useAppSelector(selectTheme);
const isModalOpen = useAppSelector(selectModalOpen);
const currentUser = useAppSelector(selectUser);
```

### React Query (Server State)

```typescript
// ✅ Dùng cho data từ API
const { data } = useProperties();
const { data } = useCurrentUser();
const mutation = useCreateProperty();
```

## 📝 Common Patterns

### Loading State

```typescript
const { data, isLoading } = useQuery(...);

if (isLoading) return <Spinner />;
return <Data data={data} />;
```

### Error Handling

```typescript
const mutation = useMutation({
  mutationFn: apiCall,
  onError: (error) => {
    toast.error(error.message);
  },
});
```

### Invalidate Cache

```typescript
const queryClient = useQueryClient();

// After mutation
queryClient.invalidateQueries({ queryKey: ['properties'] });
```

## 🐛 Common Issues

### "Cannot read property of undefined"

Kiểm tra query đã fetch chưa:

```typescript
const { data: user } = useCurrentUser();

// ❌ Bad
<p>{user.name}</p>

// ✅ Good
<p>{user?.name || 'Loading...'}</p>
```

### Redux state không update

Kiểm tra đã dispatch action:

```typescript
const dispatch = useAppDispatch();
dispatch(setCredentials({ user, accessToken, refreshToken }));
```

### React Query không refetch

```typescript
const { refetch } = useQuery(...);
await refetch();

// Hoặc
queryClient.invalidateQueries({ queryKey: ['data'] });
```

## 📚 Tài Liệu Chi Tiết

- `REDUX_REACT_QUERY_GUIDE.md` - Full guide
- `MIGRATION_COMPLETE.md` - Migration details

## ✅ Checklist

- [ ] Server đang chạy
- [ ] Redux DevTools hoạt động
- [ ] React Query DevTools hoạt động
- [ ] Đăng nhập thành công
- [ ] Redux state update đúng
- [ ] React Query cache data

## 🎉 Done!

Bạn đã sẵn sàng sử dụng Redux Toolkit & React Query!

**Happy coding! 🚀**
