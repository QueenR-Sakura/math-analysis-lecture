/* ============================================================
 * 迪司博德 · 数学分析上册 · 数据文件
 * 公式定界符：\( ... \) 行内，\[ ... \] 行间（由 app.js 调本地 KaTeX 渲染）
 * 用 String.raw 书写，LaTeX 里的反斜杠不需要转义
 * 题号说明：主 ID 用「讲义节号-题号」；答案册把讲义的 2.1.5 练习题
 *          重新编号为 2.1.1 练习题，故另记 srcAns 定位到答案册页码。
 * ============================================================ */
window.MATHANALYSIS = {
  meta: {
    title: "迪司博德 · 数学分析上册",
    subtitle: "谢惠民《数学分析习题课讲义》上册 · 第 2、4 章",
    note: "互动学习台：第 2 章「数列极限」与第 4 章「函数极限」。定理与解答为学习整理，参考答案以教材为准。"
  },

  game: {
    race: "第十六位 · 人类种",
    chessHint: "集齐 16 颗种族棋子 → 获得向唯一神特图挑战星杯的资格",
    chessMap: "12 章各 1 颗 + 4 个综合方法组各 1 颗；样例阶段先点亮第 2 章",
    rules: "盟约三·对等赌注　｜　盟约五·由你决定游戏内容　｜　盟约六·宣誓后不可反悔　｜　盟约八·提前看答案即败北（可无限重开）",
    modes: ["限时推演 · 自我计时", "不限时精推 · 写全每一步", "只求思路 · 口述证明"],
    lines: [
      "さあ、ゲームを始めよう　来吧，开始游戏吧 — 特图",
      "正因为生来什么都没有，因此我们能拥有一切 — 空",
      "我不相信人类……但是，我相信人类的「可能性」 — 空",
      "无限接近于零，却又不等于零的可能性 — 里克",
      "正因为是最弱，所以才理解智慧之强 — 空",
      "大家一起和平地玩游戏吧!! — 第十条盟约"
    ],
    npc: {
      tet: "特图",
      sora: "空",
      shiro: "白",
      steph: "史蒂芙"
    },
    reasons: ["概念不清", "放缩卡住", "计算失误", "方法选错", "条件漏用", "反例没想到"],
    bets: {
      "E2.1-1": "20 分钟专注 ↔ 1 段完整的 ε-N 放大论证",
      "E2.1-2": "25 分钟 ↔ 1 次分类讨论 + 有理化",
      "E2.1-3": "15 分钟 ↔ 1 个正命题 + 1 个反例",
      "E2.2-1": "30 分钟 ↔ 1 个 N = max{·} 的构造",
      "E2.3-7": "35 分钟 ↔ 1 条单调性 + 1 个极限方程",
      "E2.4-1": "40 分钟 ↔ 1 次「拆分前 N 项」的完整估计"
    }
  },

  /* 12 章骨架（第 0 期只有第 2 章有内容） */
  chapters: [
    { id: "1", name: "引论", status: "locked" },
    { id: "2", name: "数列极限", status: "open" },
    { id: "3", name: "实数系的基本定理", status: "locked" },
    { id: "4", name: "函数极限", status: "open" },
    { id: "5", name: "连续函数", status: "locked" },
    { id: "6", name: "导数与微分", status: "locked" },
    { id: "7", name: "微分学的基本定理", status: "locked" },
    { id: "8", name: "微分学的应用", status: "locked" },
    { id: "9", name: "不定积分", status: "locked" },
    { id: "10", name: "定积分", status: "locked" },
    { id: "11", name: "积分学的应用", status: "locked" },
    { id: "12", name: "广义积分", status: "locked" }
  ],

  /* ============ 定理：世界法则 ============ */
  theorems: [
    {
      id: "T2.1", ch: "2", sec: "2.1.1", law: "世界法则 · 第一条",
      title: "数列极限的 ε-N 定义与唯一性",
      tags: ["定义", "唯一性"],
      category: "数列极限", subcategory: "极限的定义",
      statement: String.raw`<p>称数列 \(\{a_n\}\) <b>收敛于</b> \(a\)，记作 \(\lim\limits_{n\to\infty}a_n=a\) 或 \(a_n\to a\)，如果</p>
        \[ \forall\,\varepsilon>0,\ \exists\,N\in\mathbb{N}_+,\ \forall n>N:\ |a_n-a|<\varepsilon. \]</p>
        <p>几何意义：对 \(a\) 的<b>每一个</b>邻域 \((a-\varepsilon,\,a+\varepsilon)\)，数列中最多只有有限项落在该邻域之外。\(N\) 依赖 \(\varepsilon\)，可记为 \(N(\varepsilon)\)，且不必是正整数（习惯取 \(N\in\mathbb{N}_+\)）。</p>
        <p><b>唯一性</b>：若 \(a_n\to a\) 且 \(a_n\to b\)，则 \(a=b\)。</p>`,
      conditions: ["\\(\\varepsilon\\) 是任意给定的正数（先给 \\(\\varepsilon\\)，后找 \\(N\\)）", "\\(N\\) 只依赖 \\(\\varepsilon\\)，不能依赖 \\(n\\)", "不等式对所有 \\(n>N\\) 成立，不是对某个 \\(n\\)", "以 0 为极限的数列称为无穷小量，记作 \\(o(1)\\)"],
      idea: String.raw`唯一性没法直接「算」出 \(a=b\)，只能用反证式的夹逼：让同一个 \(a_n\) 同时靠近 \(a\) 和 \(b\)，那么 \(a\) 与 \(b\) 的距离就被两段小量夹住。既然 \(\varepsilon\) 可以任意小，距离只能是 0。`,
      steps: [
        { h: "第 1 步　把两个极限都用起来", body: String.raw`任取 \(\varepsilon>0\)。由 \(a_n\to a\)，存在 \(N_1\)，使 \(n>N_1\) 时 \(|a_n-a|<\varepsilon/2\)；由 \(a_n\to b\)，存在 \(N_2\)，使 \(n>N_2\) 时 \(|a_n-b|<\varepsilon/2\)。这里特意取 \(\varepsilon/2\)，是为了让两段误差加起来正好不超过 \(\varepsilon\)。` },
        { h: "第 2 步　取公共的 N", body: String.raw`令 \(N=\max\{N_1,N_2\}\)。于是当 \(n>N\) 时，上面两个不等式<b>同时</b>成立。这是 ε-N 论证的标准动作：有限个 \(N\) 取最大者，就能让有限多个条件同时生效。` },
        { h: "第 3 步　三角不等式夹住 |a − b|", body: String.raw`插入同一个 \(a_n\)：\[ |a-b|=|(a-a_n)+(a_n-b)|\le |a_n-a|+|a_n-b| < \frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon. \]注意 \(a-b\) 与 \(n\) 无关，左边是一个固定的数。` },
        { h: "第 4 步　让 ε 任意小", body: String.raw`上式对<b>任意</b> \(\varepsilon>0\) 都成立，故非负常数 \(|a-b|\) 只能为 0，即 \(a=b\)。若 \(|a-b|>0\)，取 \(\varepsilon=|a-b|/2\) 立刻矛盾。` }
      ],
      boundary: String.raw`「\(\forall\varepsilon>0\)」不能换成「\(\exists\varepsilon>0\)」：若只允许 \(\varepsilon=1\)，那么 \(a_n=(-1)^n\) 也会「收敛」到 0，唯一性随即失效。另外 \(N\) 必须对所有 \(n>N\) 有效——只对无穷多个 \(n\) 成立是<b>子列</b>收敛，推不出整个数列收敛。`,
      counterexample: String.raw`\(a_n=(-1)^n\)：偶数项子列恒为 1、奇数项子列恒为 \(-1\)，各自收敛但极限不同，故原数列发散。这说明「有收敛子列」≠「数列收敛」。`,
      fig: "img/eps-neigh.svg",
      npc: String.raw`空：定义里最容易被钻空子的是量词顺序——先 \(\forall\varepsilon\) 后 \(\exists N\)。把顺序反过来，整个世界法则就塌了。`
    },
    {
      id: "T2.3", ch: "2", sec: "2.3", law: "世界法则 · 第二条",
      title: "单调有界收敛定理",
      tags: ["存在性", "确界"],
      category: "数列极限", subcategory: "收敛的判别",
      statement: String.raw`<p>若数列 \(\{a_n\}\) <b>单调增加且有上界</b>，则 \(\{a_n\}\) 收敛，且</p>
        \[ \lim_{n\to\infty}a_n=\sup\{a_n\mid n\in\mathbb{N}_+\}. \]</p>
        <p>对偶地，单调减少且有下界的数列也收敛，极限为下确界。这是实数系<b>确界存在定理</b>在数列上的直接体现，也是本章的中心结论。</p>`,
      conditions: ["单调性：\\(a_{n+1}\\ge a_n\\)（或 \\(\\le\\)）对所有 \\(n\\) 成立", "有界性：存在 \\(M\\) 使 \\(a_n\\le M\\)（或有下界）", "两个条件缺一不可", "结论只保证极限存在，不给出极限的具体数值"],
      idea: String.raw`不知道极限是多少，就先<b>造一个候选者</b>：所有项构成的集合有上界，实数系的完备性保证它有最小上界 \(\beta=\sup\{a_n\}\)。再证明数列能被「挤」到 \(\beta\) 的任意邻域里——上确界的两条性质正好各管一半。`,
      steps: [
        { h: "第 1 步　造候选极限 β", body: String.raw`集合 \(S=\{a_n:n\in\mathbb{N}_+\}\) 非空且有上界，由确界存在定理，\(\beta=\sup S\) 存在且有限。` },
        { h: "第 2 步　用「上界」这一半", body: String.raw`因为 \(\beta\) 是 \(S\) 的上界，对所有 \(n\) 有 \(a_n\le\beta\)。这给出要证的不等式的右半边。` },
        { h: "第 3 步　用「最小上界」这一半", body: String.raw`任取 \(\varepsilon>0\)，\(\beta-\varepsilon\) <b>不再是</b> \(S\) 的上界（否则 \(\beta\) 不是最小的）。故存在某个 \(N\) 使 \(a_N>\beta-\varepsilon\)。这一步是证明的关键：把 \(\sup\) 的「最小性」用出来。` },
        { h: "第 4 步　借单调性传到所有后面的项", body: String.raw`由单调增加，当 \(n>N\) 时 \(\beta-\varepsilon<a_N\le a_n\le\beta<\beta+\varepsilon\)，即 \(|a_n-\beta|<\varepsilon\)。于是 \(a_n\to\beta\)。注意：若没有单调性，\(a_N\) 之后的项完全可能掉回去，第 3 步就白做了。` }
      ],
      boundary: String.raw`两个条件都不能省：\(a_n=(-1)^n\) 有界但不单调 → 发散；\(a_n=n\) 单调但无上界 → 发散到 \(+\infty\)。另外定理只说「收敛」，要求极限值通常还要对递推式两边取极限再解方程（见 E2.3-7）。`,
      counterexample: String.raw`\(a_n=n\)（单调无界）、\(a_n=(-1)^n\)（有界不单调）——分别打掉两个条件。`,
      fig: "img/monotone.svg",
      npc: String.raw`白：第 3 步是整条推演里唯一「非机械」的一步，它把确界的定义变成了一个可以取用的 \(N\)。`
    },
    {
      id: "T2.4", ch: "2", sec: "2.4", law: "世界法则 · 第三条",
      title: "Stolz 定理（∞/∞ 型）",
      tags: ["不定式", "离散洛必达"],
      category: "数列极限", subcategory: "极限运算与不定式",
      statement: String.raw`<p>设 \(\{y_n\}\) <b>严格单调增加且 \(y_n\to+\infty\)</b>。若</p>
        \[ \lim_{n\to\infty}\frac{x_{n+1}-x_n}{y_{n+1}-y_n}=l \quad (l\ \text{有限或}\ \pm\infty), \]</p>
        <p>则 \(\displaystyle\lim_{n\to\infty}\frac{x_n}{y_n}=l\)。它把「\(\infty/\infty\)」型数列极限化为相邻差分的比值，常被称为离散版的 L'Hospital 法则。讲义同节的命题 2.4.1（Cauchy 命题：\(x_n\to l\Rightarrow \frac{x_1+\cdots+x_n}{n}\to l\)）是它在 \(y_n=n\) 时的原型。</p>`,
      conditions: ["\\(y_n\\) 严格单调增加（保证 \\(y_{n+1}-y_n>0\\)）", "\\(y_n\\to+\\infty\\)（否则余项除不掉）", "差商极限 \\(l\\) 存在或为 \\(\\pm\\infty\\)", "\\(x_n\\) 本身不要求有界、不要求收敛"],
      idea: String.raw`把 \(x_n\) 写成「起点 + 一串差分之和」：\(x_n=x_N+\sum_{k=N}^{n-1}(x_{k+1}-x_k)\)。差商接近 \(l\)，意味着每一段差分都约等于 \(l\,\Delta y_k\)；累加以后 \(x_n\approx x_N+l(y_n-y_N)\)，再除以 \(y_n\) 就只剩 \(l\)。`,
      steps: [
        { h: "第 1 步　把差商条件写成不等式", body: String.raw`设 \(l\) 有限。任取 \(\varepsilon>0\)，由差商极限，存在 \(N\)，使 \(k\ge N\) 时 \[ \left(l-\tfrac{\varepsilon}{2}\right)\Delta y_k < \Delta x_k < \left(l+\tfrac{\varepsilon}{2}\right)\Delta y_k, \]其中 \(\Delta x_k=x_{k+1}-x_k,\ \Delta y_k=y_{k+1}-y_k>0\)。取 \(\varepsilon/2\) 是给最后的余项留余量。` },
        { h: "第 2 步　从 N 累加到 n−1", body: String.raw`把上式对 \(k=N,\dots,n-1\) 求和，右端利用望远镜 \(\sum\Delta y_k=y_n-y_N\)：\[ \left(l-\tfrac{\varepsilon}{2}\right)(y_n-y_N) < x_n-x_N < \left(l+\tfrac{\varepsilon}{2}\right)(y_n-y_N). \]` },
        { h: "第 3 步　同除以 y_n", body: String.raw`因 \(y_n>0\)，除以 \(y_n\) 得 \[ \left(l-\tfrac{\varepsilon}{2}\right)\left(1-\tfrac{y_N}{y_n}\right)+\tfrac{x_N}{y_n} < \frac{x_n}{y_n} < \left(l+\tfrac{\varepsilon}{2}\right)\left(1-\tfrac{y_N}{y_n}\right)+\tfrac{x_N}{y_n}. \]` },
        { h: "第 4 步　用 y_n → +∞ 收尾", body: String.raw`\(y_N/y_n\to0\)、\(x_N/y_n\to0\)（\(x_N,y_N\) 固定）。故 \(n\) 充分大时 \(\left|\frac{x_n}{y_n}-l\right|<\varepsilon\)，即 \(\frac{x_n}{y_n}\to l\)。\(l=\pm\infty\) 的情形只需把上面改成单侧不等式。` }
      ],
      boundary: String.raw`「\(y_n\to+\infty\)」不可省：取 \(y_n=1-1/n\)（严格增但收敛），余项 \(y_N/y_n\) 不趋于 0，结论可能失效。「严格单调」也不能弱化为单调不减，否则 \(\Delta y_k=0\) 时差商无意义。`,
      counterexample: String.raw`\(y_n=1-\frac1n,\ x_n=1\)：差商恒为 0，但 \(\frac{x_n}{y_n}\to1\neq0\)。正是 \(y_n\) 不趋于 \(+\infty\) 所致。`,
      fig: "img/stolz.svg",
      npc: String.raw`史蒂芙：别忘了检查 \(y_n\to+\infty\)！我第一次做这题就漏了它，整条推演在最后一步散架。`
    },

    /* ===== 第四章 · 函数极限 ===== */
    {
      id: "T4.1", ch: "4", sec: "4.1", law: "定义 · 4.1",
      title: "函数极限的定义（x→x₀ 与 x→∞ 及其单侧/无穷类型）",
      tags: ["定义", "极限类型"],
      category: "函数极限", subcategory: "极限的定义",
      statement: String.raw`<p>设 \(f\) 在 \(x_0\) 的某个去心邻域有定义。称 \(\lim\limits_{x\to x_0}f(x)=A\)，如果</p>
        \[ \forall\,\varepsilon>0,\ \exists\,\delta>0,\ \forall x:\ 0<|x-x_0|<\delta\ \Rightarrow\ |f(x)-A|<\varepsilon. \]
        <p>几何意义：对 \(A\) 的任意 \(\varepsilon\) 邻域，存在 \(x_0\) 的去心 \(\delta\) 邻域，其中函数值全体落入该 \(\varepsilon\) 邻域。注意不等式里是 <b>\(0<|x-x_0|\)</b>——允许 \(f\) 在 \(x_0\) 无定义，也不管 \(f(x_0)\) 取何值。</p>
        <p>其余类型类比给出：</p>
        <ul>
          <li>右极限 \(x\to x_0^+\)：\(\forall\varepsilon>0\,\exists\delta>0\,\forall x\in(x_0,x_0+\delta):|f(x)-A|<\varepsilon\)，记作 \(f(x_0+0)\)。</li>
          <li>左极限 \(x\to x_0^-\)：同理，记作 \(f(x_0-0)\)。</li>
          <li>\(x\to\infty\)：\(\forall\varepsilon>0\,\exists X>0\,\forall |x|>X:|f(x)-A|<\varepsilon\)。</li>
          <li>\(x\to+\infty\) / \(x\to-\infty\)：把 \(|x|>X\) 换成 \(x>X\) / \(x<-X\)。</li>
        </ul>
        <p><b>充要条件</b>：\(\lim\limits_{x\to x_0}f(x)=A\iff f(x_0+0)=f(x_0-0)=A\)。</p>`,
      conditions: ["\\(0<|x-x_0|\\) 是去心条件：允许 \\(f\\) 在 \\(x_0\\) 无定义，\\(f(x_0)\\) 的取值不影响极限", "\\(\\delta\\) 依赖 \\(\\varepsilon\\) 和 \\(x_0\\)，不能依赖 \\(x\\)", "无穷远类型把邻域换成 \\(|x|>X\\)，\\(X\\) 只依赖 \\(\\varepsilon\\)", "左右极限都存在且相等，才推出双侧极限存在"],
      idea: String.raw`函数极限与数列极限的精神一致：用「任意近 + 存在一段区间」描述逼近。最可靠的工具是 Heine 归结原则（见 T4.9）：把函数极限翻译成沿任意趋于 \(x_0\) 的数列的极限，许多性质都能从数列极限搬过来。`,
      steps: [
        { h: "第 1 步　写出目标不等式", body: String.raw`要证 \(\lim_{x\to x_0}f(x)=A\)，先明确：任取 \(\varepsilon>0\)，要找 \(\delta>0\) 使 \(0<|x-x_0|<\delta\) 时 \(|f(x)-A|<\varepsilon\)。` },
        { h: "第 2 步　由 \(|f(x)-A|\) 反解 \(x\) 的范围", body: String.raw`对具体函数，常把 \(|f(x)-A|\) 放大成关于 \(|x-x_0|\) 的式子，再令它 \(<\varepsilon\) 解出 \(|x-x_0|<\delta\)。` },
        { h: "第 3 步　取 \(\delta\) 并验证", body: String.raw`取 \(\delta=\min\{\cdots\}\)（常要兼顾定义域/分母不为 0），再回代验证确实 \(<\varepsilon\)。` },
        { h: "第 4 步　处理单侧与无穷类型", body: String.raw`右极限只验 \((x_0,x_0+\delta)\)；\(x\to\infty\) 改用 \(|x|>X\)。两者逻辑完全相同，只是邻域形状变了。` }
      ],
      boundary: String.raw`漏写 \(0<|x-x_0|\) 是最常见的错：若写成 \(|x-x_0|<\delta\)，会强行把 \(x=x_0\) 纳入，而函数在 \(x_0\) 可能无定义。另外 \(\delta\) 必须对所有满足条件的 \(x\) 同时生效，不能随 \(x\) 变。`,
      counterexample: String.raw`\(f(x)=\operatorname{sgn}(x)\)：右极限 \(f(0+0)=1\)，左极限 \(f(0-0)=-1\)，不等，故 \(x\to0\) 极限不存在。又如 \(f(x)=\sin\frac1x\)，沿 \(x_n=1/(2n\pi)\to0\) 得 0，沿 \(y_n=1/(2n\pi+\pi/2)\to0\) 得 1，由归结原则极限不存在。`,
      npc: String.raw`空：函数极限的定义比数列多了一道「去心」的门槛——就是这道门槛，才让不连续点和可去间断点有了存在的空间。`
    },
    {
      id: "T4.2", ch: "4", sec: "4.1", law: "定义 · 4.1 否定式",
      title: "函数极限不存在／各种否定形式的数学表示",
      tags: ["否定", "逻辑"],
      category: "函数极限", subcategory: "极限的定义",
      statement: String.raw`<p>\(\lim\limits_{x\to x_0}f(x)=A\) 的否定（即「极限不是 \(A\)」）：</p>
        \[ \exists\,\varepsilon_0>0,\ \forall\,\delta>0,\ \exists\,x\ (0<|x-x_0|<\delta)\ \text{但}\ |f(x)-A|\ge\varepsilon_0. \]
        <p>「\(x\to x_0\) 时 \(f(x)\) 极限不存在」的两种等价表述：</p>
        <ul>
          <li><b>量级否定</b>：\(\forall A\in\mathbb{R},\ \exists\varepsilon_0>0,\ \forall\delta>0,\ \exists x:0<|x-x_0|<\delta\) 且 \(|f(x)-A|\ge\varepsilon_0\)。</li>
          <li><b>归结否定（Heine）</b>：存在两数列 \(x_n\to x_0,\ x_n\ne x_0\) 与 \(y_n\to x_0,\ y_n\ne x_0\)，使 \(\lim f(x_n)\ne\lim f(y_n)\)（或至少一个不存在）。</li>
        </ul>
        <p>对 \(x\to\infty\) 类型，把「\(\forall\delta>0\,\exists x:0<|x-x_0|<\delta\)」换成「\(\forall X>0\,\exists |x|>X\)」即可。</p>`,
      conditions: ["否定时量词顺序整体翻转：\\(\\forall\\leftrightarrow\\exists,\\ \\exists\\leftrightarrow\\forall\\)", "存在性量词先固定一个 \\(\\varepsilon_0>0\\)，它对一切 \\(\\delta\\) 都成立", "「极限不存在」要对<b>所有</b>实数 \\(A\\) 都否定，或找两条趋于 \\(x_0\\) 的数列给出不同极限"],
      idea: String.raw`否定就是「量词对偶 + 不等号反向」：\(\forall\leftrightarrow\exists\)，\(<\leftrightarrow\ge\)。记熟一句话——「总有一个固定的误差 \(\varepsilon_0\)，无论你把去心邻域缩得多小，总能找到点落在外面」。这是证明极限不存在的标准句式。`,
      steps: [
        { h: "第 1 步　写出原命题的量词链", body: String.raw`原命题：\(\forall\varepsilon\exists\delta\forall x(\cdots\Rightarrow|f-A|<\varepsilon)\)。` },
        { h: "第 2 步　逐层取反", body: String.raw`否定得：\(\exists\varepsilon_0\forall\delta\exists x(0<|x-x_0|<\delta\ \text{且}\ |f(x)-A|\ge\varepsilon_0)\)。` },
        { h: "第 3 步　翻译为「找两条数列」", body: String.raw`由归结原则，要证不存在，只需构造 \(x_n,y_n\to x_0\) 使 \(f(x_n),f(y_n)\) 极限不同——往往比直接玩量词更容易。` },
        { h: "第 4 步　检查类型对应", body: String.raw`无穷远类型把邻域换成 \(|x|>X\)，单侧把区间换成半边，其余不变。` }
      ],
      boundary: String.raw`否定「极限 = A」和否定「极限存在」不是一回事：前者只说明极限不是某个特定值；后者要对所有实数都不成立。复习时容易把两者混为一谈。`,
      counterexample: String.raw`\(f(x)=\sin\frac1x\) 在 \(x\to0\)：对 \(A=0\) 取 \(\varepsilon_0=1/2\)，任意小去心邻域都能取到 \(\sin=1\) 的点，故被否定；实际上对<b>任何</b> \(A\in[-1,1]\) 都可否定，故极限不存在。`,
      npc: String.raw`白：把量词一个个翻过来，不等号也翻过来——像把一句肯定句改成最倔强的否定句。`
    },
    {
      id: "T4.3", ch: "4", sec: "4.1.1", law: "命题 4.1.1",
      title: "复合函数的极限（变量替换）",
      tags: ["复合", "变量替换"],
      category: "函数极限", subcategory: "极限的运算",
      statement: String.raw`<p>设 \(\lim\limits_{u\to u_0}g(u)=A\)，且当 \(x\to x_0\) 时 \(\varphi(x)\to u_0\)。若满足下列条件之一，则</p>
        \[ \lim_{x\to x_0} g(\varphi(x)) = A = \lim_{u\to u_0} g(u). \]
        <p><b>条件（二选一）</b>：① 存在 \(x_0\) 的去心邻域，使其中 \(\varphi(x)\ne u_0\)（即 \(u=u_0\) 是极限过程中「达不到」的值）；或 ② \(g\) 在 \(u_0\) 连续。</p>`,
      conditions: ["内层极限 \\(\\varphi(x)\\to u_0\\)（\\(x\\to x_0\\)）必须成立", "外层极限 \\(\\lim_{u\\to u_0}g(u)=A\\) 必须存在", "<b>关键</b>：要补「\\(\\varphi(x)\\ne u_0\\)（去心邻域内）」或「\\(g\\) 在 \\(u_0\\) 连续」之一，否则结论可能不成立", "若 \\(g\\) 在 \\(u_0\\) 连续，则无需回避 \\(u_0\\)，直接得复合极限"],
      idea: String.raw`直观上，既然 \(u=\varphi(x)\) 无限逼近 \(u_0\)，而 \(g(u)\) 在 \(u\to u_0\) 时逼近 \(A\)，把 \(u\) 换成 \(\varphi(x)\) 应当仍逼近 \(A\)。唯一的陷阱是：若在逼近途中 \(u\) 真的「撞上」了 \(u_0\)，而 \(g\) 恰好在 \(u_0\) 处「抽风」（不连续或没定义），结果就会跑偏——这就是为什么要补那个回避条件。`,
      steps: [
        { h: "第 1 步　取 \(\varepsilon>0\)，用外层极限拿到 \(\eta\)", body: String.raw`由 \(\lim_{u\to u_0}g(u)=A\)，存在 \(\eta>0\)，当 \(0<|u-u_0|<\eta\) 时 \(|g(u)-A|<\varepsilon\)。` },
        { h: "第 2 步　用内层极限把 \(u\) 控制进邻域", body: String.raw`由 \(\varphi(x)\to u_0\)，存在 \(\delta>0\)，当 \(0<|x-x_0|<\delta\) 时 \(|\varphi(x)-u_0|<\eta\)。` },
        { h: "第 3 步　补回避条件，保证 \(u\ne u_0\)", body: String.raw`若条件①成立，可进一步确保 \(\varphi(x)\ne u_0\)，于是 \(0<|\varphi(x)-u_0|<\eta\)，套用第 1 步得 \(|g(\varphi(x))-A|<\varepsilon\)。若用条件②（连续），则直接代入 \(u_0\) 也成立。` },
        { h: "第 4 步　收尾", body: String.raw`故 \(\lim_{x\to x_0}g(\varphi(x))=A\)。这就是极限的「变量替换」：\(\lim_{x\to x_0}g(\varphi(x))=\lim_{u\to u_0}g(u)\)。` }
      ],
      boundary: String.raw`最易漏的是回避条件。若 \(\varphi(x)\) 在某点等于 \(u_0\)，而 \(g\) 在 \(u_0\) 不连续，复合极限可能不等于外层极限，甚至不存在。连续情形（条件②）则无条件成立。`,
      counterexample: String.raw`取 \(g(u)=\begin{cases}1,&u\ne0\\0,&u=0\end{cases}\)，\(u_0=0\)，\(\lim_{u\to0}g(u)=1\)。令 \(\varphi(x)\equiv0\)，则 \(\varphi(x)\to0\) 但恒有 \(\varphi(x)=u_0\)。此时 \(g(\varphi(x))\equiv0\)，极限为 0 ≠ 1。正是 \(\varphi\) 撞上了不连续的 \(u_0\)，结论失效。`,
      npc: String.raw`史蒂芙：我第一次用变量替换时直接把 \(u=\varphi(x)\) 代进去，完全忘了检查 \(\varphi(x)\) 会不会正好踩到 \(u_0\) 那个坑。`
    },
    {
      id: "T4.4", ch: "4", sec: "4.2", law: "性质 · 4.2",
      title: "函数极限的基本性质（唯一性、局部有界、局部保号、四则运算、夹逼）",
      tags: ["性质", "保号性"],
      category: "函数极限", subcategory: "极限的性质",
      statement: String.raw`<p>设 \(\lim\limits_{x\to x_0}f(x),\lim\limits_{x\to x_0}g(x)\) 存在，则有：</p>
        <ul>
          <li><b>唯一性</b>：极限值唯一。</li>
          <li><b>局部有界性</b>：若 \(\lim f(x)=A\)，则存在去心邻域使 \(f\) 有界。</li>
          <li><b>局部保号性</b>：若 \(\lim f(x)=A>0\)（或 \(<0\)），则存在去心邻域使 \(f(x)>0\)（或 \(<0\)）。</li>
          <li><b>四则运算</b>：\(\lim(f\pm g)=\lim f\pm\lim g\)，\(\lim(fg)=(\lim f)(\lim g)\)，\(\lim(f/g)=(\lim f)/(\lim g)\)（分母极限非零）。</li>
          <li><b>两边夹定理</b>：若 \(f(x)\le h(x)\le g(x)\) 且 \(\lim f=\lim g=A\)，则 \(\lim h=A\)。</li>
        </ul>
        <p>下面 5 张卡（命题 4.2.1–4.2.5）对每条性质单独展开。</p>`,
      conditions: ["四则运算要求参与运算的极限<b>都存在</b>；除法还要求分母极限 \\(\\ne0\\)", "局部保号只保证去心邻域内严格大于/小于 0，不保证在 \\(x_0\\) 处", "夹逼要求两侧函数极限<b>相等</b>且不等式在某个去心邻域成立", "局部有界/保号都是「局部」结论，不能推广到全定义域"],
      idea: String.raw`这些性质和数列极限几乎一字不差——因为它们本就可以由 Heine 归结原则从数列极限直接搬过来。记性的关键是：把函数极限「抽样」成数列极限，数列怎么算，函数就怎么算，只是最后要把结论还原成「去心邻域」的语言。`,
      steps: [
        { h: "第 1 步　唯一性与局部有界", body: String.raw`唯一性同 T4.5 的反证夹逼。局部有界：取 \(\varepsilon=1\)，存在 \(\delta\) 使 \(|f(x)-A|<1\)，于是 \(|f(x)|<|A|+1\)，得局部有界。` },
        { h: "第 2 步　局部保号性", body: String.raw`由 \(\lim f=A>0\)，取 \(\varepsilon=A/2\)，存在去心邻域使 \(|f(x)-A|<A/2\)，即 \(f(x)>A/2>0\)。\(A<0\) 同理。` },
        { h: "第 3 步　四则运算", body: String.raw`用数列版四则运算 + 归结原则：任取 \(x_n\to x_0\)，对应数列极限满足四则，再归纳回函数。` },
        { h: "第 4 步　两边夹", body: String.raw`由 \(f\le h\le g\) 与 \(\lim f=\lim g=A\)，任取趋于 \(x_0\) 的数列，夹逼得 \(h(x_n)\to A\)，再由归结原则 \(\lim h=A\)。` }
      ],
      boundary: String.raw`局部保号给出的是严格不等号：若 \(f(x)\ge0\) 且 \(\lim f=A\)，只能推出 \(A\ge0\)（可能等于 0，如 \(f(x)=x^2\)）。反过来，\(\lim f=A>0\) 也只推出去心邻域内 \(f>0\)，不保证 \(f(x_0)>0\)。`,
      counterexample: String.raw`\(f(x)=x^2\ge0\) 对一切 \(x\) 成立，但 \(\lim_{x\to0}f(x)=0\)，说明「非负函数的极限」可以等于 0 而非正数。又 \(f(x)=x\) 满足 \(\lim_{x\to0^+}f=0\) 但 \(f(x)>0\)，而 \(f(0)=0\)，说明保号性与在 \(x_0\) 处的函数值无关。`,
      npc: String.raw`空：函数极限的性质之所以和数列一模一样，是因为『极限』这件事的本质没变，只是逼近的方式从『跳过自然数』变成了『挤进一个去心邻域』。`
    },
    {
      id: "T4.5", ch: "4", sec: "4.2", law: "命题 4.2.1",
      title: "函数极限的唯一性",
      tags: ["唯一性"],
      category: "函数极限", subcategory: "极限的性质",
      statement: String.raw`若 \(\lim\limits_{x\to x_0}f(x)=A\) 且 \(\lim\limits_{x\to x_0}f(x)=B\)，则 \(A=B\)。`,
      conditions: ["前提是该极限<b>存在</b>", "唯一性指向「极限值」而非「趋近方式」"],
      idea: String.raw`同数列唯一性：让同一个 \(f(x)\) 同时靠近两个不同值，会把这两值的距离夹成任意小，只能重合。`,
      steps: [
        { h: "反证夹逼", body: String.raw`设 \(A\ne B\)，取 \(\varepsilon_0=|A-B|/2>0\)。由两极限定义，存在去心邻域使 \(|f-A|<\varepsilon_0\) 且 \(|f-B|<\varepsilon_0\)。` },
        { h: "导出矛盾", body: String.raw`三角不等式得 \(|A-B|\le |A-f|+|f-B|<2\varepsilon_0=|A-B|\)，矛盾。故 \(A=B\)。` }
      ],
      boundary: String.raw`只在极限存在时谈唯一性；极限不存在（如 \(\sin\frac1x\) 在 0 处）则无「唯一值」可言。`,
      counterexample: String.raw`\(f(x)=\sin\frac1x\) 在 \(x\to0\) 无极限，自然谈不上唯一值——沿不同数列可得 1、0、−1 等。`
    },
    {
      id: "T4.6", ch: "4", sec: "4.2", law: "命题 4.2.2",
      title: "函数极限的局部有界性",
      tags: ["有界性"],
      category: "函数极限", subcategory: "极限的性质",
      statement: String.raw`若 \(\lim\limits_{x\to x_0}f(x)=A\)，则存在 \(\delta>0\) 与 \(M>0\)，使当 \(0<|x-x_0|<\delta\) 时 \(|f(x)|\le M\)。`,
      conditions: ["极限存在是前提", "有界性只在去心邻域<b>局部</b>成立，不能推出全定义域有界"],
      idea: String.raw`极限存在意味着函数在 \(x_0\) 附近「跑不远」：离极限超过 1 的点只可能出现在更小的邻域之外。`,
      steps: [
        { h: "取 \(\varepsilon=1\)", body: String.raw`由极限定义，存在 \(\delta>0\)，当 \(0<|x-x_0|<\delta\) 时 \(|f(x)-A|<1\)。` },
        { h: "放大得界", body: String.raw`于是 \(|f(x)|\le |f(x)-A|+|A|<1+|A|\)，取 \(M=1+|A|\) 即得局部有界。` }
      ],
      boundary: String.raw`全局未必有界：如 \(f(x)=1/x\) 在 \(x\to1\) 极限为 1 故局部有界，但在 \(x\to0\) 无极限，不能推出局部有界。`,
      counterexample: String.raw`\(f(x)=1/x\)：在 \(x\to1\) 时局部有界（邻域内 \(|f|\le2\)）；但在 0 附近无界，因为那里极限不存在。`
    },
    {
      id: "T4.7", ch: "4", sec: "4.2", law: "命题 4.2.3",
      title: "函数极限的局部保号性",
      tags: ["保号性"],
      category: "函数极限", subcategory: "极限的性质",
      statement: String.raw`若 \(\lim\limits_{x\to x_0}f(x)=A>0\)，则存在 \(\delta>0\) 使 \(0<|x-x_0|<\delta\) 时 \(f(x)>0\)；\(A<0\) 同理得 \(f(x)<0\)。<br>反之，若在去心邻域 \(f(x)\ge0\)（或 \(\le0\)）且 \(\lim f=A\)，则 \(A\ge0\)（或 \(A\le0\)）。`,
      conditions: ["严格极限 \\(A>0\\) 才能推出去心邻域内严格 \\(f>0\\)", "反向只给 \\(\\ge0\\)（可等于 0），不能推出严格大于"],
      idea: String.raw`极限为正说明函数在 \(x_0\) 附近「整体偏正」，不可能忽正忽负地穿过 0。取一半的误差就够把函数值钉在正侧。`,
      steps: [
        { h: "第 1 步　取 \(\varepsilon=A/2\)", body: String.raw`由 \(\lim f=A>0\)，存在 \(\delta>0\)，当 \(0<|x-x_0|<\delta\) 时 \(|f(x)-A|<A/2\)。` },
        { h: "第 2 步　解出符号", body: String.raw`即 \(A/2<f(x)<3A/2\)，故 \(f(x)>A/2>0\)。\(A<0\) 取 \(\varepsilon=-A/2\) 得 \(f(x)<A/2<0\)。` }
      ],
      boundary: String.raw`反向只给非负：若 \(f(x)\ge0\) 且 \(\lim f=A\)，只能得 \(A\ge0\)（可等于 0，如 \(x^2\to0\)）。`,
      counterexample: String.raw`\(f(x)=x^2\ge0\) 对一切 \(x\) 成立，但 \(\lim_{x\to0}f=0\)，说明「非负函数的极限」可等于 0 而非正数。`
    },
    {
      id: "T4.8", ch: "4", sec: "4.2", law: "命题 4.2.4",
      title: "函数极限的四则运算法则",
      tags: ["四则运算"],
      category: "函数极限", subcategory: "极限的性质",
      statement: String.raw`若 \(\lim f(x)=A,\ \lim g(x)=B\)，则
        \[ \lim(f\pm g)=A\pm B,\quad \lim(fg)=AB,\quad \lim\frac{f}{g}=\frac{A}{B}\ (B\ne0). \]`,
      conditions: ["两极限都<b>必须存在</b>", "除法要求分母极限 \\(B\\ne0\\)；若 \\(B=0\\) 不能直接套用", "\\(0\cdot\infty\\)、\\(\\infty-\\infty\\) 等未定式不适用，需先变形"],
      idea: String.raw`用数列四则运算 + Heine 归结原则：任取 \(x_n\to x_0\)，对应数列满足四则，再把结论归纳回函数。本质是「极限运算与四则运算可交换」。`,
      steps: [
        { h: "第 1 步　化为数列极限", body: String.raw`任取 \(x_n\to x_0\)（\(x_n\ne x_0\)），则 \(f(x_n)\to A,\ g(x_n)\to B\)。` },
        { h: "第 2 步　套用数列四则", body: String.raw`由数列极限四则：\(f(x_n)\pm g(x_n)\to A\pm B\)，乘积 \(\to AB\)，商 \(\to A/B\)（\(B\ne0\)）。` },
        { h: "第 3 步　归纳回函数", body: String.raw`由归结原则，对任意趋于 \(x_0\) 的数列都成立，故函数极限满足同样法则。` }
      ],
      boundary: String.raw`\(\lim f\) 不存在时不能拆（如 \(f=\sin\frac1x\) 在 0 处）；\(0\cdot\infty\) 型要先化为确定形式再求。`,
      counterexample: String.raw`\(f(x)=\sin\frac1x\) 在 \(x\to0\) 无极限，不能写 \(\lim(f+f)=2\lim f\)——右边本身无定义。`
    },
    {
      id: "T4.9", ch: "4", sec: "4.2", law: "命题 4.2.5",
      title: "函数极限的两边夹定理（夹逼准则）",
      tags: ["夹逼", "Heine"],
      category: "函数极限", subcategory: "极限的性质",
      statement: String.raw`若在 \(x_0\) 的某去心邻域有 \(f(x)\le h(x)\le g(x)\)，且 \(\lim\limits_{x\to x_0}f(x)=\lim\limits_{x\to x_0}g(x)=A\)，则 \(\lim\limits_{x\to x_0}h(x)=A\)。`,
      conditions: ["不等式在去心邻域成立", "两侧函数极限<b>存在且相等</b>", "单侧极限（\\(x\\to x_0^\\pm\\)）同样适用"],
      idea: String.raw`用 Heine 归结原则 + 数列夹逼：任意趋于 \(x_0\) 的数列都满足数列夹逼，于是 \(h(x_n)\to A\)，再归纳回函数。`,
      steps: [
        { h: "第 1 步　任取趋于 \(x_0\) 的数列", body: String.raw`设 \(x_n\to x_0,\ x_n\ne x_0\)，则 \(f(x_n)\le h(x_n)\le g(x_n)\)。` },
        { h: "第 2 步　数列夹逼", body: String.raw`由 \(\lim f(x_n)=\lim g(x_n)=A\)，数列夹逼得 \(\lim h(x_n)=A\)。` },
        { h: "第 3 步　归结回函数", body: String.raw`该结论对任意趋于 \(x_0\) 的数列成立，故 \(\lim_{x\to x_0}h(x)=A\)。` }
      ],
      boundary: String.raw`若上下极限不相等，夹逼失效；夹逼只给「被夹的那个」的极限，不能反推两侧。`,
      counterexample: String.raw`令 \(f(x)=-|x|,\ g(x)=|x|,\ h(x)=x\sin\frac1x\)。在 0 的去心邻域有 \(f\le h\le g\)，且 \(\lim f=\lim g=0\)，故 \(\lim_{x\to0}h=0\)。`
    },
    {
      id: "T4.10", ch: "4", sec: "4.3", law: "重要极限 4.3.1",
      title: "重要极限 Ⅰ：\(\lim\limits_{x\to0}\dfrac{\sin x}{x}=1\)",
      tags: ["重要极限", "等价无穷小"],
      category: "函数极限", subcategory: "重要极限",
      statement: String.raw`\[ \lim_{x\to0}\frac{\sin x}{x}=1. \] <p>它是所有三角极限的基石，也是 \(\sin x\sim x\)（\(x\to0\)）的来源。</p>`,
      conditions: ["\\(x\\) 必须用<b>弧度制</b>", "是 \\(x\\to0\\) 的双侧极限", "分母是 \\(x\\) 不是 \\(x^2\\)"],
      idea: String.raw`单位圆里比较「弧长」与「弦/切线」：对锐角 \(x\)，有 \(\sin x < x < \tan x\)。夹在中间就把 \(\sin x/x\) 逼向 1。`,
      steps: [
        { h: "第 1 步　单位圆面积比较", body: String.raw`对 \(0<x<\pi/2\)，扇形面积介于两三角形之间，得 \(\sin x < x < \tan x\)。` },
        { h: "第 2 步　同除以 \(\sin x\)", body: String.raw`\(1 < \dfrac{x}{\sin x} < \dfrac{1}{\cos x}\)，即 \(\cos x < \dfrac{\sin x}{x} < 1\)。` },
        { h: "第 3 步　夹逼取极限", body: String.raw`令 \(x\to0^+\)，\(\cos x\to1\)，由夹逼 \(\dfrac{\sin x}{x}\to1\)。` },
        { h: "第 4 步　偶函数对称", body: String.raw`\(\sin x/x\) 是偶函数，故 \(x\to0^-\) 也成立，双侧极限为 1。` }
      ],
      boundary: String.raw`必须是弧度；若用角度制该极限不是 1。分母若为 \(x^2\) 则极限是 \(\infty\)。`,
      counterexample: String.raw`用角度制时 \(\sin(1^\circ)/1^\circ\ne1\)。又 \(\lim_{x\to0}\sin x/x^2=\infty\)（分子~x，分母 x²）。`
    },
    {
      id: "T4.11", ch: "4", sec: "4.3", law: "重要极限 4.3.2",
      title: "重要极限 Ⅱ：\(\lim\limits_{x\to\infty}\left(1+\dfrac1x\right)^x=e\)",
      tags: ["重要极限", "e"],
      category: "函数极限", subcategory: "重要极限",
      statement: String.raw`\[ \lim_{x\to\infty}\left(1+\frac1x\right)^x=e,\qquad \lim_{x\to0}(1+x)^{1/x}=e. \] <p>这是 \(1^\infty\) 型未定式的代表，也是自然对数底 \(e\) 的定义之一。</p>`,
      conditions: ["标准形：底数趋于 1、指数趋于 \\(\\infty\\) 的 \\(1^\\infty\\) 型", "\\(x\\to0\\) 情形令 \\(t=1/x\\) 即化为前者"],
      idea: String.raw`取对数把乘法变加法：\(\ln y=x\ln(1+1/x)\)，再用 \(\ln(1+t)=t+O(t^2)\) 估出它趋于 1。`,
      steps: [
        { h: "第 1 步　取对数", body: String.raw`令 \(y=(1+1/x)^x\)，则 \(\ln y=x\ln(1+1/x)\)。` },
        { h: "第 2 步　用对数不等式", body: String.raw`对 \(t>0\) 有 \(\dfrac{t}{1+t}<\ln(1+t)<t\)，取 \(t=1/x\) 得 \(\dfrac{1}{x+1}<\ln(1+1/x)<\dfrac1x\)。` },
        { h: "第 3 步　乘 \(x\) 夹逼", body: String.raw`\(\dfrac{x}{x+1}<\ln y<1\)，令 \(x\to\infty\) 由夹逼 \(\ln y\to1\)。` },
        { h: "第 4 步　还原", body: String.raw`故 \(y\to e^1=e\)。\(x\to0\) 令 \(t=1/x\) 化为前者，亦得 \(e\)。` }
      ],
      boundary: String.raw`\((1+1/x)^{x+1}\) 极限也是 \(e\)（多乘一个趋于 1 的因子）；\((1+1/x)^{2x}\to e^2\)。`,
      counterexample: String.raw`\((1+1/x)^{x^2}\to1\)（指数增长快于对数，整体趋于 \(e^0=1\)），说明指数里的系数至关重要。`
    },
    {
      id: "T4.12", ch: "4", sec: "4.4", law: "定义 · 4.4",
      title: "无穷小量、无穷大量与阶的比较",
      tags: ["无穷小", "无穷大", "阶"],
      category: "函数极限", subcategory: "无穷小与无穷大",
      statement: String.raw`<p>当 \(x\to x_0\)（或 \(x\to\infty\)）时：</p>
        <ul>
          <li>若 \(f(x)\to0\)，称 \(f\) 为<b>无穷小量</b>。</li>
          <li>若 \(|f(x)|\to\infty\)（即 \(1/f(x)\to0\)），称 \(f\) 为<b>无穷大量</b>。</li>
          <li><b>同阶</b>：\(\lim f/g=l\ne0\)。</li>
          <li><b>等价</b>：\(l=1\)，记作 \(f\sim g\)。</li>
          <li><b>高阶/低阶</b>：\(\lim f/g=0\) 记 \(f=o(g)\)；存在 \(C\) 使 \(|f|\le C|g|\) 记 \(f=O(g)\)。</li>
          <li><b>k 阶</b>：\(\lim f/g^k\) 非零有限，称 \(f\) 是 \(g\) 的 \(k\) 阶无穷小。</li>
        </ul>`,
      conditions: ["无穷小是「极限为 0 的函数」，不是「很小的常数」", "比较阶要求分母在所论过程中不恒为 0", "\\(o/O\\) 是集合记号，不是具体数值"],
      idea: String.raw`把极限问题转化为「比较谁更快地趋于 0（或 ∞）」。等价无穷小能提供一套高效的替换工具：乘除因子可直接换成等价量。`,
      steps: [
        { h: "第 1 步　判定无穷小", body: String.raw`验证 \(\lim f=0\)（注意是函数整体趋于 0，而非在某点取小值）。` },
        { h: "第 2 步　判定等价/同阶", body: String.raw`算 \(\lim f/g\)：得 1 即等价，得非零有限即同阶。` },
        { h: "第 3 步　判定高阶", body: String.raw`若 \(\lim f/g=0\)，记 \(f=o(g)\)；若存在界则 \(f=O(g)\)。` },
        { h: "第 4 步　等价替换", body: String.raw`在乘除运算中，因子可用其等价无穷小替换；加减中替换需谨慎（仅当阶数明显不同才安全）。` }
      ],
      boundary: String.raw`等价无穷小<b>只能在乘除中替换</b>；加减中替换可能出错，除非各项阶数不同。\(o/O\) 是大写字母记号，不是数。`,
      counterexample: String.raw`\(x\to0\) 时 \(\sin x\sim x\)，但 \(x-\sin x\) 不能简成 \(x-x=0\)——因为 \(x-\sin x\sim x^3/6\) 是高阶小量，正是被忽略的部分。`
    },
    {
      id: "T4.13", ch: "4", sec: "4.4", law: "公式 · 4.4",
      title: "Stirling 公式",
      tags: ["Stirling", "阶乘渐近"],
      category: "函数极限", subcategory: "重要公式",
      statement: String.raw`\[ n! = \sqrt{2\pi n}\left(\frac{n}{e}\right)^n e^{\theta_n/(12n)},\quad 0<\theta_n<1; \] 即渐近等价 \(n!\sim\sqrt{2\pi n}\left(\dfrac{n}{e}\right)^n\ (n\to\infty)\)。`,
      conditions: ["\\(n\\) 为正整数，考察 \\(n\\to\\infty\\)", "是<b>渐近等价</b>而非等式，含精度项 \\(e^{\\theta/(12n)}\\)"],
      idea: String.raw`用 \(\ln n!=\sum\ln k\) 与积分 \(\int\ln x\,dx\) 的近似，再借 Wallis 公式定出常数 \(\sqrt{2\pi}\)。误差项说明它实际极准。`,
      steps: [
        { h: "第 1 步　对数化", body: String.raw`比较 \(\ln n!=\sum_{k=1}^n\ln k\) 与 \(\int_1^n\ln x\,dx=n\ln n-n+1\)，误差由 Euler-Maclaurin 控制。` },
        { h: "第 2 步　定常数", body: String.raw`通过 Wallis 公式 \(\dfrac{\pi}{2}=\lim\dfrac{(2n)!!}{(2n-1)!!}\dfrac1{\sqrt n}\) 解出比例常数 \(\sqrt{2\pi}\)。` },
        { h: "第 3 步　写误差项", body: String.raw`完整形式为 \(n!=\sqrt{2\pi n}(n/e)^n e^{\theta_n/(12n)}\)，其中 \(0<\theta_n<1\)，给出逐项的相对误差约 \(1/(12n)\)。` }
      ],
      boundary: String.raw`这是渐近式，小的 \(n\) 也有偏差，但 \(n\ge10\) 已非常准；不能当成精确等式代入有限计算。`,
      counterexample: String.raw`\(n=1\) 时 Stirling 给 \(\approx0.92\)，与 1 有偏差；\(n=10\) 时误差已小于 1%，\(n=100\) 时优于 0.1%。`
    },
    {
      id: "T4.14", ch: "4", sec: "4.4", law: "定理 · 4.4",
      title: "素数定理（Prime Number Theorem）",
      tags: ["素数定理", "渐近"],
      category: "函数极限", subcategory: "重要定理",
      statement: String.raw`设 \(\pi(x)\) 为不超过 \(x\) 的素数个数，则
        \[ \pi(x)\sim\frac{x}{\ln x}\quad(x\to\infty), \]
        等价地 \(\pi(x)\sim\operatorname{Li}(x)=\displaystyle\int_2^x\frac{dt}{\ln t}\)。`,
      conditions: ["\\(x\\to\\infty\\) 是连续变量极限", "是整体渐近律，不排除局部的剧烈波动"],
      idea: String.raw`素数在整数中「稀疏但规则」，平均密度约为 \(1/\ln x\)。定理把这种统计规律写成严格的渐近等价，是解析数论的里程碑。`,
      steps: [
        { h: "第 1 步　素数计数函数", body: String.raw`记 \(\pi(x)=\#\{p\le x: p\ \text{素数}\}\)。` },
        { h: "第 2 步　密度猜想", body: String.raw`经验上素数越来越稀，平均间隔约 \(\ln x\)，故猜测 \(\pi(x)\approx x/\ln x\)。` },
        { h: "第 3 步　严格渐近", body: String.raw`定理断言 \(\lim_{x\to\infty}\dfrac{\pi(x)}{x/\ln x}=1\)。更精确的 \(\operatorname{Li}(x)\) 给出更小误差。` }
      ],
      boundary: String.raw`是渐近结论，对有限 \(x\) 有局部波动；\(1/\ln x\) 只是平均密度而非精确间隔，相邻素数间隔可任意大。`,
      counterexample: String.raw`存在任意长的连续合数区间（如 \((n+1)!+2,\dots,(n+1)!+n+1\)），故「密度 \(1/\ln x\)」只是统计平均，不保证每个邻域都均匀。`
    }
  ],

  /* ============ 习题：盟约对局 ============ */
  exercises: [
    {
      id: "E2.1-1", ch: "2", sec: "2.1",
      src: "讲义 2.1.5 练习题 1(2)", srcAns: "答案册 p11 · 2.1.1 练习题 1(2)",
      title: "适当放大法：证明 sin n / n → 0",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>用 \(\varepsilon\)-\(N\) 定义证明</p> \[ \lim_{n\to\infty}\frac{\sin n}{n}=0. \]</p>`,
      hints: [
        String.raw`先把目标 \(|a_n-0|\) 写出来：\(\left|\frac{\sin n}{n}\right|\)。你手上有什么关于 \(\sin\) 的现成不等式？`,
        String.raw`用 \(|\sin x|\le 1\) 放大：\(\left|\frac{\sin n}{n}\right|\le\frac1n\)。这叫「适当放大」——放大后的式子必须仍然趋于 0。`,
        String.raw`要让 \(\frac1n<\varepsilon\)，只需 \(n>\frac1\varepsilon\)。取 \(N=\left\lfloor\frac1\varepsilon\right\rfloor\)（或任意大于 \(1/\varepsilon\) 的整数）即可。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：ε-N 定义的第一道实操题，核心动作是「适当放大」——把不好控制的 \(|\sin n|\) 换成常数 1。</p>
        <p class="ans-h">一、分步解答</p>
        <ol class="ans-steps">
        <li><b>第 1 步　写出要证的不等式</b>：任取 \(\varepsilon>0\)，要找 \(N\)，使 \(n>N\) 时 \(\left|\frac{\sin n}{n}-0\right|<\varepsilon\)。</li>
        <li><b>第 2 步　适当放大</b>：对所有 \(n\) 有 \(|\sin n|\le1\)，故 \[ \left|\frac{\sin n}{n}\right|=\frac{|\sin n|}{n}\le\frac1n. \]注意分母 \(n>0\)，所以绝对值可以直接拆开，不需要讨论符号。放大的「适当」体现在：结果 \(\frac1n\to0\)，仍能把 \(\varepsilon\) 接住；若放大成 \(\frac{n}{n}=1\) 就没用了。</li>
        <li><b>第 3 步　解出 N</b>：要使 \(\frac1n<\varepsilon\)，等价于 \(n>\frac1\varepsilon\)。取 \(N=\left\lfloor\frac1\varepsilon\right\rfloor\)（也可取任意满足 \(N>1/\varepsilon\) 的正整数）。</li>
        <li><b>第 4 步　回代收尾</b>：当 \(n>N\) 时 \(n>\frac1\varepsilon\)，于是 \(\left|\frac{\sin n}{n}\right|\le\frac1n<\varepsilon\)。由定义 \(\frac{\sin n}{n}\to0\)。</li>
        </ol>
        <p class="ans-h">二、细节与线型（书写规范）</p>
        <ul class="ans-list"><li>顺序必须是「先给 \(\varepsilon\)，后找 \(N\)」，\(N\) 可以依赖 \(\varepsilon\) 但不能依赖 \(n\)。</li><li>放大方向别反：要证 \(|a_n|<\varepsilon\)，需要 \(|a_n|\le b_n\) 且 \(b_n<\varepsilon\)；若写成 \(|a_n|\ge b_n\) 则什么也推不出。</li><li>常见同型：\(\frac{3n^2}{n^2-4}\to3\)（答案册同题 (1)）先算差 \(\left|\frac{3n^2}{n^2-4}-3\right|=\frac{12}{|n^2-4|}\)，再对 \(n\) 充分大时放大成 \(\frac{C}{n^2}\)。</li></ul>
        <p class="ans-warn"><b>最容易丢分的地方</b>：① 直接用「\(\sin n\) 有界所以极限是 0」一句带过，没有写出 \(N\)；② 放大过头（如放大成常数 1），导致 \(\varepsilon\) 接不住；③ 把 \(N\) 写成依赖 \(n\) 的式子；④ 忘记 \(n>0\) 就拆绝对值。</p>
        <p class="ans-check"><b>画完逐条自查</b>：① 写了「任取 \(\varepsilon>0\)」吗？② 放大不等式方向对吗？③ \(N\) 只依赖 \(\varepsilon\) 吗？④ 回代后确实得到 \(<\varepsilon\) 吗？</p>`,
      pitfalls: ["没写出 N", "放大过头", "N 依赖 n"],
      check: ["任取 ε", "放大方向对", "N 只依赖 ε", "回代成立"],
      bet: "20 分钟专注 ↔ 1 段完整的 ε-N 放大论证",
      type: "choice",
      options: [
        String.raw`用 \(|\sin n|\le 1\) 把 \(\left|\frac{\sin n}{n}\right|\) 放缩成 \(\frac1n\)，再令 \(n>\frac1\varepsilon\) 取 \(N\)`,
        String.raw`直接由「\(\sin n\) 有界」断言极限为 0，不写 \(N\)`,
        String.raw`取 \(N=\lfloor\varepsilon\rfloor\)，则当 \(n>N\) 时 \(\frac1n<\varepsilon\)`,
        String.raw`对 \(\frac{\sin n}{n}\) 使用洛必达法则求极限`
      ],
      correct: 0,
      choiceExplain: String.raw`选 A。核心动作是「适当放大」：用 \(|\sin n|\le1\) 把分子压成常数，得到 \(\frac1n\)，它仍趋于 0，从而接到 \(\varepsilon\)。B 没写出 \(N\)，不算 ε-N 证明；C 把 \(N\) 取成 \(\lfloor\varepsilon\rfloor\) 方向反了（要 \(N>1/\varepsilon\)）；D 对离散数列不能用洛必达。`
    },
    {
      id: "E2.1-2", ch: "2", sec: "2.1",
      src: "讲义 2.1.5 练习题 2", srcAns: "答案册 p11 · 2.1.1 练习题 2",
      title: "分类讨论 + 有理化：√aₙ → √a",
      difficulty: "A", methods: ["M1"],
      statement: String.raw`<p>设 \(a_n\ge0\)，且 \(\lim\limits_{n\to\infty}a_n=a\)。证明</p> \[ \lim_{n\to\infty}\sqrt{a_n}=\sqrt{a}. \]</p>`,
      hints: [
        String.raw`先看 \(a=0\) 和 \(a>0\) 两种情形。为什么必须分开？（提示：\(a>0\) 时下面的有理化分母才有正下界。）`,
        String.raw`\(a=0\)：要 \(\sqrt{a_n}<\varepsilon\)，等价于 \(a_n<\varepsilon^2\)，直接用 \(a_n\to0\) 即可。`,
        String.raw`\(a>0\)：写 \(\sqrt{a_n}-\sqrt{a}=\dfrac{a_n-a}{\sqrt{a_n}+\sqrt{a}}\)，注意分母 \(\ge\sqrt{a}>0\)，于是可放大成 \(\dfrac{|a_n-a|}{\sqrt{a}}\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：ε-N 论证里最典型的「分类 + 有理化」。分类不是形式主义，是因为 \(a=0\) 时分母 \(\sqrt{a_n}+\sqrt{a}\) 可能趋于 0，放大失效。</p>
        <p class="ans-h">一、分步解答</p>
        <ol class="ans-steps">
        <li><b>第 1 步　先确认 a ≥ 0</b>：由 \(a_n\ge0\) 及极限保号性（若 \(a<0\)，取 \(\varepsilon=-a/2\) 会迫使充分大的 \(a_n<0\)，矛盾），故 \(a\ge0\)，\(\sqrt a\) 有意义。</li>
        <li><b>第 2 步　情形 a = 0</b>：任取 \(\varepsilon>0\)，由 \(a_n\to0\)，存在 \(N\) 使 \(n>N\) 时 \(a_n<\varepsilon^2\)（把 \(\varepsilon^2\) 当作定义里的「\(\varepsilon\)」用）。于是 \(\sqrt{a_n}<\varepsilon\)，即 \(\sqrt{a_n}\to0=\sqrt a\)。</li>
        <li><b>第 3 步　情形 a > 0：有理化</b>：\[ \left|\sqrt{a_n}-\sqrt a\right|=\frac{|a_n-a|}{\sqrt{a_n}+\sqrt a}. \]因为 \(\sqrt{a_n}\ge0\)，分母 \(\ge\sqrt a>0\)，所以 \[ \left|\sqrt{a_n}-\sqrt a\right|\le\frac{|a_n-a|}{\sqrt a}. \]</li>
        <li><b>第 4 步　接住 ε</b>：由 \(a_n\to a\)，对 \(\varepsilon\sqrt a>0\) 存在 \(N\) 使 \(n>N\) 时 \(|a_n-a|<\varepsilon\sqrt a\)。代入上式即得 \(\left|\sqrt{a_n}-\sqrt a\right|<\varepsilon\)。</li>
        <li><b>第 5 步　合并两种情形</b>：\(a=0\) 与 \(a>0\) 都已证明，结论成立。</li>
        </ol>
        <p class="ans-h">二、细节</p>
        <ul class="ans-list"><li>把 \(\varepsilon^2\)、\(\varepsilon\sqrt a\) 当作定义中的「\(\varepsilon\)」代入，是 ε-N 论证的常用技巧：只要它是正数就行。</li><li>分母放大用的是「分母变小则分式变大」，方向不能弄反。</li></ul>
        <p class="ans-warn"><b>最容易丢分的地方</b>：① 不分类，直接有理化，导致 \(a=0\) 时分母无正下界；② 忘了先由保号性说明 \(a\ge0\)；③ 写成 \(\le\frac{|a_n-a|}{\sqrt{a_n}+\sqrt a}\le\frac{|a_n-a|}{\sqrt a}\) 时把不等号方向弄反（正确：分母 \(\ge\sqrt a\)，故分式 \(\le\frac{|a_n-a|}{\sqrt a}\)）。</p>
        <p class="ans-check"><b>画完逐条自查</b>：① 分类了吗？② 说明了 \(a\ge0\) 吗？③ 有理化分母的下界找对了吗？④ 最后一步代入的是 \(\varepsilon\sqrt a\) 吗？</p>`,
      pitfalls: ["漏分类 a=0", "未证 a≥0", "分母下界方向错"],
      check: ["分类完整", "保号性说明", "有理化方向", "ε 代入正确"],
      bet: "25 分钟 ↔ 1 次分类讨论 + 有理化",
      type: "choice",
      options: [
        String.raw`\(a\) 可能为负数，根号无意义`,
        String.raw`\(a=0\) 时分母 \(\sqrt{a_n}+\sqrt a\) 可能趋于 0，有理化失去正下界`,
        String.raw`\(\sqrt{x}\) 在 \(x=0\) 处不连续`,
        String.raw`数列 \(\{a_n\}\) 可能本身不收敛`
      ],
      correct: 1,
      choiceExplain: String.raw`选 B。分类的根因：有理化后分母 \(\sqrt{a_n}+\sqrt a\)，当 \(a=0\) 时它趋于 0，放大 \(\frac{|a_n-a|}{\sqrt{a_n}+\sqrt a}\le\frac{|a_n-a|}{\sqrt a}\) 这一步的分母下界不再成立。A 错（由保号性 \(a\ge0\)）；C 错（\(\sqrt x\) 在 \([0,\infty)\) 连续）；D 错（已知 \(a_n\to a\) 故收敛）。`
    },
    {
      id: "E2.1-3", ch: "2", sec: "2.1",
      src: "讲义 2.1.5 练习题 3", srcAns: "答案册 p11 · 2.1.1 练习题 3",
      title: "绝对值极限与反例构造",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>设 \(a_n\to a\)，证明 \(|a_n|\to|a|\)；并举例说明反之不成立。</p>`,
      hints: [
        String.raw`用「绝对值差的三角不等式」：\(\big||x|-|y|\big|\le|x-y|\)。它把目标直接接回已知条件。`,
        String.raw`由 \(a_n\to a\)，对任意 \(\varepsilon>0\) 有 \(|a_n-a|<\varepsilon\)，于是 \(\big||a_n|-|a|\big|\le|a_n-a|<\varepsilon\)，无需另找 \(N\)。`,
        String.raw`反例要让 \(|a_n|\) 恒定而 \(a_n\) 来回跳：取 \(a_n=(-1)^n\)，则 \(|a_n|\equiv1\) 收敛，但 \(a_n\) 发散。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：一边是「一步到位」的放缩，一边是「条件必要性」的反例构造。后者正是数学分析里最容易被忽略、也最常被考的能力。</p>
        <p class="ans-h">一、分步解答</p>
        <ol class="ans-steps">
        <li><b>第 1 步　写出关键不等式</b>：对任意实数 \(x,y\)，由三角不等式 \(|x|=|(x-y)+y|\le|x-y|+|y|\) 得 \(|x|-|y|\le|x-y|\)；交换 \(x,y\) 得 \[ \big||x|-|y|\big|\le|x-y|. \]</li>
        <li><b>第 2 步　代入并接住 ε</b>：任取 \(\varepsilon>0\)，由 \(a_n\to a\) 存在 \(N\) 使 \(n>N\) 时 \(|a_n-a|<\varepsilon\)。于是 \[ \big||a_n|-|a|\big|\le|a_n-a|<\varepsilon, \]即 \(|a_n|\to|a|\)。注意这里 \(N\) 与原极限的 \(N\) 完全相同，不必重取。</li>
        <li><b>第 3 步　构造反例</b>：取 \(a_n=(-1)^n\)。则 \(|a_n|=1\) 对所有 \(n\) 成立，故 \(|a_n|\to1\) 收敛；但 \(a_n\) 在 \(-1\) 与 \(1\) 之间振荡。用唯一性定理（T2.1）严格说明：偶数项子列 \(\to1\)，奇数项子列 \(\to-1\)，若 \(a_n\) 收敛则两子列极限应相同，矛盾。</li>
        <li><b>第 4 步　点明反例在说什么</b>：\(|a_n|\) 收敛只控制「离 0 的距离」，丢掉了符号信息。所以从 \(|a_n|\) 推不出 \(a_n\)，除非再加条件（例如 \(a>0\) 且 \(a_n\) 最终为正，或 \(a_n\) 单调）。</li>
        </ol>
        <p class="ans-h">二、细节</p>
        <ul class="ans-list"><li>答案册给出的反例正是 \(a_n=(-1)^n\)，与讲义同题一致。</li><li>若把结论加强为「\(|a_n|\to|a|\) 且 \(a\neq0\)」仍推不出 \(a_n\to a\)；反例取 \(a_n=(-1)^n a\)。</li></ul>
        <p class="ans-warn"><b>最容易丢分的地方</b>：① 只证了 \(|a_n|-|a|\le|a_n-a|\) 就收尾，漏掉另一侧（需要绝对值）；② 反例只写「振荡」不说明理由，最好用子列 + 唯一性；③ 误以为加条件 \(a\neq0\) 就能反推。</p>
        <p class="ans-check"><b>画完逐条自查</b>：① 用的是双向绝对值不等式吗？② 反例的 \(|a_n|\) 确实收敛吗？③ 用唯一性或子列说清了 \(a_n\) 发散吗？</p>`,
      pitfalls: ["只证单侧不等式", "反例没说理由", "误加条件反推"],
      check: ["双向不等式", "反例收敛性", "发散论证完整"],
      bet: "15 分钟 ↔ 1 个正命题 + 1 个反例",
      type: "choice",
      options: [
        String.raw`\(a_n=\dfrac1n\)`,
        String.raw`\(a_n=(-1)^n\)`,
        String.raw`\(a_n=\dfrac{n}{n+1}\)`,
        String.raw`\(a_n=1\)`
      ],
      correct: 1,
      choiceExplain: String.raw`选 B。\(|(-1)^n|=1\) 恒收敛，但 \((-1)^n\) 在两个子列间振荡、极限不存在；用唯一性（T2.1）即可严格说明。A、C、D 本身都收敛，起不到反例作用。`
    },
    {
      id: "E2.2-1", ch: "2", sec: "2.2",
      src: "讲义 2.2.4 练习题 1", srcAns: "答案册 p12 · 2.2.1 练习题 1",
      title: "奇偶子列同时收敛 ⇒ 原数列收敛",
      difficulty: "A", methods: ["M1", "M3"],
      statement: String.raw`<p>设 \(\lim\limits_{k\to\infty}a_{2k}=\lim\limits_{k\to\infty}a_{2k-1}=A\)。证明 \(\lim\limits_{n\to\infty}a_n=A\)。</p>`,
      hints: [
        String.raw`要证的是「对所有 \(n>N\)」，而已知只管偶数项与奇数项。关键是把两个 \(k\) 的下界合并成一个 \(n\) 的下界。`,
        String.raw`设偶数项在 \(k>K_1\) 时 \(|a_{2k}-A|<\varepsilon\)，奇数项在 \(k>K_2\) 时 \(|a_{2k-1}-A|<\varepsilon\)。`,
        String.raw`取 \(N=\max\{2K_1,\,2K_2-1\}\)。验证：\(n>N\) 且 \(n=2k\) 时 \(2k>2K_1\Rightarrow k>K_1\)；\(n=2k-1>N\ge2K_2-1\Rightarrow k>K_2\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：ε-N 定义中「对所有 \(n>N\)」这一全称量词的落地。难点不在放缩，在于把两套指标 \(k\) 翻译回统一的 \(n\)。</p>
        <p class="ans-h">一、分步解答</p>
        <ol class="ans-steps">
        <li><b>第 1 步　把两个已知写成 ε-N 形式</b>：任取 \(\varepsilon>0\)。由 \(a_{2k}\to A\)，存在 \(K_1\) 使 \(k>K_1\) 时 \(|a_{2k}-A|<\varepsilon\)；由 \(a_{2k-1}\to A\)，存在 \(K_2\) 使 \(k>K_2\) 时 \(|a_{2k-1}-A|<\varepsilon\)。</li>
        <li><b>第 2 步　构造公共的 N</b>：取 \(N=\max\{2K_1,\ 2K_2-1\}\)。这就是答案册给出的构造。为什么是这两个数：\(2K_1\) 是偶数项「达标」的最后一个下标，\(2K_2-1\) 是奇数项「达标」的最后一个下标。</li>
        <li><b>第 3 步　分奇偶验证</b>：设 \(n>N\)。若 \(n=2k\)，则 \(2k>2K_1\Rightarrow k>K_1\)，故 \(|a_n-A|<\varepsilon\)；若 \(n=2k-1\)，则 \(2k-1>2K_2-1\Rightarrow k>K_2\)，同样 \(|a_n-A|<\varepsilon\)。</li>
        <li><b>第 4 步　收尾</b>：两种情形覆盖了所有 \(n>N\)，故 \(a_n\to A\)。</li>
        <li><b>第 5 步　反向检查必要性</b>：若 \(a_n\to A\)，则任何子列（包括奇偶子列）都收敛到 \(A\)。所以本题其实是「充要条件」，答案册里「必要性显然」指的就是这一半。</li>
        </ol>
        <p class="ans-h">二、细节</p>
        <ul class="ans-list"><li>本结论常用于证明振荡数列发散：只要找到两个子列极限不同即可（如 \(a_n=(-1)^n\)）。</li><li>取 \(N=2\max\{K_1,K_2\}\) 也是对的，只是比答案册的构造稍松一点；ε-N 论证不要求 \(N\) 最小。</li></ul>
        <p class="ans-warn"><b>最容易丢分的地方</b>：① 直接写「奇偶都收敛所以整体收敛」，没有构造 \(N\)；② 把 \(N\) 写成 \(\max\{K_1,K_2\}\)（下标单位错了，\(k\) 与 \(n\) 差一个 2 倍）；③ 忘记奇偶两种情形都要验证；④ 两个子列极限不相等时仍强行合并。</p>
        <p class="ans-check"><b>画完逐条自查</b>：① 构造了 \(N=\max\{2K_1,2K_2-1\}\) 吗？② 奇偶两种情形都验证了吗？③ \(k\) 与 \(n\) 的换算对吗？</p>`,
      pitfalls: ["没构造 N", "k/n 单位混淆", "奇偶未全覆盖"],
      check: ["N 构造正确", "奇偶验证", "指标换算"],
      bet: "30 分钟 ↔ 1 个 N = max{·} 的构造",
      type: "choice",
      options: [
        String.raw`\(N=\max\{K_1,K_2\}\)`,
        String.raw`\(N=\max\{2K_1,\;2K_2-1\}\)`,
        String.raw`\(N=K_1+K_2\)`,
        String.raw`\(N=\min\{2K_1,2K_2-1\}\)`
      ],
      correct: 1,
      choiceExplain: String.raw`选 B。偶数项下标 \(2k\)，要 \(2k>2K_1\) 即 \(k>K_1\)；奇数项下标 \(2k-1\)，要 \(2k-1>2K_2-1\) 即 \(k>K_2\)。取最大者合并成统一的 \(n\) 下界。A 把 \(k\) 与 \(n\) 混为一谈；C/D 不能保证奇偶同时达标。`
    },
    {
      id: "E2.3-7", ch: "2", sec: "2.3",
      src: "讲义 2.3.2 练习题 7", srcAns: "答案册 p15 · 2.3.1 练习题 7",
      title: "迭代数列：xₙ = sin xₙ₋₁ 的收敛性",
      difficulty: "S", methods: ["M2", "M5"],
      statement: String.raw`<p>设 \(0<x_1<\dfrac{\pi}{2}\)，\(x_n=\sin x_{n-1}\ (n\ge2)\)。证明 \(\{x_n\}\) 收敛并求极限。</p>`,
      hints: [
        String.raw`先证有界：用 \(0<\sin x<x\)（当 \(0<x<\pi/2\)）说明所有 \(x_n\in(0,\pi/2)\)。`,
        String.raw`由 \(\sin x<x\) 得 \(x_n=\sin x_{n-1}<x_{n-1}\)，数列严格递减且有下界 0，用单调有界定理（T2.3）得收敛。`,
        String.raw`设极限为 \(A\)，对递推式两边取极限得 \(A=\sin A\)。在 \([0,1]\) 上这个方程只有解 \(A=0\)（因 \(x>\sin x\) 对 \(x>0\)）。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：单调有界定理的完整用法——「先证收敛（存在性），再取极限求值」两步不能颠倒。这是本章最典型的迭代数列题。</p>
        <p class="ans-h">一、分步解答</p>
        <ol class="ans-steps">
        <li><b>第 1 步　建立基本不等式</b>：当 \(0<x<\frac{\pi}{2}\) 时有 \(0<\sin x<x\)（单位圆或导数法都可证）。这是整个题目的发动机。</li>
        <li><b>第 2 步　归纳得到有界性</b>：由 \(0<x_1<\frac\pi2\) 及 \(x_n=\sin x_{n-1}\)，归纳可得对所有 \(n\) 都有 \(0<x_n<\frac\pi2\)，特别地 \(\{x_n\}\) 有下界 0。</li>
        <li><b>第 3 步　证明严格递减</b>：\(x_n=\sin x_{n-1}<x_{n-1}\)（因 \(x_{n-1}>0\) 且 \(\sin x<x\)）。故 \(\{x_n\}\) 单调递减。</li>
        <li><b>第 4 步　调用单调有界定理</b>：单调递减且有下界 ⇒ 收敛。设 \(\lim x_n=A\)，由 \(0<x_n<\frac\pi2\) 得 \(0\le A\le1\)。<b>注意</b>：这一步只给出「极限存在」，还没求出值。</li>
        <li><b>第 5 步　对递推式取极限</b>：\(\sin\) 连续，故 \(A=\lim x_n=\lim\sin x_{n-1}=\sin A\)。</li>
        <li><b>第 6 步　解极限方程</b>：在 \(0<A\le1\) 上恒有 \(\sin A<A\)，与 \(A=\sin A\) 矛盾；故只能 \(A=0\)。由极限唯一性（T2.1），\(\lim x_n=0\)。</li>
        </ol>
        <p class="ans-h">二、细节</p>
        <ul class="ans-list"><li>答案册写「因为 \(A=0\) 时上式成立，故由数列极限唯一性知极限为 0」，用的正是唯一性排除其他解。</li><li>同型题：\(x_{n+1}=\frac{n+1}{2n+1}x_n\)（答案册 2.3.1 第 4 题）也是「单调有界 ⇒ 存在 ⇒ 取极限解方程 ⇒ 得 0」的同一套流程。</li><li>若迭代函数是 \(\cos\) 或含参数，可能收敛到非零不动点，那时解 \(A=f(A)\) 就是主要工作。</li></ul>
        <p class="ans-warn"><b>最容易丢分的地方</b>：① 一上来就对 \(x_n=\sin x_{n-1}\) 取极限求 \(A\)，没先证明极限存在（逻辑倒置，是本题最大扣分点）；② 忘了证明 \(x_n>0\)，导致单调性没有依据；③ 解 \(A=\sin A\) 时没说明为什么只有 \(A=0\)；④ 把 \(\sin x<x\) 的适用范围写错（仅对 \(x>0\) 成立）。</p>
        <p class="ans-check"><b>画完逐条自查</b>：① 先证了单调性 + 有界性吗？② 明确写了「由单调有界定理，极限存在」吗？③ 取极限时用了 \(\sin\) 的连续性吗？④ 排除了 \(A>0\) 吗？</p>`,
      pitfalls: ["未证存在就求极限", "漏证有界", "未排除 A>0"],
      check: ["存在性先行", "单调有界", "极限方程", "唯一性收尾"],
      bet: "35 分钟 ↔ 1 条单调性 + 1 个极限方程",
      type: "proof",
      keySteps: [
        { t: String.raw`由 \(0<\sin x<x\,(0<x<\pi/2)\) 归纳得所有 \(x_n\in(0,\pi/2)\)，从而有下界 0`, k: true },
        { t: String.raw`由 \(\sin x<x\) 得 \(x_n=\sin x_{n-1}<x_{n-1}\)，故 \(\{x_n\}\) 严格递减`, k: true },
        { t: String.raw`由单调有界定理，极限存在，设 \(\lim x_n=A\)（\(0\le A\le1\)）`, k: true },
        { t: String.raw`对递推式两边取极限，利用 \(\sin\) 连续得 \(A=\sin A\)`, k: true },
        { t: String.raw`在 \((0,1]\) 上恒有 \(\sin A<A\)，故只能 \(A=0\)`, k: true },
        { t: String.raw`直接对数列使用洛必达法则求极限`, k: false },
        { t: String.raw`由 \(\{x_n\}\) 有界立刻推出收敛`, k: false }
      ],
      core: [
        { t: String.raw`单调有界收敛定理`, u: true },
        { t: String.raw`基本不等式 \(\sin x<x\;(x>0)\)`, u: true },
        { t: String.raw`极限的唯一性（排除 \(A>0\)）`, u: true },
        { t: String.raw`夹逼准则`, u: false },
        { t: String.raw`Stolz 定理`, u: false }
      ],
      proofExplain: String.raw`五步缺一不可：有界性与单调性是「存在性」的两支柱；取极限必须用连续性；最后用唯一性排除非零解。洛必达不能用于离散数列；有界不单调（如 \((-1)^n\)）也不收敛。`
    },
    {
      id: "E2.4-1", ch: "2", sec: "2.4",
      src: "讲义 2.4.1 命题 2.4.1（Cauchy 命题）", srcAns: "讲义 p32 §2.4 Cauchy 命题与 Stolz 定理（两截 ε-N 估计）；答案册 p16 · 2.4.1",
      title: "Cauchy 命题：算术平均的极限",
      difficulty: "S", methods: ["M1", "M4"],
      statement: String.raw`<p>设 \(\lim\limits_{n\to\infty}x_n=l\)。证明</p> \[ \lim_{n\to\infty}\frac{x_1+x_2+\cdots+x_n}{n}=l. \]</p>
        <p>这是讲义 §2.4.1 的命题 2.4.1，也是 Stolz 定理在 \(y_n=n\) 时的原型。</p>`,
      hints: [
        String.raw`把平均值按「前 \(N\) 项」与「第 \(N+1\) 项之后」拆成两段：\(\frac{x_1+\cdots+x_N}{n}+\frac{x_{N+1}+\cdots+x_n}{n}\)。`,
        String.raw`第二段的每一项都与 \(l\) 充分接近，共 \(n-N\) 项，所以它约等于 \(l\cdot\frac{n-N}{n}\)，与 \(l\) 的差不超过 \(\varepsilon\cdot\frac{n-N}{n}\)。`,
        String.raw`第一段分子是固定的有限和，除以 \(n\to\infty\) 后趋于 0。取 \(N\) 固定后，再让 \(n\) 足够大即可。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：讲义 §2.4.1 的「分析」里明确说：夹逼、单调有界这些前面的方法都用不上，需要新招——<b>把和拆成「有限的头部」与「充分接近 l 的尾部」</b>。这是 ∞/∞ 型极限最基础的训练。</p>
        <p class="ans-h">一、分步解答</p>
        <ol class="ans-steps">
        <li><b>第 1 步　平移化简</b>：令 \(y_n=x_n-l\)，则 \(y_n\to0\)，只需证 \(\frac{y_1+\cdots+y_n}{n}\to0\)。这样目标变成「趋于 0」，估计更干净。</li>
        <li><b>第 2 步　用极限固定一个 N</b>：任取 \(\varepsilon>0\)，由 \(y_n\to0\)，存在 \(N\) 使 \(k>N\) 时 \(|y_k|<\varepsilon/2\)。注意 \(N\) 一旦取定，前 \(N\) 项就是<b>固定的有限个数</b>。</li>
        <li><b>第 3 步　拆和</b>：对 \(n>N\)，\[ \left|\frac{y_1+\cdots+y_n}{n}\right| \le \frac{|y_1+\cdots+y_N|}{n} + \frac{|y_{N+1}|+\cdots+|y_n|}{n}. \]</li>
        <li><b>第 4 步　估尾部</b>：第二段共 \(n-N\) 项，每项 \(<\varepsilon/2\)，故 \[ \frac{|y_{N+1}|+\cdots+|y_n|}{n} < \frac{n-N}{n}\cdot\frac{\varepsilon}{2} < \frac{\varepsilon}{2}. \]</li>
        <li><b>第 5 步　估头部</b>：记 \(C=|y_1+\cdots+y_N|\)（固定常数）。因 \(C/n\to0\)，存在 \(N_2>N\) 使 \(n>N_2\) 时 \(C/n<\varepsilon/2\)。</li>
        <li><b>第 6 步　合并</b>：当 \(n>N_2\) 时两段之和 \(<\varepsilon\)，故平均值趋于 0，即原极限为 \(l\)。</li>
        </ol>
        <p class="ans-h">二、细节与推广</p>
        <ul class="ans-list"><li>讲义 p32 的分析特意指出：第二段的分子每一项都接近 \(l\)，但分母是 \(n\) 而非 \(n-N\)，多出的因子 \((n-N)/n\to1\) 不影响结论——这正是「没有困难」的地方。</li><li>两段性质完全不同：头部靠分母 \(n\to\infty\) 压到 0，尾部靠每一项小。这就是为什么不能用单调有界或夹逼一步搞定。</li><li>取 \(y_n=n\) 用 Stolz 定理（T2.4）可一步得到结论：\(\frac{\Delta(x_1+\cdots+x_n)}{\Delta n}=x_{n+1}\to l\)。</li></ul>
        <p class="ans-warn"><b>最容易丢分的地方</b>：① 直接写「每一项都趋于 \(l\)，所以平均趋于 \(l\)」——项数也在变，这不成立；② 拆和后忘记头部是固定有限和、需要再取一次 \(n\) 充分大；③ 把 \(N\) 与 \(n\) 一起放缩，导致 \(N\) 依赖 \(n\)；④ 用夹逼时找不到合适的上下界。</p>
        <p class="ans-check"><b>画完逐条自查</b>：① 平移到 \(y_n\to0\) 了吗？② 拆成头尾两段了吗？③ 头部的 \(N\) 固定了吗？④ 第二次取 \(n\) 充分大了吗？</p>`,
      pitfalls: ["项数变化被忽略", "头部未单独处理", "N 依赖 n"],
      check: ["平移化简", "拆两段", "N 固定", "二次取 n"],
      bet: "40 分钟 ↔ 1 次「拆分前 N 项」的完整估计",
      type: "proof",
      keySteps: [
        { t: String.raw`令 \(y_n=x_n-l\)，则 \(y_n\to0\)，把目标化为证明算术平均趋于 0（平移化简，估计更干净）`, k: true },
        { t: String.raw`由 \(y_n\to0\)，先取定一个 \(N\)，使 \(k>N\) 时 \(|y_k|<\varepsilon/2\)（\(N\) 一旦固定，前 \(N\) 项就是有限常数）`, k: true },
        { t: String.raw`把和拆成「前 \(N\) 项」与「第 \(N+1\) 到 \(n\) 项」两段分别估计`, k: true },
        { t: String.raw`尾部共 \(n-N\) 项，每项 \(<\varepsilon/2\)，故尾部绝对值之和 \(<\frac{n-N}{n}\cdot\frac{\varepsilon}{2}<\frac{\varepsilon}{2}\)`, k: true },
        { t: String.raw`头部是固定有限和 \(C/n\)，因 \(C\) 固定、\(n\to\infty\)，二次取 \(n\) 充分大使 \(C/n<\varepsilon/2\)`, k: true },
        { t: String.raw`直接用夹逼准则一步夹出极限`, k: false },
        { t: String.raw`因为每一项都趋于 \(l\)，所以平均自然趋于 \(l\)（项数也在变，此理由不成立）`, k: false }
      ],
      core: [
        { t: String.raw`适当放大法（\(\varepsilon\)-\(N\) 估计的核心动作）`, u: true },
        { t: String.raw`极限的线性 / 平移性质（\(y_n=x_n-l\) 仍收敛到 0）`, u: true },
        { t: String.raw`「先固定 \(N\)、再让 \(n\to\infty\)」的两段估计思想`, u: true },
        { t: String.raw`Stolz 定理（它是本题的推广与原型，但本证本身不依赖它）`, u: false },
        { t: String.raw`单调有界收敛定理（本题与单调、有界无关）`, u: false }
      ],
      proofExplain: String.raw`五步是「平移化简 → 固定 N → 拆两段 → 估尾 → 估头」。关键思想是两段性质不同：尾靠每一项充分小，头靠除以 \(n\) 压到 0；所以不能像夹逼那样一步搞定。Stolz 定理是它的一般化（\(y_n=n\) 的特例），但本题证明本身并不使用它。`
    },

    /* ===== 第四章 · 函数极限 对局 ===== */
    {
      id: "E4.1-think", ch: "4", sec: "4.1",
      src: "讲义 4.1.2 思考题", srcAns: "答案册 4.1 思考题解答",
      title: "绝对值与极限：若 lim f=A 则 lim|f|=|A|；反之是否成立？",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>设 \(\lim\limits_{x\to x_0}f(x)=A\)。证明 \(\lim\limits_{x\to x_0}|f(x)|=|A|\)，并举例说明<b>反过来不成立</b>。</p>`,
      hints: [
        String.raw`用反向三角不等式：\(||f(x)|-|A||\le |f(x)-A|\)。`,
        String.raw`取与证明 \(\lim f=A\) 时<b>同一个</b> \(\delta\)，由 \(|f(x)-A|<\varepsilon\) 直接推出 \(||f(x)|-|A||<\varepsilon\)。`,
        String.raw`反例：构造一个在某点左右极限异号的函数，使它的绝对值恒为常数。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：函数极限定义 + 反向三角不等式；以及「绝对值运算保极限」但「逆运算不保存在」。</p>
        <ol class="ans-steps">
          <li><b>证正向</b>：由 \(||f(x)|-|A||\le|f(x)-A|\)。任取 \(\varepsilon>0\)，存在 \(\delta>0\) 使 \(0<|x-x_0|<\delta\) 时 \(|f(x)-A|<\varepsilon\)，于是 \(||f(x)|-|A||<\varepsilon\)，即 \(\lim|f|=|A|\)。</li>
          <li><b>反例</b>：取 \(f(x)=\operatorname{sgn}(x)\)。\(\lim\limits_{x\to0}|f(x)|=1\) 存在，但 \(f(x)\) 在 0 处左极限 \(-1\)、右极限 \(+1\)，极限不存在。故反向不成立。</li>
        </ol>`,
      type: "proof",
      keySteps: [
        { t: String.raw`写出反向三角不等式 \(||f|-|A||\le|f-A|\)`, k: true },
        { t: String.raw`由 \(\lim f=A\) 取同一 \(\delta\) 使 \(|f-A|<\varepsilon\)`, k: true },
        { t: String.raw`由此得 \(||f|-|A||<\varepsilon\)，证毕正向`, k: true },
        { t: String.raw`反例用 \(f(x)=\operatorname{sgn}(x)\)，\(|f|\equiv1\) 但 \(f\) 在 0 处无极限`, k: true },
        { t: String.raw`反例应取 \(f(x)=e^x\)，因指数连续所以极限存在`, k: false }
      ],
      core: [
        { t: String.raw`反向三角不等式`, u: true },
        { t: String.raw`极限定义中 \(\delta\) 的取法`, u: true },
        { t: String.raw`绝对值保极限、逆不保存在`, u: true },
        { t: String.raw`反例需让 \(|f|\) 有极限而 \(f\) 无极限`, u: true }
      ],
      proofExplain: String.raw`正向是「先放缩再调用原极限」；反向不成立的本质是极限只描述「逼近的值」，而绝对值把正负信息抹平了——左右极限异号时绝对值可以稳住，函数本身却发散。`
    },
    {
      id: "E4.1.4", ch: "4", sec: "4.1",
      src: "讲义 4.1.4 例题", srcAns: "答案册 4.1.4",
      title: "用定义证明 \(\lim_{x\to2}(x^2-4x+3)=-1\)",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>用函数极限的 \(\varepsilon\)-\(\delta\) 定义证明</p> \[ \lim_{x\to2}(x^2-4x+3)=-1. \]`,
      hints: [
        String.raw`把目标写成 \(|(x^2-4x+3)-(-1)|=|(x-2)^2|\)。`,
        String.raw`先限制 \(|x-2|<1\)，从而 \(|x-2|^2<|x-2|\)。`,
        String.raw`取 \(\delta=\min\{1,\varepsilon\}\)：当 \(|x-2|<\delta\) 时 \(|(x-2)^2|<\varepsilon\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：多项式极限的 \(\varepsilon\)-\(\delta\) 论证——先把差值因式分解成含 \((x-x_0)\) 的因子，再用「先限幅、再让幅值压过 \(\varepsilon\)」的技巧。</p>
        <ol class="ans-steps">
          <li>\(|(x^2-4x+3)-(-1)|=|(x-2)^2|\)。</li>
          <li>限制 \(|x-2|<1\)，则 \(|(x-2)^2|=|x-2|\cdot|x-2|<|x-2|\)。</li>
          <li>取 \(\delta=\min\{1,\varepsilon\}\)。当 \(0<|x-2|<\delta\) 时，\(|(x-2)^2|<|x-2|<\delta\le\varepsilon\)。</li>
        </ol>`,
      type: "proof",
      keySteps: [
        { t: String.raw`化简目标为 \(|(x-2)^2|\)`, k: true },
        { t: String.raw`先设 \(|x-2|<1\) 以控制二次项`, k: true },
        { t: String.raw`取 \(\delta=\min\{1,\varepsilon\}\)`, k: true },
        { t: String.raw`验证 \(|x-2|<\delta\Rightarrow|(x-2)^2|<\varepsilon\)`, k: true },
        { t: String.raw`必须取 \(\delta=\varepsilon\) 而不能先限幅`, k: false }
      ],
      core: [
        { t: String.raw`因式分解出 \((x-x_0)\) 因子`, u: true },
        { t: String.raw`先限幅再压 \(\varepsilon\) 的技巧`, u: true },
        { t: String.raw`\(\delta\) 与 \(\varepsilon\) 的关系`, u: true },
        { t: String.raw`多项式极限可用代入法（连续性）`, u: false }
      ],
      proofExplain: String.raw`和数列的 \(\varepsilon\)-\(N\) 一样，核心是「把差值表示成关于 \(|x-x_0|\) 的式子，再解出 \(\delta\)」。多项式因为有 \((x-2)\) 因子，平方后只要先限幅就能让二次项被一次项控制。`
    },
    {
      id: "E4.1.5-10", ch: "4", sec: "4.1.5",
      src: "讲义 4.1.5 练习题 10", srcAns: "答案册 4.1.5 练习题 10",
      title: "求 \(\lim_{x\to0}\dfrac{\sqrt{1+x}-\sqrt{1-x}}{x}\)",
      difficulty: "B", methods: ["M7"],
      statement: String.raw`<p>求极限</p> \[ \lim_{x\to0}\frac{\sqrt{1+x}-\sqrt{1-x}}{x}. \]`,
      hints: [
        String.raw`分子是 \(\sqrt a-\sqrt b\) 型，用有理化（乘共轭）。`,
        String.raw`\(\sqrt{1+x}-\sqrt{1-x}=\dfrac{2x}{\sqrt{1+x}+\sqrt{1-x}}\)。`,
        String.raw`约去 \(x\) 后令 \(x\to0\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：含根号的 \(0/0\) 型——有理化消去分母的零因子。</p>
        <p class="ans-h">解答</p>
        \[ \frac{\sqrt{1+x}-\sqrt{1-x}}{x}=\frac{2x}{x(\sqrt{1+x}+\sqrt{1-x})}=\frac{2}{\sqrt{1+x}+\sqrt{1-x}}\xrightarrow{x\to0}1. \]
        <p>故极限为 <b>1</b>。</p>`,
      type: "choice",
      options: ["0", "1", "2", "不存在"],
      correct: 1,
      choiceExplain: String.raw`有理化后约去 \(x\)，代入 \(x=0\) 得 \(2/(1+1)=1\)。`
    },
    {
      id: "E4.1.5-11", ch: "4", sec: "4.1.5",
      src: "讲义 4.1.5 练习题 11", srcAns: "答案册 4.1.5 练习题 11",
      title: "求 \(\lim_{x\to a}\dfrac{x^m-a^m}{x^n-a^n}\ (m,n\in\mathbb N^+)\)",
      difficulty: "C", methods: ["M7", "M8"],
      statement: String.raw`<p>设 \(m,n\) 为正整数，\(a\ne0\)。求</p> \[ \lim_{x\to a}\frac{x^m-a^m}{x^n-a^n}. \]`,
      hints: [
        String.raw`用公式 \(x^k-a^k=(x-a)(x^{k-1}+x^{k-2}a+\cdots+a^{k-1})\)。`,
        String.raw`分子分母同时约去 \((x-a)\)。`,
        String.raw`代入 \(x=a\) 得 \(\dfrac{m a^{m-1}}{n a^{n-1}}=\dfrac mn a^{m-n}\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：幂差公式约掉零因子；或令 \(t=x-a\) 后用等价无穷小。</p>
        \[ \frac{x^m-a^m}{x^n-a^n}=\frac{(x-a)(\cdots)}{(x-a)(\cdots)}\xrightarrow{x\to a}\frac{m a^{m-1}}{n a^{n-1}}=\frac mn a^{m-n}. \]
        <p>故极限为 <b>\(\dfrac mn a^{m-n}\)</b>。</p>`,
      type: "choice",
      options: ["\\(\\dfrac{m}{n}a^{m+n}\\)", "\\(\\dfrac{m}{n}a^{m-n}\\)", "\\(\\dfrac{n}{m}a^{m-n}\\)", "不存在"],
      correct: 1,
      choiceExplain: String.raw`约去 \((x-a)\) 后代入，分子导数值 \(m a^{m-1}\)，分母 \(n a^{n-1}\)，比值 \(\frac mn a^{m-n}\)。`
    },
    {
      id: "E4.1.5-14", ch: "4", sec: "4.1.5",
      src: "讲义 4.1.5 练习题 14", srcAns: "答案册 4.1.5 练习题 14",
      title: "求 \(\lim_{x\to0}\dfrac{\sqrt[m]{1+x}-\sqrt[m]{1-x}}{x}\)",
      difficulty: "C", methods: ["M7", "M6"],
      statement: String.raw`<p>设 \(m\in\mathbb N^+\)。求</p> \[ \lim_{x\to0}\frac{\sqrt[m]{1+x}-\sqrt[m]{1-x}}{x}. \]`,
      hints: [
        String.raw`令 \(u=\sqrt[m]{1+x}, v=\sqrt[m]{1-x}\)，则 \(u^m-v^m=2x\)。`,
        String.raw`利用 \(u^m-v^m=(u-v)(u^{m-1}+\cdots+v^{m-1})\)。`,
        String.raw`约去 \(x\) 后令 \(x\to0\)，分母趋于 \(m\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：根式差的极限——用 \(u^m-v^m\) 公式约去零因子（第 11 题的推广）。</p>
        \[ \frac{\sqrt[m]{1+x}-\sqrt[m]{1-x}}{x}=\frac{u-v}{u^m-v^m}=\frac{1}{u^{m-1}+u^{m-2}v+\cdots+v^{m-1}}\xrightarrow{x\to0}\frac{1}{m}. \]
        <p>再乘回差值系数：原式 \(=2\cdot\dfrac1m=\dfrac{2}{m}\)。故极限为 <b>\(\dfrac{2}{m}\)</b>。</p>`,
      type: "choice",
      options: ["\\(\\dfrac1m\\)", "\\(\\dfrac2m\\)", "\\(m\\)", "\\(2m\\)"],
      correct: 1,
      choiceExplain: String.raw`差值 \(u-v\) 对应 \(2x\)，分母的 \(m\) 项在 \(x\to0\) 时各趋于 1，故整体 \(2/m\)。`
    },

    /* ---- 4.2 函数极限的基本性质 ---- */
    {
      id: "E4.2.1", ch: "4", sec: "4.2",
      src: "讲义 4.2.1 例题", srcAns: "答案册 4.2.1",
      title: "用极限性质证明局部保号性",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>证明：若 \(\lim\limits_{x\to x_0}f(x)=A>0\)，则存在 \(\delta>0\)，当 \(0<|x-x_0|<\delta\) 时 \(f(x)>0\)。</p>`,
      hints: [
        String.raw`取 \(\varepsilon=\dfrac A2>0\)。`,
        String.raw`由极限定义，\(|f(x)-A|<\dfrac A2\)。`,
        String.raw`拆开得 \(\dfrac A2<f(x)<\dfrac{3A}{2}\)，故 \(f(x)>0\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：局部保号性是「极限值为正 ⇒ 邻域内函数值为正」，本质是取一半误差把函数值钉在正侧。</p>
        <p>取 \(\varepsilon=A/2\)。存在 \(\delta>0\)，当 \(0<|x-x_0|<\delta\) 时 \(|f(x)-A|<A/2\)，即 \(A/2<f(x)<3A/2\)，故 \(f(x)>0\)。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`取 \(\varepsilon=A/2\)`, k: true },
        { t: String.raw`由极限定义得 \(|f-A|<A/2\)`, k: true },
        { t: String.raw`推出 \(f(x)>A/2>0\)`, k: true },
        { t: String.raw`结论只在去心邻域成立，不保证 \(x=x_0\) 处`, k: true },
        { t: String.raw`应取 \(\varepsilon=2A\) 以放大范围`, k: false }
      ],
      core: [
        { t: String.raw`局部保号性的前提 \(A>0\)`, u: true },
        { t: String.raw`取半误差 \(\varepsilon=A/2\)`, u: true },
        { t: String.raw`去心邻域 vs 在 \(x_0\) 处`, u: true },
        { t: String.raw`反向只给 \(\ge0\)`, u: true }
      ],
      proofExplain: String.raw`局部保号是「整体偏正就不会忽正忽负地穿过 0」。关键点：只能推出去心邻域严格为正，且反向只能得 \(A\ge0\)（如 \(x^2\to0\)）。`
    },
    {
      id: "E4.2.2", ch: "4", sec: "4.2",
      src: "讲义 4.2.2 例题", srcAns: "答案册 4.2.2",
      title: "用夹逼证明 \(\lim_{x\to0}x\sin\dfrac1x=0\)",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>证明</p> \[ \lim_{x\to0}x\sin\frac1x=0. \]`,
      hints: [
        String.raw`利用 \(|\sin(1/x)|\le1\) 对任意 \(x\ne0\) 成立。`,
        String.raw`于是 \(-|x|\le x\sin\frac1x\le |x|\)。`,
        String.raw`两端都趋于 0，由夹逼得中间也趋于 0。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：有界函数 × 无穷小量 = 无穷小量；或直接用夹逼（最经典的「震荡但有界」例）。</p>
        <p>因 \(\left|\sin\frac1x\right|\le1\)，故 \(-|x|\le x\sin\frac1x\le |x|\)。而 \(\lim_{x\to0}(-|x|)=\lim_{x\to0}|x|=0\)，由夹逼定理 \(\lim\limits_{x\to0}x\sin\frac1x=0\)。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`写出 \(|\sin(1/x)|\le1\)`, k: true },
        { t: String.raw`得到 \(-|x|\le x\sin(1/x)\le|x|\)`, k: true },
        { t: String.raw`两端极限均为 0`, k: true },
        { t: String.raw`夹逼得中间极限为 0`, k: true },
        { t: String.raw`需先证 \(\sin(1/x)\) 收敛`, k: false }
      ],
      core: [
        { t: String.raw`有界量 × 无穷小 = 无穷小`, u: true },
        { t: String.raw`夹逼定理`, u: true },
        { t: String.raw`\(|\sin t|\le1\) 的全局有界性`, u: true },
        { t: String.raw`震荡不代表无极限（只要振幅被压下）`, u: true }
      ],
      proofExplain: String.raw`它说明「函数可以剧烈震荡」但只要有界且系数趋于 0，整体仍趋于 0。注意 \(\sin(1/x)\) 自身在 0 处无极限，但乘上 \(x\) 后就被压平了。`
    },
    {
      id: "E4.2.4", ch: "4", sec: "4.2",
      src: "讲义 4.2.4 例题", srcAns: "答案册 4.2.4",
      title: "求 \(\lim_{x\to\infty}\dfrac{3x^2-2x+1}{2x^2+5}\)",
      difficulty: "B", methods: ["M7"],
      statement: String.raw`<p>求极限</p> \[ \lim_{x\to\infty}\frac{3x^2-2x+1}{2x^2+5}. \]`,
      hints: [
        String.raw`分子分母同除以最高次幂 \(x^2\)。`,
        String.raw`化为 \(\dfrac{3-2/x+1/x^2}{2+5/x^2}\)。`,
        String.raw`\(1/x,1/x^2\to0\)，得 \(3/2\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：有理分式在无穷远处的极限——只由最高次项决定。</p>
        \[ \frac{3x^2-2x+1}{2x^2+5}=\frac{3-2/x+1/x^2}{2+5/x^2}\xrightarrow{x\to\infty}\frac32. \]
        <p>故极限为 <b>\(3/2\)</b>。</p>`,
      type: "choice",
      options: ["\\(\\dfrac32\\)", "\\(\\dfrac23\\)", "\\(\\infty\\)", "0"],
      correct: 0,
      choiceExplain: String.raw`同除以 \(x^2\) 后低次项趋于 0，比值 = 最高次系数比。`
    },
    {
      id: "E4.2.5-1", ch: "4", sec: "4.2.5",
      src: "讲义 4.2.5 练习题 1", srcAns: "答案册 4.2.5 练习题 1",
      title: "用夹逼证明 \(\lim_{x\to0}x\left[\dfrac1x\right]=1\)（[·] 为取整）",
      difficulty: "C", methods: ["M1"],
      statement: String.raw`<p>记 \([t]\) 为不超过 \(t\) 的最大整数。证明</p> \[ \lim_{x\to0}x\left[\frac1x\right]=1. \]`,
      hints: [
        String.raw`对任意 \(t\)，有 \(t-1<[t]\le t\)。`,
        String.raw`令 \(t=1/x\)：\(\frac1x-1<\left[\frac1x\right]\le\frac1x\)。`,
        String.raw`乘以 \(x>0\)（先考虑右侧极限）再夹逼；左侧同理。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：取整函数的夹逼——用「\(t-1<[t]\le t\)」把取整运算夹住。</p>
        <p>由 \(t-1<[t]\le t\) 取 \(t=1/x\)：\(\frac1x-1<\left[\frac1x\right]\le\frac1x\)。当 \(x>0\) 乘 \(x\) 得 \(1-x<x[1/x]\le1\)；当 \(x<0\) 不等号反向仍夹向 1。两端极限均为 1，故 \(\lim\limits_{x\to0}x[1/x]=1\)。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`利用 \(t-1<[t]\le t\)`, k: true },
        { t: String.raw`代入 \(t=1/x\) 并乘以 \(x\)`, k: true },
        { t: String.raw`得到两侧都趋于 1 的不等式`, k: true },
        { t: String.raw`夹逼得极限为 1`, k: true },
        { t: String.raw`取整满足 \([t]\le t+1\)`, k: false }
      ],
      core: [
        { t: String.raw`取整函数的基本不等式`, u: true },
        { t: String.raw`夹逼定理`, u: true },
        { t: String.raw`左右极限分别处理`, u: true },
        { t: String.raw`极限值与取整误差无关（误差被 \(x\) 压掉）`, u: true }
      ],
      proofExplain: String.raw`取整的「舍入误差」最多 1，乘以趋于 0 的 \(x\) 后整体趋于 0，所以 \(x[1/x]\) 与 \(x\cdot(1/x)=1\) 的差被消除。`
    },
    {
      id: "E4.2.5-7", ch: "4", sec: "4.2.5",
      src: "讲义 4.2.5 练习题 7", srcAns: "答案册 4.2.5 练习题 7",
      title: "保序性：若 f≤g（去心邻域）则 lim f≤lim g",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>设 \(\lim\limits_{x\to x_0}f(x)=A,\ \lim\limits_{x\to x_0}g(x)=B\)，且在 \(x_0\) 的某去心邻域有 \(f(x)\le g(x)\)。证明 \(A\le B\)。</p>`,
      hints: [
        String.raw`反证：若 \(A>B\)，取 \(\varepsilon=(A-B)/2>0\)。`,
        String.raw`存在去心邻域使 \(f(x)>A-\varepsilon\) 且 \(g(x)<B+\varepsilon=A-\varepsilon\)。`,
        String.raw`于是该邻域内 \(f(x)>g(x)\)，与已知矛盾。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：极限保持不等号（保序性）。注意只保「≤」，等号可能因极限而松弛。</p>
        <p>反证：若 \(A>B\)，取 \(\varepsilon=(A-B)/2\)。存在去心邻域使 \(f(x)>A-\varepsilon=(A+B)/2\) 且 \(g(x)<B+\varepsilon=(A+B)/2\)，于是 \(f(x)>g(x)\)，矛盾。故 \(A\le B\)。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`反设 \(A>B\) 并取 \(\varepsilon=(A-B)/2\)`, k: true },
        { t: String.raw`由极限定义分别控制 \(f,g\) 的误差`, k: true },
        { t: String.raw`推出 \(f(x)>g(x)\) 与已知矛盾`, k: true },
        { t: String.raw`故 \(A\le B\)`, k: true },
        { t: String.raw`可直接得 \(A<B\)（严格）`, k: false }
      ],
      core: [
        { t: String.raw`保序性只保 ≤`, u: true },
        { t: String.raw`反证 + 取半误差`, u: true },
        { t: String.raw`极限可能让严格不等变非严格`, u: true },
        { t: String.raw`去心邻域的条件作用`, u: true }
      ],
      proofExplain: String.raw`「\(f\le g\)」经极限变成「\(A\le B\)」——不等号方向保留，但严格性可能丢失（如 \(x^2\le0\) 仅当 x=0，但极限处可相等）。`
    },
    {
      id: "E4.2.5-8", ch: "4", sec: "4.2.5",
      src: "讲义 4.2.5 练习题 8", srcAns: "答案册 4.2.5 练习题 8",
      title: "严格保序：若 A<B，则邻域内 f<g",
      difficulty: "C", methods: ["M1"],
      statement: String.raw`<p>设 \(\lim f=A,\ \lim g=B\) 且 \(A<B\)。证明存在去心邻域使 \(f(x)<g(x)\)。</p>`,
      hints: [
        String.raw`取 \(\varepsilon=(B-A)/3>0\)。`,
        String.raw`邻域内 \(f(x)<A+\varepsilon\)，\(g(x)>B-\varepsilon\)。`,
        String.raw`因 \(A+\varepsilon=B-\varepsilon\)，得 \(f(x)<g(x)\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：极限值的严格不等 ⇒ 邻域内严格不等（保序性的加强版）。</p>
        <p>取 \(\varepsilon=(B-A)/3\)。存在去心邻域使 \(f(x)<A+\varepsilon\) 且 \(g(x)>B-\varepsilon\)。而 \(A+\varepsilon=B-\varepsilon\)，故 \(f(x)<g(x)\)。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`取 \(\varepsilon=(B-A)/3\)`, k: true },
        { t: String.raw`控制 \(f<A+\varepsilon,\ g>B-\varepsilon\)`, k: true },
        { t: String.raw`由 \(A+\varepsilon=B-\varepsilon\) 得 \(f<g\)`, k: true },
        { t: String.raw`结论在去心邻域成立`, k: true },
        { t: String.raw`取 \(\varepsilon=B-A\) 即可`, k: false }
      ],
      core: [
        { t: String.raw`严格不等 ⇒ 邻域严格不等`, u: true },
        { t: String.raw`在 A,B 之间留出缓冲带`, u: true },
        { t: String.raw`与保序性（E4.2.5-7）的关系`, u: true },
        { t: String.raw`极限点本身的值不参与`, u: true }
      ],
      proofExplain: String.raw`当极限值已经严格分开（A<B），两个函数就被钉在两条不相交的带子里，邻域内自然严格有序。`
    },
    {
      id: "E4.2.5-11", ch: "4", sec: "4.2.5",
      src: "讲义 4.2.5 练习题 11", srcAns: "答案册 4.2.5 练习题 11",
      title: "有界量 × 无穷小 = 无穷小",
      difficulty: "B", methods: ["M1"],
      statement: String.raw`<p>设 \(f,g\) 在 \(x_0\) 的某邻域有定义，\(g\) 在该邻域有界，且 \(\lim\limits_{x\to x_0}f(x)=0\)。证明 \(\lim\limits_{x\to x_0}f(x)g(x)=0\)。</p>`,
      hints: [
        String.raw`存在 \(M>0\) 使 \(|g(x)|\le M\)。`,
        String.raw`于是 \(|f(x)g(x)|\le M|f(x)|\)。`,
        String.raw`由 \(\lim f=0\) 得 \(M|f(x)|\to0\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：有界函数乘无穷小仍为无穷小（E4.2.2 的推广）。</p>
        <p>\(g\) 有界，故 \(|g(x)|\le M\)。则 \(|f(x)g(x)|\le M|f(x)|\)。由 \(\lim f=0\) 知 \(M|f(x)|\to0\)，即 \(\lim fg=0\)。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`用有界性 \(|g(x)|\le M\)`, k: true },
        { t: String.raw`估计 \(|fg|\le M|f|\)`, k: true },
        { t: String.raw`由 \(\lim f=0\) 得结论`, k: true },
        { t: String.raw`需假设 \(g\) 在邻域有极限`, k: false }
      ],
      core: [
        { t: String.raw`有界性的作用`, u: true },
        { t: String.raw`放缩到已知趋于 0 的量`, u: true },
        { t: String.raw`结论不要求 \(g\) 有极限`, u: true },
        { t: String.raw`与夹逼的关系`, u: true }
      ],
      proofExplain: String.raw`这是处理「震荡×趋于0」类极限的通用武器：只要一个因子有界、另一个趋于 0，乘积必趋于 0，无需知道有界因子的具体极限。`
    },

    /* ---- 4.3 两个重要极限 ---- */
    {
      id: "E4.3.5", ch: "4", sec: "4.3",
      src: "讲义 4.3.5 例题", srcAns: "答案册 4.3.5",
      title: "求 \(\lim_{x\to0}\dfrac{1-\cos x}{x^2}\)",
      difficulty: "B", methods: ["M6"],
      statement: String.raw`<p>求极限（利用重要极限）</p> \[ \lim_{x\to0}\frac{1-\cos x}{x^2}. \]`,
      hints: [
        String.raw`用半角公式 \(1-\cos x=2\sin^2\frac x2\)。`,
        String.raw`化为 \(2\cdot\dfrac{\sin^2(x/2)}{x^2}=2\cdot\left(\dfrac{\sin(x/2)}{x}\right)^2\)。`,
        String.raw`或用等价无穷小 \(1-\cos x\sim x^2/2\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：重要极限 Ⅰ 的变体；或等价无穷小替换 \(1-\cos x\sim x^2/2\)。</p>
        \[ \frac{1-\cos x}{x^2}=\frac{2\sin^2(x/2)}{x^2}=\frac12\left(\frac{\sin(x/2)}{x/2}\right)^2\xrightarrow{x\to0}\frac12. \]
        <p>故极限为 <b>\(1/2\)</b>。</p>`,
      type: "choice",
      options: ["0", "\\(\\dfrac12\\)", "1", "2"],
      correct: 1,
      choiceExplain: String.raw`\(1-\cos x\sim x^2/2\)，故比值趋于 1/2。`
    },
    {
      id: "E4.3.4-1", ch: "4", sec: "4.3.4",
      src: "讲义 4.3.4 练习题 1", srcAns: "答案册 4.3.4 练习题 1",
      title: "求 \(\lim_{x\to0}\dfrac{\tan x-\sin x}{x^3}\)",
      difficulty: "C", methods: ["M6"],
      statement: String.raw`<p>求极限</p> \[ \lim_{x\to0}\frac{\tan x-\sin x}{x^3}. \]`,
      hints: [
        String.raw`\(\tan x-\sin x=\sin x\left(\dfrac1{\cos x}-1\right)=\dfrac{\sin x(1-\cos x)}{\cos x}\)。`,
        String.raw`用 \(\sin x\sim x,\ 1-\cos x\sim x^2/2,\ \cos x\to1\)。`,
        String.raw`分子 \(\sim x\cdot x^2/2\)，故比值 \(\to1/2\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：等价无穷小在乘除中的替换；注意 \(\tan x-\sin x\) 是三阶小量。</p>
        \[ \frac{\tan x-\sin x}{x^3}=\frac{\sin x(1-\cos x)}{x^3\cos x}\sim\frac{x\cdot x^2/2}{x^3\cdot1}=\frac12. \]
        <p>故极限为 <b>\(1/2\)</b>。</p>`,
      type: "choice",
      options: ["0", "\\(\\dfrac13\\)", "\\(\\dfrac12\\)", "1"],
      correct: 2,
      choiceExplain: String.raw`分子 \(\sim x^3/2\)，除以 \(x^3\) 得 1/2。`
    },
    {
      id: "E4.3.4-3", ch: "4", sec: "4.3.4",
      src: "讲义 4.3.4 练习题 3", srcAns: "答案册 4.3.4 练习题 3",
      title: "求 \(\lim_{x\to0}\dfrac{\sin x-x\cos x}{x^3}\)",
      difficulty: "C", methods: ["M6", "M7"],
      statement: String.raw`<p>求极限</p> \[ \lim_{x\to0}\frac{\sin x-x\cos x}{x^3}. \]`,
      hints: [
        String.raw`展开：\(\sin x=x-x^3/6+o(x^3),\ x\cos x=x-x^3/2+o(x^3)\)。`,
        String.raw`相减得 \(x^3/3+o(x^3)\)。`,
        String.raw`除以 \(x^3\) 得 \(1/3\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：用泰勒展开（或等价无穷小的高阶项）处理「同阶相减」型。</p>
        \[ \sin x-x\cos x=\left(x-\frac{x^3}{6}\right)-x\left(1-\frac{x^2}{2}\right)+o(x^3)=\frac{x^3}{3}+o(x^3). \]
        <p>故极限为 <b>\(1/3\)</b>。</p>`,
      type: "choice",
      options: ["0", "\\(\\dfrac13\\)", "\\(\\dfrac12\\)", "2"],
      correct: 1,
      choiceExplain: String.raw`两项的 \(x\) 相消，剩下三阶项系数 \(1/3\)。`
    },
    {
      id: "E4.3.4-5", ch: "4", sec: "4.3.4",
      src: "讲义 4.3.4 练习题 5", srcAns: "答案册 4.3.4 练习题 5",
      title: "求 \(\lim_{x\to0}\dfrac{e^x-1-x}{x^2}\)",
      difficulty: "C", methods: ["M6"],
      statement: String.raw`<p>求极限</p> \[ \lim_{x\to0}\frac{e^x-1-x}{x^2}. \]`,
      hints: [
        String.raw`用展开 \(e^x=1+x+x^2/2+o(x^2)\)。`,
        String.raw`分子 \(=x^2/2+o(x^2)\)。`,
        String.raw`除以 \(x^2\) 得 \(1/2\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：指数函数的二阶展开；等价无穷小 \(e^x-1\sim x\) 只到一阶，这里需二阶。</p>
        \[ e^x-1-x=\frac{x^2}{2}+o(x^2)\quad\Rightarrow\quad \frac{e^x-1-x}{x^2}\to\frac12. \]
        <p>故极限为 <b>\(1/2\)</b>。</p>`,
      type: "choice",
      options: ["0", "\\(\\dfrac12\\)", "1", "\\(\\infty\\)"],
      correct: 1,
      choiceExplain: String.raw`二阶展开分子为 \(x^2/2\)，比值 1/2。`
    },

    /* ---- 4.4 无穷小量、无穷大量和阶的比较 ---- */
    {
      id: "E4.4.1", ch: "4", sec: "4.4",
      src: "讲义 4.4.1 例题", srcAns: "答案册 4.4.1",
      title: "阶的比较：当 x→0 时 1−cos x 是几阶无穷小？",
      difficulty: "B", methods: ["M6"],
      statement: String.raw`<p>当 \(x\to0\) 时，判断 \(1-\cos x\) 相对于 \(x\) 的阶。</p>`,
      hints: [
        String.raw`回忆 \(1-\cos x=2\sin^2(x/2)\)。`,
        String.raw`\(\sin(x/2)\sim x/2\)，故 \(1-\cos x\sim x^2/2\)。`,
        String.raw`它是 \(x\) 的二阶无穷小。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：比较无穷小的阶——看它与 \(x^k\) 的比值极限。</p>
        <p>由 \(1-\cos x\sim x^2/2\)，\(\lim\limits_{x\to0}\dfrac{1-\cos x}{x^2}=\dfrac12\neq0\)，故 \(1-\cos x\) 是 \(x\) 的 <b>二阶</b>无穷小。</p>`,
      type: "choice",
      options: ["1 阶", "2 阶", "3 阶", "同阶但非高阶"],
      correct: 1,
      choiceExplain: String.raw`\(1-\cos x\sim x^2/2\)，故为二阶无穷小。`
    },
    {
      id: "E4.4.3", ch: "4", sec: "4.4",
      src: "讲义 4.4.3 例题", srcAns: "答案册 4.4.3",
      title: "证明当 x→0 时 \(\sqrt{1+x}-1\sim\dfrac x2\)",
      difficulty: "B", methods: ["M6", "M7"],
      statement: String.raw`<p>证明：当 \(x\to0\) 时，\(\sqrt{1+x}-1\sim\dfrac x2\)。</p>`,
      hints: [
        String.raw`有理化：\(\sqrt{1+x}-1=\dfrac{x}{\sqrt{1+x}+1}\)。`,
        String.raw`\(\lim\limits_{x\to0}\dfrac{\sqrt{1+x}-1}{x/2}=\lim\dfrac{2}{\sqrt{1+x}+1}=1\)。`,
        String.raw`故等价。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：根式差等价于线性项——这是 \(\sqrt{1+x}-1\sim x/2\)（即 \((1+x)^\alpha-1\sim\alpha x\) 在 \(\alpha=1/2\) 的特例）。</p>
        \[ \frac{\sqrt{1+x}-1}{x/2}=\frac{2}{\sqrt{1+x}+1}\xrightarrow{x\to0}1. \]
        <p>故 \(\sqrt{1+x}-1\sim x/2\)。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`有理化分子`, k: true },
        { t: String.raw`化为 \(\dfrac{x}{\sqrt{1+x}+1}\)`, k: true },
        { t: String.raw`与 \(x/2\) 相比得 \(\dfrac{2}{\sqrt{1+x}+1}\)`, k: true },
        { t: String.raw`极限为 1，证毕等价`, k: true },
        { t: String.raw`需先证 \(\sqrt{1+x}-1\to0\)`, k: false }
      ],
      core: [
        { t: String.raw`等价无穷小的定义（比值极限=1）`, u: true },
        { t: String.raw`有理化根式差`, u: true },
        { t: String.raw`\((1+x)^\alpha-1\sim\alpha x\)`, u: true },
        { t: String.raw`与直接展开的一致性`, u: true }
      ],
      proofExplain: String.raw`根式「开不出来」时，有理化把它变成「分母含根式、分子是一次项」的形式，极限就好算了。这是等价无穷小库的常用一员。`
    },
    {
      id: "E4.4.6", ch: "4", sec: "4.4",
      src: "讲义 4.4.6 例题", srcAns: "答案册 4.4.6",
      title: "求 \(\lim_{x\to0}\dfrac{\sqrt{1+x+x^2}-1}{\sin 2x}\)",
      difficulty: "C", methods: ["M6"],
      statement: String.raw`<p>求极限（用等价无穷小）</p> \[ \lim_{x\to0}\frac{\sqrt{1+x+x^2}-1}{\sin 2x}. \]`,
      hints: [
        String.raw`\(\sqrt{1+u}-1\sim u/2\)，取 \(u=x+x^2\sim x\)。`,
        String.raw`\(\sin 2x\sim 2x\)。`,
        String.raw`比值 \(\sim \dfrac{x/2}{2x}=1/4\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：等价无穷小替换的实战——分子分母分别换掉再约。</p>
        \[ \sqrt{1+x+x^2}-1\sim\frac{x+x^2}{2}\sim\frac x2,\quad \sin2x\sim2x\quad\Rightarrow\quad \frac{x/2}{2x}=\frac14. \]
        <p>故极限为 <b>\(1/4\)</b>。</p>`,
      type: "choice",
      options: ["\\(\\dfrac14\\)", "\\(\\dfrac12\\)", "1", "2"],
      correct: 0,
      choiceExplain: String.raw`分子 \(\sim x/2\)，分母 \(\sim 2x\)，比值 1/4。`
    },
    {
      id: "E4.4.4-1", ch: "4", sec: "4.4.4",
      src: "讲义 4.4.4 练习题 1", srcAns: "答案册 4.4.4 练习题 1",
      title: "求 \(\lim_{x\to0}\dfrac{e^x-1}{x}\)（等价无穷小 e^x−1∼x）",
      difficulty: "B", methods: ["M6"],
      statement: String.raw`<p>求极限</p> \[ \lim_{x\to0}\frac{e^x-1}{x}. \]`,
      hints: [
        String.raw`由展开 \(e^x=1+x+o(x)\) 得 \(e^x-1\sim x\)。`,
        String.raw`直接比值 \(\to1\)。`,
        String.raw`也可用复合极限（令 \(t=e^x-1\)）。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：核心等价无穷小 \(e^x-1\sim x\)（\(x\to0\)）。</p>
        \[ \frac{e^x-1}{x}\xrightarrow{x\to0}1. \]
        <p>故极限为 <b>1</b>。</p>`,
      type: "choice",
      options: ["0", "\\(\\dfrac12\\)", "1", "e"],
      correct: 2,
      choiceExplain: String.raw`\(e^x-1\sim x\)，比值趋于 1。`
    },
    {
      id: "E4.4.4-2", ch: "4", sec: "4.4.4",
      src: "讲义 4.4.4 练习题 2", srcAns: "答案册 4.4.4 练习题 2",
      title: "证明当 x→∞ 时 x 是 ln x 的高阶无穷大",
      difficulty: "C", methods: ["M1", "M8"],
      statement: String.raw`<p>证明：当 \(x\to+\infty\) 时，\(\displaystyle\lim_{x\to+\infty}\frac{\ln x}{x}=0\)，即 \(x\) 是 \(\ln x\) 的高阶无穷大。</p>`,
      hints: [
        String.raw`令 \(t=\ln x\)（则 \(x=e^t,\ t\to+\infty\)）。`,
        String.raw`化为 \(\lim\limits_{t\to+\infty}\dfrac{t}{e^t}\)。`,
        String.raw`对充分大的 \(t\)，有 \(e^t>t^2/2\)，故 \(t/e^t<2/t\to0\)。`
      ],
      answer: String.raw`<p class="ans-lead"><b>本题考什么</b>：无穷大量的阶比较——任何正幂次 \(x^\alpha\) 都比 \(\ln x\) 增长快。</p>
        <p>令 \(t=\ln x\)，则 \(x=e^t\)，原式 \(=\lim\limits_{t\to+\infty}\dfrac{t}{e^t}\)。由 \(e^t>\dfrac{t^2}{2}\,(t>0)\) 得 \(0<\dfrac{t}{e^t}<\dfrac{2}{t}\to0\)，夹逼得极限为 0。</p>`,
      type: "proof",
      keySteps: [
        { t: String.raw`令 \(t=\ln x\)，化为 \(t/e^t\)`, k: true },
        { t: String.raw`用 \(e^t>t^2/2\) 估计分母`, k: true },
        { t: String.raw`得 \(0<t/e^t<2/t\)`, k: true },
        { t: String.raw`夹逼得极限 0`, k: true },
        { t: String.raw`直接用洛必达法则求导`, k: false }
      ],
      core: [
        { t: String.raw`变量代换 \(t=\ln x\)`, u: true },
        { t: String.raw`指数增长快于多项式`, u: true },
        { t: String.raw`夹逼处理无穷极限`, u: true },
        { t: String.raw`对数比任何正幂次都慢`, u: true }
      ],
      proofExplain: String.raw`「对数慢、指数快」是分析里的铁律。这里没用洛必达（第四章尚未引入），而是用 \(e^t\) 的级数下界 \(t^2/2\) 做夹逼，更符合本章工具链。`
    }
  ],

  /* ============ 方法：技能树 ============ */
  methods: [
    {
      id: "M1", ch: "2", name: "适当放大法", alias: "压缩咒 · ε 的枷锁",
      when: String.raw`要直接用 ε-N 定义证明 \(a_n\to a\)，且 \(|a_n-a|\) 不好精确计算时。`,
      how: [
        String.raw`写出 \(|a_n-a|\)，用已知不等式（\(|\sin x|\le1\)、\(|\cos x|\le1\)、分母放小等）放大成简单的 \(b_n\)。`,
        String.raw`必须保证 \(b_n\to0\)：放大过头（如放成常数 1）就接不住 \(\varepsilon\)。`,
        String.raw`由 \(b_n<\varepsilon\) 解出 \(n\) 的下界，取 \(N\)。`,
        String.raw`回代验证 \(n>N\) 时 \(|a_n-a|\le b_n<\varepsilon\)。`
      ],
      typical: ["E2.1-1", "E2.1-2", "E2.1-3", "E2.2-1"],
      pitfall: "放大方向与 N 的依赖关系",
      prereq: []
    },
    {
      id: "M2", ch: "2", name: "单调有界法", alias: "确界召唤 · 存在性法则",
      when: String.raw`数列由递推式给出、或极限值暂时求不出，但能判断单调性与有界性时。`,
      how: [
        String.raw`证单调：比较 \(a_{n+1}-a_n\) 的符号，或作比 \(\frac{a_{n+1}}{a_n}\)（正项数列）。`,
        String.raw`证有界：常用归纳法给出统一上界（下界），或利用 \(\sin x<x\) 等基本不等式。`,
        String.raw`调用单调有界定理（T2.3）得「极限存在」，设 \(\lim a_n=A\)。`,
        String.raw`对递推式两边取极限，解方程求 \(A\)，再用唯一性排除多余解。`
      ],
      typical: ["E2.3-7"],
      pitfall: "未证存在就先取极限（逻辑倒置）",
      prereq: ["M1"]
    },
    {
      id: "M3", ch: "2", name: "Cauchy 收敛准则", alias: "内部契约 · 不依赖极限值",
      when: String.raw`要判断收敛但<b>不知道极限值</b>，尤其适合函数项、级数或无法猜出极限的递推。`,
      how: [
        String.raw`写出准则：\(\{a_n\}\) 收敛 \(\iff \forall\varepsilon>0,\exists N,\forall m,n>N:|a_m-a_n|<\varepsilon\)。`,
        String.raw`估计 \(|a_m-a_n|\)：常用望远镜求和、等比求和或积分估计。`,
        String.raw`它的好处是不需要预先知道极限；坏处是估计通常比 ε-N 更难。`,
        String.raw`证明发散时取某个固定 \(\varepsilon_0\)，构造任意大的 \(m,n\) 使差 \(\ge\varepsilon_0\)。`
      ],
      typical: ["E2.2-1"],
      pitfall: "把 m,n 混用、忘了要对所有 m,n 成立",
      prereq: ["M1"]
    },
    {
      id: "M4", ch: "2", name: "Stolz 定理", alias: "差分裁决 · ∞/∞ 的克星",
      when: String.raw`形如 \(\frac{x_n}{y_n}\) 的 \(\infty/\infty\)（或 \(0/0\)）型数列极限，且 \(y_n\) 严格单调趋于 \(+\infty\)。`,
      how: [
        String.raw`先检查两个前提：\(y_n\) 严格单调增加、\(y_n\to+\infty\)。`,
        String.raw`计算差商 \(\frac{x_{n+1}-x_n}{y_{n+1}-y_n}\) 的极限 \(l\)。`,
        String.raw`由 Stolz 定理（T2.4）得 \(\frac{x_n}{y_n}\to l\)。`,
        String.raw`特例 \(y_n=n\)：Cauchy 命题（E2.4-1）就是差商为 \(x_{n+1}\) 的情形。`
      ],
      typical: ["E2.4-1"],
      pitfall: "漏检 y_n → +∞ 或严格单调",
      prereq: ["M1"]
    },
    {
      id: "M5", ch: "2", name: "迭代数列的几何方法", alias: "蛛网推演 · 不动点之眼",
      when: String.raw`\(x_{n+1}=f(x_n)\) 型递推，想快速判断单调性、极限位置与收敛速度。`,
      how: [
        String.raw`在同一坐标系画 \(y=f(x)\) 与 \(y=x\)，交点即不动点（候选极限）。`,
        String.raw`从 \(x_1\) 作竖线到曲线、再横线到对角线，形成蛛网；蛛网往哪边走决定单调性。`,
        String.raw`用 \(f(x)-x\) 的符号给出严格证明（几何只是找思路）。`,
        String.raw`配合单调有界法（M2）补全存在性，再解 \(A=f(A)\)。`
      ],
      typical: ["E2.3-7"],
      pitfall: "把蛛网图当证明，或忽略不动点可能不唯一",
      prereq: ["M2"]
    },
    {
      id: "M6", ch: "4", name: "等价无穷小替换", alias: "等价置换 · 显微镜之眼",
      when: String.raw`极限式在乘除中出现 \(\sin x,1-\cos x,\tan x,e^x-1,\ln(1+x),(1+x)^\alpha-1\) 等，且 \(x\to0\)（或整体趋于 0）。`,
      how: [
        String.raw`记熟常用等价对：\(\sin x\sim x,\ \tan x\sim x,\ 1-\cos x\sim x^2/2,\ e^x-1\sim x,\ \ln(1+x)\sim x,\ (1+x)^\alpha-1\sim\alpha x\)。`,
        String.raw`在<b>乘除</b>中可把因子整体替换为等价量；替换后约去零因子再求极限。`,
        String.raw`在<b>加减</b>中替换要谨慎：只有各项阶数明显不同时才能替换，否则会丢掉高阶小量（如 \(x-\sin x\sim x^3/6\)）。`,
        String.raw`需要高阶项时用泰勒展开（\(e^x=1+x+x^2/2+\cdots\)）而非只取一阶。`
      ],
      typical: ["E4.1.5-14", "E4.3.5", "E4.3.4-1", "E4.3.4-3", "E4.4.1", "E4.4.3", "E4.4.6", "E4.4.4-1"],
      pitfall: "加减中盲目替换（如把 x−sinx 换 x−x=0）",
      prereq: ["M1"]
    },
    {
      id: "M7", ch: "4", name: "未定式处理·有理化/通分/提取公因式", alias: "根式拆解 · 零因子清除",
      when: String.raw`遇到 \(0/0\)、\(\infty/\infty\)、\(\infty-\infty\) 等代数型未定式，尤其含根号或有理分式。`,
      how: [
        String.raw`根式差 \(\sqrt a-\sqrt b\)：乘共轭有理化，消去分母/分子的零因子。`,
        String.raw`有理分式在 \(x\to\infty\)：分子分母同除以最高次幂，低次项趋于 0。`,
        String.raw`多项式差 \(x^k-a^k\)：用公式分解为 \((x-a)(\cdots)\) 约去零因子。`,
        String.raw`\(\infty-\infty\)：通分或配方化成 \(0/0\) 或 \(0\cdot\infty\) 再处理。`
      ],
      typical: ["E4.1.5-10", "E4.1.5-11", "E4.2.4", "E4.3.4-3"],
      pitfall: "有理化方向反了（应乘 \(\sqrt a+\sqrt b\)）",
      prereq: ["M1"]
    },
    {
      id: "M8", ch: "4", name: "变量代换与复合极限", alias: "换元之刃 · 借已知极限",
      when: String.raw`极限含复合结构、想借重要极限，或无穷远处不便直接算时。`,
      how: [
        String.raw`令 \(t=g(x)\) 把极限化为标准形式（如 \(t=1/x\) 把 \(x\to\infty\) 化为 \(t\to0^+\)）。`,
        String.raw`用复合极限（T4.3）：需补「\(\varphi(x)\ne u_0\)」或「\(g\) 在 \(u_0\) 连续」之一。`,
        String.raw`借重要极限 Ⅰ\(\lim_{x\to0}\sin x/x=1\) 与 Ⅱ\(\lim(1+1/x)^x=e\) 直接套用。`,
        String.raw`代换后检查新变量的极限方向与定义域，避免漏掉单侧。`
      ],
      typical: ["E4.1.5-11", "E4.3.5", "E4.4.4-2"],
      pitfall: "换元后忽略新变量的趋向方向（如 t→0⁺ 还是 0⁻）",
      prereq: ["M1"]
    },
    {
      id: "M9", ch: "4", name: "有界量×无穷小 / 夹逼", alias: "振幅封印 · 双壁夹击",
      when: String.raw`函数震荡但有界（如含 \(\sin(1/x),\cos(1/x)\)）乘上趋于 0 的因子，或需从两侧逼近。`,
      how: [
        String.raw`若 \(|g(x)|\le M\) 且 \(f(x)\to0\)，则 \(f(x)g(x)\to0\)（有界×无穷小=无穷小）。`,
        String.raw`夹逼：构造 \(F(x)\le h(x)\le G(x)\) 且 \(\lim F=\lim G=A\)，则 \(\lim h=A\)。`,
        String.raw`取整、阶梯类函数常用整数不等式 \(t-1<[t]\le t\) 做夹逼。`,
        String.raw`夹逼的关键是两侧函数极限必须<b>相等</b>且不等式在某个去心邻域成立。`
      ],
      typical: ["E4.2.2", "E4.2.5-1", "E4.2.5-11"],
      pitfall: "两侧极限不相等仍硬用夹逼",
      prereq: ["M1"]
    }
  ]
};

/* ============ 追加：规则漏洞卡 / 空白双人推演 / 联邦伙伴 ============ */
window.MATHANALYSIS.loopholes = {
  "T2.1": {
    q: String.raw`下列哪个数列最能说明「有收敛子列」推不出「数列收敛」？`,
    options: [
      String.raw`\(a_n=\dfrac1n\)`,
      String.raw`\(a_n=(-1)^n\)`,
      String.raw`\(a_n=\dfrac{n}{n+1}\)`
    ],
    answer: 1,
    explain: String.raw`偶数项子列恒为 \(1\)、奇数项子列恒为 \(-1\)，两个子列各自收敛但极限不同；若原数列收敛，由唯一性（T2.1）两子列极限必须相同，矛盾。另外两个数列本身就收敛，起不到反例作用。`
  },
  "T2.3": {
    q: String.raw`要打掉「单调有界收敛定理」，下面哪组反例分别对应两个被去掉的条件？`,
    options: [
      String.raw`\(a_n=n\) 打掉单调性，\(a_n=(-1)^n\) 打掉有界性`,
      String.raw`\(a_n=n\) 打掉有界性，\(a_n=(-1)^n\) 打掉单调性`,
      String.raw`两者打掉的是同一个条件`
    ],
    answer: 1,
    explain: String.raw`\(a_n=n\) 单调增加但无上界 → 发散到 \(+\infty\)，打掉「有界」；\(a_n=(-1)^n\) 有界但不单调 → 振荡发散，打掉「单调」。两个条件缺一不可。`
  },
  "T2.4": {
    q: String.raw`Stolz 定理里「\(y_n\to+\infty\)」不能省，哪个例子让结论失效？`,
    options: [
      String.raw`\(y_n=n,\ x_n=n\)`,
      String.raw`\(y_n=1-\dfrac1n,\ x_n=1\)`,
      String.raw`\(y_n=n^2,\ x_n=n\)`
    ],
    answer: 1,
    explain: String.raw`\(y_n=1-\frac1n\) 严格单调增加但收敛到 1，差商 \(\Delta x_k/\Delta y_k\equiv0\)，而 \(\frac{x_n}{y_n}\to1\neq0\)。原因正是余项 \(y_N/y_n\) 不再趋于 0，第 4 步推演散架。`
  }
};

window.MATHANALYSIS.duo = {
  "T2.1": {
    sora: [
      String.raw`唯一性没法「算」出来——\(a,b\) 都是未知的。只能制造一个共同参照物 \(a_n\)，把 \(|a-b|\) 夹成两段可控制的小量。`,
      String.raw`\(\varepsilon\) 要留余量：两段误差各占一半，加起来才不超过 \(\varepsilon\)。`,
      String.raw`两个极限给出两个 \(N\)，取最大者让它们同时生效；这是 ε-N 论证里反复出现的动作。`
    ],
    shiro: [
      String.raw`\(|a_n-a|<\frac\varepsilon2\)（\(n>N_1\)），\(|a_n-b|<\frac\varepsilon2\)（\(n>N_2\)），取 \(N=\max\{N_1,N_2\}\)。`,
      String.raw`\(|a-b|\le|a_n-a|+|a_n-b|<\frac\varepsilon2+\frac\varepsilon2=\varepsilon\)。`,
      String.raw`左边与 \(n\) 无关而 \(\varepsilon\) 任意，故 \(|a-b|=0\)。`
    ]
  },
  "T2.3": {
    sora: [
      String.raw`不知道极限是多少，就先造一个候选：所有项构成的集合有上界，完备性给出最小上界 \(\beta\)。`,
      String.raw`上确界有两条性质，各管一半：「是上界」给右半边，「最小」给出某个 \(a_N>\beta-\varepsilon\)。`,
      String.raw`第 3 步只找到一项，靠单调性才能把结论传给后面所有项——这就是定理必须要求单调的原因。`
    ],
    shiro: [
      String.raw`\(\beta=\sup\{a_n\}\)，对所有 \(n\) 有 \(a_n\le\beta\)。`,
      String.raw`\(\forall\varepsilon>0,\ \exists N:\ a_N>\beta-\varepsilon\)；当 \(n>N\)，\(\beta-\varepsilon<a_N\le a_n\le\beta\)。`,
      String.raw`\(|a_n-\beta|<\varepsilon\Rightarrow a_n\to\beta\)。`
    ]
  },
  "T2.4": {
    sora: [
      String.raw`把 \(x_n\) 写成「起点 + 一串差分」，就能用上差商条件；这是把 \(\infty/\infty\) 拆成局部信息的唯一入口。`,
      String.raw`望远镜求和把 \(\sum\Delta y_k\) 收成 \(y_n-y_N\)，让不等式右端变成可除的形式。`,
      String.raw`余项 \(x_N/y_n,\ y_N/y_n\) 靠 \(y_n\to+\infty\) 消失——前提不能省。`
    ],
    shiro: [
      String.raw`\((l-\frac\varepsilon2)\Delta y_k<\Delta x_k<(l+\frac\varepsilon2)\Delta y_k\)（\(k\ge N\)）。`,
      String.raw`累加：\((l-\frac\varepsilon2)(y_n-y_N)<x_n-x_N<(l+\frac\varepsilon2)(y_n-y_N)\)。`,
      String.raw`同除 \(y_n\)，令 \(n\to\infty\)：\(\left|\frac{x_n}{y_n}-l\right|<\varepsilon\)。`
    ]
  }
};

/* 十六种族棋子 / 艾尔奇亚联邦伙伴
   位阶序列与棋子依据原作设定；第十条盟约规定棋子不可掠夺，只能结盟，
   所以这里是「招募伙伴」而不是「升位」。 */
window.MATHANALYSIS.allies = [
  { rank: 16, race: "人类种", name: "空 · 白（『　　』）", piece: "王", cond: "开局即在", ability: "每天可请求一次思路提示", quote: "来吧，开始游戏吧。", open: "always" },
  { rank: 16, race: "人类种", name: "史蒂芬妮·多拉", piece: "王", cond: "开局即在", ability: "败北日志自动归档", quote: "又、又被哥哥耍了……", open: "always" },
  { rank: 14, race: "兽人种", name: "初濑伊纲", piece: "兵", cond: "对局场判胜 3 局", ability: "复仇战额外一次提示", quote: "……游戏，赢了才算。", open: "wins3" },
  { rank: 6,  race: "天翼种", name: "吉普莉尔", piece: "皇后", cond: "掌握 Stolz 法则", ability: "解锁跨章检索", quote: "知识就是要被收进图书馆的。", open: "T2.4" },
  { rank: 10, race: "机凯种", name: "休比·多拉", piece: "主教", cond: "点亮 3 张方法卡", ability: "同错因自动归类", quote: "解析完毕，提案：再战一次。", open: "methods3" },
  { rank: 7,  race: "森精种", name: "克拉米·杰尔 · 菲尔", piece: "城堡", cond: "答对 2 张规则漏洞卡", ability: "漏洞标记 +1", quote: "规则里总留着一道缝。", open: "marks2" },
  { rank: 15, race: "海栖种", name: "莱拉", piece: "骑士", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 12, race: "吸血种", name: "布拉姆", piece: "骑士", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 1,  race: "神灵种", name: "帆楼", piece: "兵", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 2,  race: "幻想种", name: "阿邦特·赫伊姆", piece: "兵", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 3,  race: "精灵种", name: "代理者未现身", piece: "兵", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 4,  race: "龙精种", name: "代理者未现身", piece: "兵", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 5,  race: "巨人种", name: "代理者未现身", piece: "兵", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 8,  race: "地精种", name: "代理者未现身", piece: "主教", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 9,  race: "妖精种", name: "代理者未现身", piece: "兵", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" },
  { rank: 11, race: "妖魔种", name: "代理者未现身", piece: "兵", cond: "上册后续章节开放", ability: "待解锁", quote: "……", open: "later" }
];

window.MATHANALYSIS.sealHours = 24;
