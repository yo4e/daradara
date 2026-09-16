# Issue #7: limited trigger + Return Window 実機実験

> 対象: Issue #7  
> 前提: PR #6 の product viability 再調査  
> 目的: UIを増やすことではなく、trigger → Boundary Gate → Thought Parking → Rest Mode → later return を一周させ、「使う必然」が手動Web版より増えるかを見る。

## 今回選ぶ方式

### limited trigger

**desktop shortcut / hotkey**

実験用URL:

```text
https://yo4e.github.io/daradara/?trigger=hotkey
```

ローカル確認:

```text
http://localhost:8000/?trigger=hotkey
```

OS側のショートカット、ランチャー、ホットキー機能のいずれかから上記URLを1操作で開く。

このrepoでは常駐アプリやbrowser extensionは作らない。今回見るのは「ホーム画面やブックマークを探して開く」より、境目で反射的に呼び出しやすくなるかだけ。

### Return Window

**明示的なParking Inbox**

- Parking直後には見せない
- Rest Mode中には見せない
- Rest Mode終了直後にも自動表示しない
- Boundary Gate側で本人が「預けたものを見る」を選んだときだけ表示する
- 操作は「残す / コピー / 捨てる」のみ
- due date、priority、project、完了チェック、通知は足さない

## 一周させる流れ

```text
[実際の境目]
  ↓ hotkey / shortcut
Boundary Gate
  ├─ 続ける → 終了
  └─ 止まる / 預ける
          ↓
Thought Parking
          ↓
Rest Mode
          ↓
[その場ではParkingを見ない]

[後刻、自分で開く]
Parking Inbox
  ├─ 残す
  ├─ コピー
  └─ 捨てる
```

## 実機で最低数回見ること

最低3回、できれば別種類の境目で試す。

例:

1. 仕事を一つ終えて、次のIssueやメールへ移りそうなとき
2. SNS / 動画 / ニュースをもう一つ開きそうなとき
3. 休み始めた後で「これだけやろう」が浮かんだとき

各回で数値評価を義務にしない。Issue #7へ短い自然文で残せばよい。

観察点:

- **邪魔さ**: hotkeyを押す行為やBoundary Gateが余計な儀式になっていないか
- **使う必然**: 手動でサイトを探すより、境目で思い出して使えるか
- **Boundary Gate**: ただのloading screenになっていないか
- **Parkingの安心感**: 「忘れないから今やらなくていい」が本当に成立するか
- **Restへの復帰**: Parking後に別作業へ逸れずRest Modeへ戻れるか
- **Return Window**: black hole不安を減らすか、それともタスク管理感を増やすか

## 判断

実機結果をIssue #7へ残し、次のどれか1つを選ぶ。

### この方向を伸ばす

hotkeyでも境目への到達が十分自然で、Parking + later returnが安心を作る。

次段では配布や操作摩擦を磨く余地があるが、Garden / streak / pointsへはまだ進まない。

### trigger方式を変える

Boundary Gate / Parking / Return Window自体は成立感があるが、hotkeyでは「自分から思い出す」負担がまだ大きい。

次段では限定site trigger、work-session終了trigger、時間帯限定trigger等のうち1方式だけを再検証する。

### concept pivot

triggerを軽くしてもBoundary Gateが邪魔、Parkingが既存メモで十分、Return Windowがタスク管理感を増やすなど、中心ループ自体に成立感がない。

この場合はUI磨きや機能追加ではなく、コンセプトを再検討する。

## 今回やらない

- Garden / Map
- streak / points / quests
- detailed analytics
- AI recommendation
- account / social
- browser extension
- OS常駐
- 複数trigger
- 自動digest
- 高機能task manager
