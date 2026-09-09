# ダラリカ / darareco 最小MVP仕様 v2

## 1. 目的

このMVPは「正しい休養法」を教えるものではない。

検証する中心仮説は次。

> **休まず次の行動へ流れそうな境目に一度だけ介入し、続ける / 止まる / 思いつきを預ける を選び直せるようにすると、無意識の継続を休養側へ戻しやすくなるか？**

さらに、休養中に用事やアイデアを思いついたとき、

> **一行だけ未来へ預け、その場で処理する導線を置かなければ、「忘れたくないから今やる」から休養へ戻れるか？**

を合わせて見る。

医学的な回復量、疲労度、健康状態は評価しない。

設計判断の詳細は [`core-mechanic-v2.md`](core-mechanic-v2.md) を参照。

## 2. v1からの変更

PR #4 のv1:

```text
Start → Recovery Check-in → Recovery Menu → Recovery Session → Thought Parking → Reflection
```

v2:

```text
[1. Boundary Gate]
   ├─ 「このまま続ける」 → [5. Exit]
   ├─ 「いったん止まる」
   │      ↓
   │   [2. Unwind]
   │      ↓ 1 tap
   │   [3. Rest Mode]
   │      ├─ 「また思いついた」 → [4. Thought Parking] → Rest Mode
   │      └─ 「ここまでにする」 → [5. Exit]
   │
   └─ 「思いつきだけ預ける」
          ↓
      [4. Thought Parking]
          ↓
      [3. Rest Mode]
```

主な変更:

- Startを **Boundary Gate** へ変更
- Recovery Check-inを **Unwind** へ変更
- Recovery Menuを削除
- 大きなcountdown timerを削除
- Thought Parkingを中心メカニクスへ昇格
- Reflectionを削除

## 3. 各状態

### 3.1 Boundary Gate

**目的:** 「次もやる」を禁止するのではなく、自動的な継続を一度だけ選択に戻す。

表示:

- `ダラリカ / darareco`
- 「もう一つやる前に、一回だけ止まる。」
- 説明: 仕事、SNS、動画、返信など何であっても、続ける前に選び直す場所であること

選択肢:

1. **いったん止まる**
2. **思いつきだけ預ける**
3. **このまま続ける**

「このまま続ける」を正規の選択肢にする。休まなかったことを失敗扱いしない。

#### MVP上の制約

Web prototype は、他アプリや別サイトを開く瞬間を自動検知しない。

この画面は手動で起動し、**境目に介入があったときのメカニクス**だけを試す。

自動介入、Shortcut、browser extension等は今回の対象外。

### 3.2 Unwind

**目的:** 疲労名を正確に当てさせず、いま減らしたい負荷だけを軽く選ぶ。

1タップ選択:

- 考えること
- 身体を使うこと
- 画面や音の刺激
- わからない。とにかく止まりたい

選択後はメニューを挟まず、そのまま Rest Modeへ進む。

スコア化、診断、原因推定、医学的推薦はしない。

### 3.3 Rest Mode

**目的:** タイマーを完遂する場所ではなく、**次の行動を決めなくてよい状態**を作る。

表示:

- 「いまは、次を決めない。」
- Unwindに応じた短いcue
- 静かな視覚変化
- 「また思いついた」
- 「ここまでにする」

cue例:

- `thinking` → 「答えを出さない時間にする。」
- `body` → 「身体をどこかに預けていい。」
- `stimulus` → 「情報を増やさない。」
- `unsure` → 「理由を決めなくていい。」
- `thought` → 「預けた。いまはやらなくていい。」

時間:

- 暫定で5分を目安にする
- 画面に大きなcountdownを出さない
- 5分経過後は「目安の時間は過ぎた。急いで戻らなくて大丈夫。」とだけ表示する
- 途中で終えてよい
- 自動でExitへ送らない

視覚変化:

- ごく遅いambient animationのみ
- 呼吸や操作を同期させる指示はしない
- `prefers-reduced-motion` では停止する

### 3.4 Thought Parking

**目的:** メモを取ることではなく、「忘れたくないから今やる」を未来へ退避させ、休養へ戻す。

入口は2つ。

1. Boundary Gateの「思いつきだけ預ける」
2. Rest Modeの「また思いついた」

仕様:

- 1行テキストのみ
- 最大120文字
- 保存先は `localStorage`
- 保存後は入力を空にする
- 一覧を表示しない
- タスク化、期限、優先度、リマインダー、外部連携を置かない
- 保存後は **自動的にRest Modeへ戻す**
- Rest Modeでは「預けた。忘れないから、いまはやらなくていい。」を短く返す

Boundary GateからParkingした場合、Unwindを挟まずRest Modeへ入ってよい。

### 3.5 Exit

**目的:** 休養結果を採点せず介入を終える。

「このまま続ける」から来た場合:

- 「続けるを選んだ。」
- 「いったん選び直したことだけで、この介入は終わり。」

Rest Modeから来た場合:

- 「ここまで。」
- 「続けても、まだ止まっていてもいい。」
- 作業再開を促すCTAは置かない

Reflection、点数、streak、達成表示は置かない。

## 4. ローカルデータ

### `darareco.thoughts`

```json
[
  {
    "text": "あとで返信する",
    "createdAt": "ISO-8601"
  }
]
```

### `darareco.sessions`

Rest Modeへ入った場合のみ保存する。

```json
[
  {
    "entry": "pause | park",
    "unwind": "thinking | body | stimulus | unsure | thought",
    "plannedMinutes": 5,
    "startedAt": "ISO-8601",
    "endedAt": "ISO-8601",
    "parkedCount": 1
  }
]
```

`entry=park` の場合、`unwind=thought` でよい。

「このまま続ける」はMVPでは保存しなくてよい。解析用イベント収集は導入しない。

内容は端末内だけに保存し、Thought Parking本文を分析・外部送信しない。

## 5. MVPに含めないもの

- Recovery Menu
- 大きなcountdown timer
- Reflection
- Recovery Garden
- Recovery Map
- streak / バッジ / ポイント / quests
- アカウント / 認証
- SNS
- クラウド同期
- 詳細日記
- 疲労スコア
- AI推薦
- 医療助言・診断
- タスク管理機能
- OSレベルの自動介入
- browser extension
- 通知スケジュール

## 6. 受け入れ条件

1. 起動直後に「止まる / 預ける / 続ける」を選べる。
2. 「続ける」を選んでも失敗・警告にならない。
3. 「止まる」から1タップのUnwindだけでRest Modeへ入れる。
4. Recovery Menuがない。
5. Rest Modeで大きなcountdownを表示しない。
6. Rest Modeは5分経過後も自動で作業再開へ送らない。
7. Boundary GateからThought Parkingへ直接入れる。
8. Rest Mode中もThought Parkingを使える。
9. Parking保存後は一覧やタスク画面を出さずRest Modeへ戻る。
10. Reflection、点数、streakがない。
11. アカウントなし、ローカル保存のみで一周試せる。
12. `prefers-reduced-motion` でambient animationが停止する。

## 7. 最初の観察ポイント

- Boundary Gateは「休めという圧」ではなく「選び直す間」として感じられるか
- 「このまま続ける」があることで介入を受け入れやすくなるか
- Unwindの4択は疲労ラベルより答えやすいか
- Recovery MenuをなくしてRest Modeへ直行する方が楽か
- countdownがないことは安心か、不安か
- Thought Parking直通経路は実際に欲しくなるか
- Parking後、本当に別行動へ行かず休養へ戻れるか
- Rest Modeのambientな手触りは邪魔にならないか

この中心ループを実機で一周してから、trigger layer、Parkingの後処理、時間設定、Garden / Mapを判断する。
