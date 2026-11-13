/* 迪司博德 · 数学分析上册 · 互动逻辑（纯前端，进度存 localStorage） */
(function () {
  "use strict";
  var D = window.MATHANALYSIS;
  var STORE = "math_disboard_v1";
  var TH = D.theorems, EX = D.exercises, ME = D.methods, CH = D.chapters;

  var state = load();
  function firstOpenChapter() {
    var open = CH.filter(function (c) { return c.status !== "locked"; });
    return (open[0] || CH[0]).id;
  }
  var curChapter = state.chapter || firstOpenChapter();
  function load() {
    var base = {
      learned: {}, duels: {}, methods: {}, mistakes: [], steps: {}, hints: {},
      pick: {}, marks: 0, loophole: {}, duo: {}, combo: 0, bestCombo: 0,
      theme: "disboard", fontScale: 1, navCollapsed: false, chapter: null
    };
    try {
      var s = JSON.parse(localStorage.getItem(STORE));
      if (s && typeof s === "object") return Object.assign({}, base, s);
    } catch (e) {}
    return base;
  }
  function save() { localStorage.setItem(STORE, JSON.stringify(state)); }
  function duel(id) {
    if (!state.duels[id]) state.duels[id] = { oath: null, result: "", defeat: false, practiced: false };
    return state.duels[id];
  }

  /* ---------- 公式渲染（本地 KaTeX） ---------- */
  function math(html) {
    if (!html) return "";
    var s = String(html);
    try {
      s = s.replace(/\\\[([\s\S]*?)\\\]/g, function (m, tex) {
        return '<div class="math-block">' +
          katex.renderToString(tex, { displayMode: true, throwOnError: false }) + '</div>';
      });
      s = s.replace(/\\\(([\s\S]*?)\\\)/g, function (m, tex) {
        return '<span class="math-inline">' +
          katex.renderToString(tex, { throwOnError: false }) + '</span>';
      });
    } catch (e) {
      s += '<p class="empty">（公式渲染异常，请检查 LaTeX）</p>';
    }
    return s;
  }
  function fig(html, label) {
    var i = 0;
    return (html || "").replace(/<img([^>]*)>/g, function (m, a) {
      i++;
      return "<figure class='fig'><img" + a + "><figcaption>" + label + " " + i + "</figcaption></figure>";
    });
  }
  function render(html, label) { return fig(math(html), label || "图"); }

  /* ---------- 对局测验（选择题 / 证明拆解） ---------- */
  function resLabel(r) {
    return r === "win" ? "胜 · +20 XP" : r === "draw" ? "平" : r === "lose" ? "败" : "未判定";
  }
  /* 落子判定：全对=胜 / 部分对=平 / 错=败，并维护连胜 combo */
  function applyResult(d, newRes) {
    var old = d.result;
    if (old === newRes) return;
    if (newRes === "win") {
      state.combo = (state.combo || 0) + 1;
      if (state.combo > (state.bestCombo || 0)) state.bestCombo = state.combo;
    } else if (newRes === "lose") {
      state.combo = 0;
    }
    d.result = newRes;
  }
  /* 是否已提交：恢复已提交的测验界面 */
  function quizBlock(e, locked) {
    if (locked) return "<div class='duel-quiz locked'><div class='quiz-lock'>向盟约宣誓后开启对局测验</div></div>";
    var L = ["A", "B", "C", "D", "E"];
    if (e.type === "choice") {
      return "<div class='duel-quiz quiz-choice'>" +
        "<div class='quiz-h'>⚔ 对局测验 · 选出正确推演（单选）</div>" +
        "<div class='quiz-opts'>" + e.options.map(function (o, i) {
          return "<label class='quiz-opt'><input type='radio' name='q-" + e.id + "' value='" + i + "'>" +
            "<span class='q-l'>" + L[i] + "</span><span class='q-t'>" + math(o) + "</span></label>";
        }).join("") + "</div>" +
        "<button class='btn quiz-submit'>提交测验</button>" +
        "<div class='quiz-fb' style='display:none'></div></div>";
    }
    var ks = e.keySteps.map(function (s, i) {
      return "<label class='quiz-step'><input type='checkbox' class='ks' value='" + i + "'>" +
        "<span class='q-t'>" + math(s.t) + "</span></label>";
    }).join("");
    var cs = e.core.map(function (c, i) {
      return "<label class='quiz-core'><input type='checkbox' class='cs' value='" + i + "'>" +
        "<span class='q-t'>" + math(c.t) + "</span></label>";
    }).join("");
    return "<div class='duel-quiz quiz-proof'>" +
      "<div class='quiz-h'>⚔ 对局测验 · 证明拆解（多选）</div>" +
      "<div class='quiz-sub'><b>关键步骤</b>　勾出真正属于本题推演的关键步骤（干扰项不是）</div>" +
      "<div class='quiz-steps'>" + ks + "</div>" +
      "<div class='quiz-sub'><b>核心知识</b>　勾出本题实际用到的核心知识</div>" +
      "<div class='quiz-cores'>" + cs + "</div>" +
      "<button class='btn quiz-submit'>提交测验</button>" +
      "<div class='quiz-fb' style='display:none'></div></div>";
  }

  /* ---------- 记忆封印 ---------- */
  var sealMs = (D.sealHours || 24) * 3600 * 1000;
  function isSealed(d) { return !!(d.sealedUntil && Date.now() < d.sealedUntil); }
  function fmtRemain(ms) {
    ms = Math.max(0, ms);
    var h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
    return h > 0 ? ("约 " + h + " 小时 " + m + " 分") : (m + " 分钟");
  }
  function sealHtml(until) {
    return "<div class='seal-overlay'><div class='seal-title'>记忆封印中 · 空把答案藏起来了</div>" +
      "<div class='seal-time' data-until='" + until + "'>" + fmtRemain(until - Date.now()) + "</div>" +
      "<div class='seal-sub'>依空的建议：先自己把题推一遍，封印解除后再回来对照 —— 看完答案就以为会了，才是真的败北</div></div>";
  }

  /* ---------- 种族棋子 / 等级 ---------- */
  /* 种族棋子 = 艾尔奇亚联邦伙伴：按第十条盟约，棋子不可掠夺，只能结盟招募 */
  function solvedLoopholes() {
    return Object.keys(state.loophole || {}).filter(function (k) { return state.loophole[k]; }).length;
  }
  function allyUnlocked(a) {
    var wins = EX.filter(function (e) { return duel(e.id).result === "win"; }).length;
    var lit = ME.filter(function (m) { return state.methods[m.id]; }).length;
    if (a.open === "always") return true;
    if (a.open === "wins3") return wins >= 3;
    if (a.open === "T2.4") return !!state.learned["T2.4"];
    if (a.open === "methods3") return lit >= 3;
    if (a.open === "marks2") return solvedLoopholes() >= 2;
    return false;
  }
  function chessState() {
    return D.allies.map(function (a) {
      return {
        on: allyUnlocked(a),
        tip: "第" + a.rank + "位 " + a.race + " · " + a.name + "（" + a.cond + "）"
      };
    });
  }
  function xp() {
    var n = 0;
    Object.keys(state.learned).forEach(function (k) { if (state.learned[k]) n += 30; });
    EX.forEach(function (e) { if (duel(e.id).result === "win") n += 20; });
    Object.keys(state.methods).forEach(function (k) { if (state.methods[k]) n += 10; });
    return n;
  }
  function refreshLevel() {
    var x = xp(), max = TH.length * 30 + EX.length * 20 + ME.length * 10;
    var cells = chessState(), got = cells.filter(function (c) { return c.on; }).length;
    document.getElementById("chessRow").innerHTML = cells.map(function (c) {
      return "<span class='chess-cell" + (c.on ? " got" : "") + "' title='" + c.tip + "'></span>";
    }).join("");
    document.getElementById("chessCnt").textContent = got;
    document.getElementById("lawCnt").textContent = TH.filter(function (t) { return state.learned[t.id]; }).length;
    document.getElementById("duelCnt").textContent = EX.filter(function (e) { return duel(e.id).result === "win"; }).length;
    document.getElementById("mistakeCnt").textContent = state.mistakes.length;
    var cc = document.getElementById("comboCnt");
    if (cc) cc.textContent = state.combo || 0;
    document.getElementById("xpNow").textContent = x;
    document.getElementById("xpMax").textContent = max;
    document.getElementById("lvNum").textContent = 1 + Math.floor(x / 100);
  }

  /* ---------- 台词 ---------- */
  var toastTimer;
  function line() {
    var L = D.game.lines;
    return L[Math.floor(Math.random() * L.length)] || "来吧，开始游戏吧 — 特图";
  }
  function toast(txt) {
    var el = document.getElementById("gameToast");
    if (!el) return;
    el.textContent = txt; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  /* ---------- 视图切换 ---------- */
  var toolbar = document.getElementById("toolbar");
  var view = document.getElementById("view");
  var viewTitle = document.getElementById("viewTitle");

  document.querySelectorAll(".nav-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".nav-btn").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      go(b.dataset.view);
    });
  });
  var sealTimer;
  function go(name) {
    clearInterval(sealTimer);
    toolbar.innerHTML = "";
    if (name === "laws") renderLaws();
    else if (name === "duels") renderDuels();
    else if (name === "log") renderLog();
    else if (name === "skills") renderSkills();
    else if (name === "allies") renderAllies();
    else renderSettings();
    if (name !== "settings") toast(line());
  }
  function rerender(name) {
    var st = view.scrollTop;
    go(name || currentView());
    view.scrollTop = st;
  }
  function currentView() {
    var b = document.querySelector(".nav-btn.active");
    return b ? b.dataset.view : "laws";
  }
  function jump(v, id) {
    var b = document.querySelector('.nav-btn[data-view="' + v + '"]');
    if (b) b.click();
    if (id) {
      setTimeout(function () {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: "center" });
      }, 60);
    }
  }

  /* ---------- 定理综述（字典）：大类 → 小类 分组，仅列内容与条件 ---------- */
  function theoremOverview() {
    var groups = {}; // cat -> { sub -> [theorems] }
    TH.filter(function (t) { return t.ch === curChapter; }).forEach(function (t) {
      var cat = t.category || ("第 " + t.ch + " 章");
      var sub = t.subcategory || t.sec || "未分类";
      (groups[cat] = groups[cat] || {});
      (groups[cat][sub] = groups[cat][sub] || []).push(t);
    });
    var html = "<div class='th-dict'>";
    html += "<div class='th-dict-head'>" +
      "<div class='th-dict-title'>第二章 · 定理综述（字典）</div>" +
      "<div class='th-dict-sub'>按「大类 → 小类」归类 · 仅列定理内容与成立条件，详解见下方法则卡片</div>" +
      "</div>";
    Object.keys(groups).forEach(function (cat) {
      html += "<div class='th-cat'><div class='th-cat-name'>" + cat + "</div>";
      Object.keys(groups[cat]).forEach(function (sub) {
        html += "<div class='th-sub'><div class='th-sub-name'>" + sub + "</div>";
        groups[cat][sub].forEach(function (t) {
          html += "<div class='th-entry' id='dict-" + t.id + "'>" +
            "<div class='th-entry-head'>" +
              "<span class='th-entry-id'>" + t.id + "</span>" +
              "<span class='th-entry-title'>" + t.title + "</span>" +
              "<a class='th-entry-jump' href='javascript:void 0' data-jump='" + t.id + "'>查看详解 ▸</a>" +
            "</div>" +
            "<div class='th-entry-body'>" + render(t.statement, "法则图") + "</div>" +
            "<div class='th-entry-cond'><div class='dh'>成立条件</div><ul class='ans-list'>" +
              t.conditions.map(function (c) { return "<li>" + math(c) + "</li>"; }).join("") +
            "</ul></div>" +
          "</div>";
        });
        html += "</div>";
      });
      html += "</div>";
    });
    html += "</div>";
    return html;
  }

  /* ---------- ① 法则书 · 定理与证明 ---------- */
  function renderLaws() {
    viewTitle.textContent = "法则书 · 定理与证明";
    var th = TH.filter(function (t) { return t.ch === curChapter; });
    toolbar.innerHTML = '<select id="lawFilter"><option value="">全部法则</option>' +
      th.map(function (t) { return '<option value="' + t.id + '">' + t.id + " " + t.title + "</option>"; }).join("") +
      '</select>';
    var sel = document.getElementById("lawFilter");
    sel.addEventListener("change", draw);
    draw();
    function draw() {
      var f = sel.value;
      view.innerHTML = "";
      var banner = document.createElement("div");
      banner.className = "drill-banner";
      banner.innerHTML = "<div class='db-left'>世界法则 · 第 " + curChapter + " 章收录 <b>" + th.length + "</b> 条，已掌握 <b>" +
        th.filter(function (t) { return state.learned[t.id]; }).length + "</b> 条</div>" +
        "<div class='db-hint'>每条法则按「条件 → 思路 → 分步推演 → 边界反例」组织。分步推演逐步解锁，自己先想再点下一步。</div>" +
        "<div class='db-rules'>" + D.game.rules + "</div>";
      view.appendChild(banner);

      var dict = document.createElement("div");
      dict.innerHTML = theoremOverview();
      view.appendChild(dict);
      dict.querySelectorAll(".th-entry-jump").forEach(function (a) {
        a.addEventListener("click", function () {
          var el = document.getElementById(a.dataset.jump);
          if (el) {
            el.classList.add("flash");
            try { el.scrollIntoView({ block: "start" }); } catch (e) { /* 环境不支持滚动时忽略 */ }
            setTimeout(function () { el.classList.remove("flash"); }, 1200);
          }
        });
      });

      th.filter(function (t) { return !f || t.id === f; }).forEach(function (t) {
        var open = state.steps[t.id] || 1;
        var card = document.createElement("div");
        card.className = "law-card" + (state.learned[t.id] ? " done" : "");
        card.id = t.id;
        var stepsHtml = t.steps.slice(0, open).map(function (s, i) {
          return "<div class='law-step'><div class='ls-n'>STEP " + (i + 1) + "</div><div class='ls-h'>" +
            math(s.h) + "</div><div class='ls-b'>" + math(s.body) + "</div></div>";
        }).join("");
        var more = open < t.steps.length
          ? "<button class='btn step-more'>展开下一步 · " + math(t.steps[open].h) + "</button>"
          : "<div class='law-fin'>推演链完成 · 已解锁全部 " + t.steps.length + " 步</div>";
        var lp = D.loopholes[t.id], solved = !!state.loophole[t.id];
        var lpOpts = (lp && !solved) ? lp.options.map(function (o, i) {
          return "<button class='lp-btn' data-lp='" + i + "'>" + math(o) + "</button>";
        }).join("") : "";
        var loopholeHtml = lp ?
          "<div class='loophole'><div class='dh'>规则漏洞卡 · 空的挑衅</div><p>" + math(lp.q) + "</p>" +
          (solved
            ? "<div class='lp-ok'>已攻破 · 获得 1 枚漏洞标记（当前 " + (state.marks || 0) + " 枚）</div>" +
              "<div class='lp-exp'>" + math(lp.explain) + "</div>"
            : "<div class='lp-opts'>" + lpOpts + "</div><div class='lp-hint' id='lph-" + t.id + "'></div>") +
          "</div>" : "";
        var duo = D.duo[t.id], dv = state.duo[t.id] || "sora";
        var duoHtml = duo ?
          "<div class='duo'><div class='dh'>空白双人推演 · 切换视角</div>" +
          "<div class='duo-tabs'><button class='duo-tab" + (dv === "sora" ? " on" : "") +
            "' data-duo='sora'>空 · 战略（为什么这么想）</button>" +
          "<button class='duo-tab" + (dv === "shiro" ? " on" : "") +
            "' data-duo='shiro'>白 · 执行（把式子写全）</button></div>" +
          "<ol class='ans-steps'>" + duo[dv].map(function (x) { return "<li>" + math(x) + "</li>"; }).join("") + "</ol>" +
          "<div class='duo-note'>空负责找规则的缝，白负责把计算走到底——「　　」要两个人合力才成立。</div></div>" : "";
        card.innerHTML =
          "<div class='law-head'><span class='law-badge'>" + t.id + "</span>" +
            "<span class='law-title'>" + t.title + "</span>" +
            "<span class='law-tag'>" + t.law + "</span></div>" +
          "<div class='law-sec'><div class='dh'>法则陈述</div>" + render(t.statement, "法则图") + "</div>" +
          "<div class='law-sec'><div class='dh'>成立条件</div><ul class='ans-list'>" +
            t.conditions.map(function (c) { return "<li>" + math(c) + "</li>"; }).join("") + "</ul></div>" +
          "<div class='law-idea'><b>思路从哪来</b>　" + math(t.idea) + "</div>" +
          "<div class='law-sec'><div class='dh'>分步推演（" + open + "/" + t.steps.length + "）</div>" +
            stepsHtml + more + "</div>" +
          "<div class='law-sec'><div class='dh'>边界与反例 · 空的规则漏洞</div>" +
            "<p>" + math(t.boundary) + "</p><p class='law-ce'><b>反例：</b>" + math(t.counterexample) + "</p></div>" +
          (t.fig ? fig("<img src='" + t.fig + "' class='task-fig'>", "法则图") : "") +
          "<div class='law-npc'>" + math(t.npc) + "</div>" +
          loopholeHtml + duoHtml +
          "<div class='law-foot'><button class='btn law-learn'>" +
            (state.learned[t.id] ? "已掌握 · 点击取消" : "标记「已掌握这条法则」 +30 XP") + "</button></div>";

        card.querySelectorAll(".lp-btn").forEach(function (b) {
          b.addEventListener("click", function () {
            if (+b.dataset.lp === lp.answer) {
              if (!state.loophole[t.id]) {
                state.loophole[t.id] = true;
                state.marks = (state.marks || 0) + 1;
              }
              save(); refreshLevel(); rerender("laws");
              toast("规则漏洞已攻破 · +1 枚漏洞标记");
            } else {
              var h = document.getElementById("lph-" + t.id);
              if (h) h.textContent = "空：这条缝没钻开，再看看条件到底管住了什么。";
            }
          });
        });
        card.querySelectorAll(".duo-tab").forEach(function (b) {
          b.addEventListener("click", function () {
            state.duo[t.id] = b.dataset.duo; save(); rerender("laws");
          });
        });
        card.querySelector(".step-more") && card.querySelector(".step-more").addEventListener("click", function () {
          state.steps[t.id] = Math.min(open + 1, t.steps.length);
          save(); rerender("laws");
        });
        card.querySelector(".law-learn").addEventListener("click", function () {
          state.learned[t.id] = !state.learned[t.id];
          save(); refreshLevel(); rerender("laws");
          if (state.learned[t.id]) toast("法则已刻入 · +30 XP");
        });
        view.appendChild(card);
      });
    }
  }

  /* ---------- ② 对局场 · 习题练习 ---------- */
  function renderDuels() {
    viewTitle.textContent = "对局场 · 习题练习";
    var ex = EX.filter(function (e) { return e.ch === curChapter; });
    var judged = ex.filter(function (e) { return duel(e.id).result; }).length;
    view.innerHTML = "";
    var banner = document.createElement("div");
    banner.className = "drill-banner";
    banner.innerHTML = "<div class='db-left'>第 " + curChapter + " 章对局 · 共 <b>" + ex.length + "</b> 局，已判定 <b>" + judged + "</b> 局</div>" +
      "<div class='db-hint'>流程：读题 → 向盟约宣誓（由你决定推演方式）→ 逐级请求提示 → 自查后判定胜 / 平 / 败。提前看答案＝依盟约八判败北，但可无限重开。</div>" +
      "<div class='db-rules'>" + D.game.rules + "</div>";
    view.appendChild(banner);

    ex.forEach(function (e) {
      var d = duel(e.id), locked = !d.oath, lv = state.hints[e.id] || 0;
      var card = document.createElement("div");
      card.className = "duel-card" + (d.result === "win" ? " done" : "");
      card.id = e.id;
      var hintHtml = e.hints.slice(0, lv).map(function (h, i) {
        return "<div class='hint-item'><b>提示 " + (i + 1) + "</b>　" + math(h) + "</div>";
      }).join("");
      var hintBtn = locked ? "<span class='oath-note'>向盟约宣誓后可请求提示</span>"
        : (lv < e.hints.length
            ? "<button class='btn hint-more'>请求第 " + (lv + 1) + " 级提示（共 " + e.hints.length + " 级）</button>"
            : "<span class='oath-done'>提示已全部给出 · 该自己推了</span>");
      card.innerHTML =
        "<div class='duel-head'><span class='drill-id'>" + e.id + "</span>" +
          "<span class='duel-title'>" + e.title + "</span>" +
          "<span class='duel-diff'>难度 " + e.difficulty + "</span></div>" +
        "<div class='duel-src'>出处：" + e.src + " ｜ " + e.srcAns + "</div>" +
        "<div class='duel-stmt'>" + render(e.statement, "题目图") + "</div>" +
        "<div class='oath-panel'>" +
          "<div class='oath-head'>挑战状 · 向盟约宣誓<span class='oath-tag'>盟约三 · 对等赌注</span></div>" +
          "<div class='oath-bet'>赌注：<b>" + e.bet + "</b></div>" +
          "<div class='oath-modes'><span class='om-label'>盟约五 · 受挑战方（你）决定推演方式</span><div class='om-btns'>" +
            D.game.modes.map(function (m, i) {
              var picked = (state.pick[e.id] || 0) === i;
              return "<button class='om-btn" + (picked ? " picked" : "") + "' data-mode='" + i + "'>" + m + "</button>";
            }).join("") + "</div></div>" +
          "<div class='oath-foot'>" + (locked
            ? "<button class='btn oath-go'>向盟约宣誓 · 接受挑战</button><span class='oath-note'>宣誓后解锁提示与判定</span>"
            : "<span class='oath-done'>已宣誓 · " + D.game.modes[d.oath.mode || 0] + "</span><button class='btn oath-reset'>重新宣誓（重开本局）</button>") +
          "</div>" +
        "</div>" +
        "<div class='hint-box'>" + hintHtml + hintBtn + "</div>" +
        (e.type ? quizBlock(e, locked) : "") +
        "<div class='duel-act'>" +
          "<button class='btn ans-btn'" + (locked ? " disabled" : "") + ">" +
            (locked ? "宣誓后可查看答案" : (isSealed(d) ? "记忆封印中 · 暂不可看" : (d.defeat ? "再战查看 / 对照答案" : "认输 / 查看参考答案"))) + "</button>" +
          (e.type
            ? "<div class='quiz-res'>" + (d.result ? "<span class='res-pill " + d.result + "'>" + resLabel(d.result) + "</span>" : "<span class='res-pill none'>未判定 · 提交测验后点亮</span>") + "</div>"
            : "<div class='res-grp'><span class='res-label'>本局判定</span>" +
              [["win", "胜"], ["draw", "平"], ["lose", "败"]].map(function (p) {
                return "<button class='res-btn " + p[0] + (d.result === p[0] ? " picked" : "") +
                  "' data-res='" + p[0] + "'" + (locked ? " disabled" : "") + ">" + p[1] + "</button>";
              }).join("") + "</div>") +
        "</div>" +
        "<div class='duel-methods'>用到的方法：" + e.methods.map(function (mid) {
          var m = ME.filter(function (x) { return x.id === mid; })[0];
          return "<button class='link-btn' data-method='" + mid + "'>" + (m ? m.name : mid) + "</button>";
        }).join("、") + "</div>" +
        "<div class='duel-ans' style='display:none'>" +
          (isSealed(d)
            ? sealHtml(d.sealedUntil)
            : (d.defeat ? "<div class='defeat-note'>依盟约八：提前看答案，本局记一次败北。盟约不禁止重开 —— 点「重新宣誓」擦掉记录，再战一次。</div>" : "") +
              render(e.answer, "解答图")) + "</div>";

      card.querySelectorAll(".om-btn").forEach(function (b) {
        b.addEventListener("click", function () {
          state.pick[e.id] = +b.dataset.mode;
          if (d.oath) d.oath.mode = +b.dataset.mode;
          save(); rerender("duels");
        });
      });
      card.querySelector(".oath-go") && card.querySelector(".oath-go").addEventListener("click", function () {
        d.oath = { mode: state.pick[e.id] || 0, ts: Date.now() };
        save(); rerender("duels");
        toast("「来吧，开始游戏吧」— 特图");
      });
      card.querySelector(".oath-reset") && card.querySelector(".oath-reset").addEventListener("click", function () {
        state.duels[e.id] = { oath: null, result: "", defeat: false, practiced: false };
        state.hints[e.id] = 0; delete state.pick[e.id];
        save(); refreshLevel(); rerender("duels");
        toast("本局已重置 · 再战一次");
      });
      card.querySelector(".hint-more") && card.querySelector(".hint-more").addEventListener("click", function () {
        state.hints[e.id] = Math.min(lv + 1, e.hints.length);
        save(); rerender("duels");
      });
      var ansBtn = card.querySelector(".ans-btn"), ansBox = card.querySelector(".duel-ans");
      function refreshAnsBtn() {
        if (locked) { ansBtn.textContent = "宣誓后可查看答案"; return; }
        var open = ansBox.style.display !== "none";
        if (open) ansBtn.textContent = "收起答案";
        else if (isSealed(d)) ansBtn.textContent = "记忆封印中 · 暂不可看";
        else ansBtn.textContent = d.defeat ? "再战查看 / 对照答案" : "认输 / 查看参考答案";
      }
      ansBtn.addEventListener("click", function () {
        if (locked) return;
        var open = ansBox.style.display !== "none";
        if (open) { ansBox.style.display = "none"; refreshAnsBtn(); return; }
        ansBox.style.display = "block";
        if (isSealed(d)) {
          ansBox.innerHTML = sealHtml(d.sealedUntil);   // 封印中只给遮罩，不给解析
          refreshAnsBtn();
        } else {
          d.defeat = true;
          d.sealedUntil = Date.now() + sealMs;            // 每次看都重新封印
          save();
          ansBox.innerHTML = "<div class='defeat-note'>依盟约八：提前看答案，本局记一次败北。盟约不禁止重开 —— 点「重新宣誓」擦掉记录，再战一次。</div>" + render(e.answer, "解答图");
          refreshAnsBtn();
          toast("记忆封印 " + (D.sealHours || 24) + " 小时：看完先自己推，解封后再来对照");
        }
      });
      card.querySelectorAll(".res-btn").forEach(function (b) {
        b.addEventListener("click", function () {
          if (locked) return;
          d.result = b.dataset.res; save();
          card.querySelectorAll(".res-btn").forEach(function (x) { x.classList.remove("picked"); });
          b.classList.add("picked");
          if (b.dataset.res === "win") {
            state.combo = (state.combo || 0) + 1;
            if (state.combo > (state.bestCombo || 0)) state.bestCombo = state.combo;
            toast(state.combo >= 2 ? ("连胜 " + state.combo + "！向联邦伙伴再进一步") : "胜利 · +20 XP，向种族棋子迈进一步");
          } else if (b.dataset.res === "lose") {
            state.combo = 0;
            toast("败北不是结束 · 记进败北日志，择日复仇");
          } else {
            toast("平局 · 再推一步或许就是胜");
          }
          save(); refreshLevel();
        });
      });
      card.querySelectorAll(".link-btn").forEach(function (b) {
        b.addEventListener("click", function () { jump("skills", "M-" + b.dataset.method); });
      });

      if (e.type) {
        var qSubmit = card.querySelector(".quiz-submit");
        if (qSubmit) {
          qSubmit.addEventListener("click", function () {
            if (locked) return;
            if (card.classList.contains("quiz-done")) { resetQuiz(card); return; }
            var res;
            if (e.type === "choice") {
              var sel = card.querySelector("input[name='q-" + e.id + "']:checked");
              if (!sel) { toast("先选一个答案再提交"); return; }
              res = (+sel.value === e.correct) ? "win" : "lose";
            } else {
              var ksP = [].slice.call(card.querySelectorAll(".ks:checked")).map(function (x) { return +x.value; });
              var csP = [].slice.call(card.querySelectorAll(".cs:checked")).map(function (x) { return +x.value; });
              var trueK = e.keySteps.map(function (s, i) { return s.k ? i : -1; }).filter(function (i) { return i >= 0; });
              var trueC = e.core.map(function (c, i) { return c.u ? i : -1; }).filter(function (i) { return i >= 0; });
              var wrong = ksP.some(function (i) { return !e.keySteps[i].k; }) || csP.some(function (i) { return !e.core[i].u; });
              var allK = trueK.every(function (i) { return ksP.indexOf(i) >= 0; }) && ksP.every(function (i) { return e.keySteps[i].k; });
              var allC = trueC.every(function (i) { return csP.indexOf(i) >= 0; }) && csP.every(function (i) { return e.core[i].u; });
              if (wrong) res = "lose";
              else if (allK && allC) res = "win";
              else res = "draw";
            }
            applyResult(d, res);
            d.quiz = e.type === "choice"
              ? { type: "choice", pick: +card.querySelector("input[name='q-" + e.id + "']:checked").value, ts: Date.now() }
              : { type: "proof", ks: ksP, cs: csP, ts: Date.now() };
            save();
            showQuizFeedback(card, res, false);
            refreshLevel();
            toast(res === "win" ? "全对 · 胜！向种族棋子迈进一步"
              : res === "draw" ? "部分对 · 平局 · 再推一步或看解析"
              : "有错选 · 败 · 记进败北日志择日复仇");
          });
        }
        if (d.quiz && !locked) showQuizFeedback(card, d.result, true);
      }

      function showQuizFeedback(card, res, restore) {
        var fb = card.querySelector(".quiz-fb");
        if (!fb) return;
        var chip = res === "win" ? "胜 · 全对" : res === "draw" ? "平 · 部分对" : "败 · 错选";
        var exp = e.type === "choice" ? e.choiceExplain : e.proofExplain;
        fb.innerHTML = "<div class='quiz-chip " + res + "'>" + chip + "</div><div class='quiz-exp'>" + math(exp) + "</div>";
        fb.style.display = "block";
        card.querySelectorAll(".duel-quiz input").forEach(function (inp) { inp.disabled = true; });
        if (e.type === "choice") {
          if (restore && d.quiz && typeof d.quiz.pick === "number") {
            var ri = card.querySelector("input[name='q-" + e.id + "'][value='" + d.quiz.pick + "']");
            if (ri) ri.checked = true;
          }
          card.querySelectorAll(".quiz-opt").forEach(function (lab) {
            var inp = lab.querySelector("input"), i = +inp.value;
            if (i === e.correct) lab.classList.add("ok");
            else if (inp.checked) lab.classList.add("bad");
          });
        } else {
          if (restore && d.quiz) {
            (d.quiz.ks || []).forEach(function (i) { var c = card.querySelector(".ks[value='" + i + "']"); if (c) c.checked = true; });
            (d.quiz.cs || []).forEach(function (i) { var c = card.querySelector(".cs[value='" + i + "']"); if (c) c.checked = true; });
          }
          card.querySelectorAll(".ks").forEach(function (inp) {
            var lab = inp.closest("label"), i = +inp.value, s = e.keySteps[i];
            var cls = s.k ? (inp.checked ? "ok" : "miss") : (inp.checked ? "bad" : null);
            if (cls) lab.classList.add(cls);
          });
          card.querySelectorAll(".cs").forEach(function (inp) {
            var lab = inp.closest("label"), i = +inp.value, c = e.core[i];
            var cls = c.u ? (inp.checked ? "ok" : "miss") : (inp.checked ? "bad" : null);
            if (cls) lab.classList.add(cls);
          });
        }
        if (res === "win") card.classList.add("done");
        var sub = card.querySelector(".quiz-submit");
        if (sub) { sub.textContent = "重做测验"; sub.classList.add("retry"); }
        card.classList.add("quiz-done");
      }

      function resetQuiz(card) {
        card.classList.remove("quiz-done", "done");
        card.querySelectorAll(".duel-quiz input").forEach(function (inp) { inp.disabled = false; inp.checked = false; });
        card.querySelectorAll(".quiz-opt,.quiz-step,.quiz-core").forEach(function (l) { l.classList.remove("ok", "bad", "miss"); });
        var fb = card.querySelector(".quiz-fb");
        if (fb) { fb.style.display = "none"; fb.innerHTML = ""; }
        var sub = card.querySelector(".quiz-submit");
        if (sub) { sub.textContent = "提交测验"; sub.classList.remove("retry"); }
        d.quiz = null; save(); refreshLevel();
      }

      view.appendChild(card);
    });
    function startSealTicker() {
      clearInterval(sealTimer);
      sealTimer = setInterval(function () {
        if (currentView() !== "duels") { clearInterval(sealTimer); return; }
        var expired = false;
        document.querySelectorAll(".seal-time").forEach(function (el) {
          var t = (+el.dataset.until) - Date.now();
          if (t <= 0) { expired = true; return; }
          el.textContent = fmtRemain(t);
        });
        if (expired) rerender("duels");
      }, 30000);
    }
    if (EX.some(function (e) { return isSealed(duel(e.id)); })) startSealTicker();
  }

  /* ---------- ③ 败北日志 · 错题归纳 ---------- */
  function renderLog() {
    viewTitle.textContent = "败北日志 · 错题归纳";
    toolbar.innerHTML = '<select id="logFilter"><option value="">全部记录</option>' +
      '<option value="open">仅未复仇</option><option value="done">仅已攻克</option></select>';
    var sel = document.getElementById("logFilter");
    sel.addEventListener("change", draw);
    draw();
    function draw() {
      var f = sel.value, list = state.mistakes.filter(function (m) {
        return !f || (f === "open" ? !m.resolved : m.resolved);
      });
      var openN = state.mistakes.filter(function (m) { return !m.resolved; }).length;
      var byReason = {};
      state.mistakes.forEach(function (m) { (byReason[m.reason] = byReason[m.reason] || []).push(m); });
      var grp = Object.keys(byReason).filter(function (r) { return byReason[r].length >= 2; });
      var focusHtml = "<div class='focus'><div class='dh'>集中突破 · 同错因归类（机凯种·休比的能力）</div>" +
        (grp.length ? grp.map(function (r) {
          var qs = byReason[r].map(function (m) { return m.qid; }).join("、");
          return "<div class='focus-item'><b>" + r + "</b>　共 " + byReason[r].length + " 题：" + qs + "　— 建议一起重推</div>";
        }).join("") : "<p class='empty'>暂无重复错因，继续保持。</p>") + "</div>";
      view.innerHTML =
        "<div class='drill-banner'><div class='db-left'>败北日志 · 共 <b>" + state.mistakes.length +
          "</b> 条，未复仇 <b>" + openN + "</b> 条</div>" +
          "<div class='db-hint'>把做错的题记在这里，标上错因；攻克后用「复仇成功」划掉。同错因的题会自动提示你集中突破。</div></div>" +
        focusHtml +
        "<div class='log-form'><div class='dh'>登记一次败北</div>" +
          "<select id='mq'>" + EX.map(function (e) { return "<option value='" + e.id + "'>" + e.id + " " + e.title + "</option>"; }).join("") + "</select>" +
          "<select id='mr'>" + D.game.reasons.map(function (r) { return "<option>" + r + "</option>"; }).join("") + "</select>" +
          "<input id='mn' placeholder='错在哪一步 / 下次怎么改（选填）'>" +
          "<button class='btn' id='madd'>记入日志</button>" +
          "<button class='btn' id='mexp'>导出 JSON</button></div>" +
        "<div id='logList'>" + (list.length ? list.slice().reverse().map(function (m) {
          return "<div class='log-item" + (m.resolved ? " done" : "") + "'>" +
            "<div class='li-top'><span class='li-q'>" + m.qid + "</span>" +
              "<span class='li-r'>" + m.reason + "</span>" +
              "<span class='li-d'>" + new Date(m.ts).toLocaleDateString() + "</span></div>" +
            (m.note ? "<div class='li-note'>" + m.note + "</div>" : "") +
            "<div class='li-act'><button class='btn' data-resolve='" + m.id + "'>" +
              (m.resolved ? "重新标为未复仇" : "复仇成功 · 划掉") + "</button>" +
              "<button class='btn' data-goto='" + m.qid + "'>回到该题</button>" +
              "<button class='btn' data-del='" + m.id + "'>删除</button></div></div>";
        }).join("") : "<p class='empty'>还没有败北记录。去对局场输一局，或者先登记一条吧。</p>") + "</div>";

      document.getElementById("madd").addEventListener("click", function () {
        state.mistakes.push({
          id: "m" + Date.now(), qid: document.getElementById("mq").value,
          reason: document.getElementById("mr").value,
          note: document.getElementById("mn").value.trim(), ts: Date.now(), resolved: false
        });
        save(); refreshLevel(); draw();
        toast("败北已记录 · 下次复仇");
      });
      document.getElementById("mexp").addEventListener("click", function () {
        var blob = new Blob([JSON.stringify(state.mistakes, null, 2)], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = "败北日志.json"; a.click();
      });
      view.querySelectorAll("[data-resolve]").forEach(function (b) {
        b.addEventListener("click", function () {
          var m = state.mistakes.filter(function (x) { return x.id === b.dataset.resolve; })[0];
          if (m) { m.resolved = !m.resolved; save(); draw(); if (m.resolved) toast("复仇成功 · 这条规则漏洞补上了"); }
        });
      });
      view.querySelectorAll("[data-goto]").forEach(function (b) {
        b.addEventListener("click", function () { jump("duels", b.dataset.goto); });
      });
      view.querySelectorAll("[data-del]").forEach(function (b) {
        b.addEventListener("click", function () {
          state.mistakes = state.mistakes.filter(function (x) { return x.id !== b.dataset.del; });
          save(); refreshLevel(); draw();
        });
      });
    }
  }

  /* ---------- ④ 技能树 · 方法总览 ---------- */
  function renderSkills() {
    viewTitle.textContent = "技能树 · 方法总览";
    var me = ME.filter(function (m) { return m.ch === curChapter; });
    var lit = me.filter(function (m) { return state.methods[m.id]; }).length;
    view.innerHTML = "";
    var banner = document.createElement("div");
    banner.className = "drill-banner";
    banner.innerHTML = "<div class='db-left'>方法图鉴 · 已点亮 <b>" + lit + "</b>/" + me.length + " 张（第 " + curChapter + " 章）</div>" +
      "<div class='db-hint'>每张方法卡写清「什么时候用 / 怎么做 / 典型题 / 最易错」。前置方法是解锁链，点亮的卡片可随时回看。</div>";
    view.appendChild(banner);
    me.forEach(function (m) {
      var card = document.createElement("div");
      card.className = "method-card" + (state.methods[m.id] ? " done" : "");
      card.id = "M-" + m.id;
      var pre = m.prereq.map(function (p) {
        var x = ME.filter(function (y) { return y.id === p; })[0];
        return x ? "<button class='link-btn' data-method='" + p + "'>" + x.name + "</button>" : p;
      }).join("、") || "无（起手方法）";
      card.innerHTML =
        "<div class='mc-head'><span class='mc-badge'>" + m.id + "</span>" +
          "<span class='mc-name'>" + m.name + "</span><span class='mc-alias'>" + m.alias + "</span></div>" +
        "<div class='mc-sec'><div class='dh'>什么时候用</div><p>" + math(m.when) + "</p></div>" +
        "<div class='mc-sec'><div class='dh'>怎么操作</div><ol class='ans-steps'>" +
          m.how.map(function (h) { return "<li>" + math(h) + "</li>"; }).join("") + "</ol></div>" +
        "<div class='mc-sec'><div class='dh'>典型对局</div><div class='mc-typical'>" +
          m.typical.map(function (q) { return "<button class='link-btn' data-q='" + q + "'>" + q + "</button>"; }).join("、") +
          "</div></div>" +
        "<div class='mc-warn'><b>最易错</b>　" + m.pitfall + "</div>" +
        "<div class='mc-pre'>前置方法：" + pre + "</div>" +
        "<div class='mc-foot'><button class='btn mc-learn'>" +
          (state.methods[m.id] ? "已点亮 · 点击取消" : "点亮这张方法卡 +10 XP") + "</button></div>";
      card.querySelector(".mc-learn").addEventListener("click", function () {
        state.methods[m.id] = !state.methods[m.id];
        save(); refreshLevel(); rerender("skills");
        if (state.methods[m.id]) toast("方法已点亮 · +10 XP");
      });
      card.querySelectorAll("[data-q]").forEach(function (b) {
        b.addEventListener("click", function () { jump("duels", b.dataset.q); });
      });
      card.querySelectorAll("[data-method]").forEach(function (b) {
        b.addEventListener("click", function () { jump("skills", "M-" + b.dataset.method); });
      });
      view.appendChild(card);
    });
  }

  /* ---------- 联邦 · 伙伴名册 ---------- */
  function renderAllies() {
    viewTitle.textContent = "联邦 · 伙伴名册";
    var got = chessState().filter(function (c) { return c.on; }).length;
    view.innerHTML =
      "<div class='drill-banner'><div class='db-left'>艾尔奇亚联邦 · 已结盟 <b>" + got + "</b>/16 位伙伴</div>" +
      "<div class='db-hint'>按第十条盟约，棋子不可掠夺，只能结盟。每攻克一处（对局判胜 / 掌握法则 / 点亮方法 / 攻破规则漏洞）便有伙伴前来入盟。集齐 16 位，方有资格向唯一神特图挑战星杯。</div>" +
      "<div class='db-rules'>" + D.game.rules + "</div></div>" +
      "<div class='ally-grid'>" + D.allies.map(function (a) {
        var on = allyUnlocked(a);
        return "<div class='ally-card " + (on ? "got" : "locked") + "'>" +
          "<div class='ally-piece'>" + a.piece + "</div>" +
          "<div class='ally-rank'>第 " + a.rank + " 位 · " + a.race + "</div>" +
          "<div class='ally-race'>" + a.name + "</div>" +
          "<div class='ally-cond'><b>入盟条件</b>　" + a.cond + "</div>" +
          "<div class='ally-ability'><b>能力</b>　" + (on ? a.ability : "待解锁") + "</div>" +
          "<div class='ally-quote'>「" + a.quote + "」</div>" +
          "<div class='ally-status " + (on ? "ok" : "no") + "'>" + (on ? "● 已结盟" : "○ 未结盟") + "</div>" +
          "</div>";
      }).join("") + "</div>";
  }

  /* ---------- 设置 ---------- */
  function renderSettings() {
    viewTitle.textContent = "设置";
    view.innerHTML =
      "<div class='set-card'><h3 style='margin-top:0'>主题风格</h3>" +
      "<div class='theme-btns'><button data-theme='disboard' class='" + (state.theme === "disboard" ? "active" : "") +
        "'>迪司博德 · 盘上世界</button><button data-theme='default' class='" +
        (state.theme === "default" ? "active" : "") + "'>简约 · 学院</button></div>" +
      "<h3>关于内容</h3><div class='guide'>" +
      "<p>第 0 期样例只覆盖<b>第 2 章「数列极限」</b>：3 条法则、6 场对局、5 张方法卡。</p>" +
      "<p>讲义为扫描版（442 页 / 306 书签），答案册为网友「顺数人」编写的非官方解析（262 页 / 78 书签，序言自述有笔误与未解题）。网页内定理与解答均为<b>学习整理与重新录入</b>，答案标注「参考答案 · 以教材为准」，不整本搬运。</p>" +
      "<p>公式由<b>本地 KaTeX</b> 渲染，断网可用；<code>vendor/katex/</code> 内含 CSS、JS 与 20 个字体文件。</p>" +
      "<p>题号主 ID 用「讲义节号-题号」（如 <code>E2.1-1</code>）；答案册把讲义的 2.1.5 练习题重编为 2.1.1 练习题，故每题另记 <code>srcAns</code> 页码。</p>" +
      "<h3>进度</h3><p>掌握状态、对局判定、败北日志、方法点亮全部存在本机浏览器（localStorage），换设备不共享，可导出 JSON 备份。</p>" +
      "</div><p style='margin-top:18px'><button class='btn danger' id='resetBtn'>重置全部进度</button></p></div>";
    view.querySelectorAll(".theme-btns button").forEach(function (b) {
      b.addEventListener("click", function () {
        state.theme = b.dataset.theme; save(); applyTheme();
        view.querySelectorAll(".theme-btns button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
      });
    });
    document.getElementById("resetBtn").addEventListener("click", function () {
      if (confirm("确定清空全部进度与败北日志？")) {
        state.learned = {}; state.duels = {}; state.methods = {}; state.mistakes = [];
        state.steps = {}; state.hints = {}; state.pick = {};
        save(); refreshLevel(); go("laws");
      }
    });
  }

  /* ---------- 通用控件 ---------- */
  function applyTheme() { document.getElementById("theme").href = "styles/theme-" + state.theme + ".css"; }
  function applyNav() { document.body.classList.toggle("nav-collapsed", !!state.navCollapsed); }
  function applyFont() {
    document.documentElement.style.setProperty("--fs", String(state.fontScale));
    document.getElementById("fontVal").textContent = Math.round(state.fontScale * 100) + "%";
  }
  document.getElementById("navToggle").addEventListener("click", function () {
    state.navCollapsed = !state.navCollapsed; save(); applyNav();
  });
  document.getElementById("fontMinus").addEventListener("click", function () {
    state.fontScale = Math.max(0.8, +(state.fontScale - 0.1).toFixed(2)); save(); applyFont();
  });
  document.getElementById("fontPlus").addEventListener("click", function () {
    state.fontScale = Math.min(1.8, +(state.fontScale + 0.1).toFixed(2)); save(); applyFont();
  });

  /* ---------- 启动 ---------- */
  document.getElementById("brandTitle").textContent = D.meta.title;
  document.getElementById("brandSub").textContent = D.meta.subtitle;
  document.getElementById("raceName").textContent = D.game.race;
  document.getElementById("levelBox").title = D.game.chessHint + "｜" + D.game.chessMap;
  applyTheme(); applyNav(); applyFont(); save(); refreshLevel();

  /* 章节切换 */
  var chapterSel = document.getElementById("chapterSel");
  chapterSel.innerHTML = CH.map(function (c) {
    var dis = c.status === "locked" ? " disabled" : "";
    var sel = c.id === curChapter ? " selected" : "";
    return "<option value='" + c.id + "'" + dis + sel + ">" + c.id + " · " + c.name + "</option>";
  }).join("");
  chapterSel.value = curChapter;
  chapterSel.addEventListener("change", function () {
    curChapter = chapterSel.value;
    state.chapter = curChapter; save();
    rerender(currentView());
  });

  go("laws");
})();
