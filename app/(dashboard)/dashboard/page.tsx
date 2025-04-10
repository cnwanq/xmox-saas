import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">欢迎回来</h1>
      <p className="mt-1 text-sm text-gray-500">
        您已登录为 {user?.email}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* 这里可以添加仪表板卡片 */}
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">总用户数</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">活跃用户</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">本月收入</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">¥0</dd>
        </div>
      </div>
    </div>
  )
} 