# Tipsy Tap Studio Web — PRD

最終更新: 2026-05-01
ステータス: Draft / MVP 着手前

---

## 1. プロジェクト概要

Tipsy Tap Studio のウェブ・プレゼンス全体を構築・運用するためのリポジトリ。
スタジオハブ（`tipsytapstudio.com`）と、各プロダクトの LP（`<product>.tipsytapstudio.com`）を 1 つのモノリポで管理する。

**スタジオの位置付け** (2026-05-23 更新):
- core thesis: 「**インタラクティブな実験スタジオ**」。カテゴリ無限定、共通項は「いじれる / 触れる / 遊べる / 体験できる」インタラクティブ性
- 音・ビジュアル・時計 / タイマー・LINE スタンプ・Chrome 拡張機能・ガジェット・ゲーム等を横断
- 音楽はカテゴリの一つ（重要だが「本体」ではない）
- 対象作品群はスタジオ全カテゴリ横断（SP シリーズに限定されない）
- メタリポ `~/Desktop/tipsy-tap-studio/ROADMAP.md` の core thesis は別途同期更新予定

**最初に立ち上げるもの**:
1. スタジオハブ: `tipsytapstudio.com`
2. SPV-2 プロダクト LP: `spv.tipsytapstudio.com`

**Hub に掲載する既存・進行中プロダクト**（メタリポ `tipsy-tap-studio/README.md` から）:
- ガジェット: Galton Timer / Wall Clock / Galton Tempo / Vogel Timer
- ゲーム: Honey Derby / PLANKTONIGHT / noctiluka
- ビジュアライザー: Fractal Drive / Fractal Beat
- Chrome 拡張: SPV-2、SPCC / SPS / SPEQ（構想中）

**将来追加される LP（候補）**:
- `spv.tipsytapstudio.com` 着手後、ポートフォリオに値する作品ごとに専用 LP を検討
- SP シリーズ追加: SPCC / SPS / SPEQ などが MVP 到達したタイミングで LP 化判断

---

## 2. 背景・目的

### なぜ今やるか
- SPV-2 v1.2.0 を Chrome Web Store に申請完了し、機能凍結＋マーケティング/観察フェーズに入った
- メタリポ `tipsy-tap-studio/ROADMAP.md` の「4月〜：発信フェーズへ」マイルストーンに **「ポートフォリオサイト（Tipsy Tap Studio）の構築開始」** が既定タスクとして記載済み
- 既に 10+ プロジェクト（ガジェット・ゲーム・ビジュアライザー・拡張）が GitHub に分散公開されており、横串の入口がない
- 現状 SPV-2 の窓口は Chrome Web Store のみで、ブランドストーリーを語る場所がない

### 解きたい課題
- **Chrome Web Store の制約**: 説明文の文字数・フォーマット制限により、Zero Injection / Local by default 等の差別化メッセージを十分に表現できない
- **シリーズ感の欠如**: SPV-2 単体しか露出していないため、後続プロダクトを出しても「同じスタジオの作品」と認識されない
- **信頼の積み増し**: ボリューム系拡張が業界マルウェア温床になる中、「最小権限・データ送信ゼロ」を独立した web で説明できると差別化が効く

### 参考（学習対象、競合ではない）
- **VRSM Labs**（https://vrsm.cc/）— スタジオハブの構造・トーン・色階層の参考
- **Ritmo**（https://ritmo.vrsm.cc/）— プロダクト LP の参考

---

## 3. スコープ

### MVP（v0.1）
- スタジオハブ 1 ページ（`tipsytapstudio.com`）
- SPV-2 LP 1 ページ（`spv.tipsytapstudio.com`）
- 日本語 + 英語の 2 言語
- Cloudflare Pages 公開 + 独自ドメイン + SSL
- GitHub `main` push で自動デプロイ

### v0.2 以降（順序未定）
- About / Philosophy ページの拡充
- devlog / Changelog 統合（MDX）
- Press kit ページ（プレス向けロゴ・スクショ配布）
- SPMX 等の追加プロダクト LP

### Out of Scope（明示的に作らない）
- E コマース / 課金システム
- ブログプラットフォーム的機能（コメント、購読管理）
- 認証 / 会員機能
- スタジオ内部ドキュメント（経理、契約、ロードマップ）— 別 Private リポへ
- 競合比較表（差別化は反転リストで表現）
- Pricing ページ（v1.2.0 期は「全部無料」が信頼の根拠）

---

## 4. ブランド・設計原則

### スタジオ全体の core thesis (2026-05-23 更新)
- **インタラクティブな実験スタジオ**。カテゴリ無限定（音・ビジュアル・時計 / タイマー・スタンプ・拡張機能・ガジェット・ゲーム等）
- 共通項は「いじれる / 触れる / 遊べる / 体験できる」インタラクティブ性。音楽はカテゴリの一つで本体ではない
- TouchDesigner / Max for Live / Strudel / TidalCycles では届かない領域に、**プログラミング × ウェブ × Claude Code** という手段でリーチする
- 数を優先する／READMEを丁寧に書く／楽しさを最優先する（メタリポの基本方針を継承）

### SP シリーズ固有の 3 原則（**SP 系プロダクト LP のみに適用**）
1. **Zero Injection** — ホスト DOM/スクリプトに干渉しない
2. **Local by default** — データを外に出さない
3. **One panel, one job** — 機能を詰め込まない

> ※ ゲーム / ガジェット / ビジュアライザー系プロダクトには適用しない。SP シリーズ固有の技術的差別化軸であり、スタジオ全体の哲学ではない。

### トーン
- マーケ的誇張を避け、**乾いた職人口調**
- 「The problem was never X. It was Y.」型の断定短文 + 術語化された名詞
- VRSM が「Creative Systems Studio」を名乗るのに対し、Tipsy Tap は **「インタラクティブな実験スタジオ」**。カテゴリ無限定（音 / ビジュアル / 時計 / スタンプ / 拡張等）の横断性と「触れて遊べる」共通項が個性、ジャンル横断が VRSM との差別化軸

### 色階層（重要原則）
- **ハブ**: モノトーン（黒 + オフホワイト、低彩度）
- **プロダクト LP**: 各プロダクトのアクセント色を解放（SPV-2 はクロマグラム由来の彩度）
- 親子関係を「色の有無」で視覚化する（VRSM の構造原理を踏襲）

### タイポグラフィ
- **全サブドメインで 1 ファミリー統一**（候補: Inter / Geist Sans）
- フォント揺れがシリーズ感を最も損なうため、最初から固定
- 見出しはトラッキング広めで「ドキュメント・論文ぽさ」を演出

### 親子関係の視覚化
- 全プロダクト LP のヘッダー左上に `← tipsytapstudio.com` リンク + studio ミニロゴ
- フッターにも双方向リンク（ハブ ↔ プロダクト）

---

## 5. 情報アーキテクチャ

### スタジオハブ（`tipsytapstudio.com`)
縦 1 カラム / 5 セクション構成:

1. **Hero** — スタジオ名 + 動詞 3 連 subtitle（拍 / 波 / 振動の thesis）+ カテゴリ列挙 substatement + 軽いモーション
2. **Works** — 全プロダクトをカテゴリ別に並べる:
   - **Games** — Honey Derby / PLANKTONIGHT / noctiluka
   - **Visualizers** — Fractal Drive / Fractal Beat
   - **Gadgets** — Galton Timer / Wall Clock / Galton Tempo / Vogel Timer
   - **Chrome Extensions (SP Series)** — SPV-2 / SPCC / SPS / SPEQ
   - 各カードに `Live` / `Beta` / `Paused` / `Concept` のステータスバッジ
3. **Manifesto** — スタジオ thesis を web 用に編集（インタラクティブ実験 / カテゴリ無限定 / なぜ Claude Code か）
4. **About / Studio** — スタジオの活動領域と多ジャンル展開を語る、devlog リンク（**人数感は出さない**、"Studio" 呼称は複数人感の演出と整合させる、2026-05-23 更新）
5. **Footer** — Contact / GitHub Org / X / RSS / LICENSE

**ヒーローコピー** (2026-05-23 マーケ担当確定):
- ja subtitle: 「鳴らす、光らす、刻む。」 / substatement: 「音もビジュアルも、時計の針もタイマーの拍も、スタンプも拡張機能も。リズムを持つものを叩いて作る、インタラクティブな実験スタジオ。」
- en subtitle: "Tap it, light it, let it tick." / substatement: "Sounds, visuals, clocks, timers, stickers, extensions — an interactive studio that builds things with a beat you can tap."
- ブランド名 `Tap` を蛇口ではなく「拍を tap する」打音動作として再解釈。カテゴリ無限定の thesis と整合
- 旧案（"Music you can play with." 等の音楽中心コピー、"Side panels..." 系）は破棄、SP シリーズ LP の固有コピーは別途 LP 側で扱う

### SPV-2 LP（`spv.tipsytapstudio.com`）
縦 4 ブロックのプロダクトページ:

1. **Hero** — 既存 demo 動画から 6-8 秒ループ（autoplay/muted/loop/playsinline）+ 1 行コピー + Web Store CTA
2. **What it shows** — スペアナ / オシロ / クロマグラム / Note Flow（GIF または短尺ループ × 4）
3. **30+ themes** — テーマカルーセル（既存ストア用素材を流用）
4. **Privacy by design** — 背景色を変えて差別化を強調。**"What SPV-2 does NOT do" 反転リスト**:
   - No DOM injection
   - No data collection
   - No external requests
   - No account required
5. **Specs** — Manifest V3、最小権限リスト（`https://*.youtube.com/*` 限定）、対応 Chrome バージョン

**CTA 配置**: ヒーロー / 機能ブロック後 / フッター直前 の 3 箇所、文言は "Add to Chrome" で統一

**Freemium 余地**: 機能ブロックに `[Free]` / `[Pro]` バッジを入れられる余白を確保（v1.2.0 期は表示しない）。Pricing セクションは作らない。

---

## 6. 技術スタック

| 領域 | 採用 | 理由 |
|---|---|---|
| フレームワーク | **Astro** | 静的サイトに最適、MDX で devlog/changelog 流し込み、JS ゼロ配信 |
| ホスティング | **Cloudflare Pages** | 商用 OK・帯域無制限・サブドメイン無料、Astro 公式 first-class |
| ドメイン登録 | **Cloudflare Registrar** | 原価販売、プライバシー保護無料、DNS 統合 |
| インフラ操作 | **Cloudflare MCP** | OAuth 一発、Code Mode で 2,500+ API 操作可能 |
| リポ/CI 操作 | **GitHub MCP** | Repo/PR/Actions/Pages 連携、2026/01 大型更新済み |
| 多言語 | **astro:i18n** | `/ja/` `/en/` 静的ルーティング、`_locales/` と翻訳キー JSON 共有 |
| 解析 | **Cloudflare Web Analytics** | クッキーレス、無料、プライバシー思想と整合 |

### 採用しない理由（記録）
- **Vercel**: Hobby は商用 NG、Pro は $20/seat。スタジオ運営には不適
- **Netlify**: 機能は十分だが帯域 30GB / ビルド数の無料枠が Cloudflare 比で見劣り
- **GitHub Pages**: サブドメイン展開・Edge 配信・MCP 操作粒度で劣る
- **Next.js**: SSR が過剰、静的サイトに対して機能オーバー
- **生 HTML**: i18n 移行で確実に詰む

---

## 7. ドメイン戦略

| ドメイン | 用途 |
|---|---|
| `tipsytapstudio.com` | スタジオハブ |
| `spv.tipsytapstudio.com` | SPV-2 プロダクト LP |
| `spmx.tipsytapstudio.com` | SPMX LP（将来） |
| `spbar.tipsytapstudio.com` | SPBAR LP（将来） |

### 命名ルール（恒久）
- **バージョン番号は含めない**（`spv2.` は v3 で破綻するため、`spv.` で固定）
- 短縮形（`spv`, `spmx` 等）で統一
- メールは `contact@tipsytapstudio.com` または `hello@tipsytapstudio.com`（後で決定）

---

## 8. i18n 方針

- **Day 1 から多言語対応設計**を入れる（後付けは破綻する）
- ロケール: `/ja/`（プライマリ）、`/en/`（プライマリと同等優先度）
- `astro:i18n` の静的ルーティングを使用
- 翻訳キーは **JSON 一元管理**、SPV-2 v1.3.0 で導入予定の `_locales/` と共有可能な形にする
- ハブ・LP すべてで同じキー命名規則を採用

---

## 9. リポジトリ・ワークフロー

### リポ
- 名前: `tipsytapstudio.com`（GitHub Public）
- 分離原則: スタジオ運営の内部文書（経理、契約等）は同居させず、別 Private リポへ

### デプロイフロー
- `main` ブランチ push → Cloudflare Pages 自動デプロイ
- PR 作成 → プレビュー URL 自動生成
- ステージング環境は当面なし（プレビュー URL で代替）

### 開発環境
- Node.js LTS
- パッケージマネージャ: `npm`（特殊要件なし）
- Lint/Format: Prettier + ESLint（最小構成）

---

## 10. リリース計画（目安）

### Phase 0: セットアップ（〜1 週間）
- ドメイン取得（Cloudflare Registrar）
- GitHub リポ作成
- Cloudflare MCP / GitHub MCP 接続
- Astro プロジェクト初期化

### Phase 1: ハブ MVP（〜2 週間）
- スタジオハブ 1 ページ実装
- 日英 2 言語
- 公開（`tipsytapstudio.com`）

### Phase 2: SPV-2 LP（〜2 週間）
- LP 1 ページ実装
- 既存 demo 動画・スクショの流用
- サブドメイン公開（`spv.tipsytapstudio.com`）
- Chrome Web Store 説明文に LP リンクを追加

### Phase 3 以降
- 観察期。Cloudflare Web Analytics で流入を見ながら、コピー・構成を調整
- 後続プロダクト追加時に LP を増やす

---

## 11. 成功指標（MVP）

### 必達
- ハブと SPV-2 LP の 2 ページが公開・SSL 有効
- 日本語/英語の切替が動作
- Chrome Web Store からの流入を計測可能
- ページ表示速度 LCP < 2.5s（Cloudflare Edge 配信前提なら容易）

### あるとよい
- LP 経由のインストール数が観測できる（Web Store の「ウェブサイト」リファラ集計）
- v1.3.0 i18n リリース時にハブ・LP も多言語追加で運用可能なことが実証される

---

## 12. 注意事項・原則

### 禁止事項（恒久）
- 競合プロダクトを名指しで比較する表・図の作成（"What SPV-2 does NOT do" 反転リストで代替）
- Volume Master / Ritmo / Ears 等の名前を出した比較コンテンツ
- "Pro" / "Premium" 価格表示（v1.2.0 期は無料訴求が最大の信頼資産）
- スタジオ運営文書（ROADMAP / retrospectives / ideas / 経理）の同梱
  - これらは **メタリポ `tipsy-tap-studio/`**（別ローカル、Private 管理）が担う
- SP シリーズ固有の 3 原則（Zero Injection 等）をスタジオ全体の哲学として書く
  - ゲーム / ガジェット系プロダクトには適用されないため

### ディレクター原則（CLAUDE.md 継承）
- 実装はエンジニア、デザインはデザイナー、コピーはマーケ担当のサブエージェントに委譲する
- ディレクター単独でビジュアル変更・技術提案を独断で行わない
- 視覚出力は実物確認してからユーザーに見せる

---

## 13. 未決事項（Open Questions）

| 項目 | 状態 | 備考 |
|---|---|---|
| ロゴ確定 | 未定 | 既存 SPV アイコンを継承するか、別系統のスタジオロゴを作るか |
| About セクション本文 | 未定 | 誰が書くか（マーケ担当に委譲予定） |
| メールアドレス | 未定 | `contact@` か `hello@` か、Cloudflare Email Routing で受信 |
| 商標確認 | 未実施 | "Tipsy Tap" 単独で米国 USPTO TESS / 日本 J-PlatPat の検索が必要 |
| SNS ハンドル | 未確認 | `tipsytapstudio` が X / Instagram / GitHub Org で取れるか |
| アナリティクス詳細 | 未定 | Cloudflare Web Analytics で十分か、追加で必要か |
| OGP 画像 | 未定 | プロダクトごとの OGP デザイン方針 |

---

## 14. 参照ドキュメント

### メタリポ（スタジオ全体・最上位の参照元）
- `C:\Users\sfchg\Desktop\tipsy-tap-studio\README.md` — 全プロジェクト一覧、ステージ・状態定義、発信チャネル
- `C:\Users\sfchg\Desktop\tipsy-tap-studio\ROADMAP.md` — スタジオの core thesis、フェーズ・マイルストーン、基本方針
- `C:\Users\sfchg\Desktop\tipsy-tap-studio\chrome-extensions-roadmap.md` — SP シリーズの企画・技術詳細
- `C:\Users\sfchg\Desktop\tipsy-tap-studio\ideas.md` — 作りたいもののネタ帳
- `C:\Users\sfchg\Desktop\tipsy-tap-studio\retrospectives\` — 月次振り返り

### SPV-2 プロジェクト
- `C:\Users\sfchg\Desktop\spv\CLAUDE.md` — SPV-2 プロジェクト指針（ディレクター原則、Zero Injection 思想の出典）
- `C:\Users\sfchg\Desktop\spv\SPV_Concept.md` — SPV-2 ブランドコンセプト・カラースキーム
- `C:\Users\sfchg\Desktop\spv\PRD.md` — SPV-2 要件定義
- `C:\Users\sfchg\Desktop\spv\devlog.md` — SPV-2 開発ログ

### Claude Code メモリ（`~/.claude/projects/.../memory/`）
- `project_studio_site_design.md` — サイト設計方針
- `project_spv2_lp_strategy.md` — privacy-via-negation パターン
- `project_hosting_mcp_choice.md` — Cloudflare + MCP スタック選定理由
- `project_competitor_ritmo.md` — Ritmo 参考事例（競合ではなく学習対象）
- `project_volume_extension_market.md` — ボリューム系市場とプライバシー差別化の根拠
