# 项目名称

NAVI Analytics

## 项目简介

NAVI Analytics 是一个基于 React 和 TypeScript 的 Web 应用程序，旨在为用户提供数字资产的健康因子模拟和分析工具。通过输入供应和借款的资产信息，用户可以模拟不同时间范围内（1天、3天、7天）的健康因子变化，评估投资组合的风险水平。

## 功能特性

- **健康因子模拟**：基于蒙特卡洛模拟，计算不同时间范围内的健康因子分布。
- **资产输入表格**：用户可以输入供应和借款资产的数量，实时计算总价值和健康因子。
- **可视化图表**：以直观的图表形式展示健康因子的概率分布，帮助用户理解风险。
- **国际化支持**：提供中文和英文两种语言，用户可自由切换。
- **科技未来风格的界面设计**：采用深色主题和霓虹色彩，界面美观且富有科技感。

## 技术栈

- **前端框架**：React、TypeScript
- **状态管理**：React Hooks
- **样式**：Tailwind CSS
- **图表库**：Chart.js、react-chartjs-2
- **国际化**：react-i18next
- **数据请求**：Axios

## 目录结构

```
├── src
│   ├── assets
│   │   ├── asset_changes.json      // 资产价格变动数据
│   │   ├── ltvData.json            // 资产 LTV 数据
│   │   └── liquidationThresholdData.json  // 资产清算阈值数据
│   ├── components
│   │   ├── Navbar.tsx              // 导航栏组件
│   │   ├── Home.tsx                // 首页组件
│   │   ├── SupplyAssetTable.tsx    // 供应资产表格组件
│   │   ├── BorrowAssetTable.tsx    // 借款资产表格组件
│   │   └── HealthFactorSimulation.tsx // 健康因子模拟组件
│   ├── pages
│   │   ├── Tool1Page.tsx           // 工具一页面
│   │   └── ...                     // 其他页面
│   ├── types
│   │   └── index.ts                // TypeScript 类型定义
│   ├── App.tsx                     // 应用主入口
│   └── index.tsx                   // 渲染入口
├── public
│   ├── locales
│   │   ├── en                      // 英文翻译文件
│   │   └── zh                      // 中文翻译文件
│   └── index.html                  // HTML 模板
├── tailwind.config.js              // Tailwind CSS 配置
├── package.json                    // 项目依赖和脚本
└── README.md                       // 项目说明文件
```

## 安装与运行

### 环境要求

- Node.js (建议版本 14 及以上)
- npm 或 yarn 包管理器

### 克隆项目

```bash
git clone https://github.com/yourusername/navi-analytics.git
cd navi-analytics
```

### 安装依赖

使用 npm：

```bash
npm install
```

或使用 yarn：

```bash
yarn install
```

### 运行项目

```bash
npm start
```

或

```bash
yarn start
```

项目将运行在 `http://localhost:3000`，您可以在浏览器中打开该地址查看应用。

## 使用指南

1. **首页**

   - 浏览项目的简介和功能特色。

2. **导航**

   - 通过导航栏可以访问不同的工具页面，如健康因子模拟器。

3. **输入资产信息**

   - 在供应资产表格中，输入您持有的资产数量。
   - 在借款资产表格中，输入您借款的资产数量。

4. **查看健康因子**

   - 实时查看总供应价值、总借款价值和当前的健康因子。
   - 点击“计算模拟”按钮，运行健康因子模拟。

5. **分析模拟结果**

   - 通过图表查看不同时间范围内健康因子的概率分布。
   - 切换时间范围（1天、3天、7天）查看不同的模拟结果。
   - 图表中标注了健康因子小于 1 的概率，以及关键的健康因子值。

6. **切换语言**

   - 在导航栏右上角，可以切换中文或英文界面。

## 自定义配置

### Tailwind CSS 配置

在 `tailwind.config.js` 中，您可以修改或添加自定义的颜色和样式，以适应您的设计需求。

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        darkBackground: '#000000',
        neonGreen: '#39FF14',
        neonBlue: '#1B03A3',
      },
    },
  },
  // ...
};
```

### 国际化

在 `public/locales` 目录下，您可以修改或添加翻译文件，以支持更多语言。

## 依赖列表

- **React**：用于构建用户界面。
- **TypeScript**：为 JavaScript 添加静态类型支持。
- **Tailwind CSS**：用于快速构建样式的实用程序优先的 CSS 框架。
- **Chart.js**：强大的图表绘制库。
- **react-chartjs-2**：Chart.js 的 React 封装组件。
- **react-i18next**：国际化解决方案，支持多语言。
- **Axios**：用于处理 HTTP 请求。
- **react-router-dom**：React 的路由解决方案。

## 贡献指南

欢迎对本项目提出意见或贡献代码。如果您发现任何问题或有改进建议，请提交 issue 或 pull request。


