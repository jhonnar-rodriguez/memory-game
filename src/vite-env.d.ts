/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CARDS_BASE_URL: string;
  readonly VITE_CARDS_PER_PAGE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
