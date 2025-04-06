'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Shield, 
  Smartphone, 
  RefreshCw, 
  FileText, 
  Menu, 
  X, 
  Home,
  LogOut
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: '仪表盘', href: '/admin', icon: Home },
    { name: '用户管理', href: '/admin/users', icon: Users },
    { name: '角色管理', href: '/admin/roles', icon: Shield },
    { name: '设备管理', href: '/admin/devices', icon: Smartphone },
    { name: '数据同步', href: '/admin/sync', icon: RefreshCw },
    { name: '日志管理', href: '/admin/logs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 侧边栏 */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="text-xl font-bold text-gray-800 dark:text-white">
            XMox SaaS
          </Link>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-5 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            退出管理
          </Link>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* 顶部导航栏 */}
        <div className="sticky top-0 z-10 flex h-16 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex items-center">
              <button
                className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
                {navigation.find((item) => item.href === pathname)?.name || '管理后台'}
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">管理员</span>
            </div>
          </div>
        </div>

        {/* 页面内容 */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 