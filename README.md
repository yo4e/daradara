# ダラリカ / darareco

**だらだらすることを、ちゃんと選べるようにする。**

ダラリカは、疲れていても惰性で「もう一つ何かする」へ流れそうなとき、**いったん選び直して休養へ戻る**ための行動設計ツールです。

生産性を上げるための休憩管理や、疲労を精密に測る健康アプリではありません。休む理由を証明しなくても、次へ進む前に一度止まり、頭に引っかかった用事を未来へ預け、いまの休みに戻れることを目指します。

> **ダラリカ / darareco**  
> だらだらすることを、ちゃんと選べるようにする。

## 現在のMVP v2

最初に検証する問いは次です。

> **休まず次の行動へ流れそうな境目に一度だけ介入し、続ける / 止まる / 思いつきを預ける を選び直せるようにすると、無意識の継続を休養側へ戻しやすくなるか？**

MVP v2 は次の流れに絞ります。

1. **Boundary Gate** — 「いったん止まる / 思いつきだけ預ける / このまま続ける」を選ぶ。
2. **Unwind** — 疲労名ではなく「いま何を減らしたいか」を1タップで選ぶ。
3. **Rest Mode** — Recovery Menuや大きなcountdownを挟まず、次を決めなくてよい状態へ入る。
4. **Thought Parking** — 思いついた用事を一行だけ未来へ預け、一覧やタスク画面を見ずRest Modeへ戻る。
5. **Exit** — 休めたかを採点せず、そのまま介入を終える。

設計判断は [`docs/core-mechanic-v2.md`](docs/core-mechanic-v2.md)、詳細仕様は [`docs/MVP.md`](docs/MVP.md) にあります。

## プロトタイプ

**Live:** https://yo4e.github.io/daradara/

`prototype/` に同じビルド不要のプロトタイプがあります。ローカルで試す場合は次の通りです。

```bash
cd prototype
python3 -m http.server 8000
```

中心ループ:

```text
desktop shortcut / hotkey
  ↓
Boundary Gate
  ├─ 続ける → 終了
  ├─ 止まる → Unwind → Rest Mode
  └─ 思いつきを預ける → Rest Mode
                         ↑
                         └─ Thought Parking

[後刻、自分で開く]
Parking Inbox → 残す / コピー / 捨てる
```

### Issue #7 の limited trigger / Return Window

limited trigger は **desktop shortcut / hotkey** だけを試します。

実験用URL:

```text
https://yo4e.github.io/daradara/?trigger=hotkey
```

このURLをOS側のショートカットやランチャーへ割り当て、境目で1操作でBoundary Gateを出せるかを試します。ブラウザ拡張、常駐監視、対象サイトの自動ブロックはまだ実装しません。

Return Window は **明示的なParking Inbox** の1方式だけです。Thought Parking保存直後やRest Mode中には一覧を出さず、Boundary Gate側から自分で「預けたものを見る」を開いたときだけ、`残す / コピー / 捨てる` を選べます。

データはブラウザの `localStorage` にだけ保存します。アカウント、サーバー、外部送信はありません。

実機検証の手順と判断基準は [`docs/issue-7-experiment.md`](docs/issue-7-experiment.md) にまとめます。

## プロダクト原則

1. 休養を生産性の従属物にしない。
2. 休むための操作を増やしすぎない。
3. 休めなかった日や「続ける」を選んだことを失敗扱いしない。
4. 数字で身体状態を分かったふりをしない。
5. 医療診断・治療の代替を目指さない。
6. 「何もしない」を正当な状態として扱う。
7. 思いついた用事を、その場で実行する導線に変えない。
8. 休養中に作業再開を促さない。

## 今回は入れないもの

- Recovery Menu
- 大きなcountdown timer
- Reflection
- Recovery Garden
- Recovery Map
- streak / 連続記録 / points / quests
- アカウント
- SNS機能
- 精密な統計
- AIによる健康判定
- 医療・診断機能
- 高機能なタスク管理
- OSレベルの自動介入
- browser extension

Gardenやstreakへ広げず、まず **hotkey → Boundary Gate → Thought Parking → Rest Mode → later Parking Inbox** が実際に使えるかを見ます。

## 名前について

対外名称の本命は **ダラリカ / darareco** です。日本語では「ダラリカ」を主表記、`darareco` を英字表記として併記します。

`daradara` はこの構想の原型・コードネームとして残します。

ネーミング調査は一次スクリーニングであり、正式公開前には商標、ドメイン、主要SNSハンドル等を再確認します。

## Research

調査成果は `docs/research/` にあります。

- [`competitors.md`](docs/research/competitors.md) — 類似サービス調査
- [`behavior-mechanics.md`](docs/research/behavior-mechanics.md) — 競合の行動設計メカニクスと2026-09-09再確認
- [`product-viability-retention.md`](docs/research/product-viability-retention.md) — 継続利用・trigger・Thought Parking回収の2026-09-13再調査
- [`mental-recovery-methods.md`](docs/research/mental-recovery-methods.md) — メンタルリカバリー手法のゼロベース調査（Issue #11）
- [`recovery-options-deep-dive.md`](docs/research/recovery-options-deep-dive.md) — 即時回復候補5手法の深掘り比較と最小実験案
- [`naming.md`](docs/research/naming.md) — `daradara` ネーミング調査
- [`naming-darareco.md`](docs/research/naming-darareco.md) — `darareco（ダラリカ）` 一次スクリーニング
- [`summary.md`](docs/research/summary.md) — 初期のプロダクト判断・MVP・検証仮説

## Status

**MVP v2 / Issue #7 experiment**

PR #4 のv1を基準点として中心メカニクスを「行動の境目を選び直すこと」へ再設計し、PR #6 の再調査を受けて、Issue #7 では **desktop shortcut / hotkey + explicit Parking Inbox** に限定して trigger → park → rest → later return を検証します。
