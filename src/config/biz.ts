export const TOOLS: ReadonlyArray<{name: string; icon: string; desc: string; [propertyName: string]: any}> = [
  {
    name: 'imgkit',
    title: '图片处理工具',
    icon: 'img',
    desc: '捕捉、压缩、上传',
    component: 'ImgKit',
  },
  {
    name: 'translatekit',
    title: '图片资源工具',
    icon: 'translate',
    desc: '翻译',
    component: 'Translate',
  },
  {
    name: 'ocrkit',
    title: '图片资源工具',
    icon: 'ocr',
    desc: '识别图片文字',
    component: 'Ocr',
  },
  {
    name: 'voicekit',
    title: '语音合成',
    icon: 'voice',
    desc: '文字转语音',
    component: 'Tts',
  }
];
