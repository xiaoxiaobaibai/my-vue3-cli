import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve, join, dirname } from "path";
import { readdirSync } from "fs";
import viteCompression from "vite-plugin-compression";
import { fileURLToPath, URL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const project_pages = {};
const entryPath = resolve(__dirname, "./src/pages");
const entrys = readdirSync(entryPath).reduce((obj, dirname) => {
  obj[dirname] = join(entryPath, dirname);
  return obj;
}, {});

Object.keys(entrys).forEach((pageName) => {
  project_pages[pageName] = resolve(
    __dirname,
    `src/pages/${pageName}/index.html`
  );
});

console.log(123456, project_pages)
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let pages = {};
  const env = loadEnv(mode, process.cwd());
  pages = { ...project_pages };

  return {
    root: env.VITE_APP_ROOTPATH,
    plugins: [
      vue(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".vue", ".json"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "localhost",
      port: 5238,
      open: false,
      https: false,
      proxy: {},
    },
    build: {
      rollupOptions: {
        input: pages,
        output: { dir: "./dist" },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
