#!/bin/bash

echo "======================================"
echo "SMI Composite Deck Demo - 启动脚本"
echo "======================================"
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    echo ""
    npm install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ 依赖安装成功！"
    else
        echo ""
        echo "❌ 依赖安装失败"
        echo ""
        echo "尝试修复 npm 缓存权限："
        echo "  sudo chown -R \$(whoami) ~/.npm"
        echo ""
        exit 1
    fi
else
    echo "✅ 依赖已安装"
fi

echo ""
echo "======================================"
echo "🚀 启动开发服务器..."
echo "======================================"
echo ""
echo "提示："
echo "  - 服务器启动后会自动打开浏览器"
echo "  - 默认地址：http://localhost:5173"
echo "  - 按 Ctrl+C 停止服务器"
echo ""

npm run dev
