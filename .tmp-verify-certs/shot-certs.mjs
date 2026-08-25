const chromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const { spawn } = await import("node:child_process");
const { mkdtempSync, writeFileSync, copyFileSync } = await import("node:fs");
const { tmpdir } = await import("node:os");
const { join } = await import("node:path");

const profile = mkdtempSync(join(tmpdir(), "certs-shot-"));
const port = 9335;
const child = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--window-size=1440,900",
    "about:blank",
  ],
  { stdio: "ignore" }
);

await new Promise((r) => setTimeout(r, 1500));
const created = await (
  await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:3001/#certifications`, {
    method: "PUT",
  })
).json();

let id = 0;
const ws = new WebSocket(created.webSocketDebuggerUrl);
const send = (method, params = {}) =>
  ws.send(JSON.stringify({ id: ++id, method, params }));

const waitMsg = (matchId) =>
  new Promise((resolve) => {
    const handler = (ev) => {
      const data = JSON.parse(String(ev.data));
      if (data.id === matchId) {
        ws.removeEventListener("message", handler);
        resolve(data);
      }
    };
    ws.addEventListener("message", handler);
  });

await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve);
  ws.addEventListener("error", reject);
});

send("Page.enable");
send("Runtime.enable");
await new Promise((r) => setTimeout(r, 2000));

const evalId = ++id;
ws.send(
  JSON.stringify({
    id: evalId,
    method: "Runtime.evaluate",
    params: {
      expression: `(() => {
        const el = document.getElementById("certifications");
        el?.scrollIntoView({ block: "start" });
        const r = el.getBoundingClientRect();
        return {
          y: Math.max(0, window.scrollY + r.top - 24),
          height: Math.ceil(r.height + 48),
          width: Math.ceil(document.documentElement.clientWidth),
        };
      })()`,
      returnByValue: true,
    },
  })
);

const evalResult = await waitMsg(evalId);
const metrics = evalResult.result.result.value;

const clipId = ++id;
ws.send(
  JSON.stringify({
    id: clipId,
    method: "Page.captureScreenshot",
    params: {
      format: "png",
      clip: {
        x: 0,
        y: metrics.y,
        width: metrics.width,
        height: Math.min(metrics.height, 1400),
        scale: 1,
      },
      fromSurface: true,
    },
  })
);

const shot = await waitMsg(clipId);
const destDir =
  "C:\\Users\\venkataramanan\\Downloads\\Portfolio\\portfolio\\.tmp-verify-certs";
const out = join(destDir, "certifications-desktop.png");
writeFileSync(out, Buffer.from(shot.result.data, "base64"));

// mobile clip
send("Emulation.setDeviceMetricsOverride", {
  width: 375,
  height: 812,
  deviceScaleFactor: 1,
  mobile: true,
});
await new Promise((r) => setTimeout(r, 500));
send("Page.reload", { ignoreCache: true });
await new Promise((r) => setTimeout(r, 2500));

const evalId2 = ++id;
ws.send(
  JSON.stringify({
    id: evalId2,
    method: "Runtime.evaluate",
    params: {
      expression: `(() => {
        const el = document.getElementById("certifications");
        el?.scrollIntoView({ block: "start" });
        const r = el.getBoundingClientRect();
        return {
          y: Math.max(0, window.scrollY + r.top - 16),
          height: Math.ceil(r.height + 32),
          width: Math.ceil(document.documentElement.clientWidth),
        };
      })()`,
      returnByValue: true,
    },
  })
);
const metrics2 = (await waitMsg(evalId2)).result.result.value;
const clipId2 = ++id;
ws.send(
  JSON.stringify({
    id: clipId2,
    method: "Page.captureScreenshot",
    params: {
      format: "png",
      clip: {
        x: 0,
        y: metrics2.y,
        width: metrics2.width,
        height: Math.min(metrics2.height, 2200),
        scale: 1,
      },
      fromSurface: true,
    },
  })
);
const shot2 = await waitMsg(clipId2);
writeFileSync(
  join(destDir, "certifications-mobile.png"),
  Buffer.from(shot2.result.data, "base64")
);

console.log(
  JSON.stringify({ desktop: metrics, mobile: metrics2, out }, null, 2)
);
ws.close();
child.kill();
process.exit(0);
