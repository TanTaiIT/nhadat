import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập / Đăng ký - Nhà Đất',
  description: 'Đăng nhập hoặc tạo tài khoản mới để bắt đầu mua bán, cho thuê bất động sản',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
