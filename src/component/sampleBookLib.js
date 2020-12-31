import { updateStore, uploadStorage } from '../config';

(typeof window !== 'undefined' ? window : {}).pdfjsWorker =
  require('pdfjs-dist/build/pdf.worker');

console.log(window.pdfjsLib)  
const pdfjsLib = window.pdfjsLib;
pdfjsLib.cMapUrl = "cmaps/";
pdfjsLib.cMapPacked = true;


// ファイル読み込み
const readFileAsync = async (file) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
};
// ファイルプレビュー表示
const renderToPreview = async (fileData, canvasRef, pageNum = 1) => {
  console.log(pdfjsLib)
  pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise.then(async (pdf) => {
    if (pdf.numPages < pageNum) return;
    const page = await pdf.getPage(pageNum)
    const canvas = canvasRef.current
    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: page.getViewport({ scale: 2.09 }),
      transform: [1, 0, 0, 1, 0, 0],
    }).promise
  })
}

// GCPへのアップロード
const uploadImage = ({ canvas, num, page, successCallback }) => {
  // canvasにレンダリングされた画像をファイル化
  const base64 = canvas.toDataURL('image/png')
  const tmp = base64.split(',')
  const data = atob(tmp[1])
  const mime = tmp[0].split(':')[1].split(';')[0]
  const buf = new Uint8Array(data.length);
  const username = sessionStorage.getItem('username');
  for (let i = 0; i < data.length; i++) {
    buf[i] = data.charCodeAt(i)
  }
  const blob = new Blob([buf], { type: mime })
  const imageName = `${username}${!num?'':`-${num}`}-${page}.png`
  const imageFile = new File([blob], imageName, { lastModified: new Date().getTime() })
  uploadStorage(imageFile, imageName, page, successCallback)
}

// 1ページ目をcanvasにレンダリング
const renderCoverToCanvas = async (fileData, canvasRef, num) => {
  const pdf = await pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise
  const page = await pdf.getPage(1)
  const canvas = canvasRef.current
  await page.render({
    canvasContext: canvas.getContext('2d'),
    viewport: page.getViewport({ scale: 2.09 }),
    transform: [1, 0, 0, 1, 0, 0],
  }).promise
  window.setTimeout(async () => {
    uploadImage({ canvas, num, page: 'cover' })
    if (!sessionStorage.PosterSubmittedAt) {
      uploadImage({ canvas, page: 'poster' })
      await await updateStore({ PosterSubmittedAt: new Date().toLocaleString() })
    }
  }, 1500);
}
// Canvasへコンテンツ（表紙以外）書き込み
const renderMainToCanvas = async (fileData, num, canvasRef, setTotalPages, setPage, successCallback) => {
  const pdf = await pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise
  const canvas = canvasRef.current
  const canvasContext = canvas.getContext('2d')
  const renderAndUpload = async (page) => {
    setPage(page)
    if (page > pdf.numPages) {
      await updateStore({
        [`PDF${num || ''}SubmittedAt`]: new Date().toLocaleString(),
        [`totalPages${num || ''}`]: pdf.numPages,
      })
      sessionStorage.setItem(`PDF${num || ''}SubmittedAt`, new Date().toLocaleString())
      sessionStorage.setItem(`totalPages${num || ''}`, pdf.numPages)
      alert("アップロードが完了しました")
      if (successCallback) successCallback()
      return
    }
    renderPageToCanvas(pdf, page, canvasRef, canvasContext); // 左ページ
    window.setTimeout(() => {
      renderPageToCanvas(pdf, page + 1, canvasRef, canvasContext, true) // 右ページ
      window.setTimeout(() => {
        uploadImage({ canvas, num, page: page/2, successCallback: () => {
          renderAndUpload(page + 2)
        }})
      }, 1500);
    }, 1500);
  }
  setTotalPages(pdf.numPages)
  renderAndUpload(2)
}

// Canvasへページ書き込み
const renderPageToCanvas = async (pdf, pageNum, canvasRef, canvasContext, isRight) => {
  if (pageNum > pdf.numPages) return
  const page = await pdf.getPage(pageNum)
  const viewport = page.getViewport({ scale: 2.09 })
  return await page.render({
    canvasContext,
    viewport,
    transform: [1, 0, 0, 1, isRight ? 1240 : 0, 0],
    background: isRight ? 'transparent' : '#FFFFFF',
  }).promise
}

// アップロード済みページのリストを作成
const FIREBASE_ROOT = `${process.env.REACT_APP_FIREBASE_STORAGE_URL}v2%2F`
const getImgUrlList = (pages, num) => {
  const resultlist = [];
  const username = sessionStorage.getItem('username');
  for (let index = 1; index < Math.ceil((pages - 1)/2 + 1); index++) {
    resultlist.push(`${FIREBASE_ROOT}book%2F${username}%2F${username}${!num?'':`-${num}`}-${index}.png?alt=media`)
  }
  return resultlist;
}

const lib = {
  readFileAsync,
  renderToPreview,
  renderCoverToCanvas,
  renderMainToCanvas,
  getImgUrlList,
};

export default lib;
