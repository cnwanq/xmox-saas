xmox-saas/
├── app/                           # Next.js 13+ App Router
│   ├── (auth)/                   # 认证相关路由组
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/              # 后台管理路由组
│   │   ├── admin/               # 管理员后台
│   │   ├── merchant/            # 商家后台
│   │   └── settings/            # 系统设置
│   ├── (shop)/                  # 电商相关路由组
│   │   ├── products/
│   │   ├── categories/
│   │   ├── orders/
│   │   └── cart/
│   ├── (blog)/                  # 博客相关路由组
│   │   ├── posts/
│   │   ├── categories/
│   │   └── tags/
│   ├── (cms)/                   # 内容管理路由组
│   │   ├── pages/
│   │   ├── media/
│   │   └── menus/
│   └── api/                     # API 路由
├── components/                   # 共享组件
│   ├── ui/                      # UI 基础组件
│   ├── forms/                   # 表单组件
│   ├── layouts/                 # 布局组件
│   └── features/                # 功能组件
├── lib/                         # 工具库
│   ├── api/                     # API 客户端
│   ├── auth/                    # 认证相关
│   ├── db/                      # 数据库相关
│   ├── utils/                   # 工具函数
│   └── constants/               # 常量定义
├── hooks/                       # 自定义 Hooks
├── styles/                      # 样式文件
├── types/                       # TypeScript 类型定义
├── public/                      # 静态资源
├── prisma/                      # Prisma 数据库模型
│   └── schema.prisma
├── config/                      # 配置文件
├── middleware.ts                # Next.js 中间件
└── package.json                 # 项目依赖

主要部分：
路由组织：
使用 Next.js 13+ 的 App Router 和路由组功能
按功能模块分组，使用括号 () 创建路由组
每个主要功能模块都有独立的路由空间
组件结构：
components/ui：基础 UI 组件
components/forms：表单相关组件
components/layouts：布局组件
components/features：特定功能的组件
功能模块：
认证系统：登录、注册、密码重置等
后台管理：管理员和商家后台
电商系统：产品、分类、订单、购物车
博客系统：文章、分类、标签
内容管理：页面、媒体、菜单
工具和配置：
lib 目录包含各种工具函数和服务
hooks 存放可复用的 React Hooks
types 存放 TypeScript 类型定义
prisma 用于数据库模型定义
建议的技术栈：
前端：
Next.js 14
React
TypeScript
Tailwind CSS
Shadcn/ui（UI 组件库）
React Query（数据获取）
Zustand（状态管理）
后端：
Next.js API Routes
Prisma（ORM）
PostgreSQL（数据库）
NextAuth.js（认证）
部署和工具：
Vercel（部署）
GitHub Actions（CI/CD）
Docker（容器化）