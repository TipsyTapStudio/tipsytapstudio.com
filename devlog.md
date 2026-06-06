# Tipsy Tap Studio Web 開発ログ

## 2026-05-01 〜 2026-05-03: Phase 0 セットアップ完了

### 概要

PRD §10 Phase 0（想定〜1 週間）を 3 日で完了。スタジオハブ `tipsytapstudio.com` と SPV-2 LP `spv.tipsytapstudio.com` の 2 プロジェクトが Cloudflare Pages 上で本番 HTTPS 配信稼働。

### 実施内容

#### 2026-05-01: 着工日（外部リソース取得まで）

- 商標確認（USPTO TESS / J-PlatPat）→ "Tipsy Tap" は完全一致なし、`Tipsy` 単独は混雑域だが複合で識別性◯。出願予定なし、リスク受容で進める方針
- SNS ハンドル空き確認 → `tipsytapstudio` で 7 プラットフォーム空き、YouTube `@TipsyTapStudio` は本人運用済み
- ドメイン `tipsytapstudio.com` 取得（Cloudflare Registrar、年 ~$10、Auto Renew ON、WHOIS プライバシー有効）
- GitHub リポ `TipsyTapStudio/tipsytapstudio.com` 作成（Public、empty、`gh` CLI で）
- Cloudflare アカウント作成、Mobile App TOTP 2FA 設定（Google Authenticator）
- 連絡先メール: `tipsytapstudio@gmail.com` 直掲載で確定（独自ドメインメールは作らない）
- 本リポ用 `CLAUDE.md` ドラフト確定、`~/.claude/.../memory/` に Phase 0 決定事項を記録

#### 2026-05-03: モノレポ構築 〜 本番デプロイ

**Phase A（設計提案・確定）**:
- エンジニア（Plan agent）に比較提案を依頼、Q1-Q5 確定:
  - Q1 リポ構造: モノレポ案 B（`apps/{hub,spv}/` + `packages/{ui,i18n,tokens}/`、npm workspaces）
  - Q2 i18n キー命名: フラット式 `<scope>_<section>_<element>`（chrome.i18n `_locales/messages.json` 完全互換、SPV-2 v1.3 と 1 ソース運用可能）
  - Q3 Node: 22.12.0 LTS（`.nvmrc` + `engines.node` 両方で固定）
  - Q4 LICENSE: コード MIT、`apps/spv/public/` の SPV-2 demo 素材は CC BY-NC 4.0 ハイブリッド
  - Q5 SPV-2 素材取り込み: 手動コピー（symlink/submodule は採用せず）

**Phase B（実装）**:
- エンジニアが 44 ファイル作成（`.gitignore` / `.editorconfig` / `.nvmrc` / Astro hub + spv 2 プロジェクト / packages 3 つ / locale parity check スクリプト）
- ローカル `npm install` 成功、`npm run dev:hub` `npm run dev:spv` で localhost 動作確認、`npm run build` で prebuild 込み成功（JS ゼロ配信達成）
- 初回コミット `6b347d1` 作成 → `git push -u origin main` で GitHub に反映

**Cloudflare Pages 接続**:
- `tipsytapstudio-hub` プロジェクト作成（Build command `npm run build:hub`、Output `apps/hub/dist`、`NODE_VERSION=22.12.0`）→ デプロイ成功
- 同様に `tipsytapstudio-spv` 作成 → デプロイ成功
- 両プロジェクトともプレビュー URL（`*.pages.dev`）で 200 確認

**カスタムドメイン紐付け**:
- hub に `tipsytapstudio.com` (apex)、spv に `spv.tipsytapstudio.com` を Activate
- DNS レコードは Cloudflare が自動挿入（Registrar が同アカウント管理だったため）
- SSL 証明書発行を待ち、本番 6 URL すべて HTTPS 200 確認（Cloudflare 東京エッジ NRT 配信）

### 詰まったポイント / 学び

- **Cloudflare の UI 過渡期**: 新規プロジェクト作成が「Workers」側にデフォルト誘導される。Pages 入口は画面下の "Looking to deploy Pages? Get started" リンクから入る必要があった。Pages → Workers Static Assets への統合途中
- **MCP 未接続**: Cloudflare MCP / GitHub MCP は環境にインストールされていなかった。`gh` CLI とブラウザ手動操作で代替して問題なく完了。CLAUDE.md は「MCP は任意」と注記済み
- **2FA リカバリーコード保管問題**: 「マスターパスワードを記憶する」運用の無理を再認識。最終的にジャーナルノート末尾に手書き保管 + テキスト残置（USB バックアップ予定）で着地
- **`_redirects` は dev では効かない**: Astro dev サーバでは Cloudflare の `_redirects` ファイルが反映されない。本番（Pages）では正しく動作

### ディレクター運用の継承効果

SPV-2 から継承した「**ディレクター単独で技術判断しない**」運用が効いた。

- リポ構造（モノレポ vs 単一プロジェクト）など後戻りコストの高い決定は、エンジニアエージェントに比較提案を出させてユーザー判断
- ユーザーフィードバック「対案とメリデメを明確に」を受けて、Phase A 提案を表形式で再整理 → 判断が滑らかに
- ディレクターが書いて良いのは「文書整理」「進捗統合」「外部影響アクションの確認」のみ、という線引きを徹底

### 配信中 URL

- https://tipsytapstudio.com/ja/ — スタジオハブ（プレースホルダー）
- https://tipsytapstudio.com/en/
- https://spv.tipsytapstudio.com/ja/ — SPV-2 LP（プレースホルダー）
- https://spv.tipsytapstudio.com/en/

### 残作業 / 次回着手

- メタリポ `~/Desktop/tipsy-tap-studio/README.md` の更新（発信セクション「ポートフォリオサイト」状態を「運用中」に）
- Phase 1（ハブ MVP）着手:
  - デザイナー: カラースキーム（モノトーン基調）、タイポ確定
  - UI/UX 担当: 5 セクション IA、Works カード設計（GitHub Pages デモを主リンク + リポを副リンク）
  - コピー（マーケ担当）: ヒーロー、Manifesto、i18n キー文言（ja/en）
  - エンジニア: 上記統合実装、Web Analytics token、OGP 画像配置
  - テスター: LCP/CLS/Lighthouse、リンク健全性、言語切替

### 次やること（1 行）

メタリポ更新 → Phase 1 着手判断（ハブ Hero だけ作る案 or フル MVP 案）。

---

## 2026-05-03（夜）: Phase 1 ハブ Hero セクション実装

### 概要

ディレクター → エンジニア委譲で、スタジオハブの Hero セクションを実装。`Music you can play with.` の thesis を最小マークアップで載せる。Phase 1 の最小スライス、Works/Manifesto/About は別タスク。

### 実施内容

- `apps/hub/src/layouts/Base.astro` 新規追加（global reset + Inter 読み込み + 最小フッタースタブ + skip-link）
- `apps/hub/src/pages/{ja,en}/index.astro` を Base 利用形に書き換え、Hero（タイトル + 1 行ステートメント + サブステートメント）を直書き
- `packages/tokens/index.ts` の暫定値を実値化（モノトーン palette、Inter + system stack、rem ベース 8 段スペーシング、`clamp()` タイポスケール）
- `packages/i18n/locales/{ja,en}.json` に `hub_hero_substatement` `common_locale_switch` を追加、`common_footer_contact` `common_footer_github` を `Contact` / `GitHub` で確定。`hub_hero_title` `hub_hero_subtitle` `hub_hero_substatement` は **暫定値、マーケ担当確定待ち**（PRD §5 ヒーローコピー方向性に沿った仮文言）
- `.claude/launch.json` 追加（preview MCP 起動用）

### 動作確認

- `npm run check:locales` → OK (2 locales, 9 keys)
- `npm run build:hub` → 成功、`apps/hub/dist/{ja,en}/index.html` 各 ~4.5KB
- 出力 HTML に `<script>` タグなし（JS ゼロ配信維持を確認）
- dev サーバで `/ja/` `/en/` ともに HTTP 200
- Chrome DevTools 375×812 (mobile) と 1280×800 (desktop) で目視確認、レイアウト崩れなし。`prefers-reduced-motion` 対応済み

### 暫定値・引き継ぎ事項

- **コピー文言** (`hub_hero_title` / `hub_hero_subtitle` / `hub_hero_substatement`)
  → マーケ担当が確定するまで現行の英文（`Tipsy Tap Studio` / `Music you can play with.` / `An experimental room for music as interactive experience.`）を ja/en 両方で表示。日本語訳はマーケ担当の領分
- **デザイントークン**（`packages/tokens/index.ts`）
  - 色: `#0B0B0B` (bg) / `#EDEDED` (fg) / `#7A7A7A` (muted) / `#1F1F1F` (rule)
  - フォント: Inter (Google Fonts)、weights 400/500/600
  - スペーシング: 8 段階（3xs〜3xl、rem ベース）
  - フォントサイズ: `clamp()` で可変、5 段階（sm〜2xl）
  → デザイナー確定時に上書き予定。差し替えても markup 変更不要なよう CSS 変数経由に集約
- **Footer**: 連絡先メール + GitHub + 言語切替の最小スタブ。Phase 1 後段で正式化

### 次やること（1 行）

マーケ担当によるヒーローコピー確定 → デザイナーレビュー → 残り 4 セクション（Works / Manifesto / About / 正式 Footer）の IA 設計。

---

## 2026-05-03（夜・追記）: デザイナーレビュー反映

### 経緯（ディレクター運用の事故と修正）

Hero 実装委譲の際、ディレクターがエンジニアに **デザイントークン確定（色 HEX、フォント、スペーシング等）まで一括委譲してしまった**。本来これはデザイナー領分。エンジニアは `// 暫定値、デザイナー / マーケ確定待ち` のコメント付きで第一近似を書いてくれていたが、運用原則の順序違反は事実。

ユーザー（ディレクター経由）から「デザイナーもちゃんと入ってね」と指摘を受け、デザイナーサブエージェント (Plan agent) を事後召喚して現状をレビューした。

### デザイナー判定

**作り直しレベルではない、トークン値の微調整で完了**。Must 2 件 + Should 1 件 + Nice 3 件の指摘。ユーザー判断で **Y 案（Must + Should）** を採用。

| 項目 | 種別 | 修正内容 |
|---|---|---|
| muted 色 WCAG AA 適合 | Must | `#7A7A7A` (4.34:1) → `#9A9A9A` (6.79:1) |
| 日本語見出しトラッキング | Must | `:lang(ja)` で `letter-spacing: 0` に分岐。グローバル CSS に集約（scoped CSS の specificity 衝突回避のため `.hero__title` の `letter-spacing` 指定は削除） |
| Inter フォント戦略 | Should | Google Fonts CDN → セルフホスト (`@fontsource/inter`)。LCP 改善 + プライバシー一貫性 (SP シリーズ "No external requests" との整合) |

Nice-to-have（モーション短縮、`3xs` 未使用トークン削除、`spv.accent` 確定）は今回見送り、別タスク化。

### 実施内容

- `packages/tokens/index.ts`: `colors.hub.muted` を `#9A9A9A` に。typography コメント更新
- `apps/hub/src/layouts/Base.astro`: `--muted` ミラー、Inter セルフホスト import (`@fontsource/inter/{400,500,600}.css`)、Google Fonts CDN の `<link>` 削除、`:lang(ja) h1/h2/h3 { letter-spacing: 0 }` 追加
- `apps/hub/src/pages/{ja,en}/index.astro`: `.hero__title` の scoped `letter-spacing` 削除（責務をグローバルに集約）
- `apps/hub/package.json`: `@fontsource/inter ^5.1.0` 追加
- コミット `53b8b41` で `374bff4` の上に重ねる（amend ではなく追加コミット、工程を履歴に残すため）

### 動作確認（本番）

- `https://tipsytapstudio.com/ja/` 配信中の CSS で `--muted: #9a9a9a` を確認
- `:lang(ja) h1,h2,h3{letter-spacing:0}` を確認
- `fonts.googleapis.com` / `fonts.gstatic.com` への参照は本番 HTML/CSS に **0 件**
- Inter woff2 は `/_astro/inter-*.woff2` で同 origin 配信

### 学び

- **「実装」と「デザイン判断」は独立委譲**: エンジニアに UI 実装を任せる際、デザイントークン確定は別タスクとしてデザイナーに先に出す（または明示的にデザイナースキップを承諾）
- **越権の自己申告は救命綱**: エンジニアが `// 暫定値` コメントを付けていたおかげで、修正範囲が明確になり「全部捨てて作り直す」を回避できた
- ディレクター運用ルールを `feedback_director_mode.md` と `feedback_subagent_role_boundary.md` (新規) に補強

### 次やること（1 行）

ヒーローコピー確定（マーケ担当）→ Phase 1 残スコープ（Works / Manifesto / About / 正式 Footer）の IA 設計（UI/UX 担当）。

---

## 2026-05-23 〜 30: Thesis pivot から Hero ガラス化までの大規模磨き上げ（24 commit）

### 概要

長期セッション（7 日間、24 commit、`79620fb` 〜 `7acc8ed`）で Phase 1 完成 → Phase 2 大幅磨き上げ → ハブ全体が「Tipsy Tap」として動き出す状態まで持っていった。最終的に Brew 背景が稼働するハブで巨大ガラス H1 がドーンと中央に出る状態。

### 主要マイルストーン（時系列）

#### 1. Thesis pivot (2026-05-23)
旧 thesis「音楽が本体、器の多様性」を破棄、新 thesis「**インタラクティブな実験スタジオ、カテゴリ無限定**」に転換。実態（時計・タイマー・LINE スタンプ等が音楽に紐づかない）と乖離していたため。CLAUDE.md / PRD §1, §4, §5 / メモリー (`project_studio_thesis.md`) 同時更新。メタリポ `~/Desktop/tipsy-tap-studio/ROADMAP.md` は同期更新待ち（ユーザー手動）。

#### 2. Hero copy v3
マーケ担当 3 周（音楽寄り → 酒場系 → 波/拍系）の検討を経て確定:
- ja「鳴らす、光らす、刻む。」/「音もビジュアルも、時計の針もタイマーの拍も、スタンプも拡張機能も。リズムを持つものを叩いて作る、インタラクティブな実験スタジオ。」
- en "Tap it, light it, let it tick." / "Sounds, visuals, clocks, timers, stickers, extensions — an interactive studio that builds things with a beat you can tap."

ブランド名 `Tap` を蛇口ではなく「拍を tap する」打音動作として再解釈、カテゴリ無限定の thesis と整合。デザイナーレビューで span 分割マークアップ + `.sep` margin-inline-end で読点リズム視覚化。

#### 3. Phase 1 完成（2026-05-23）
PRD §5 残 4 セクション（Works / Manifesto / About / 正式 Footer）を実装、Hero と合わせて 5 セクション縦構成。新コンポーネント 7 種（ProductCard / StatusBadge / TagChip / SectionHeading / ManifestoArrow / Footer / FooterColumn）。works.json データ駆動、Honey Derby ユーザー指示で除外。Featured 3 件（SPV-2 / Galton Timer / Wall Clock）。メタリポ README から残 11 件 desc を確定。ステータスは `Live / Beta / Tinkering / Sketch` で実態反映。

#### 4. フォント刷新（IBM Plex Sans + JP）
Inter → IBM Plex Sans + IBM Plex Sans JP に切替（ja の OS フォントガチャ解消）。後に Phase 2 で再刷新される。

#### 5. Works 完成度向上
- 6 件アイコン取り込み（spv2 / galton_timer / wall_clock / galton_tempo / vogel_timer / fractal_beat）
- GH Pages リンク補完（5 件）
- 全 23 外部リンクに `target="_blank" rel="noopener noreferrer"`、内部リンクは同タブ維持
- ProductCard の head 構造を flex row → column に修正（title 行揃え）

#### 6. About 「ひとり」問題（2026-05-23）
ユーザー指摘「by one person って書けって一度も指示してないんだけど」で重大ミス発覚。Studio Persona ルール（対外コピーで「ひとり / ソロ / 個人」禁止）を新規メモリー `feedback_studio_persona.md` として確立。About body を「READMEを添えて並べる / devlog に書き留める」の活動・記録スタイルに書き直し、PRD §5 も同時更新。

#### 7. /lab/ 実験ページ（2026-05-23）
「Tinkering バッジの実体」「触れる原典」として独立。揺らぎグラデーション 3 案（Drift CSS / Grain SVG / Flux WebGL）を縦並びフルビューポート × scroll-snap で並列展示。ParamSlider / ExperimentFrame / BackToHub などコンポーネント新規。UI/UX 設計 → マーケ i18n 22 キー → デザイナー仕様 → エンジニア実装の正規順序。

#### 8. Brew 誕生（lab-002）
ユーザー直言「Tipsy Tap Studio の名称からするとどこかビールっぽい印象を、ビール醸造のタンク内のイメージ」を受けて Flux 系新実験を lab-002 として独立追加。F1-F5 案検討 → F2 発酵中採用（暗琥珀対流 + 上昇する泡）→ 「泡がマーブル状でミルクコーヒー」と評価され泡削除 + 3 ビール（Pilsner / Wit / IPA）12 分自動循環に再設計 → 「12 分待てない」で B1 完全手動切替に再々設計。BrewSwitch radiogroup + URL hash で完成。

#### 9. Brew をハブ全画面背景に昇格（2026-05-28）
ユーザー直言「ここまで来たらもうサイトトップに実装しようよ。速さ 0.1 / 循環 1.00 / ピルスナー・ウィット・IPA をループ」を受けて、Brew を全ページ sticky 背景に。CLAUDE.md ブランド原則を「ハブ＝Brew 背景 (3 ビール循環) + 上層モノトーン UI」に書き換え。各セクション overlay 設計、ProductCard 半透明化、Footer 上端 fade band。/lab/ 配下は二重起動回避で除外。**ハブが Tipsy Tap として動き出した瞬間**。

#### 10. Overlay 区切り線問題
ユーザー指摘「区切り線が入ってる、いらない」を受けて Hero 透明 / Works soft / Manifesto strong の overlay 階段を全削除。Brew が全画面を貫く形に。

#### 11. Phase 2 フォント 3 案 PR preview（2026-05-28）
ユーザー「フォントがダサい」を受けて IBM Plex Sans から再刷新。3 ブランチ並列で PR 作成（Cloudflare Pages 自動 preview URL）:
- Set A: EB Garamond × しっぽり明朝 B1 × Hero H3 階段状
- Set B: DM Serif × Source Serif 4 × しっぽり明朝 × Hero H1 centered
- Set C: Fraunces variable × Noto Serif JP × Hero H2 縦 3 段

ユーザー圧勝 Set C 採用。`:lang(ja)` font-family スタックは Latin 先頭 / JP は CJK 用 fallback に修正（ja/en 切替で英語フォントが変わる挙動の是正）。

#### 12. Phase 1.5（2026-05-28）
- Manifesto 削除（5 → 4 セクション）、p3 の「ひとりで」を含めて消滅、thesis 重複解消
- About 簡略化（カテゴリ列挙削除、活動・記録に絞る）
- ナビ N2: Top transparent → scroll で chip bar 出現（後に N3 常時表示に変更）
- `--fg` を `#EDEDED` → `#EFE7D6` の暖オフホワイトに、`--muted-onbrew #D8CDB4` 新トークンで WCAG AA 確保

#### 13. Hero 配置の試行錯誤（複数 commit、ディレクター運用ミス事例）

7 commit にわたって Hero 上下中央配置で迷走。**ディレクターが委譲順序を守らずに即実装した複数回のミス**が記録される:

- `bc32a00`: ユーザー直言「常時表示 / 座布団除去 / 上が詰まりすぎ」をデザイナー判定スキップで実装 → WCAG AA 不合格コードを本番反映 → hotfix `b2ba58e`
- `78c12ec`: padding-top 拡張 + flex-start → 「上気味」評価
- `94f714a (X5)`: 光学中央 + padding 非対称 + center 復帰 → 「より上に詰めてどうすんだ」激怒
- `c94d663`: grid 1fr auto auto + place-items: center start + cue 削除 → 「下げすぎ」
- `1b52a6a`: text-stroke + transparent + halo（G ハイブリッド）→ 「ただの枠線じゃねーか」激怒
- `167c54e`: 半透明塗り（rgba 0.55 + drop-shadow）に修正 → OK
- `7acc8ed`: padding-top/bottom クランプ非対称で 1.1:1 バランス → OK

ディレクター運用ルールに 2 回追記（`feedback_director_mode.md`、2026-05-28 / 30）:
- 「ユーザー直言の『明確な仕様変更』も視覚判断ならデザイナー必須」
- 「『ガラス』のような抽象語は実装上の見え方を視覚的に確認してから承認」

#### 14. Hero ガラス H1 ドーン（最終形）
statement / sub 削除、H1 単独で巨大化 `clamp(4.5rem, 2rem + 13vw, 14rem)`。文字色を `rgba(239, 231, 214, 0.55)` で半透明、Brew 揺らぎが文字越しに透けるガラス感。drop-shadow で立体感。padding-top/bottom 非対称で全 viewport で上下比 1.06-1.14:1（Header 視覚補正の上微重）。

### 配信中 URL (本番反映済み、`7acc8ed`)

- https://tipsytapstudio.com/ja/ — ガラス H1 + Brew 背景
- https://tipsytapstudio.com/en/
- https://tipsytapstudio.com/ja/lab/ — Drift / Grain / Flux + Brew #002
- https://tipsytapstudio.com/en/lab/

### ディレクター運用の最大の学び（再発防止）

委譲順序を守らないと **本番に不合格コードが乗る**。今回起きた:
1. ユーザー直言「常時表示 / 座布団除去」を即実装 → muted on Brew が 1.9-2.5:1 で AA 全不合格のまま本番デプロイ
2. デザイナーの「ガラス輪郭」を視覚確認せず承認 → 「ただの枠線」激怒
3. 単純な padding 調整に 6 案比較ラウンド挟む → 「トークン無駄使い」激怒

`feedback_director_mode.md` に判定フロー追記:
> ユーザー要望を受けたら即座に「(a) コピー (b) 視覚 (c) IA (d) 純実装」を分類、(a)(b)(c) を含むなら必ず担当サブエージェント先行。**ユーザー要望の明確さに関わらず適用**。ただし設計判断は終わってる「値だけ調整」「明示的仕様」では過剰な比較ラウンドを避ける。

両極のバランスが必要。

### 残宿題（次セッションへ）

- **Works 磨き込み**（次セッションのメイン）
- メタリポ ROADMAP の core thesis 同期更新（本リポからは触らない、ユーザー手動）
- PRD §4「全サブドメイン統一」原則の最終整理（Set C 採用で Hub 専用フォント既定化）
- `.claude/worktrees/` を .gitignore に追加
- Lab `/lab/` での `--fg` 暖色化が Lab Flux 深海版で違和感ないか実機確認
- 残 i18n キー整理（`hub_hero_subtitle` 等、参照ゼロのキーが残存）
- テスター発注: 実機 LCP / FPS / 発熱、特に Brew 全画面 WebGL の電池影響
- ロゴ確定（PRD §13 未決、Hero ガラス H1 のスタイルとの整合検討）

### 次やること（1 行）

Works セクションの磨き込み（カードレイアウト・残 11 件 desc 確認・アイコン・カテゴリ整理）。

---

## 2026-05-30: Works 磨き込み（カード暖色整合 → カテゴリ再構成 → アイコン文字除去、3 commit）

### 概要

前セッションの宿題「Works 磨き込み」を 3 commit で実施。カードのトーン整合（隠れ WCAG 違反の是正含む）→ カテゴリ別ブロック + 横長 1 列 + 大小 2 サイズへの大規模再構成 → タイマー系 3 アイコンの文字除去まで。`34a469d` → `c327105`、いずれも本番反映済み。Works が「均質に並ぶ 13 件」から「カテゴリで整理され主役が立つ棚」になった。

### マイルストーン（時系列）

#### 1. カード暖色トーン整合 + 隠れ AA 違反是正（`34a469d`）

Brew 背景 + ガラス H1 が暖色 pivot した一方、ProductCard の表面トークンだけが純黒・純白・純グレーの寒色中立で取り残されていた問題を解消。デザイナー先行でスペック確定 → 実装。

- `--card-bg-onbrew` 純黒 `rgba(11,11,11,.55)` → 暖暗褐 `rgba(20,16,8,.66)`
- **隠れ WCAG AA 違反を是正**: 明部 Pilsner (`#92711B`) が透ける最悪ケースで desc (`--muted`) が **4.10:1** と本文 AA 4.5:1 を割っていた。α 0.55→0.66 で **4.88:1** へ回復。デザイナー算出、0.66 が Must
- `--card-border-onbrew` 純白 → 暖白 `rgba(239,231,214,.14)`、`.card__media` `#141414` → `#16120a`（`--card-media-bg` トークン化）
- 暖色二段影 `--shadow-card` / `--shadow-card-hover` を新設しカードを接地。hover/focus border を `--fg` に。blur は 8px 維持（透け意図を残す）。reduced-motion 時は影固定
- tokens/index.ts ミラーも `cardOnBrew.bg/border/mediaBg/shadow/shadowHover` で同期（runtime は Base.astro :root）
- ⚠️ プロセス反省: デザイナースペック返却前に推測値で実装着手 → 返却後に全値リコンサイル（委譲順序の先走り。次回は spec 待ち）

#### 2. Works カテゴリ再構成（`017fd07`）— 今セッションのメイン

縦 3 列グリッド・全アイテム同サイズ・区切りなしの並びを廃止し、**4 カテゴリのブロック積層 + 各ブロック横長カード 1 列 + 大小 2 サイズ**へ。plan mode で設計 → 実装 → デザイナーレビュー → ユーザー実機確認 → push の正規順序を遵守（今回は先走りなし）。

- **データモデル**: works.json に `category`（extensions / clocks / games_visuals / stickers）と `size` を**明示フィールド**で追加。tags は重複（galton_timer は gadget+clock だが galton_tempo は gadget のみ）、featured はソート専用のため、どちらも導出に流用不可と判断
- **グループ化**: sortWorks.ts に `CATEGORY_ORDER` 定数と `groupWorksByCategory()` を追加。全体 sortWorks（featured > status > addedAt）を先に通してから filter するので、カテゴリ内順序は既存契約を継承。extensions 先頭に featured/live の SPV-2 が来て、それが唯一の large なのでブロック頭に大カードが自然に乗る。空カテゴリは除外
- **レイアウト**: ProductCard を `size` prop 対応に拡張（作り直さない）。本文を `.card__body` ラッパで包み、640px↑で `.card` を column→row（メディア左・本文右）、未満は縦積みに退避。大=メディア 16rem / desc 4 行 / tags 表示、小=メディア 8rem / desc 2 行 / tags 非表示。title h3→h4（h2 Works > h3 カテゴリ > h4 カード名の階層）
- **割り当て**: SPV-2 のみ large、他 12 点 small（works.json は全 **13 点**。Honey Derby は前から除外で 14 ではなく 13 が正）
- **デザイナーレビューで 2 点修正**: ① 大 title が `--fs-xl`（= セクション H2 と同一トークン、1280px で両方 60px）で階層衝突 → 中間 `clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)` ≈ 40px に。② 小 desc が広い本文（~550px）で間延び → `max-width: 34rem`
- **i18n**: lede `hub_works_lede`（「触れる、いじれる、遊べる。…」）を ja/en 両方削除。`hub_works_category_*` 4 キー新設。**カテゴリ表示名は暫定で英字**（Hero の英字統一方針に整合、parity チェックは値でなくキー集合のみ検査するため英字でも通る）。日本語訳の確定はマーケ TODO
- トークン新規追加は不要で済み、tokens ミラー契約に触れず影響最小

#### 3. タイマー系アイコンの文字除去（`c327105`）

galton_timer / galton_tempo / vogel_timer の SVG からブランド文字（GALTON TIMER / GALTON TEMPO / VOGEL-TIMER）を除去し、グリフのみの正方形 viewBox に。カードの `.card__media`（正方形 + object-fit:contain）に最適。色・グリフ形状は不変。純粋なアセット差し替えでデザイナーレビュー不要と判断

### 今セッションの学び / プロセス

- **委譲順序は前半で 1 回先走り（commit 1）、後半は遵守（commit 2）**。plan mode を使った commit 2 は設計 → 実装 → レビューが綺麗に流れ、デザイナーが H2 トークン衝突という構造破綻を実装後に捕捉できた。視覚・構造変更は plan mode + デザイナーレビューが効く
- **プレビュー MCP は serverId 必須**（name ではない）。また WebGL Brew 背景が常時 rAF を回すため `preview_screenshot` がタイムアウトする。視覚検証は `preview_eval` で computed style を数値計測する方式で代替した（card bg / title fs / media 寸法 / desc clamp 等を実測）。サーバはセッション中に数回落ちたので都度 `preview_start { name }` で再起動
- **ハブのページは ja/en 個別ファイル**（`[lang]` 動的ルートではない）。セッション冒頭でこれを誤認し phantom 調査を空回りさせた。実ファイルは Glob / git ls-files で確認すること（メモリー `project_hub_page_structure.md` に記録済み）

### 配信中 URL（本番反映済み、`c327105`）

- https://tipsytapstudio.com/ja/ — Works が 4 カテゴリブロック + 横長 1 列 + SPV-2 大カード
- https://tipsytapstudio.com/en/

### 残宿題（次セッションへ）

- **Works 残候補**:
  - アイコン未取得 3 件（thumb:null）: planktonight / noctiluka / fractal_drive（sketch の spcc/sps/speq/lp_stamps は意図的 placeholder "T"）
  - カテゴリ表示名の**日本語訳確定**（現状暫定英字、マーケ領分）
  - Featured pin の視覚的差別化（works.json で spv2/galton_timer/wall_clock が featured:true だが並び順優先のみで pin バッジ等なし）
  - status バッジの実態整合（メタリポ README 同期）
  - i18n 孤児キー整理（`hub_works_lede` が今回参照ゼロ化。他に hub_manifesto_* / honey_derby_* / hub_hero_subtitle / hub_about_body_extended）
- メタリポ ROADMAP の core thesis 同期更新（本リポからは触らない、ユーザー手動）
- PRD §4「全サブドメイン統一」原則の最終整理
- `.claude/worktrees/` を .gitignore に追加
- Lab `/lab/` での `--fg` 暖色化が Lab Flux 深海版で違和感ないか実機確認
- テスター発注: 実機 LCP / FPS / 発熱、特に Brew 全画面 WebGL の電池影響
- ロゴ確定（PRD §13 未決、Hero ガラス H1 との整合検討）

### 次やること（1 行）

Works 残アイコン 3 件取得 or カテゴリ日本語訳確定（マーケ）。いいベースができたので、次は細部の充実フェーズ。

---

## 2026-06-07: Works を実体7件に整理 + カード/導線リファイン + Studio→Lab（2 commit）

### 概要

Works の充実フェーズ。アイコン3件取得を予定していたが、ユーザー判断で「未リリース/開発停止のものは一旦削除」に方針転換。実体7件に絞り込み、カードの導線（バッジ廃止・アイコンクリック遷移・CTA整理）とトップ最終セクション（Studio→Lab ティザー）をまとめてリファインした。`c327105` → `1e2cc01`、本番反映済み。

### マイルストーン

#### 1. Works 絞り込み（7件へ）
未リリース/開発ペンディング/停止の6件を削除: **SPCC / SPS / SPEQ**（拡張・開発ペンディング）、**Planktonight / Noctiluka**（ゲーム・開発中/停止）、**Fractal Drive**（停止）。
- works.json から6件削除 → 残**7件**（spv2 / galton_timer / wall_clock / galton_tempo / vogel_timer / fractal_beat / lp_stamps）
- i18n 孤児キー12対（6件 × title/desc）を ja/en 両方から撤去、parity 維持
- 4カテゴリ構造は健在（各カテゴリに最低1件残り空ブロックなし）: Extensions=spv2 / Clocks & Timers=4件 / Games & Visuals=fractal_beat / Stickers=lp_stamps
- **Fractal Beat の desc 修正**: 旧文は「Drive と対をなす別アルゴリズム」と削除した Fractal Drive を前提にしていた → Drive 参照を除去した自立文へ（ja「拍に合わせてフラクタルが育つビジュアライザー。音楽の幾何をまだ手探りで描いている。」/ en "A visualizer where fractals grow to the beat. Still feeling out the geometry of music."）。マーケ確定、tinkering の実験中ニュアンスを保持

#### 2. ステータスバッジ全廃
「Live が意味不明 + 未リリース削除で不要」を受けて ProductCard から StatusBadge を撤去。
- `status` prop / 型 / works.json の status フィールドは**温存**（sortWorks.ts の statusRank が依存）。UI からのみ削除
- StatusBadge.astro 本体と `hub_works_status_*` 4キーは残置（参照ゼロだが将来再利用余地 + parity リスク回避）
- `.card__header` は h4 タイトル単独に簡素化

#### 3. アイコンクリックで別タブ遷移
`.card__media` を条件付き `<a target="_blank" rel="noopener noreferrer">` 化。
- 遷移先ロジック `mediaHref = lpUrl ?? demoUrl ?? null`: SPV-2=既存LP / 時計類・Fractal Beat=GitHub Pages デモ / **LINE Stamps=LINE store**（`https://store.line.me/stickershop/author/5362208/` を works.json の demoUrl に設定。thumb=null なので "T" プレースホルダがリンク化）
- デザイナーa11y指摘で **media リンクを SR/Tab から除外**（aria-hidden + tabindex=-1）→ title リンクに一本化。マウス用の大標的は維持しつつ、同一遷移先の重複リンク読み上げ/2回 Tab を回避（現データは全カード media と title が同一宛先なので安全）
- hover: img は opacity 0.85 + scale 1.03、"T" プレースホルダは opacity 0.55→0.8。reduced-motion で transform 無効化

#### 4. CTA は Repo のみ
`.card__ctas` から Demo 文字リンク削除（demoUrl はアイコンリンクに用途変更）。Repo のみ残す。lp_stamps は repoUrl=null で CTA 自体非表示。未使用化した demoLabel 定数削除（`hub_works_cta_demo` キーは温存）。

#### 5. Studio → Lab ティザー化
中身が空疎で**存在しない devlog を参照していた** "Studio" セクションを廃止し、実在する `/lab/` への誘導ティザーに置換。
- section id `about`→`lab`、見出し "Lab"、本文 + 誘導リンク（ja「鳴らす前、光らせる前、刻む前。まだ削っている途中の試作を、触れる状態で置いている棚。」+「作業台に上がる」/ en も workbench メタファー継承。マーケ確定）
- Header.astro の nav を `{id:'lab', label:hub_nav_lab}` に同期（IO の aria-current が #lab に追従）
- i18n: `hub_nav_studio` / `hub_about_*` 3キー削除、`hub_nav_lab` / `hub_lab_heading` / `hub_lab_body` / `hub_lab_link` 新設（heading/nav は英字 "Lab" 固定 = Hero/Footer 英字統一に整合）
- デザイナー Must 指摘: Lab ティザーが `section-band--strong`（transparent）で Brew が透けるのに text-shadow が抜けていた（Works 見出しには付与済みなのに漏れ）→ body/link に `text-shadow-onbrew` 付与、下線色を明部で消えない暖白半透明 `rgba(239,231,214,.4)` に
- **既知の「存在しない devlog 参照」問題がこの置換で物理的に解消**

#### 6. Clocks & Timers 並び替え
ユーザー指定の「新しい順」= Vogel Timer → Galton Tempo → Galton Timer → Wall Clock に。
- 原因: 4件とも addedAt が同一 `2026-02` + galton_timer/wall_clock が featured:true で先頭固定されていた
- 対応: addedAt を実制作順の降順に（vogel=05 / tempo=04 / timer=03 / wall=02）、galton_timer/wall_clock の featured:true を解除（featured は現状ソート順にしか効かず視覚差別化なし＝副作用なし）

### プロセス / 学び

- **委譲順序を完遂**: plan mode で設計 → マーケ(Lab文言/Fractal Beat文言)・デザイナー先行 → 実装 → デザイナーレビュー（5点指摘、Must=Lab の text-shadow 漏れ）反映 → ユーザー実機確認 → push。今セッションは先走りなし
- デザイナーレビューが「既存パターンからの漏れ」（Lab だけ text-shadow 抜け）を実装後に捕捉。視覚変更は実装後レビューが効くパターンの好例
- works.json は削除・demoUrl・並び替え・featured が1ファイルに絡みファイル単位のコミット分割不可 → 「Works/Lab 改修」一連として1コミットに集約

### 配信中 URL（本番反映済み、`1e2cc01`）

- https://tipsytapstudio.com/ja/ — Works 7件、バッジなし、アイコンクリック遷移、Lab ティザー
- https://tipsytapstudio.com/en/

### 残宿題（次セッションへ）

- **SPV-2 サイト作成**（次セッションのメイン。下記「次やること」参照）
- カテゴリ表示名の日本語訳確定（暫定英字のまま、マーケ領分）
- Featured pin の視覚的差別化（現状 spv2 のみ featured:true、視覚差なし）
- i18n 孤児キー整理（`hub_works_status_*` `hub_works_cta_demo` が今回参照ゼロ化。既存の hub_manifesto_* / honey_derby_* 等も）
- メタリポ ROADMAP の core thesis 同期（ユーザー手動）
- `.claude/worktrees/` を .gitignore に追加
- テスター発注: 実機 LCP / FPS / 発熱（Brew 全画面 WebGL の電池影響）

### 次やること（1 行）

SPV-2 プロダクトサイト（spv.tipsytapstudio.com）の作成。Chrome Web Store ページ内容把握 → リファレンス選定 → コンテンツ構成・原稿 → YouTube 埋め込み → 対応サイト一覧（Web Store ではスパム判定回避でサムネのみ記載）→ リリースノート置き場（当面1ページ、将来別ページ化）。
