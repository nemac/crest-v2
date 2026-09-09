import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function runCommands(commands, { dryRun = false } = {}) {
  commands.forEach(({ label, cmd, args }) => {
    console.log(`\n[${label}] ${cmd} ${args.join(" ")}`);
    if (dryRun) {
      return;
    }
    const started = Date.now();
    const result = spawnSync(cmd, args, { stdio: "inherit" });
    if (result.error) {
      throw new Error(
        `[${label}] could not start ${cmd}: ${result.error.message}`,
      );
    }
    if (result.status !== 0) {
      throw new Error(`[${label}] ${cmd} exited with status ${result.status}`);
    }
    console.log(
      `[${label}] done in ${((Date.now() - started) / 1000).toFixed(1)}s`,
    );
  });
}

export function captureJson(cmd, args) {
  const result = spawnSync(cmd, args, {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} exited with status ${result.status}\n${result.stderr}`,
    );
  }
  return JSON.parse(result.stdout);
}
