# Redux Toolkit & React Query - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Dự án đã được tích hợp với:
- **Redux Toolkit** - Quản lý client state (auth, UI state, etc.)
- **TanStack Query (React Query)** - Quản lý server state (API data, caching, etc.)

## 📦 Dependencies Đã Cài

```json
{
  "@reduxjs/toolkit": "latest",
  "react-redux": "latest",
  "@tanstack/react-query": "latest",
  "@tanstack/react-query-devtools": "latest"
}
```

## 🏗️ Cấu Trúc

```
├── store/
│   ├── index.ts                 # Redux store config
│   └── slices/
│       └── authSlice.ts         # Auth state slice
├── hooks/
│   └── queries/
│       ├── useAuth.ts           # Auth query hooks
│       ├── useProperties.ts     # Properties query hooks
│       └── index.ts
├── providers/
│   ├── ReduxProvider.tsx        # Redux Provider
│   ├── ReactQueryProvider.tsx  # React Query Provider
│   ├── AppProviders.tsx         # Combined Providers
│   └── index.ts
└── lib/
    └── queryClient.ts           # React Query config
```

## 📚 Redux Toolkit

### 1. Store Setup

**File: `store/index.ts`**

```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 2. Auth Slice

**File: `store/slices/authSlice.ts`**

```typescript
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});
```

### 3. Sử Dụng Redux

```typescript
import { useAppSelector, useAppDispatch } from '@/store';
import { selectUser, selectIsAuthenticated, logout } from '@/store/slices/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

## 🔄 React Query

### 1. Query Client Setup

**File: `lib/queryClient.ts`**

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 2. Query Hooks - Auth

**File: `hooks/queries/useAuth.ts`**

#### useLogin

```typescript
import { useLogin } from '@/hooks/queries';

function LoginForm() {
  const login = useLogin();

  const handleSubmit = async (credentials) => {
    try {
      await login.mutateAsync(credentials);
      // Success - auto redirects
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={login.isPending}>
        {login.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
      {login.error && <p>{login.error.message}</p>}
    </form>
  );
}
```

#### useRegister

```typescript
import { useRegister } from '@/hooks/queries';

function RegisterForm() {
  const register = useRegister();

  const handleSubmit = async (data) => {
    await register.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={register.isPending}>Đăng ký</button>
    </form>
  );
}
```

#### useLogout

```typescript
import { useLogout } from '@/hooks/queries';

function Header() {
  const logout = useLogout();

  return (
    <button onClick={() => logout.mutate()}>
      {logout.isPending ? 'Đang đăng xuất...' : 'Đăng xuất'}
    </button>
  );
}
```

#### useCurrentUser

```typescript
import { useCurrentUser } from '@/hooks/queries';

function Profile() {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

### 3. Query Hooks - Properties

**File: `hooks/queries/useProperties.ts`**

#### useProperties (List)

```typescript
import { useProperties } from '@/hooks/queries';

function PropertyList() {
  const { data: properties, isLoading } = useProperties({
    page: 1,
    limit: 10,
    type: 'apartment',
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {properties?.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

#### useProperty (Single)

```typescript
import { useProperty } from '@/hooks/queries';

function PropertyDetail({ id }: { id: string }) {
  const { data: property, isLoading } = useProperty(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{property?.title}</h1>
      <p>{property?.description}</p>
    </div>
  );
}
```

#### useCreateProperty

```typescript
import { useCreateProperty } from '@/hooks/queries';

function CreatePropertyForm() {
  const createProperty = useCreateProperty();

  const handleSubmit = async (data) => {
    await createProperty.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={createProperty.isPending}>
        Tạo tin đăng
      </button>
    </form>
  );
}
```

#### useUpdateProperty

```typescript
import { useUpdateProperty } from '@/hooks/queries';

function EditPropertyForm({ id, initialData }) {
  const updateProperty = useUpdateProperty();

  const handleSubmit = async (data) => {
    await updateProperty.mutateAsync({ id, data });
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

#### useDeleteProperty

```typescript
import { useDeleteProperty } from '@/hooks/queries';

function PropertyActions({ id }) {
  const deleteProperty = useDeleteProperty();

  const handleDelete = async () => {
    if (confirm('Xóa tin đăng?')) {
      await deleteProperty.mutateAsync(id);
    }
  };

  return (
    <button onClick={handleDelete} disabled={deleteProperty.isPending}>
      Xóa
    </button>
  );
}
```

## 🎨 Best Practices

### 1. Query Keys

Sử dụng query keys có cấu trúc:

```typescript
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id) => [...propertyKeys.details(), id] as const,
};
```

### 2. Mutations với Optimistic Updates

```typescript
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePropertyAPI,
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: propertyKeys.detail(newData.id) });
      
      // Snapshot current value
      const previous = queryClient.getQueryData(propertyKeys.detail(newData.id));
      
      // Optimistically update
      queryClient.setQueryData(propertyKeys.detail(newData.id), newData);
      
      return { previous };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(
        propertyKeys.detail(newData.id),
        context?.previous
      );
    },
    onSettled: (data, error, variables) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.id) });
    },
  });
}
```

### 3. Loading States

```typescript
function MyComponent() {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <Error message={error.message} />;
  
  return (
    <div>
      {isFetching && <LoadingSpinner />}
      <Data data={data} />
    </div>
  );
}
```

### 4. Error Handling

```typescript
const mutation = useMutation({
  mutationFn: apiCall,
  onError: (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      router.push('/login');
    } else {
      // Show error toast
      toast.error(error.message);
    }
  },
});
```

## 🔧 DevTools

### Redux DevTools

Redux Toolkit tự động enable Redux DevTools trong development mode.

Mở browser DevTools → Redux tab để:
- Xem state tree
- Time-travel debugging
- Track actions

### React Query DevTools

React Query DevTools được thêm tự động:

```typescript
<ReactQueryDevtools initialIsOpen={false} />
```

Nhấn React Query icon ở góc dưới màn hình để:
- Xem queries và mutations
- Inspect cache
- Manually trigger refetch
- See query status

## 📊 State Management Strategy

### Redux (Client State)
Dùng cho:
- ✅ Auth state (user, tokens)
- ✅ UI state (modals, sidebars)
- ✅ App settings
- ✅ Form state (nếu phức tạp)

### React Query (Server State)
Dùng cho:
- ✅ API data (properties, users, etc.)
- ✅ Caching
- ✅ Background refetching
- ✅ Pagination
- ✅ Infinite scroll
- ✅ Optimistic updates

## 🚀 Migration từ Context API

### Trước (Context)

```typescript
import { useAuth } from '@/contexts/AuthContext';

function Component() {
  const { user, login, logout, isLoading } = useAuth();
  
  return <div>{user?.name}</div>;
}
```

### Sau (Redux + React Query)

```typescript
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/slices/authSlice';
import { useLogin, useLogout } from '@/hooks/queries';

function Component() {
  const user = useAppSelector(selectUser);
  const login = useLogin();
  const logout = useLogout();
  
  return <div>{user?.name}</div>;
}
```

## ✅ Checklist

- [x] Redux Toolkit cài đặt
- [x] React Query cài đặt
- [x] Store setup
- [x] Auth slice
- [x] Query hooks (auth, properties)
- [x] Providers setup
- [x] Components migrated
- [x] DevTools enabled

## 📖 Tài Liệu Tham Khảo

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)

## 🎉 Hoàn Thành!

Dự án đã sẵn sàng với Redux Toolkit và React Query!

**Khởi động dev server:**

```bash
npm run dev
```

Truy cập: http://localhost:3000
