xmox-saas/
├── app/                          # Next.js 应用路由
│   ├── (auth)/                  # 认证相关路由组
│   │   ├── login/               # 登录页面
│   │   ├── register/            # 注册页面
│   │   └── forgot-password/     # 忘记密码页面
│   ├── (dashboard)/             # 后台管理路由组
│   │   ├── admin/               # 管理员页面
│   │   ├── settings/            # 设置页面
│   │   └── analytics/           # 数据分析页面
│   ├── (shop)/                  # 电商相关路由组
│   │   ├── products/            # 产品列表和详情
│   │   ├── cart/                # 购物车
│   │   └── checkout/            # 结账流程
│   ├── (blog)/                  # 博客相关路由组
│   │   ├── posts/               # 博客文章
│   │   └── categories/          # 文章分类
│   ├── (cms)/                   # 内容管理路由组
│   │   ├── pages/               # 页面管理
│   │   └── media/               # 媒体管理
│   └── api/                     # API 路由
│       ├── auth/                # 认证相关 API
│       ├── products/            # 产品相关 API
│       ├── orders/              # 订单相关 API
│       └── blog/                # 博客相关 API
│
├── components/                   # 组件目录
│   ├── ui/                      # UI 基础组件
│   │   ├── button/              # 按钮组件
│   │   ├── input/               # 输入组件
│   │   └── card/                # 卡片组件
│   ├── forms/                   # 表单组件
│   │   ├── login-form/          # 登录表单
│   │   └── register-form/       # 注册表单
│   ├── layout/                  # 布局组件
│   │   ├── header/              # 头部组件
│   │   ├── footer/              # 底部组件
│   │   └── sidebar/             # 侧边栏组件
│   └── features/                # 功能组件
│       ├── product-card/        # 产品卡片
│       └── blog-post/           # 博客文章卡片
│
├── services/                    # 服务层
│   ├── api/                     # API 服务
│   │   ├── auth.ts              # 认证服务
│   │   ├── product.ts           # 产品服务
│   │   └── order.ts             # 订单服务
│   ├── supabase/                # Supabase 服务
│   │   ├── auth.ts              # 认证服务
│   │   ├── db.ts                # 数据库服务
│   │   └── storage.ts           # 存储服务
│   └── external/                # 外部服务集成
│       ├── payment/             # 支付服务
│       ├── email/               # 邮件服务
│       └── sms/                 # 短信服务
│
├── lib/                         # 工具函数和配置
│   ├── api/                     # API 工具
│   │   ├── client.ts            # API 客户端
│   │   ├── error.ts             # 错误处理
│   │   └── validation.ts        # 请求验证
│   ├── utils/                   # 工具函数
│   │   ├── date.ts              # 日期处理
│   │   ├── format.ts            # 格式化
│   │   └── validation.ts        # 验证
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── use-auth.ts          # 认证 Hook
│   │   └── use-cart.ts          # 购物车 Hook
│   └── constants/               # 常量定义
│
├── types/                       # TypeScript 类型
│   ├── api/                     # API 相关类型
│   │   ├── request.ts           # 请求类型
│   │   ├── response.ts          # 响应类型
│   │   └── error.ts             # 错误类型
│   ├── auth.ts                  # 认证相关类型
│   ├── product.ts               # 产品相关类型
│   └── blog.ts                  # 博客相关类型
│
├── middleware/                  # 中间件
│   ├── api/                     # API 中间件
│   │   ├── auth.ts              # 认证中间件
│   │   ├── rate-limit.ts        # 速率限制
│   │   └── validation.ts        # 请求验证
│   └── index.ts                 # 中间件入口
│
├── styles/                      # 样式文件
│   ├── globals.css              # 全局样式
│   └── themes/                  # 主题相关
│
├── config/                      # 配置文件
│   ├── site.ts                  # 站点配置
│   └── navigation.ts            # 导航配置
│
├── public/                      # 静态资源
│   ├── images/                  # 图片资源
│   └── fonts/                   # 字体资源
│
├── tests/                       # 测试文件
│   ├── components/              # 组件测试
│   ├── lib/                     # 工具函数测试
│   └── e2e/                     # 端到端测试
│
├── scripts/                     # 脚本文件
│   ├── setup.ts                 # 项目设置脚本
│   └── seed.ts                  # 数据填充脚本
│
├── .github/                     # GitHub 配置
│   └── workflows/               # GitHub Actions
│
├── middleware.ts                # Next.js 中间件
├── next.config.js              # Next.js 配置
├── tailwind.config.js          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
├── package.json                # 项目依赖
└── README.md                   # 项目文档

结构的主要特点：
扁平化组织：
所有主要目录都在根目录下
更容易理解和导航
功能模块化：
每个功能模块都有清晰的目录结构
相关文件都放在一起
API 组织：
API 路由在 app/api 下
API 服务在 services/api 下
API 相关类型在 types/api 下
组件结构：
UI 组件
表单组件
布局组件
功能组件
服务层：
API 服务
Supabase 服务
外部服务集成
工具和配置：
工具函数
自定义 Hooks
常量定义
配置文件
类型系统：
API 类型
业务类型
通用类型
测试和脚本：
组件测试
工具函数测试
端到端测试
项目脚本
这个结构的优点：
清晰的组织：
每个目录都有明确的职责
易于找到需要的文件
可维护性：
模块化的设计
清晰的依赖关系
可扩展性：
易于添加新功能
易于集成新服务
开发效率：
快速定位文件
清晰的代码组织