# Product viability / repeat-use research

> 調査日: 2026-09-13 JST  
> 対象: Issue #3 / MVP v2  
> 問い: 中心メカニクスが面白いだけでなく、実際に使われ続ける理由があるか。

## 結論

現行MVP v2の `Boundary Gate → Unwind → Rest Mode → Thought Parking` は、単体のWebアプリとしては弱い。

理由は単純で、最も難しい行動である

> 「休まず次へ流れそうな瞬間に、ダラリカを思い出して自分から開く」

をユーザーに要求しているから。

一方、ダラリカは Finch / How We Feel のような daily content、streak、育成、履歴・洞察を意図的に持たない。したがって「毎日わざわざ開きたくなる報酬」を追加する方向は、プロダクト原則と衝突しやすい。

そのため現時点で最も成立可能性が高い形は次。

> **必要な境目にダラリカ側から現れ、今やらなくてよいように思いつきを一時退避し、そのまま休養へ戻せる装置。**

つまり **trigger layer は周辺機能ではなく、価値成立を検証すべき中心仮説の片翼** と扱う。

ただし自動介入だけでも十分ではない。friction型アプリには habituation / attrition があるため、ダラリカは単なる「待たせる画面」になってはいけない。

差別化候補は、

- **Boundary Gate**: 続ける / 止まる を本人に返す
- **Thought Parking**: 「忘れたくないから今やる」をその場で解く
- **Rest Mode**: 保存直後に別の作業面へ出さず休養へ戻す
- **Return Window**: 預けた内容を休養中ではなく、安全な後刻に返す

の4点を一つのループにすること。

---

## 1. 続けて使われるサービスは、何を再訪理由にしているか

### A. one sec / ScreenZen / Opal — 「自分から開く」のではなく境目に現れる

one sec は対象アプリを開こうとした瞬間に intervention を差し込み、続行か中止かを選ばせる。Immediate / Delayed / Re-Intervention まであり、ブラウザにも広げている。

peer-reviewed field studyでは、6週間で対象アプリを開こうとする試行自体が減り、介入時にも一定割合で開くのを中止した。controlled experimentでは、単なるメッセージより **「開かない選択肢をその場に出すこと」** の効果が強かった。

ScreenZenも、アプリ起動前のdelay、scroll interruption、利用回数・時間制限、scheduleを中心にしている。

Opalも Rules / Focus Timer / Deep Focus のように、利用者の注意を本人が思い出して取り戻すより、設定済みの制約が自動で働く構造。

**示唆:**
ダラリカのBoundary Gateは、内容よりまず **出現位置** が価値を左右する。

### B. Finch — 育成・報酬・streak・日替わり要素で戻す

Finchは、

- 毎日のgoal
- birbのadventure / discovery
- streak
- daily quests
- weekly milestone
- seasonal event
- rewards / shop

を重ねて再訪理由を作っている。

これは強力だが、同時に「セルフケアのためにアプリ内作業が増える」危険もある。コミュニティではreward設計や毎日埋める圧が負担になったという離脱理由も見られる。

**示唆:**
ダラリカはこの retention model を真似しない方がよい。休養を維持するために新たなノルマを作ると、存在理由が逆転する。

### C. How We Feel / mood tracking — 蓄積した履歴が次の価値になる

How We Feelは低負荷なcheck-inを入口にしつつ、

- charts
- weekly insights
- patterns
- lifestyle correlation
- friends sharing
- tools

へ価値を蓄積する。

一回目より「何回か使った後」の自己理解が再訪理由になる。

**示唆:**
ダラリカには現状この蓄積価値がない。ただし、詳細分析を足すと mood tracker 化するので、必要なら「自分が止まりやすい境目」程度の極小フィードバックに限定する。

### D. Todoist / Reminders / Keep — capture後の回収可能性が安心を作る

Todoist Inboxは「頭から素早く出して、あとでreviewして整理する」ことを明示している。Quick Addは2026年現在もcapture速度を強く磨いている。

Apple Reminders、Google Keepも、別作業中・ホーム画面・音声などから素早く捕捉し、後で通知・一覧へ戻せる。

**示唆:**
Thought Parkingの「一行で預ける」だけでは capture 系に容易に代替される。

ダラリカ固有の価値にするには、

> **捕捉したあと、その内容を見せず、実行にも繋げず、休養へ戻す**

ことに加え、

> **後で必ず返ってくる**

ところまで設計する必要がある。

---

## 2. 離脱要因から見た注意点

### frictionは効くが、慣れる

one secの2023年研究では介入効果が6週間維持された一方、初期数週間でdismiss率は低下した。

2026年のone secを使った6週間のpreprintでは、delayを段階導入してもretention改善は見られず、条件にかかわらず **65–70%程度のdropout** が報告されている。

ScreenZenについても、ユーザー報告では「最初は考え直すが、そのうちcountdownをただ待つようになった」という例がある。

**示唆:**
Boundary Gateを毎回同じ摩擦として出すだけでは、やがて loading screen になる可能性が高い。

必要なのは摩擦の強さではなく、

- 本当に危ない境目だけに絞る
- 「続ける」を正規選択肢にする
- 介入時に実用価値を返す
- 必要なら一時停止・例外設定できる
- intervention自体を目的化しない

こと。

ダラリカでは Thought Parking がこの「実用価値」になり得る。

---

## 3. どんな瞬間なら使いたくなるか

### シナリオ1: 仕事を一つ終えた直後

状態:

- 疲れている
- しかし次のタブ / 次のIssue / メールへ反射的に移りそう

価値:

- 「休むアプリを開く」ではなく、次へ移る直前にBoundary Gateが出る
- 続けてもよい
- 頭にある次の作業だけParkingして止まれる

成立度: **高い**

### シナリオ2: SNS / 動画をもう一つ開く直前

状態:

- 本人は明確に「休みたい」と考えていない
- 自動行動が続いている

価値:

- triggerがなければダラリカを思い出しにくい
- one sec / ScreenZenとの競合領域
- ダラリカは「ブロック」ではなく、Parkingして休む経路を持てる

成立度: **triggerありなら高い / 手動起動では低い**

### シナリオ3: 休み始めたが「返信だけ」「これだけ」が浮かんだ瞬間

状態:

- すでに休もうとしている
- 忘れる不安で作業へ戻りそう

価値:

- 一行だけ預ける
- list / due date / projectを見せない
- 即座にRest Modeへ戻す

成立度: **かなり高い**
  
ここは既存Todoとの違いが最も出やすい。

### シナリオ4: 「なんとなく疲れた」から自分でホーム画面のダラリカを開く

価値:

- 現行Web prototypeそのもの

問題:

- 開く理由を本人が先に作らないといけない
- 毎日開く報酬も蓄積価値もない

成立度: **低い**

---

## 4. 初回価値と再訪理由

### 最初の5秒で返すべき価値

弱い:

> 休みましょう。いったん止まりましょう。

強い:

> **忘れたくないことだけ預けて、いまはやらなくていい。**

ユーザーが最初に得る利益は「静かな画面」ではなく、

> **次へ進まなくても、何かを失わない**

という安心である可能性が高い。

### 再訪理由

ダラリカは daily streak を作らない。

代わりに再訪は、

> **同じ種類の境目が再び来たとき、また出会える**

という situational recurrence でよい。

したがって評価指標も「DAUを伸ばす」より、

- triggerされたうち何回Boundary Gateを通過したか
- Parkingが「今やる」を止めたか
- Parking後に別アプリへ逸れずRest Modeへ戻れたか
- 数日後もtriggerを無効化せず残しているか

の方が合う。

---

## 5. Thought Parkingの回収方法

現行の最大の穴。

### 条件

- 休養中に一覧を見せない
- 保存直後にtask化させない
- しかしblack holeにはしない
- due date / priority設定を休養時に要求しない

### 推奨: Return Window

Thought Parkingを恒久task systemにせず、**一時的escrow** として扱う。

流れ:

```text
Rest中
  ↓
一行だけParking
  ↓
その場では隠す
  ↓
Rest Modeへ戻す
  ↓
[後刻のReturn Window]
  ↓
残す / 外へ送る / 捨てる
```

Return WindowはRest終了直後には出さない。

候補:

1. ユーザーが事前に決めた1日1回のreview時刻
2. 翌日の最初の能動利用時
3. 次の「仕事を始める」trigger時
4. 明示的にParking Inboxを開いたときだけ

MVP次段では **1日1回のquiet digest** か **明示Inbox** が最も検証しやすい。

重要なのは、Parking入力時に「いつ返す？」を毎回聞かないこと。そこで予定管理を始めると休養が壊れる。

---

## 6. trigger layerは必須か

### 判断

**Standalone Web Appとしては必須に近い。**

正確には、trigger layerがないなら別の強い再訪理由が必要になる。

候補は、

- streak / reward
- daily content
- history / insight
- social
- manual ritual

だが、前4つはダラリカの原則とぶつかりやすく、manual ritualだけでは利用対象がかなり狭い。

したがって、

> **ダラリカが現在の思想を維持するなら、trigger layerを製品の中心へ昇格させる方が自然。**

ただし「全行動に毎回割り込む」必要はない。

むしろ、

- user-defined apps / sites
- work session終了時
- 夜間の特定時間帯
- browser tab switch等の狭い境目
- 任意Shortcut / hotkey

から一つを選び、**介入頻度を本人が支配できる**ことが重要。

---

## 7. 代替されないための条件

### Screen Time / one sec / ScreenZen に対して

それらは「開かない / 減らす」が主。

ダラリカは、

> **やらない選択をした後に、頭に残る用事まで退避して休養へ移す**

まで担当する。

### Todo / Reminders / Notes に対して

それらは capture と future action が主。

ダラリカは、

> **capture後に一覧を見せず、行動を増やさず、休養へ戻す**

ことが主。

### mindfulness / timer に対して

それらは休養コンテンツや時間そのものが主。

ダラリカは、

> **休養を始められない境目を処理する**

ことが主。

この3方向の間に立てるなら、単なる機能寄せ集めではなくなる。

---

## 8. 成立条件 / 成立しない条件

### 成立条件

- Boundary Gateが必要な瞬間に現れる
- 介入頻度をユーザーが制御できる
- 「続ける」を悪扱いしない
- Thought Parkingが1操作で終わる
- Parking後は休養へ自動復帰する
- Parkingが後で必ず回収できる
- daily engagementを強要しない
- 休養そのものを管理対象・達成対象にしすぎない

### 成立しない条件

- 手動で毎回ホーム画面から起動させる
- 静かなtimer + note程度に留まる
- ParkingがただのlocalStorageの墓場になる
- retentionのためにstreak / quest / gardenを先に足す
- triggerが高頻度で邪魔になり、毎回同じ画面を待つだけになる
- 結局task managerやscreen blockerの劣化版になる

---

## 9. 現時点のプロダクト判断

### 採用

**「休むためのアプリ」ではなく、  
「次へ流れる前に、やることを失わず止まれる境界装置」へ寄せる。**

### 保持

- Boundary Gate
- Continueを正規選択肢にする
- Thought Parking
- Parking後のRest Mode復帰
- low-pressureなRest Mode
- non-streak / non-score

### 昇格

- trigger layer: 将来機能 → **次に検証する中心仮説**
- Parking retrieval: 保留 → **価値成立に必要な設計要素**

### まだ足さない

- Garden
- Map
- streak
- points
- detailed analytics
- AI recommendation
- account / social

---

## 10. 次に試すべき最小実験

いきなり本格extensionやOS automationを作らない。

まず検証したいのは、

> **境目に自然に呼び出されるだけで、手動Web版より「使う必然」が生まれるか。**

最小候補:

1. browser上の限定siteだけを対象にしたtrigger spike
2. desktop shortcut / hotkeyから1操作でBoundary Gateを出す
3. 1日1回だけのParking Return Window
4. 「trigger → park → rest → later return」を一周させる

これで成立感がなければ、UI磨きではなくconcept pivotを考える。

---

## Sources

### Official / product

- one sec FAQ: https://one-sec.app/faq/
- one sec intervention modes: https://tutorials.one-sec.app/en/articles/3974530
- one sec customization: https://tutorials.one-sec.app/en/articles/3310978
- one sec research: https://one-sec.app/research/
- ScreenZen: https://screenzen.co/
- ScreenZen Google Play: https://play.google.com/store/apps/details?id=com.screenzen
- Opal: https://www.opal.so/
- Finch new user guide: https://help.finchcare.com/hc/en-us/articles/42149821015693-New-User-Guide
- Finch streaks: https://help.finchcare.com/hc/en-us/articles/37780736136205-Understanding-Streaks
- Finch daily quests: https://help.finchcare.com/hc/en-us/articles/37943131828749-Daily-Quests
- How We Feel: https://howwefeel.org/get
- Todoist Inbox: https://www.todoist.com/help/todoist/get-started/use-the-inbox-in-todoist-HwHvYErS
- Todoist Quick Add: https://www.todoist.com/help/todoist/features/use-task-quick-add-in-todoist-va4Lhpzz
- Apple Reminders: https://support.apple.com/ja-jp/guide/iphone/iph88463e18/26/ios/26

### Research

- Grüning, Riedel, Lorenz-Spreen (2023), *Directing smartphone use through the self-nudge app one sec*, PNAS: https://pmc.ncbi.nlm.nih.gov/articles/PMC9974409/
- Norwood, Grüning, Riedel, Elson (2026), *Gradual delays do not affect the tolerability of a smartphone friction intervention* (preprint): https://doi.org/10.31234/osf.io/9eq3x_v3
- University of Bern publication listing: https://www.dig.psy.unibe.ch/index_eng.html

### Anecdotal / community signals

Community reports are treated as qualitative signals only, not generalizable evidence.

- ScreenZen habituation report: https://www.reddit.com/r/nosurf/comments/1r2zrvi/
- Finch reward / burden discussion: https://www.reddit.com/r/finch/comments/1lcmnyy/
