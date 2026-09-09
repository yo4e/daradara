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

`prototype/` に、ビルド不要の最小プロトタイプがあります。

```bash
cd prototype
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開くと、次の中心ループを試せます。

```text
続けそうになる
  ↓
Boundary Gate
  ├─ 続ける → 終了
  ├─ 止まる → Unwind → Rest Mode
  └─ 思いつきを預ける → Rest Mode
                         ↑
                         └─ Thought Parking
```

### 現段階の重要な制約

このWeb prototype は、他アプリや別サイトを開こうとした瞬間を自動検知しません。

いま検証するのは **「境目にこの介入があったら使えるか」** という中心メカニクスです。Shortcut、browser extension、OS automationなどの trigger layer は、このループを実機で確認してから検討します。

データはブラウザの `localStorage` にだけ保存します。アカウント、サーバー、外部送信はありません。

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

まず **Boundary Gate → Rest Mode → Thought Parking → Rest Mode** が実際に使えるかを見ます。

## 名前について

対外名称の本命は **ダラリカ / darareco** です。日本語では「ダラリカ」を主表記、`darareco` を英字表記として併記します。

`daradara` はこの構想の原型・コードネームとして残します。

ネーミング調査は一次スクリーニングであり、正式公開前には商標、ドメイン、主要SNSハンドル等を再確認します。

## Research

調査成果は `docs/research/` にあります。

- [`competitors.md`](docs/research/competitors.md) — 類似サービス調査
- [`behavior-mechanics.md`](docs/research/behavior-mechanics.md) — 競合の行動設計メカニクスと2026-09-09再確認
- [`naming.md`](docs/research/naming.md) — `daradara` ネーミング調査
- [`naming-darareco.md`](docs/research/naming-darareco.md) — `darareco（ダラリカ）` 一次スクリーニング
- [`summary.md`](docs/research/summary.md) — 初期のプロダクト判断・MVP・検証仮説

## Status

**MVP v2 prototype / Issue #3**

PR #4 のv1を基準点として、中心メカニクスを「休み方の提示」から「行動の境目を選び直すこと」へ再設計しています。
