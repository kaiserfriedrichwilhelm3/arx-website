// ARX booking widget — self-contained, vanilla JS. Talks ONLY to the ARX
// backend (/chat); no API keys, no Cal.com calls, no LLM access in the browser.
//
// Embed:
//   <script src="https://YOUR-BOT-HOST/widget.js" defer
//           data-endpoint="https://YOUR-BOT-HOST/chat"
//           data-cal-link="https://cal.com/YOUR-HANDLE/intake"></script>
(function () {
  var script = document.currentScript;
  var ENDPOINT = (script && script.dataset.endpoint) || '/chat';
  var CAL_LINK = (script && script.dataset.calLink) || 'https://cal.com';
  var FAIL = 'Something went wrong — you can also book directly at ' + CAL_LINK;

  // Stable per-tab session id; the backend owns all real state.
  var sid;
  try {
    sid = sessionStorage.getItem('arx-bot-sid');
    if (!sid) { sid = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)); sessionStorage.setItem('arx-bot-sid', sid); }
  } catch (e) { sid = String(Date.now()) + Math.random().toString(16).slice(2); }

  var root = document.createElement('div');
  root.id = 'arx-bot';
  root.innerHTML =
    '<button id="arx-bot-fab" aria-label="Book a call" aria-expanded="false">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v3M16 2v3M3 9h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>' +
    '</button>' +
    '<div id="arx-bot-panel" role="dialog" aria-label="Book an intake call" hidden>' +
      '<div id="arx-bot-head"><span>Book an intake call</span><button id="arx-bot-close" aria-label="Close">&times;</button></div>' +
      '<div id="arx-bot-msgs" aria-live="polite"></div>' +
      '<form id="arx-bot-form"><input id="arx-bot-in" type="text" autocomplete="off" maxlength="500" placeholder="e.g. Tuesday afternoon" aria-label="Message" /><button type="submit" aria-label="Send">&rarr;</button></form>' +
    '</div>';
  document.body.appendChild(root);

  var fab = root.querySelector('#arx-bot-fab');
  var panel = root.querySelector('#arx-bot-panel');
  var msgs = root.querySelector('#arx-bot-msgs');
  var form = root.querySelector('#arx-bot-form');
  var input = root.querySelector('#arx-bot-in');
  var opened = false;

  function add(kind, text) {
    var b = document.createElement('div');
    b.className = 'arx-bot-msg ' + kind;
    // textContent only — replies render as plain text, with the one exception
    // of the fallback link, added as a real anchor built here (never from
    // server-controlled markup).
    b.textContent = text;
    if (kind === 'bot' && text.indexOf(CAL_LINK) !== -1) {
      b.textContent = text.replace(CAL_LINK, '').replace(/\s+$/, ' ');
      var a = document.createElement('a');
      a.href = CAL_LINK; a.target = '_blank'; a.rel = 'noopener'; a.textContent = CAL_LINK;
      b.appendChild(a);
    }
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function toggle(open) {
    panel.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    if (open && !opened) { opened = true; add('bot', "Hi — I can get you on a short intake call with ARX. What day works for you?"); }
    if (open) input.focus();
  }
  fab.addEventListener('click', function () { toggle(panel.hidden); });
  root.querySelector('#arx-bot-close').addEventListener('click', function () { toggle(false); });

  var busy = false;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || busy) return;
    add('me', text);
    input.value = '';
    busy = true;
    var typing = document.createElement('div');
    typing.className = 'arx-bot-msg bot arx-bot-typing';
    typing.textContent = '…';
    msgs.appendChild(typing);
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sid, message: text }),
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) { typing.remove(); add('bot', (res.j && res.j.reply) || FAIL); })
      .catch(function () { typing.remove(); add('bot', FAIL); })
      .finally(function () { busy = false; input.focus(); });
  });
})();
