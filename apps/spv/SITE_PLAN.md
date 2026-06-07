# SPV-2 プロダクト LP — サイト構成・原稿（実装前の設計図）

> 2026-06-07 作成。構成(IA) + 全原稿(ja/en) + リリースノート設計まで確定。
> 次セッションでこの設計図に沿って実装する。配信先: spv.tipsytapstudio.com

## Context

SPV-2（ブラウザのサイドパネル内リアルタイム音声ビジュアライザ/計測器、Chrome 拡張）の
プロダクト LP を作る。現状 `apps/spv/src/pages/{ja,en}/index.astro` はプレースホルダ配信中。
Chrome Web Store では対応サイトを全列挙するとスパム判定でリジェクトされた経緯があり、
対応サイト一覧の「正規の置き場」を LP に持つ。また将来バージョンを重ねると Store に
書ききれなくなるため、リリースノートの蓄積場所も LP 側に用意する。

## SPV-2 確定スペック（材料）

- 名称: SPV-2 — Side Panel Visualizer。Store v1.3.0 / manifest v1.3.1、45 users、無料、MIT
- コンセプト: 「音を見るための計測器」。KORG NTS-2 リスペクト。**抽象アートでなく"読める"計測器**
- 5モジュール: Oscilloscope(シアン) / Spectrum Analyzer(マゼンタ〜パープル) / Chromagram /
  BPM Detection / Key Detection(Camelot記法) + Track Info(グリーン)
- 対応10サイト: YouTube, YouTube Music, Spotify, Apple Music, Amazon Music, Tidal,
  SoundCloud, Bandcamp, Beatport, Mixcloud, Strudel + All websites オプション
- 40+テーマ(10内蔵+41 Strudel派生)、Strudel auto-sync
- Zero Interference: content script なし / DOM干渉なし / トラッキングなし / ネットワークゼロ
- MV3、Offscreen Document、30fps、tabCapture API、4言語(en/ja/de/es)
- カラー: 背景 #0A0A0A〜#111 + ネオンアクセント(シアン/マゼンタ〜パープル/グリーン)
- デモ動画: https://www.youtube.com/watch?v=GpZiK86H74M
- Web Store: https://chromewebstore.google.com/detail/spv-2-side-panel-visualiz/flkfiadmjmonooljmhhbapffoicdibdn

## 確定方針（ユーザー回答）

- **LP 言語: ja / en の2言語**（拡張本体は4言語だが LP は親ハブに合わせ2言語。キー設計は言語非依存に）
- **リリースノート: v1.0.0〜v1.3.1 全部**（v1.3.1 は 2026-06-15 = 未来日付。公開時に要確認 or "Coming"扱い）
- **対応サイト: テキスト + 中立アイコン**（商標ロゴは使わない＝リスク回避）
- リファレンス型: **Raycast型（product-as-hero × 縦スクロール機能ブロック）+ KORG トーン**

## リファレンス（採用型の根拠）

| サイト | 学ぶ点 |
|---|---|
| Raycast | 暗背景+ネオン、機能を実スクショで1ブロックずつ。**採用型** |
| Linear/Arc | product-as-hero（ヒーロー直下に製品UI大きく） |
| Superhuman/Notion Calendar | 機能を左コピー・右ビジュアルの交互配置 |
| KORG NTS 製品ページ | 計器の質感・暗がりで光るムード（トーンの源泉） |
| Obsidian 等 OSS | ローカル/プライバシー/MITを信頼バッジに |

## ページ構成(IA) — 10セクション

| # | section | 目的 | 主な要素 | CTA |
|---|---|---|---|---|
| S0 | Header | 常時CTA+ナビ+親子明示 | ロゴ/ナビ(Modules・Sites・Privacy・Releases)/言語切替/Web Store CTA(小)/親ハブback-link | 小 |
| S1 | Hero | 「音を見る計測器」を一撃 | H1=SPV-2 / タグライン(主役) / サブ1行 / 主CTA / 補足 | 主 |
| S2 | Demo Video | 動く計器を見せる | YouTube **facade埋め込み**(サムネ+再生ボタン→クリックでiframe) | (直後にCTA可) |
| S3 | Five Modules | 5計器を"読める"ものとして | 見出し+リード+5モジュール(左コピー右実描画の交互)+Track Info | — |
| S4 | Themes | 拡張性+Strudel auto-sync | 見出し+説明+テーマスウォッチgrid | — |
| S5 | Supported Sites | 対応の広さ(Store差別化) | 4グループ+All websites別格+DRM注記。テキスト+中立アイコン | — |
| S6 | Zero Interference | 信頼資産の核 | 見出し+3点(content scriptなし/トラッキングなし/ネットワークゼロ)+MIT/MV3 | — |
| S7 | SP 3 Principles | シリーズDNA | Zero Injection / Local by default / One panel, one job の3カード(英字KW+1文) | — |
| S8 | Release Notes | 更新履歴の蓄積 | 見出し+リード+各版タイムライン(version/date/note) | — |
| S9 | Final CTA | 最終転換 | 殺し文句+Web Storeボタン大+信頼シグナル | 大 |
| S10 | Footer | 回遊と帰属 | 親ハブback-link/GitHub/Web Store/言語切替 | — |

CTA配置: Header(小) / Hero(主) / Final(大) は Must、Demo直後は Should。

## リリースノート IA（将来の別ページ分離を担保）

**現在**: S8 として index 内に1セクション、id=`#releases`。
**将来**: `/ja/releases/` `/en/releases/` に分離（index は最新3件ティザー+「全リリースを見る」に縮退）。

移行を楽にする3点（最初からやる）:
1. **データ化**: リリース情報を content collection (`src/content/releases/`) か `releases.json` で持ち、
   S8 は map して表示するだけにする。別ページ化＝同データを別 route で render するだけ
2. **version込みキー**: `spv_release_v###_date` / `spv_release_v###_note`（移設可能に）
3. **リンク定数化**: Header/Footer の releases リンク先を1定数(`RELEASES_HREF`)参照。`#releases`→`/releases/`差替えが1点で済む

## 技術前提

- Astro + Cloudflare Pages、astro:i18n。ja/en は**個別 index.astro**（[lang]動的ルートではない）。releases も同方式
- i18n キー: フラット式 `spv_<section>_<element>`、chrome.i18n 互換。親ハブと同じ packages/i18n
- 既存プレースホルダ上書き対象: `spv_hero_title` / `spv_hero_subtitle` / `common_nav_back_to_studio`（現状 "TODO"）。他は新規追加
- **YouTube は facade 必須**（初期 iframe を入れない＝JS-zero指向・LCP・「ネットワークゼロ」訴求と矛盾回避）。サムネは self-host か youtube-nocookie
- 対応サイトは商標回避でテキスト+中立アイコン
- 親ハブは Brew暖色+Fraunces。**SPV-2 LP はアクセント色解放**＝ネオン計器カラーが主役（色階層で親子表現）

---

# 確定原稿（ja / en）

> ブランド名 SPV-2・モジュール名(Oscilloscope等)・技術語(MV3/tabCapture/Camelot/Strudel)は英字維持。
> 数値(45 users)は意図的に不掲載（変動 + 少数だと逆効果。代わりに「無料/MIT/トラッキングなし」で一貫）。

## S0 Header
| key | ja | en |
|---|---|---|
| spv_nav_modules | 計器 | Modules |
| spv_nav_sites | 対応サイト | Sites |
| spv_nav_privacy | プライバシー | Privacy |
| spv_nav_releases | 更新履歴 | Releases |
| spv_nav_cta | 追加する | Add to Chrome |
| common_nav_back_to_studio | Studio に戻る | Back to Studio |

## S1 Hero
| key | ja | en |
|---|---|---|
| spv_hero_title | SPV-2 | SPV-2 |
| spv_hero_tagline | プロの計測器を、リスナーの相棒に。 | Studio-grade meters, in your sidebar. |
| spv_hero_subtitle | ブラウザのサイドパネルに、音を"読む"ための計器を5つ。波形・スペクトラム・音名・BPM・キーを、リアルタイムで。 | Five real-time meters for reading sound — waveform, spectrum, notes, BPM, and key — right in your browser's side panel. |
| spv_hero_cta | Chrome に追加 | Add to Chrome |
| spv_hero_cta_note | 無料 / オープンソース / トラッキングなし | Free · Open source · No tracking |

（H1=製品名 SPV-2 固定、視覚的主役は tagline。tagline を H1 同等以上の存在感で組む想定）

## S2 Demo Video
| key | ja | en |
|---|---|---|
| spv_demo_heading | 動いているところを。 | See it move. |
| spv_demo_lede | 30秒で、5つの計器が音にどう反応するかがわかる。 | Thirty seconds to see all five meters react to live sound. |

## S3 Five Modules
| key | ja | en |
|---|---|---|
| spv_modules_heading | 5つの計器 | Five meters |
| spv_modules_lede | それぞれが音のひとつの側面を映す。抽象的なアートではなく、目で"読める"計測器として。 | Each meter reads one dimension of sound — built to be read, not just admired. |
| spv_modules_oscilloscope_name | Oscilloscope | Oscilloscope |
| spv_modules_oscilloscope_desc | 波形そのものを時間軸で表示。Waveform と Lissajous (XY) を切り替え、時間/垂直スケールとオートトリガーで位相やステレオ像を確かめられる。 | Watch the raw waveform over time. Switch between Waveform and Lissajous (XY), tune the time and vertical scale, and let auto-trigger lock the trace to check phase and stereo image. |
| spv_modules_spectrum_name | Spectrum Analyzer | Spectrum Analyzer |
| spv_modules_spectrum_desc | 32バンドの対数FFTで低域から高域までの帯域バランスを一望。ピークホールドと周波数ラベルで、ミックスの抜けや被りがひと目でわかる。 | A 32-band logarithmic FFT lays out the whole spectrum from lows to highs. Peak-hold and frequency labels make it easy to spot a muddy low end or a harsh top. |
| spv_modules_chromagram_name | Chromagram | Chromagram |
| spv_modules_chromagram_desc | 鳴っている音名（ピッチクラス）をポリフォニックに検出し、ピアノ鍵盤に重ねて表示。Note Flow がコード進行を流れる帯として見せる。 | Detects the pitch classes sounding right now — polyphonically — and maps them onto a piano keyboard. Note Flow scrolls the harmony past as a moving ribbon. |
| spv_modules_bpm_name | BPM Detection | BPM Detection |
| spv_modules_bpm_desc | スペクトラルフラックスでオンセットを拾い、自己相関でテンポを推定。曲のBPMが走るので、ビートマッチや採譜の当たりがつけやすい。 | Picks up onsets with spectral flux and estimates tempo by autocorrelation. The track's BPM reads out live — a quick reference for beatmatching or transcribing. |
| spv_modules_key_name | Key Detection | Key Detection |
| spv_modules_key_desc | クロマ分布からキーを推定し、DJ向けに Camelot 記法でも表示。次の一曲とハーモニックにつなぐ判断が速くなる。 | Estimates the key from the chroma profile and shows it in DJ-friendly Camelot notation — so you can pick a harmonically matching next track in seconds. |
| spv_modules_trackinfo_name | Track Info | Track Info |
| spv_modules_trackinfo_desc | 曲タイトル・チャンネル名・BPM・キーをひとまとめに。今かかっている曲の素性が、計器の隣でいつでも確認できる。 | Title, channel, BPM, and key in one compact readout — the identity of whatever's playing, always next to the meters. |

## S4 Themes
| key | ja | en |
|---|---|---|
| spv_themes_heading | 40以上のテーマ | 40+ themes |
| spv_themes_body | Default・Neon・Monochrome・Amber・Phosphor・Sakura ほか、10種を内蔵。さらに Strudel 由来の派生テーマで合計40以上。気分やブースの照明に合わせて計器の色を変えられる。 | Ten built in — Default, Neon, Monochrome, Amber, Phosphor, Sakura and more — plus Strudel-derived variants for 40+ in total. Recolor the meters to match your mood or the lighting in the booth. |
| spv_themes_strudel | Strudel auto-sync: strudel.cc を映しているときは、エディタのテーマに計器の配色が自動で追従する。 | Strudel auto-sync: when you're capturing strudel.cc, the meters automatically follow your editor's theme. |

## S5 Supported Sites
| key | ja | en |
|---|---|---|
| spv_sites_heading | 対応サイト | Where it works |
| spv_sites_lede | 主要な音楽・動画サービスにそのまま対応。足りなければ、どんなサイトにも広げられる。 | Works out of the box across the major music and video services — and extends to anywhere you need. |
| spv_sites_group_streaming | ストリーミング | Streaming |
| spv_sites_group_video | 動画 | Video |
| spv_sites_group_creator | クリエイター / DJ | Creator / DJ |
| spv_sites_group_livecoding | ライブコーディング | Live coding |
| spv_sites_all | + すべてのサイト — 設定 > 詳細 から、任意のサイトに対応を広げられる。 | + All websites — enable any site you like under Settings › Advanced. |
| spv_sites_drm_note | 注記: DRM で保護されたストリーム（Spotify Premium・Apple Music のサブスク・Tidal HiFi など）は、ブラウザ側の制約で音を取得できない場合があります。 | Note: DRM-protected streams (such as Spotify Premium, Apple Music subscriptions, or Tidal HiFi) may not be capturable — this is a browser-side limitation. |

グループ内サービス（中立アイコン+テキスト、デザイナー領分）:
- Streaming: Spotify / Apple Music / Amazon Music / Tidal / YouTube Music
- Video: YouTube
- Creator / DJ: SoundCloud / Bandcamp / Beatport / Mixcloud
- Live coding: Strudel

## S6 Zero Interference / Privacy
| key | ja | en |
|---|---|---|
| spv_privacy_heading | 何も邪魔しない | Zero interference |
| spv_privacy_lede | SPV-2 はページに触れず、あなたを追わず、外に何も送らない。音は Chrome の tabCapture でその場で受け取り、拡張の中だけで処理が完結する。 | SPV-2 doesn't touch the page, doesn't track you, and doesn't send anything out. Audio is captured via Chrome's tabCapture API and processed entirely inside the extension. |
| spv_privacy_point_1_title | content script なし | No content scripts |
| spv_privacy_point_1_desc | ページの DOM に一切注入しない。表示も操作も、見ているサイトはそのまま。 | Nothing is injected into the page's DOM. The site you're viewing stays exactly as it is. |
| spv_privacy_point_2_title | トラッキングなし | No tracking |
| spv_privacy_point_2_desc | アナリティクスも、テレメトリも、広告もなし。あなたの聴取データは集めない。 | No analytics, no telemetry, no ads. None of your listening is collected. |
| spv_privacy_point_3_title | ネットワークゼロ | Zero network |
| spv_privacy_point_3_desc | 外部へのリクエストは一切発生しない。すべての処理が端末の中で閉じている。 | No outbound requests at all. Everything happens on your machine. |
| spv_privacy_tech_note | Manifest V3 / Offscreen Document で音声処理 / MIT ライセンスのオープンソース。 | Manifest V3 · audio processed in an Offscreen Document · open source under the MIT license. |

## S7 SP 3 Principles（キーワードは英字固定、説明のみ翻訳）
| key | ja | en |
|---|---|---|
| spv_principles_heading | 3つの原則 | Three principles |
| spv_principles_zeroinjection_kw | Zero Injection | Zero Injection |
| spv_principles_zeroinjection_desc | ページには一切触れない。content script も DOM への注入もしない。 | Never touch the page — no content scripts, no DOM injection. |
| spv_principles_localbydefault_kw | Local by default | Local by default |
| spv_principles_localbydefault_desc | すべてローカルで処理する。サーバーもテレメトリも持たない。 | Everything runs locally — no servers, no telemetry. |
| spv_principles_onepanel_kw | One panel, one job | One panel, one job |
| spv_principles_onepanel_desc | サイドパネル1枚に計測を集約。タブを切り替える必要はない。 | All the meters live in one side panel — no tab-switching. |

## S8 Release Notes（version毎にキー分割＝将来別ページ移植可）
| key | ja | en |
|---|---|---|
| spv_releases_heading | 更新履歴 | Release notes |
| spv_releases_lede | 初版から、計器・対応サイト・テーマ・対応言語を着実に増やしてきた。 | Since launch, the meters, supported sites, themes, and languages have grown steadily. |
| spv_release_v100_date | 2026-04-07 | 2026-04-07 |
| spv_release_v100_note | 初版リリース。5つの計器（Oscilloscope / Spectrum / Chromagram / BPM / Key）と Track Info、10種のテーマ、自由に組めるレイアウトを搭載。 | First release. Five meters (Oscilloscope, Spectrum, Chromagram, BPM, Key) plus Track Info, ten themes, and a customizable layout. |
| spv_release_v110_date | 2026-04-14 | 2026-04-14 |
| spv_release_v110_note | 多サイト対応。YouTube に加え10以上のサイトへ対応し、All websites モードを追加。Oscilloscope に垂直スケール、権限ダイアログの前に確認モーダルを用意。 | Multi-site support. Added 10+ sites beyond YouTube, an All-websites mode, a vertical scale for the Oscilloscope, and a confirmation step before the permissions dialog. |
| spv_release_v120_date | 2026-05-02 | 2026-05-02 |
| spv_release_v120_note | Strudel 統合。Strudel 由来の41テーマを追加し、strudel.cc では計器の配色がエディタのテーマに自動で追従。テーマ選択 UI も追加。 | Strudel integration. Added 41 Strudel-derived themes; on strudel.cc the meters auto-sync to your editor theme. New theme picker, too. |
| spv_release_v130_date | 2026-06-01 | 2026-06-01 |
| spv_release_v130_note | 日本語とドイツ語に対応（拡張の UI と Web Store の説明文）。 | Japanese and German localization (both the extension UI and the Web Store listing). |
| spv_release_v131_date | 2026-06-15 | 2026-06-15 |
| spv_release_v131_note | Spectrum の低域描画を改善。最低域のバーが平坦になる問題を線形補間で解消し、20Hz まで滑らかに。あわせてスペイン語に対応。 | Smoother low-end in the Spectrum view: the lowest bars no longer flatten out, now interpolated cleanly down to 20 Hz. Spanish localization added. |

（v1.3.1 は 06-15 = 公開時に未来日なら "Coming" 表示 or data 上 draft フラグで出し分け。エンジニア/デザイナー判断）

## S9 Final CTA
| key | ja | en |
|---|---|---|
| spv_finalcta_heading | 音を、見はじめよう。 | Start watching your sound. |
| spv_finalcta_body | サイドパネルを開けば、いつもの曲が計器の上で動きだす。 | Open the side panel and the song you're already playing comes alive on the meters. |
| spv_finalcta_button | Chrome に追加 | Add to Chrome |
| spv_finalcta_trust | 無料 / MIT ライセンス / トラッキングなし | Free · MIT licensed · No tracking |

## S10 Footer
| key | ja | en |
|---|---|---|
| spv_footer_tagline | Tipsy Tap Studio のインタラクティブな実験のひとつ。 | One of Tipsy Tap Studio's interactive experiments. |
（GitHub / Web Store / 言語切替リンクは common キー再利用可、エンジニア判断）

---

# 次セッションの実装手順（想定）

1. デザイナー発注: SPV ネオンパレットのトークン化（背景 #0A0A0A〜#111 + シアン/マゼンタ〜パープル/グリーン）、
   親ハブからの色階層、5モジュールブロックの交互レイアウト寸法、対応サイトgrid、facade動画UI
2. i18n: 上記キーを ja/en に追加（既存 spv_hero_title/subtitle・common_nav_back_to_studio 上書き）。parity 厳守
3. リリースデータ: releases.json or content collection を作成（version/date/note×lang）
4. コンポーネント: Hero / DemoVideo(facade) / ModuleBlock / ThemeGrid / SiteGrid / PrincipleCard /
   ReleaseTimeline / FinalCTA / StudioBackLink（spv 既存パターン確認）
5. apps/spv/src/pages/{ja,en}/index.astro 実装、Header/Footer
6. ビルド + プレビュー + デザイナーレビュー + ユーザー実機確認 → push（要確認）

# 未決事項（次セッション着手前に確認）
- v1.3.1 を公開時点でどう出すか（未来日なら "Coming" or 非表示の出し分け）
- 親ハブ Header/Footer コンポーネントを spv で再利用するか、spv 専用に作るか
- ヒーロービジュアル（計器の実描画 静止画/軽量ループ）の素材をどう用意するか
- 対応サイトの中立アイコンの素材（音符/波形等の汎用アイコンセット選定）

---

## 将来アイデア: ロゴアニメ = Lab ビジュアライザープロダクト化（2026-06-07 着想）

ヒーローのロゴモザイクアニメ（280タイル × 8パターン × BPM同期）が、それ自体 Lab の
プロダクトになりうる。構想:
- **パターン**（diagonal / vertical / horizontal / radial / flicker / pulse / awaken / random …）と
  **順番**、**トランジション**（crossfade 等）、**各尺**を「ブロック」で並べて組める
- **BPM に応じてループ**（テンポ同期）。タイルの点灯を任意のリズムパターンで駆動
- ユーザーがブロックを組み替えて自分の「ネオン・シーケンス」を作れる Lab 実験
- SPV-2 の計器思想（音を見る）と地続き: 音→タイル発光のマッピングを開けば簡易ビジュアライザに
- 現状の LogoMosaic.astro の data-pattern 切替 + setTimeout チェーンが原型。これを
  パラメトリックに外出しすれば Lab ツールになる
