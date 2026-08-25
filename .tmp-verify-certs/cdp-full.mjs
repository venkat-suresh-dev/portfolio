const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const { spawn } = await import("node:child_process");
const { mkdtempSync } = await import("node:fs");
const { tmpdir } = await import("node:os");
const { join } = await import("node:path");

const profile = mkdtempSync(join(tmpdir(), "certs-cdp-"));
const port = 9334;
const child = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

await new Promise((r) => setTimeout(r, 1500));

const created = await (
  await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:3001/`, {
    method: "PUT",
  })
).json();

const logs = [];
let id = 0;
const ws = new WebSocket(created.webSocketDebuggerUrl);
const send = (method, params = {}) => {
  ws.send(JSON.stringify({ id: ++id, method, params }));
};

await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve);
  ws.addEventListener("error", reject);
});

ws.addEventListener("message", (ev) => {
  const data = JSON.parse(String(ev.data));
  if (data.method === "Runtime.consoleAPICalled") {
    logs.push({
      kind: "console",
      type: data.params.type,
      args: (data.params.args || []).map(
        (a) => a.value ?? a.description ?? a.type
      ),
    });
  } else if (data.method === "Runtime.exceptionThrown") {
    logs.push({
      kind: "exception",
      text: data.params.exceptionDetails?.text,
    });
  } else if (data.id && data.result?.result?.value !== undefined) {
    logs.push({ kind: "evaluate", result: data.result.result.value });
  }
});

send("Runtime.enable");
send("Log.enable");
send("Console.enable");
send("Page.enable");

await new Promise((r) => setTimeout(r, 2500));

send("Runtime.evaluate", {
  expression: `(() => {
    const el = document.getElementById("certifications");
    const cards = [...(el?.querySelectorAll("article") || [])];
    return {
      marker: el?.querySelector("header p")?.textContent?.trim() ?? null,
      cards: cards.length,
      linked: cards.filter((c) => c.dataset.interactive === "true").length,
      static: cards.filter((c) => c.dataset.interactive === "false").length,
      viewLinks: el?.querySelectorAll('a[aria-label^="View credential"]').length ?? 0,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      contactPlaceholder: Boolean(document.getElementById("contact")),
      scrollbarWidth: getComputedStyle(document.documentElement).scrollbarWidth,
      scrollbarColor: getComputedStyle(document.documentElement).scrollbarColor,
    };
  })()`,
  returnByValue: true,
});

await new Promise((r) => setTimeout(r, 800));

send("Page.navigate", { url: "http://localhost:3001/theme-preview" });
await new Promise((r) => setTimeout(r, 2000));

send("Runtime.evaluate", {
  expression: `({
    path: location.pathname,
    ok: Boolean(document.body),
    scrollbarWidth: getComputedStyle(document.documentElement).scrollbarWidth,
  })`,
  returnByValue: true,
});

await new Promise((r) => setTimeout(r, 800));

const consoleLogs = logs.filter(
  (l) => l.kind === "console" || l.kind === "exception"
);
const noisy = (args) => {
  const text = String(args?.[0] || "");
  return (
    text.includes("Download the React DevTools") ||
    text.includes("[HMR]") ||
    text.includes("[Fast Refresh]")
  );
};

console.log(
  JSON.stringify(
    {
      console: consoleLogs,
      unexpected: consoleLogs.filter(
        (l) =>
          l.kind === "exception" ||
          (l.kind === "console" &&
            (l.type === "error" || l.type === "warning") &&
            !noisy(l.args))
      ),
      evaluates: logs.filter((l) => l.kind === "evaluate"),
    },
    null,
    2
  )
);

ws.close();
child.kill();
process.exit(0);
