#!/bin/bash

# 切换到博客目录
BLOG_DIR="/Users/charlesqin/MyBlog"
cd "$BLOG_DIR" || {
    echo "错误: 无法切换到博客目录 $BLOG_DIR"
    exit 1
}

# 构建博客
echo "开始构建博客..."
bundle exec jekyll build || {
    echo "错误: 博客构建失败"
    exit 1
}
echo "博客构建完成"

# 获取提交信息
read -p "请输入提交信息 (默认: '添加新博客文章'): " commit_msg
commit_msg=${commit_msg:-"添加新博客文章"}

# 执行git命令
echo "提交更改到git..."
git add .
git commit -m "$commit_msg"
git push --set-upstream origin main

echo "完成! 博客已构建并部署到GitHub"