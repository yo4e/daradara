# ダラリカ / darareco

**だらだらすることを、ちゃんと選べるようにする。**

ダラリカは、疲れていても惰性で「もう一つ何かする」へ流れそうなときに、**いったん選び直して休養へ戻るための小さなWebアプリ**です。

生産性を上げるための休憩管理でも、疲労を精密に測る健康アプリでもありません。

> 休む理由を証明しなくても、次へ進む前に一度止まれる。  
> 頭に引っかかった用事は未来へ預けて、いまの休みに戻れる。

## Try it

**Live:** https://yo4e.github.io/daradara/

ブラウザだけで使えます。アカウントやサーバー保存はありません。

## v1

v1 の中心は、**「休み方をたくさん提案すること」ではなく、次へ流れる慣性を一度ほどくこと**です。

```text
desktop shortcut / hotkey
  ↓
Boundary Gate
  ├─ このまま続ける → 終了
  ├─ いったん止まる → Unwind → Rest Mode
  └─ 思いつきだけ預ける → Thought Parking → Rest Mode

Rest Mode
  ├─ 何もしない（デフォルト）
  ├─ 呼吸のガイドを使う（任意・約3分）
  ├─ また思いついた → Thought Parking → Rest Mode
  └─ ここまでにする

[後刻、自分で開く]
Parking Inbox → 残す / コピー / 捨てる
```

### Boundary Gate

「休め」と命令する画面ではなく、**自動的な継続をいったん選択へ戻す場所**です。

- いったん止まる
- 思いつきだけ預ける
- このまま続ける

「このまま続ける」も正規の選択肢です。

### Thought Parking

休んでいる最中に浮かんだ「これだけやっておこう」を、一行だけ未来へ預けます。

保存直後に一覧やタスク画面は出しません。預けた内容は、後刻、自分で Parking Inbox を開いたときだけ確認できます。

### Rest Mode

**何もしないことがデフォルト**です。

大きなcountdown、達成率、streak、採点はありません。5分程度を目安にしますが、途中で終えても、時間を過ぎても構いません。

必要なときだけ、約3分のpaced breathingを任意で使えます。

- breath holdなし
- 強い深呼吸を要求しない
- 表示へ正確に合わせなくてよい
- 途中でいつでもやめられる
- 終了後も作業再開を促さず、通常のRest Modeへ戻る

呼吸ガイドを選ばないことを未完了や失敗として扱いません。

## Product principles

1. 休養を生産性の従属物にしない。
2. 休むための操作を増やしすぎない。
3. 休めなかった日や「続ける」を選んだことを失敗扱いしない。
4. 数字で身体状態を分かったふりをしない。
5. 医療診断・治療の代替を目指さない。
6. 「何もしない」を正当な状態として扱う。
7. 思いついた用事を、その場で実行する導線に変えない。
8. 休養中に作業再開を促さない。

## Data & privacy

v1では、データはブラウザの `localStorage` にだけ保存します。

- アカウントなし
- サーバー保存なし
- クラウド同期なし
- Thought Parking本文の外部送信なし
- AIによる健康判定なし

保存するのは、Thought Parkingの内容と最小限のローカルセッション情報です。

## Shortcut / hotkey

実験用URL:

```text
https://yo4e.github.io/daradara/?trigger=hotkey
```

OS側のショートカットやランチャーへ割り当てると、Boundary Gateを1操作で開けます。

v1ではbrowser extensionやOS常駐監視、自動ブロックまでは実装していません。

## Local development

ビルド不要の静的Webアプリです。

```bash
cd prototype
python3 -m http.server 8000
```

その後、ブラウザで `http://localhost:8000/` を開きます。

GitHub Pagesは `main` の `prototype/\` を `gh-pages` へ同期して公開します。

## Design docs

- [`docs/core-mechanic-v2.md`](docs/core-mechanic-v2.md) — 中心メカニクスと設計判断
- [`docs/MVP.md`](docs/MVP.md) — v1の基礎になったMVP v2詳細仕様
- [`docs/issue-7-experiment.md`](docs/issue-7-experiment.md) — limited trigger / Return Window実験

`MVP v2` は内部の設計反復番号です。2026-09-20時点で、この中心ループとoptional paced breathingまでを**製品v1のfeature-complete範囲**としています。

## Research

調査成果は `docs/research/` に残しています。

- [`competitors.md`](docs/research/competitors.md) — 類似サービス調査
- [`behavior-mechanics.md`](docs/research/behavior-mechanics.md) — 行動設計メカニクス
- [`product-viability-retention.md`](docs/research/product-viability-retention.md) — 継続利用・trigger・Thought Parking回収
- [`mental-recovery-methods.md`](docs/research/mental-recovery-methods.md) — メンタルリカバリー手法のゼロベース調査
- [`recovery-options-deep-dive.md`](docs/research/recovery-options-deep-dive.md) — 即時回復候補5手法の深掘り比較
- [`naming.md`](docs/research/naming.md) / [`naming-darareco.md`](docs/research/naming-darareco.md) — ネーミング調査

## Status

**v1 feature complete — 2026-09-20**

ここから先は機能追加を急がず、実際に使いながら中心ループとoptional paced breathingを観察します。

Issue #13では、呼吸ガイドを実際に使った結果から **残す / 修正する / 削除する** を判断します。これはv1の未完成部分ではなく、v1運用後の検証です。

## License

MIT License. See [LICENSE](LICENSE).

## Name

対外名称は **ダラリカ / darareco**。

日本語では「ダラリカ」を主表記、`darareco` を英字表記として併記します。`daradara` は構想の原型・リポジトリ名として残しています。
