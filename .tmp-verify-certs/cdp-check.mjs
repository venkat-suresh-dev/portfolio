const list = await (await fetch("http://127.0.0.1:9229/json/list")).json();
const page = list.find((t) => t.type === "page" && t.url.includes("localhost:3001"));
if (!page) {
  // open fresh via /json/new
  const created = await (
    await fetch("http://127.0.0.1:9229/json/new?http://localhost:3001/", {
      method: "PUT",
    })
  ).json();
  await run(created.webSocketDebuggerUrl);
} else {
  await run(page.webSocketDebuggerUrl);
}

async function run(wsUrl) {
  const logs = [];
  let id = 0;
  const ws = new WebSocket(wsUrl);
  const send = (method, params = {}) => {
    ws.send(JSON.stringify({ id: ++id, method, params }));
    return id;
  };

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });

  send("Runtime.enable");
  send("Log.enable");
  send("Console.enable");
  send("Page.enable");
  send("Page.reload", { ignoreCache: true });

  await new Promise((r) => setTimeout(r, 2500));

  send("Runtime.evaluate", {
    expression: `(() => {
      const el = document.getElementById("certifications");
      const cards = el ? [...el.querySelectorAll("article")] : [];
      const linked = cards.filter((c) => c.dataset.interactive === "true");
      const staticCards = cards.filter((c) => c.dataset.interactive === "false");
      const html = document.documentElement;
      const cs = getComputedStyle(html);
      return {
        hasSection: Boolean(el),
        marker: el?.querySelector("header p")?.textContent?.trim() ?? null,
        cards: cards.length,
        linked: linked.length,
        static: staticCards.length,
        viewLinks: el
          ? el.querySelectorAll('a[aria-label^="View credential"]').length
          : 0,
        overflowX:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        scrollbarWidth: cs.scrollbarWidth,
        scrollbarColor: cs.scrollbarColor,
        amberInCerts: el
          ? [...el.querySelectorAll("*")].some((node) => {
              const s = getComputedStyle(node);
              return (
                s.color.includes("251, 191, 36") ||
                s.backgroundColor.includes("251, 191, 36") ||
                (s.borderColor || "").includes("251, 191, 36")
              );
            })
          : null,
      };
    })()`,
    returnByValue: true,
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
        text: data.params.exceptionDetails?.text,
      });
    } else if (data.id && data.result?.result) {
      logs.push({ type: "evaluate", result: data.result.result.value });
    }
  });

  await new Promise((r) => setTimeout(r, 1500));
  console.log(JSON.stringify({ logs }, null, 2));
  ws.close();
}
