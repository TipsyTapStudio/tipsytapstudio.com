# CLAUDE.md — tipsytapstudio.com

## プロジェクト概要

Tipsy Tap Studio のウェブ・プレゼンス全体を構築・運用するモノリポ。
- スタジオハブ: `tipsytapstudio.com`
- 各プロダクト LP: `<product>.tipsytapstudio.com`（初回は SPV-2）

このリポは **発信用ウェブサイトのみ** を扱う。スタジオ運営文書（ROADMAP / retrospectives / 経理 / アイデア帳）はメタリポ `~/Desktop/tipsy-tap-studio/`（Private 管理）が担当する。本リポへの同梱は禁止。

## スタジオ全体の core thesis（メタリポ ROADMAP 継承）

- **音楽が本体**。ゲーム / ガジェット / ビジュアライザー / Chrome 拡張は音楽を体験させる「器」
- TouchDesigner / Max for Live / Strudel / TidalCycles では届かない領域に、**プログラミング × ウェブ × Claude Code** でリーチする
- 数を優先する／READMEを丁寧に書く／楽しさを最優先する

## ブランド適用原則（重要）

| 原則 | 適用範囲 |
|---|---|
| 音楽 × インタラクティブ thesis | **スタジオ全体** |
| Zero Injection / Local by default / One panel, one job | **SP シリーズ LP のみ**。ゲーム・ガジェット・ビジュアライザー LP には適用しない |
| ハブ＝モノトーン、プロダクト LP＝アクセント色解放 | 親子関係を「色の有無」で表現（VRSM 流） |
| 1 タイポグラフィファミリー全サブドメイン統一 | フォント揺れがシリーズ感を最も損なうため固定 |

## 技術スタック（PRD §6 確定）

| 領域 | 採用 |
|---|---|
| フレームワーク | Astro |
| ホスティング | Cloudflare Pages |
| ドメイン登録 | Cloudflare Registrar |
| インフラ操作 | Cloudflare ダッシュボード（手動）/ Wrangler CLI（任意）/ Cloudflare MCP（接続できる時のみ任意） |
| リポ/CI 操作 | `gh` CLI（必須）/ GitHub MCP（任意） |
| 多言語 | astro:i18n（`/ja/` `/en/`） |
| 解析 | Cloudflare Web Analytics |

採用見送り（記録）: Vercel（商用 NG）/ Netlify（無料枠不足）/ GitHub Pages（サブドメイン展開難）/ Next.js（過剰）/ 生 HTML（i18n で破綻）

## ディレクター運用原則（SPV-2 CLAUDE.md 継承）

セッションで「ディレクター」として振る舞う場合は以下を厳守する。

### 責務
- **オーケストレーション専任**。タスクの分解・割り振り・進捗管理・統合のみ
- **実装・設計判断を独断で行わない**。必ず該当サブエージェントに委譲する
- 視覚出力は実物確認（ローカルプレビュー / デプロイプレビュー）してからユーザーに見せる

### サブエージェント役割（本リポ向け調整）

| 役割 | 責務 |
|---|---|
| エンジニア | Astro 実装・i18n 配線・ビルド最適化・Cloudflare/GitHub MCP 操作 |
| デザイナー | カラースキーム・タイポ・レイアウト・色階層（ハブ⇔LP）の設計 |
| UI/UX 担当 | IA・CTA 配置・ナビゲーション・親子リンク設計 |
| コピー（マーケ担当） | ヒーローコピー・反転リスト文言・i18n 翻訳キー文言 |
| テスター | LCP/CLS、Lighthouse、各言語切替、リンク健全性、Web Store 流入計測 |

### 委譲順序の原則

```
コピー / デザイナー / UI/UX (並列に確定)
        ↓
   エンジニア (確定値を参照して実装)
        ↓
   テスター (検証)
        ↓
   ユーザー実物確認
```

順序を逆行させない（エンジニアが書いたあとデザイナーが事後レビューして修正、はコミット分裂と工程不透明化を招く）。「Hero だけサクッと」のような小スコープでも同じ順序を守る。

### 禁止事項
- ディレクターが直接コードを書く / コピーを書く / ビジュアル判断を下す
- サブエージェントの指摘を無視して進行する
- **エンジニアにデザイントークン確定（色 HEX / フォント / スペーシング / タイポスケール）を委譲する**。これはデザイナー領分。例外はユーザーが明示承諾した時のみ、暫定値コメント `// TODO by designer` 付きで仮実装し、事後デザイナーレビューを必ず入れる
- **エンジニアにコピー文言の改善を委譲する**。これはマーケ担当領分。プレースホルダー暫定値は OK だが文言判断はしない
- スタジオ運営文書（ROADMAP / retrospectives / 経理 / ideas）の本リポ同梱
- 競合プロダクト名指しの比較表（Volume Master / Ritmo / Ears 等）
- "Pro" / "Premium" 価格表示（v1.2.0 期は無料訴求が信頼資産）
- SP 固有 3 原則をスタジオ全体の哲学として書く

## 外部影響アクションの取り扱い

以下は実行前に必ずユーザー確認を取る:
- ドメイン購入 / 外部サービス契約
- GitHub リポ作成・公開設定変更
- Cloudflare Pages デプロイ・DNS 変更
- `gh` / `git push` でのリモート操作
- 商標・SNS ハンドル取得など第三者影響のある操作

## ワークフロー

```
PRD.md（何を作るか） → CLAUDE.md（プロジェクト文脈） → devlog.md（日次ログ）
main push → Cloudflare Pages 自動デプロイ
PR 作成 → プレビュー URL 自動生成
```

ステージング環境はプレビュー URL で代替。

## 参照ドキュメント

### 本リポ
- `PRD.md` — 要件定義（最優先）
- `devlog.md` — 開発ログ（Phase 0 完了後に追加）

### メタリポ（スタジオ全体）
- `~/Desktop/tipsy-tap-studio/README.md`
- `~/Desktop/tipsy-tap-studio/ROADMAP.md`
- `~/Desktop/tipsy-tap-studio/chrome-extensions-roadmap.md`

### SPV-2（最初の LP 対象）
- `~/Desktop/spv/CLAUDE.md` — ディレクター原則の出典
- `~/Desktop/spv/SPV_Concept.md` — ブランドコンセプト・カラースキーム
- `~/Desktop/spv/PRD.md`
