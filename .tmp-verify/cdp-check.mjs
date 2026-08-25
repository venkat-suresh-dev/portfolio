const wsUrl =
  "ws://127.0.0.1:9229/devtools/page/D57502AF0AF7EE2BDB91BD6F8A7FD96B";

const logs = [];
let id = 0;
const ws = new WebSocket(wsUrl);

function send(method, params = {}) {
  const msg = { id: ++id, method, params };
  ws.send(JSON.stringify(msg));
  return id;
}

ws.addEventListener("open", () => {
  send("Runtime.enable");
  send("Log.enable");
  send("Console.enable");
  send("Page.enable");
  send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.getElementById("projects");
      const overflow =
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth;
      const articles = el ? [...el.querySelectorAll("article")] : [];
      return {
        hasProjects: Boolean(el),
        marker: el?.querySelector("header p")?.textContent?.trim() ?? null,
        cards: articles.length,
        repos: el
          ? el.querySelectorAll('a[aria-label^="Repository"]').length
          : 0,
        lives: el
          ? el.querySelectorAll('a[aria-label^="Live demo"]').length
          : 0,
        featuredMarker:
          articles[0]?.querySelector("p")?.textContent?.trim() ?? null,
        overflowX: overflow,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    })()`,
    returnByValue: true,
  });

  setTimeout(() => {
    console.log(JSON.stringify({ logs }, null, 2));
    ws.close();
    process.exit(0);
  }, 3000);
});

ws.addEventListener("message", (ev) => {
  const data = JSON.parse(String(ev.data));
  if (data.method === "Runtime.consoleAPICalled") {
    logs.push({
      type: data.params.type,
      args: (data.params.args || []).map(
        (a) => a.value ?? a.description ?? a.type
      ),
    });
  } else if (data.method === "Runtime.exceptionThrown") {
    logs.push({
      type: "exception",
      text:
        data.params.exceptionDetails?.text ||
        JSON.stringify(data.params.exceptionDetails),
    });
  } else if (data.method === "Log.entryAdded") {
    logs.push({
      type: "log",
      text: data.params.entry?.text,
      level: data.params.entry?.level,
    });
  } else if (data.id && data.result) {
    logs.push({
      type: "evaluate",
      result: data.result.result?.value ?? data.result,
    });
  } else if (data.error) {
    logs.push({ type: "cdp-error", error: data.error });
  }
});

ws.addEventListener("error", (e) => {
  console.error("ws-error", e);
  process.exit(1);
});
