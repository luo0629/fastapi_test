<div align="center">

# 🚀 AI Challenge Generator

**[![Python](https://img.shields.io/badge/Python-3.12+-blue.svg)](https://python.org)**
**[![FastAPI](https://img.shields.io/badge/FastAPI-0.121+-green.svg)](https://fastapi.tiangolo.com)**
**[![React](https://img.shields.io/badge/React-19.2+-61dafb.svg)](https://react.dev)**
**[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org)**
**[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1+-38b2ac.svg)](https://tailwindcss.com)**

*一个现代化的AI驱动编程挑战生成平台，提供个性化学习体验*

[快速开始](#-快速开始) • [功能特性](#-功能特性) • [技术栈](#-技术栈) • [贡献指南](#-贡献指南)

</div>

---

## 📖 项目简介

**AI Challenge Generator** 是一个创新的全栈Web应用，利用先进的人工智能技术为编程学习者提供个性化的挑战题目。系统支持多种难度级别，具有智能题库管理和用户配额控制功能。

### ✨ 核心价值

- 🎯 **个性化学习** - 根据用户水平智能生成适合的编程挑战
- 📊 **智能评估** - 提供详细的答案解析和学习反馈
- 🔄 **配额管理** - 合理控制每日挑战次数，保证学习质量
- 🎨 **现代体验** - 采用最新的技术栈提供流畅的用户界面

---

## 🌟 功能特性

### 🧠 智能挑战生成
- **AI驱动** - 基于 OpenAI GPT 模型生成高质量编程题目
- **多级难度** - 支持简单、中等、困难三个难度级别
- **丰富题型** - 涵盖多种编程概念和实际应用场景
- **即时生成** - 秒级响应，无需等待

### 👤 用户管理系统
- **安全认证** - 集成 Clerk 提供可靠的用户认证服务
- **配额控制** - 智能管理每日挑战次数，防止过度使用
- **进度追踪** - 记录用户学习历史和成就

### 🎨 现代化界面
- **响应式设计** - 完美适配桌面和移动设备
- **优雅交互** - 流畅的动画和直观的用户体验
- **主题支持** - 支持明暗主题切换

### 📊 实时功能
- **Webhook 集成** - 支持实时数据同步
- **RESTful API** - 标准化的后端接口设计
- **类型安全** - 全栈 TypeScript 支持

---

## 🏗️ 技术栈

### 🔧 后端技术
```
🐍 Python 3.12+
⚡ FastAPI 0.121+     - 现代高性能 Web 框架
🗄️ SQLAlchemy 2.0+    - 强大的 ORM 工具
🤖 OpenAI API         - AI 模型集成
🔐 Clerk Backend      - 用户认证服务
🔔 Svix               - Webhook 服务
🌐 Uvicorn            - ASGI 服务器
📝 Python-dotenv      - 环境变量管理
```

### 🎨 前端技术
```
⚛️ React 19.2+        - 现代化 UI 框架
📘 TypeScript 5.9+    - 类型安全的 JavaScript
🎭 Tailwind CSS 4.1+  - 原子化 CSS 框架
🛣️ React Router 7.9+  - 客户端路由
🔐 Clerk React        - 前端认证组件
⚡ Vite 7.2+          - 现代化构建工具
🎯 ESLint             - 代码质量检查
```

### 🗄️ 数据库
- **SQLite** - 轻量级关系型数据库，适合快速开发和部署

---

## 🚀 快速开始

### 📋 环境要求

- **Python** 3.12 或更高版本
- **Node.js** 18.0 或更高版本
- **npm** 9.0 或更高版本

### ⚙️ 安装步骤

#### 1. 克隆项目
```bash
git clone https://github.com/your-username/ai-challenge-generator.git
cd ai-challenge-generator
```

#### 2. 后端设置
```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 安装依赖
pip install -r ../requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入必要的 API 密钥
```

#### 3. 前端设置
```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 文件，填入 Clerk 相关配置
```

#### 4. 启动应用
```bash
# 启动后端服务 (在 backend 目录)
uvicorn src.app:app --reload --host 0.0.0.0 --port 8000

# 启动前端应用 (在 frontend 目录)
npm run dev
```

### 🌐 访问应用

- **前端应用**: http://localhost:5173
- **后端 API**: http://localhost:8000
- **API 文档**: http://localhost:8000/docs

---

## 📁 项目结构

```
ai-challenge-generator/
├── 📂 backend/                 # 后端代码
│   ├── 📂 src/
│   │   ├── 📄 app.py          # FastAPI 应用入口
│   │   ├── 📂 database/       # 数据库相关
│   │   ├── 📂 routes/         # API 路由
│   │   ├── 📂 utils/          # 工具函数
│   │   └── 📄 .env            # 环境变量配置
│   ├── 📄 pyproject.toml      # Python 项目配置
│   └── 📄 server.py           # 服务器启动文件
├── 📂 frontend/                # 前端代码
│   ├── 📂 src/
│   │   ├── 📂 components/     # React 组件
│   │   ├── 📂 pages/          # 页面组件
│   │   ├── 📂 utils/          # 工具函数
│   │   ├── 📂 auth/           # 认证相关
│   │   └── 📄 App.tsx         # 应用根组件
│   ├── 📄 package.json        # Node.js 项目配置
│   ├── 📄 tailwind.config.js  # Tailwind 配置
│   └── 📄 vite.config.ts      # Vite 构建配置
├── 📄 requirements.txt        # Python 依赖列表
└── 📄 README.md              # 项目说明文档
```

---

## 🔧 开发指南

### 🧪 运行测试

```bash
# 后端测试 (在 backend 目录)
pytest

# 前端测试 (在 frontend 目录)
npm test
```

### 📝 代码规范

项目使用以下工具确保代码质量：

- **ESLint** - JavaScript/TypeScript 代码检查
- **Prettier** - 代码格式化
- **Black** - Python 代码格式化
- **MyPy** - Python 类型检查

### 🚀 部署指南

#### 生产环境部署

```bash
# 构建前端
cd frontend
npm run build

# 启动生产服务器
cd ../backend
uvicorn src.app:app --host 0.0.0.0 --port 8000
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是报告问题、提出建议还是提交代码。

### 📝 提交规范

请遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

```bash
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加或修改测试
chore: 构建过程或辅助工具的变动
```

### 🔄 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: 添加某个很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

感谢以下开源项目和服务：

- [FastAPI](https://fastapi.tiangolo.com) - 现代化的 Python Web 框架
- [React](https://react.dev) - 用户界面构建库
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [Clerk](https://clerk.dev) - 用户认证服务
- [OpenAI](https://openai.com) - AI 模型服务

---

## 📞 联系我们

- **项目主页**: [GitHub Repository](https://github.com/your-username/ai-challenge-generator)
- **问题反馈**: [Issues](https://github.com/your-username/ai-challenge-generator/issues)
- **功能建议**: [Discussions](https://github.com/your-username/ai-challenge-generator/discussions)

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个 Star！**
</div>