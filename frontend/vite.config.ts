import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    assetsInclude: ["src/assets/*.*"],
    plugins: [solidPlugin()],
    server: {
        port: 3000,
    },
    build: {
        target: "esnext",
    },
});
