---
name: blog-post
description: Publish a new post to the aiviai.github.io Jekyll blog. Use whenever the user provides article content together with a YouTube and/or Bilibili video link and asks to "写成博客 / 发博客 / 创建博客 / 加入博客 / publish" or otherwise wants a post created in `_posts/`. Handles frontmatter, video embed, file naming, and the mandatory commit + push.
---

# Blog Post Skill — aiviai.github.io

This is a Jekyll blog using the **minimal-mistakes** theme, deployed via GitHub Pages from `main`. Posts live in `_posts/` and must follow the conventions below exactly, or rendering breaks.

## What the user normally provides

1. **Article content** (Chinese, Markdown-formatted, may already have `#` headings).
2. **YouTube link** (e.g. `https://youtu.be/<id>` or `https://www.youtube.com/watch?v=<id>`).
3. **Bilibili link** (e.g. `bilibili.com/video/BV...` — may be missing scheme).

If any of the three is missing, ask the user before writing. **Do not invent or guess video IDs.**

## Step-by-step workflow

### 1. Decide the file path

- Directory: `/workspaces/aiviai.github.io/_posts/`
- Filename: `YYYY-MM-DD-<english-slug>.markdown`
  - Date = today (use the `currentDate` from the system context, not a guessed date).
  - Slug = short, lowercase, hyphen-separated English keywords derived from the topic (e.g. `gitnexus`, `claude-code-workflow`, `codex-goal`).
- Extension is `.markdown` (matches existing posts — don't use `.md`).

### 2. Extract the YouTube video ID

From any of these forms, the ID is the 11-character token:
- `https://youtu.be/<ID>` → take `<ID>`
- `https://www.youtube.com/watch?v=<ID>` → take `<ID>`
- `https://www.youtube.com/embed/<ID>` → take `<ID>`

Strip any `?si=...`, `&t=...`, or other query params.

### 3. Build the post

Use this exact template. Replace the `{{...}}` placeholders. Keep all other formatting (especially the iframe attributes) identical.

```markdown
---
layout: single
title: "🚀{{compelling Chinese title — long, keyword-rich, similar in style to recent posts; wrap in double quotes; escape any inner double quotes}}"
sidebar:
  nav: "docs"
date: {{YYYY-MM-DD}} 00:00:00 +0800
categories: {{LLMs | AIAgents | RAG | Fine-Tuning}}
tags: [{{6–10 comma-separated tags, mix of product names + concepts + always include AGI, AIGC or similar broad tags}}]
classes: wide
author_profile: true
---

{{opening paragraphs of the article, as provided by the user}}

> 🚀 本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看]({{full bilibili URL, add https:// if missing}})
> - [👉👉👉 通过YouTube观看](https://youtu.be/{{YT_ID}})

<iframe width="800" height="450" src="https://www.youtube.com/embed/{{YT_ID}}" title="{{short title}}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

{{rest of the article body — preserve user's headings and structure; insert `---` between major sections to match house style}}
```

**Placement of the video block:** insert it after the first 1–3 paragraphs of intro (so readers see the hook before the video), not at the very top above the title and not at the very bottom. Look at `_posts/2026-05-02-gitnexus.markdown` for the canonical placement.

### 4. Frontmatter rules

- `layout: single` — always.
- `title:` — must be inside double quotes; if the user's title contains `"`, escape or replace with `'`.
- `sidebar: nav: "docs"` — always.
- `date:` — `YYYY-MM-DD 00:00:00 +0800`, timezone is Asia/Shanghai.
- `categories:` — single value, pick the closest from: `LLMs`, `AIAgents`, `RAG`, `Fine-Tuning`. Most AI-coding / Claude / Codex / model posts go in `LLMs`.
- `tags:` — bracketed list. Include the product names mentioned, the core concept, and usually end with `AGI, AIGC`. Look at the 3 most recent posts in `_posts/` for current tagging style.
- `classes: wide` and `author_profile: true` — always.

### 5. Video block rules (mandatory)

Every post that has a video MUST include **both**:

1. The text-link blockquote with Bilibili first, YouTube second (the 👉👉👉 format).
2. The YouTube `<iframe>` embed using `https://www.youtube.com/embed/<ID>` with the exact attributes shown in the template (width 800, height 450, the full `allow=` string, `allowfullscreen`).

Do **not** embed Bilibili — only the text link. Do **not** drop the iframe — it's required even though the link is also present. This was explicit user feedback.

### 6. Body formatting conventions

- Use `---` (horizontal rule) between major top-level sections (`## 一、`, `## 二、`, …) — matches house style.
- Keep the user's Chinese punctuation. Convert smart-quotes `"…"` to straight `"…"` only when inside the YAML `title:` value.
- Code fences: keep the language tag the user provided.
- Tables, lists, blockquotes: pass through as-is.
- End the post with a one-line sign-off if the source has one (e.g. "本期内容到这里，欢迎大家点赞、关注和转发，谢谢大家观看。"). If the source doesn't have one, don't fabricate it.

### 7. Commit and push (mandatory — do not skip)

After writing the file, run the full git flow without waiting for the user to ask:

```bash
git add _posts/<the new file>
git commit -m "$(cat <<'EOF'
Add <topic> blog post: <one-line description>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push
```

- Add the specific file by name (never `git add -A` or `.`).
- Use a HEREDOC for the commit message so formatting stays clean.
- Include the `Co-Authored-By` trailer.
- Push to `main` so GitHub Pages rebuilds — without push, the post is not live.

If the change is an edit to an existing post instead of a new one, use a verb like `Update`, `Fix`, or `Tweak` in the subject line and follow recent commit message style in `git log --oneline -10`.

### 8. Report back

After push succeeds, tell the user in one or two short lines: the filename created and the commit SHA. Don't re-summarize the article.

## Common edits to existing posts

If the user asks to update an existing post (fix a link, swap a video ID, retitle):

1. `Read` the file first (required by the Edit tool anyway).
2. Use `Edit` with a precise `old_string` — don't rewrite the whole post.
3. Then run the same commit + push flow with an `Update <slug>:` subject.

## Reference posts (look at these for style)

- `_posts/2026-05-24-claude-code-workflow.markdown` — most recent, canonical structure
- `_posts/2026-05-02-gitnexus.markdown` — canonical video block placement
- `_posts/2026-05-05-codex-goal.markdown` — recent tagging style

When in doubt about title length, tag choice, or section divider placement, mirror these three.

## What to ask before starting

Only ask if **required** info is missing:

- Article body? (required)
- YouTube link? (required for the iframe)
- Bilibili link? (required for the text-link block)

Do **not** ask about categories, tags, slug, or filename — infer them from the content. The user has been clear they want you to handle these automatically.
