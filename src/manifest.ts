import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/lexin-tool-icon.png',
    32: 'img/lexin-tool-icon.png',
    48: 'img/lexin-tool-icon.png',
    128: 'img/lexin-tool-icon.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/lexin-tool-icon.png',
  },
  options_page: 'options.html',
  devtools_page: 'devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.ts'],
      run_at: 'document_start',
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png', 'img/lexin-tool-icon.png', 'img/*'],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage', 'activeTab']
})
