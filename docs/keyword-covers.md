# 首页与分页的关键词封面

关键词仅显示在首页与分页的生成式封面上。文章原有标题、正文、URL、日期与标签不变；指定图片路径的 `cover` 继续显示原图。

现有文章的文案在 `_data/cover_titles.json`，键名对应文章 slug。`lines` 是一至两行大字，`subtitle` 是一句简短主题说明。

新文章可在 front matter 中指定：

```yaml
cover_lines:
  - Claude
  - Fable 5.5
cover_subtitle: 动画实测 · 8 个案例
```

也支持单个标题 `cover_title: GitNexus`，其优先级高于 `cover_lines` 和数据文件。建议大字最多两行，每行英文约 12–16 个字符、中文约 6–8 个字，副标题保持简短。

未指定封面文案且数据文件中没有记录时，会选择与 slug 匹配的最具体标签；没有匹配标签时，使用缩短的文章标题。需要更精确的模型版本或专题名称时，使用上述字段覆盖。

文字由 Jekyll 构建时直接输出，无需额外 JavaScript、图片生成服务或插件。字号随封面宽度变化。
