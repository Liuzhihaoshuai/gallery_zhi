# Gallery Zhi - 艺术作品展示网站

这是一个基于 React + TypeScript + Vite 构建的现代艺术作品展示网站，支持项目轮播、时间线展示等功能。

## 技术栈

- React 19 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式
- Framer Motion 动画

## Docker 部署

```bash
# 克隆项目
git clone <your-repo-url>
cd gallery_zhi

# 构建并启动容器
docker build -t gallery-zhi .
docker run -d -p 3000:80 --name gallery-zhi-app gallery-zhi
```

访问 `http://localhost:3000` 查看网站。

## 本地开发

如果你想在本地开发环境运行：

```bash
# 安装依赖（推荐使用 pnpm）
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── ArtworkGrid.tsx  # 作品网格展示
│   ├── Header.tsx       # 页面头部
│   ├── ModernCarousel.tsx # 现代化轮播图
│   ├── ProjectCard.tsx  # 项目卡片
│   ├── ProjectCarousel.tsx # 项目轮播
│   ├── ProjectGallery.tsx # 项目画廊
│   └── Timeline.tsx     # 时间线组件
├── data/                # 数据文件
│   ├── artworks.ts      # 艺术作品数据
│   └── projects.ts      # 项目数据
├── pages/               # 页面组件
│   └── Home.tsx         # 首页（单页面应用）
└── types/               # 类型定义
    └── index.ts
```

## 环境要求

- Node.js >= 18
- pnpm >= 8 (推荐)
- Docker >= 20 (用于容器化部署)

## 浏览器支持

- Chrome >= 88
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## License

MIT License