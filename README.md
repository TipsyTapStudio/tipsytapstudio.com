# tipsytapstudio.com

Tipsy Tap Studio のウェブ・プレゼンス全体を扱うモノレポ。
スタジオハブと各プロダクト LP を 1 つのリポで運用する。

- Hub: <https://tipsytapstudio.com>
- SPV-2 LP: <https://spv.tipsytapstudio.com>

## リポ構造

```
tipsytapstudio.com/
├── apps/
│   ├── hub/                # tipsytapstudio.com (Astro)
│   └── spv/                # spv.tipsytapstudio.com (Astro)
├── packages/
│   ├── i18n/               # 翻訳キー (ja/en) と t() ヘルパ
│   ├── ui/                 # 共通 Astro コンポーネント
│   └── tokens/             # デザイントークン（暫定値）
└── scripts/
    └── check-locale-parity.mjs   # ja.json / en.json のキー差分チェック
```

各 app / package は npm workspaces として束ねられ、
`@ttsui/hub` `@ttsui/spv` `@ttsui/ui` `@ttsui/i18n` `@ttsui/tokens` で参照する。

## 開発手順

Node.js 22 LTS が必要（`.nvmrc` で `22.12.0` を固定）。

```bash
# Node を揃える（nvm-windows なら `nvm use`）
nvm use

# ルートで一括インストール（workspaces 解決）
npm install

# 開発サーバ
npm run dev:hub      # http://localhost:4321/ja/
npm run dev:spv      # http://localhost:4322/ja/

# ビルド（locale 整合チェック → hub → spv の順）
npm run build

# プレビュー
npm run preview:hub
npm run preview:spv

# Lint / Format
npm run lint
npm run format
```

## ビルド・デプロイ

`main` ブランチへの push で Cloudflare Pages が自動ビルド・デプロイする。
PR を作成するとプレビュー URL が自動発行される。

Cloudflare Pages 側の設定（Phase B 後にディレクターが UI で設定）:

- Build command: `npm run build:hub` または `npm run build:spv`（プロジェクト別）
- Output directory: `apps/hub/dist` または `apps/spv/dist`
- Node version: `22`

`apps/*/public/_redirects` に `/  /ja/  301` を置くことで、
ルート URL は日本語版へリダイレクトされる。

## i18n キー追加手順

1. `packages/i18n/locales/ja.json` と `packages/i18n/locales/en.json` の
   両方に同じキーを追加する。
2. キー命名はフラット式 `<scope>_<section>_<element>[_variant]`：
   - `common_footer_contact`
   - `hub_hero_title`
   - `spv_privacy_neg_no_dom_injection`
3. `npm run check:locales` で差分が無いことを確認（`prebuild` が自動で発火する）。
4. ページ側では `import { t } from '@ttsui/i18n';` した上で
   `t('hub_hero_title', 'ja')` のように呼ぶ。

未訳の値は `"TODO: translate"` などの暫定文字列で OK だが、
**キーの集合は ja / en で常に一致** させること。

## ライセンス境界

- リポ内の **コード**（Astro / TypeScript / 設定ファイル等）: **MIT License** — ルートの `LICENSE` 参照。
- `apps/spv/public/` 配下の **ビジュアル・音声・動画素材**（SPV-2 のデモ動画、
  テーマ画像、スクリーンショット等）: **CC BY-NC 4.0** — 非商用利用のみ・要クレジット。

詳細な扱いは `apps/spv/ASSETS_LICENSE.md` を参照。

## 関連リポ

- メタリポ（スタジオ運営文書、Private）: `~/Desktop/tipsy-tap-studio/`
  README / ROADMAP / chrome-extensions-roadmap / retrospectives / ideas を管理。
  ウェブサイト本リポにこれらの文書は同梱しない。
- SPV-2 本体（Chrome 拡張）: `~/Desktop/spv/`
  LP のコピー・ビジュアル素材源。

## 連絡先

`tipsytapstudio@gmail.com`
