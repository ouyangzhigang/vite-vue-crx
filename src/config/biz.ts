export const TOOLS: ReadonlyArray<{name: string; icon: string; desc: string; [propertyName: string]: any}> = [
  {
    name: '图片资源工具',
    icon: 'img',
    desc: '图片自动化抓取、压缩、上传至CDN',
    component: 'ImgKit',
  },
  {
    name: '翻译',
    icon: 'translate',
    desc: '翻译',
    component: 'Translate',
  },
  {
    name: '图片识别',
    icon: 'ocr',
    desc: '识别图片文字',
    component: 'Ocr',
  },
  {
    name: '语音合成',
    icon: 'voice',
    desc: '文字转语音',
    component: 'Tts',
  }
];
