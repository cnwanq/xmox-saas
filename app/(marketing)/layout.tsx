import '../globals.css'

export const metadata = {
  title: 'XMox SaaS - 构建您的下一个 SaaS 项目',
  description: '使用我们的平台快速构建和部署您的 SaaS 应用程序。我们提供完整的解决方案，包括用户认证、支付处理和数据分析。',
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
} 