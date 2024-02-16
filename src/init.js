// https://github.com/vitejs/vite/discussions/2785#discussioncomment-3579481
import { Buffer } from "buffer/";

window.Buffer = Buffer;

// https://stackoverflow.com/questions/72114775/vite-global-is-not-defined
window.global ||= window;
