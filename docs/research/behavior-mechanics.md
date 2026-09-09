# 競合の行動設計メカニクス調査

> 初回調査: 2026-09-01 JST  
> 再確認: 2026-09-09 JST
>
> 目的: ダラリカ / darareco を「休憩タイマー＋メモ」に寄せず、ユーザーの行動がどの瞬間に、どんな仕掛けで変わるかを確認し、MVPの中心メカニクスを決める。

## 結論

今回の再確認でも、中心仮説は変わらない。

> **ダラリカの価値は、休み方を詳しく提案することより、休まず次の行動へ流れる境目をいったん選択へ戻し、そこで浮かぶ用事を未来へ預け、休養へ戻れるようにすることに置く。**

現行MVPの Recovery Menu や大きな countdown timer を磨くことは優先しない。

## 1. one sec — 行動の「前」に介入する

one sec は、対象アプリやWebサイトを開く前に小さな Intervention を差し込み、反射的な利用を一度止めて「本当に開くか」を選び直させる。

2026-09-09 の再確認では、公式FAQ / Tutorialで次を確認した。

- Intervention は対象アプリ/サイトを開く前に出る
- 深呼吸など複数の Intervention type を選べる
- 即時だけでなく Delayed / Re-Intervention のタイミングも設計対象
- Healthy Alternatives で別行動への分岐も置ける

ダラリカへの示唆は、**介入内容より介入位置が重要**ということ。

候補となる境目:

- 仕事をもう一つ始める前
- SNSを開く前
- 動画をもう一本見る前
- 「これだけ返信してから休む」を実行する前

MVPではOSレベルの自動介入までは実装せず、まず手動起動の Boundary Gate でメカニクス自体を検証する。

Sources:
- https://one-sec.app/faq/
- https://tutorials.one-sec.app/en/articles/3310978
- https://one-sec.app/

## 2. How We Feel — 大きな軸から状態をほどく

How We Feel は、感情をいきなり自由記述させるのではなく、energy × pleasantness の大きな区分から具体的な感情語へ絞る構造を持つ。公式説明では、感情を理解し、その場で使える strategies を見つけることが中心に置かれている。

ダラリカで重要なのは、感情語の分類そのものではない。

> **疲れている本人に、最初から正確な疲労ラベルを答えさせない。**

そのため v2 では「頭が疲れている / 身体が疲れている…」という診断的な並びより、

- 考えることを減らしたい
- 身体を使うことを減らしたい
- 画面や音など刺激を減らしたい
- わからない。とにかく止まりたい

という、**今から減らしたい負荷**を1タップで選ぶ。

Sources:
- https://howwefeel.org/get
- https://apps.apple.com/us/iphone/story/id1638393948

## 3. Do Nothing. — 休んでいる現在そのものを体験にする

PONOSの Do Nothing. は、「何もしない」時間をアプリの中心に置き、Doing Nothing 中は他アプリを使わないという単純なルールを置いている。

これは、休養の結果を点数化しなくても、**休んでいる最中そのものに意味と手触りを与えられる**ことを示す参考例になる。

ダラリカでは同じルールや報酬をコピーしない。代わりに、

- countdown を主役にしない
- 画面上に次の課題を増やさない
- ごく静かな視覚変化だけを置く
- 動きに合わせることを要求しない
- 「戻る時間」になっても作業再開を促さない

という低圧な Rest Mode を試す。

Source:
- https://apps.apple.com/us/app/do-nothing/id6443578960

## 4. Gentler Streak — 休養を例外扱いしない

Gentler Streak の Activity Path は、運動と回復のバランスを中央の状態空間として扱い、状態によって rest / active recovery を通常の選択肢として出す。

ダラリカへの示唆はポイント制度ではなく、**休む状態をシステム上の正規状態にする**こと。

v2 では「休養を選んだらタイマーを完遂する」のではなく、Boundary Gateを通過した後に Rest Mode へ入ること自体を中心状態とする。

Sources:
- https://docs.gentler.app/understanding-your-activity-path/what-is-the-activity-path
- https://docs.gentler.app/understanding-your-activity-path/interpret-the-activity-path

## 5. Finch — 苦手な行為に別の意味を与える

Finch は Goal 完了を birb の energy / adventure / rewards へ変換し、セルフケアをペットとの関係や進行へ結びつける。

この仕掛けは強いが、ダラリカに quests / streak / 通貨 / 収集を持ち込むと、休養を達成競争へ変えやすい。

参考にするのは原理だけ。

> 「休んだ＝何もしなかった」ではなく、**次の行動へ自動的に流れず、一度選び直した**という意味を体験として返す。

Sources:
- https://help.finchcare.com/hc/en-us/articles/42149821015693-New-User-Guide
- https://help.finchcare.com/hc/en-us/articles/37780000231309-Exploring-the-Finch-Home-Page
- https://help.finchcare.com/hc/en-us/articles/37779940291213-Creating-and-Completing-Goals

## 6. 15minutesnothing — timer + notes + history はすでに成立している

15minutesnothing は、

- 15分の休止セッション
- optional notes
- session tracking
- 過去ノート検索
- calm / minimal を前面に出したUI

を持つ。

したがって、ダラリカが現在の Recovery Session をそのまま洗練し、タイマー・メモ・履歴を増やすだけでは、既存の「静かな休止アプリ」へ近づく。

Thought Parkingは差別化候補だが、入力欄として置くだけでは弱い。

> **「思いついた → 忘れたくない → 今やる」を、「思いついた → 預けた → いまはやらなくていい → Rest Modeへ戻る」に変換すること**

を中心メカニクスとして扱う。

Sources:
- https://apps.apple.com/jp/app/15minutesnothing/id6758890197
- https://15minutesnothing.com/

## v2で採用する4つの設計判断

### A. いつ介入するか

旧:

> 疲れた → 休もうと思う → ダラリカを開く

v2:

> もう一つ続けそうになる → Boundary Gate → 続ける / 止まる / 思いつきを預ける を選び直す

Web prototype では自動検知しない。まず「境目に介入されたら何が起きるか」だけを手動で試す。

### B. どう状態をほどくか

旧:

> 疲れの種類を名付ける

v2:

> 今から何を減らしたいかを1つ選ぶ

診断ではなく、休養モードの言葉を少し変えるためだけに使う。

### C. 休む行為に何の手触りを与えるか

旧:

> 大きな countdown timer を見る

v2:

> Rest Mode に入り、数値を追わず、静かな視覚変化と短い言葉だけがある

5分程度の目安は内部で扱ってよいが、完遂を課題にしない。

### D. Thought Parkingからどう戻すか

旧:

> Session内の入力欄に保存する

v2:

> 「今やりたくなった」瞬間の避難口として開く → 一行だけ預ける → 一覧やタスクを見せず、即Rest Modeへ戻る

Boundary Gate から直接 Parking して Rest Modeへ入る経路も持つ。

## 今回はやらない

- OS / iOS / Android レベルの自動アプリ介入
- ブラウザ拡張
- 通知やスケジュール介入
- 疲労スコア
- AI推薦
- streak / points / quests
- Parkingした内容の整理・タスク化
- Reflectionの蓄積

これらは Boundary Gate → Rest Mode → Parking → Rest Mode が実際に使えるかを確認してから判断する。
