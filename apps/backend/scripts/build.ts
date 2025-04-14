import { context } from "esbuild";
import { spawn } from "child_process";
import { readFileSync } from "fs";
import { createHash } from "crypto";

let serverProcess: ReturnType<typeof spawn> | null = null;
let lastHash: string | null = null;

////////////////////////////////////////////////////////////////////////////////

async function watch() {
  let ctx = await context({
    entryPoints: ["./src/index.ts"],
    minify: true,
    outfile: "./dist/index.js",
    bundle: true,
    loader: { ".ts": "ts" },
    platform: "node", // Specify Node.js as the target platform
    plugins: [
      {
        name: "rebuild-notify",
        setup(build) {
          build.onEnd((result) => {
            if (result.errors.length === 0) {
              copyPublicFolder(); // Copy public folder after a successful build
              const currentHash = getFileHash("./dist/index.js");
              if (currentHash === lastHash) {
                console.log("⚡ No changes detected. Skipping rebuild.");
                return;
              }
              lastHash = currentHash;
              console.log("✅ Built successfully");
              restartServer(); // Restart the server after a successful build
              return;
            }
            console.error("❌ Rebuild failed:", result.errors);
          });
        },
      },
    ],
  });
  await ctx.watch();
  console.log("Watching...");
}

function restartServer() {
  if (serverProcess) {
    serverProcess.kill(); // Kill the existing server process
    console.log("🔄 Restarting server...");
  }
  serverProcess = spawn("node", ["dist/index.js"], { stdio: "inherit" });
  serverProcess.on("exit", (code) => {
    if (code !== 0) {
      console.error(`❌ Server exited with code ${code}`);
    }
  });
}

function getFileHash(filePath: string): string {
  try {
    const fileContent = readFileSync(filePath);
    return createHash("sha256").update(fileContent).digest("hex");
  } catch (error) {
    return ""; // Return an empty hash if the file doesn't exist
  }
}

function copyPublicFolder() {
  const fs = require("fs-extra");
  fs.copySync("./src/public", "./dist/public", { overwrite: true });
  console.log("✅ Copied public folder to dist");
}

////////////////////////////////////////////////////////////////////////////////

// IMPORTANT: this call MUST NOT have an `await`.
watch();
