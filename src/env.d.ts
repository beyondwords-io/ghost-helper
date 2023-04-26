/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLAYER_SRC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
