import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function runCommands(commands, { dryRun = false } = {}) {
  commands.forEach(({ label, cmd, args, input }) => {
    const stdinNote = input ? " < (SQL generated at run time)" : "";
    console.log(`\n[${label}] ${cmd} ${args.join(" ")}${stdinNote}`);
    if (dryRun) {
      return;
    }
    const started = Date.now();
    const stdin = typeof input === "function" ? input() : input;
    const result = spawnSync(cmd, args, {
      stdio: [stdin === undefined ? "inherit" : "pipe", "inherit", "inherit"],
      input: stdin,
      maxBuffer: 1024 * 1024 * 1024,
    });
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

export function capture(cmd, args) {
  const result = spawnSync(cmd, args, {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (result.error) {
    throw new Error(`could not start ${cmd}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} exited with status ${result.status}\n${result.stderr}`,
    );
  }
  return result.stdout;
}

export function captureJson(cmd, args) {
  return JSON.parse(capture(cmd, args));
}
