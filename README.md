# SMI Composite Deck Calculation Software - Demo

这是一个完整的复合楼板计算软件前端演示，使用 **React + Vite + Konva.js** 构建。

## ✨ 项目特点

- **4个功能标签页**：Structure（结构）、Loading（荷载）、Design（设计）、Results（结果）
- **左右分栏布局**：左侧表单输入，右侧动态图形生成
- **Konva.js 图形**：所有图形都可以右键导出为 PNG 图片
- **响应式表单**：输入数据后实时更新图形
- **专业UI设计**：仿照 Tata ConFlor 软件界面风格

## 🏗️ 界面布局

### Structure Tab（结构标签页）
**左侧表单：**
- Sheeting（钢板型材选择）
- Span（跨度设置）
- Concrete（混凝土参数）
- Mesh or Fibre（钢筋网配置）
- Stud & Bar（连接件配置）
- Results Sum（结果汇总）

**右侧图形：**
- Cross Section（截面图）
- General Arrangement Graphics（总体布置图）

### Loading Tab（荷载标签页）
**左侧表单：**
- UDL Loading（均布荷载）
- Parallel Loading（平行荷载）
- Perpendicular Loading（垂直荷载）
- Point Loading（点荷载）

**右侧图形：**
- Loading Diagram（荷载示意图）

### Design Tab（设计标签页）
**左侧表单：**
- Fire design（防火设计）
- Shear method（剪切方法）
- Deflection limit（挠度限值）
- Partial load factors（部分荷载系数）
- Vibration（振动分析）

**右侧图形：**
- Cross Section
- General Arrangement Graphics

### Results Tab（结果标签页）
**左侧：**
- 详细计算结果
- 各项检查结果（PASS/FAIL）
- 报告摘要

**右侧图形：**
- Bending Moment Diagram（弯矩图）
- Shear Force Diagram（剪力图）
- Deflection Diagram（挠度图）

## 🚀 快速开始

### 安装依赖

```bash
cd composite-deck-demo
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📦 技术栈

- **React 18.3.1** - UI 框架
- **Vite 6.0.3** - 构建工具
- **Konva.js 9.3.6** - Canvas 图形库
- **React-Konva 18.2.10** - React 集成

## 🎨 功能演示

### 1. 动态表单输入
所有表单字段都是可编辑的，包括：
- 型材选择（ComFlor 60/80, WH-38-152, 2WH-36, 3WH-36）
- 材料厚度和等级
- 混凝土参数
- 荷载数值
- 设计参数

### 2. 实时图形生成
使用 Konva.js 动态生成：
- 截面图（显示钢板波纹、混凝土层、钢筋网）
- 总体布置图（显示跨度、支撑点）
- 荷载图（显示 UDL、点荷载、支座）
- 弯矩图（抛物线分布）
- 剪力图（线性分布）
- 挠度图（带限值检查）

### 3. 图片导出
在任何图形上**右键点击**即可导出为 PNG 图片。

### 4. 可折叠表单区域
每个表单区域都可以通过右上角的 ▲/▼ 按钮折叠/展开。

## 📁 项目结构

```
composite-deck-demo/
├── src/
│   ├── tabs/
│   │   ├── StructureTab.jsx      # 结构标签页
│   │   ├── LoadingTab.jsx        # 荷载标签页
│   │   ├── DesignTab.jsx         # 设计标签页
│   │   └── ResultsTab.jsx        # 结果标签页
│   ├── components/
│   │   ├── CrossSectionGraphic.jsx         # 截面图组件
│   │   ├── GeneralArrangementGraphic.jsx   # 总体布置图组件
│   │   ├── LoadingDiagramGraphic.jsx       # 荷载图组件
│   │   ├── BendingMomentDiagram.jsx        # 弯矩图组件
│   │   ├── ShearDiagram.jsx                # 剪力图组件
│   │   └── DeflectionDiagram.jsx           # 挠度图组件
│   ├── App.jsx                   # 主应用
│   ├── App.css                   # 样式
│   ├── main.jsx                  # 入口
│   └── index.css                 # 全局样式
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 核心功能实现

### 状态管理
使用 React useState 管理全局表单数据：
```javascript
const [formData, setFormData] = useState({
  profile: 'ComFlor 60',
  thickness: '1.0',
  grade: 'S350',
  // ... 更多字段
})
```

### Konva 图形组件
每个图形组件都是独立的：
```javascript
<Stage width={500} height={300} ref={stageRef}>
  <Layer>
    <Rect x={50} y={50} width={400} height={60} fill="#c0c0c0" />
    <Text x={200} y={25} text="Label" fontSize={11} />
  </Layer>
</Stage>
```

### 图片导出
右键点击触发导出：
```javascript
const handleExport = () => {
  const uri = stageRef.current.toDataURL()
  const link = document.createElement('a')
  link.download = 'diagram.png'
  link.href = uri
  link.click()
}
```

## 🎨 设计特点

### UI 风格
- 仿照 macOS 应用风格
- 淡蓝色表单背景（#c8ddf0）
- 可折叠区域
- 清晰的视觉层次

### 颜色方案
- **主色**：蓝色系（#1976d2, #c8ddf0）
- **荷载**：红色（#d32f2f）
- **剪力**：橙色（#ff6f00）
- **弯矩**：深红（#d32f2f）
- **挠度**：紫色（#7b1fa2）

### 字体
- 系统默认字体栈
- 表单字体：13px
- 标题字体：14-18px

## 🔧 自定义和扩展

### 添加新的表单字段
在 `App.jsx` 的 `formData` 中添加新字段，然后在对应的 Tab 组件中使用：
```javascript
<input 
  type="number" 
  value={formData.newField}
  onChange={(e) => updateFormData({ newField: e.target.value })}
/>
```

### 修改图形
在对应的图形组件中修改 Konva 元素：
```javascript
<Rect 
  x={50} 
  y={50} 
  width={400} 
  height={60} 
  fill="#your-color"
/>
```

### 添加新的荷载类型
在 `LoadingTab.jsx` 中添加新的表单区域，然后在 `LoadingDiagramGraphic.jsx` 中添加对应的图形表示。

## 📝 待完成功能

根据项目需求，未来可以添加：
- [ ] 后端 API 集成
- [ ] 真实的工程计算
- [ ] PDF 报告生成
- [ ] 保存/加载项目文件
- [ ] 多语言支持
- [ ] 打印功能
- [ ] 更多型材类型
- [ ] 动态荷载组合
- [ ] 详细的错误提示

## 🐛 已知问题

- 表单数据目前只在前端状态中，刷新页面会丢失
- 某些表单字段还未连接到图形更新逻辑
- 需要添加表单验证

## 📖 学习资源

### Konva.js
- 官网：https://konvajs.org/
- React Konva 文档：https://konvajs.org/docs/react/

### React
- 官网：https://react.dev/

### Vite
- 官网：https://vitejs.dev/

## 🤝 贡献

这是一个演示项目，展示了如何使用 React + Konva.js 构建工程计算软件的前端界面。

## 📄 许可

本演示项目为 SMI（Steel Masters International）开发。

---

**创建时间：** 2026-02-05  
**版本：** 1.0.0  
**作者：** GitHub Copilot CLI
