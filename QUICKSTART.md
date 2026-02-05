# 🚀 快速开始指南

## 项目位置
```
/Users/Zane/code/SMI/composite-deck-demo/
```

## 一键启动

### 选项 1：使用启动脚本（推荐）
```bash
cd /Users/Zane/code/SMI/composite-deck-demo
./start.sh
```

### 选项 2：手动启动
```bash
cd /Users/Zane/code/SMI/composite-deck-demo

# 安装依赖（仅首次需要）
npm install

# 启动开发服务器
npm run dev
```

## 访问应用
启动后，在浏览器中打开：
```
http://localhost:5173
```

## 常见问题

### Q: npm install 失败？
A: 尝试修复 npm 缓存权限：
```bash
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
npm install
```

### Q: 端口被占用？
A: 修改 vite.config.js，添加：
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // 改为其他端口
  }
})
```

### Q: 如何导出图片？
A: 在任何图形上右键点击即可导出为 PNG

## 主要功能

### 4个标签页
1. **Structure** - 结构参数设置和截面图
2. **Loading** - 荷载输入和荷载图
3. **Design** - 设计参数和设计图
4. **Results** - 计算结果和结果图表

### 图形功能
- 所有图形使用 Konva.js 动态生成
- 支持右键导出为 PNG
- 根据表单数据实时更新

### 表单功能
- 可折叠表单区域
- 实时数据绑定
- 结果汇总面板

## 项目结构
```
src/
├── tabs/          # 4个标签页组件
├── components/    # 6个图形组件
├── App.jsx        # 主应用
└── App.css        # 样式
```

## 技术栈
- React 18
- Vite 6  
- Konva.js 9
- React-Konva 18

## 更多信息
查看完整文档：
- README.md - 完整使用说明
- PROJECT_COMPLETE.md - 项目详细说明

---

祝使用愉快！🎉
