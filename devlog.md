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
