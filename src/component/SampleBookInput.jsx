import React from 'react'
import styled from 'styled-components'
import pdfjsLib from 'pdfjs-dist'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { updateStore, uploadStorage } from '../config';

(typeof window !== 'undefined' ? window : {}).pdfjsWorker =
  require('pdfjs-dist/build/pdf.worker');

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default {}
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
const renderToPreview = async (fileData, canvasRef, pageNum = 1) => {
  const pdf = await pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise
  if (pdf.numPages < pageNum) return;
  const page = await pdf.getPage(pageNum)
  const canvas = canvasRef.current
  await page.render({
    canvasContext: canvas.getContext('2d'),
    viewport: page.getViewport({ scale: 2.09 }),
    transform: [1, 0, 0, 1, 0, 0],
  }).promise
}

const renderCoverToCanvas = async (fileData, canvasRef, num) => {
  const pdf = await pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise
  // 1ページ目をcanvasにレンダリング

  const page = await pdf.getPage(1)
  const canvas = canvasRef.current
  await page.render({
    canvasContext: canvas.getContext('2d'),
    viewport: page.getViewport({ scale: 2.09 }),
    transform: [1, 0, 0, 1, 0, 0],
  }).promise
  uploadImage({ canvas, num, page: 'cover' })
  if (!sessionStorage.PosterSubmittedAt) {
    uploadImage({ canvas, page: 'poster' })
    await await updateStore({ PosterSubmittedAt: new Date().toLocaleString() })
  }
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
  uploadStorage(imageFile, imageName, successCallback)
}

// アップロード済みページのリストを作成
const getimgurlList = (pages, num) => {
  const resultlist = [];
  const username = sessionStorage.getItem('username');
  for (let index = 1; index < Math.ceil((pages - 1)/2 + 1); index++) {
    resultlist.push(`${process.env.REACT_APP_FIREBASE_STORAGE_URL}${username}%2F${username}${!num?'':`-${num}`}-${index}.png?alt=media`)
  }
  return resultlist;
}

export const SampleBookInput = ({ num='', PDFSubmittedAt, uploadedPages }) => {
  const [pdfFile, setPdf] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  const [currentPage, setPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)
  const page1Ref = React.useRef(null)
  const page2Ref = React.useRef(null)
  const page3Ref = React.useRef(null)
  const coverRef = React.useRef(null)
  const canvasRef = React.useRef(null)
  const username = sessionStorage.getItem('username');

  const onChangeBook = async (e) => {
    if (!e.target.files[0]) return
    const file = await readFileAsync(e.target.files[0])
    setPdf(file)
    renderToPreview(file, page1Ref, 1)
    renderToPreview(file, page2Ref, 2)
    renderToPreview(file, page3Ref, 3)
  }
  const onClickOpenUploadDialog = () => {
    setOpen(true)
    renderToPreview(pdfFile, coverRef, 1)
    renderToPreview(pdfFile, canvasRef, 2)
  }
  const onSubmitToUpload = () => {
    setModal(true)
    uploadStorage(pdfFile, `${username}${!num ? '' : `-${num}` }.pdf`)
    renderCoverToCanvas(pdfFile, coverRef, num)
    renderMainToCanvas(pdfFile, num, canvasRef, setTotalPages, setPage, () => {
      setOpen(false)
      setModal(false)
      setPage(0)
    })
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <BoxInput>
        <input
          id={`samplebook${num}`}
          className="box__file"
          type="file"
          accept="application/pdf"
          onChange={onChangeBook} />
        {/* 初期状態 */}
        {!pdfFile && !PDFSubmittedAt && <label htmlFor={`samplebook${num}`}>PDF: A4(297 x 210)</label>}

        {/* アップロード済 */}
        {!pdfFile && PDFSubmittedAt && (
          <React.Fragment>
            <CanvasBox>
              <img src={`${process.env.REACT_APP_FIREBASE_STORAGE_URL}${username}%2F${username}${!num?'':`-${num}`}-cover.png?alt=media`} alt="cover.png"/>
              {getimgurlList(uploadedPages, num).map((url, i) => (
                <img key={`imgurl-${url}`} src={url} alt={`${i}.png`}/>
              ))}
            </CanvasBox>
            <label htmlFor={`samplebook${num}`} className="box__file__reupload">再アップロード[A4(1240×1754)]</label>
          </React.Fragment>
        )}

        {/* 新規アップロード */}
        {pdfFile && (
          <React.Fragment>
            <CanvasBox>
              <canvas height="1754" width="1240" ref={page1Ref} />
              <canvas height="1754" width="1240" ref={page2Ref} />
              <canvas height="1754" width="1240" ref={page3Ref} />
            </CanvasBox>
            <label htmlFor={`samplebook${num}`} className="box__file__reupload">再アップロード[A4(1240×1754)]</label>
          </React.Fragment>
        )}
        <Button disabled={!pdfFile} variant="contained" color="primary" onClick={onClickOpenUploadDialog}>
          アップロード
        </Button>
      </BoxInput>

      {/* アップロードダイアログ */}
      <Dialog fullWidth maxWidth="md" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>見本誌をアップロード</DialogTitle>
        <DialogContent>
          <DialogContentText>
            見本誌をVRCで表示できる形式に変換してアップロードします
          </DialogContentText>
          <CanvasBox>
            <canvas id="preview-cover-pdf" height="1754" width="1240" ref={coverRef} />
            <canvas id="preview-pdf" height="1754" width="2480" ref={canvasRef} />
          </CanvasBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
          <Button variant="contained" color="primary"
            onClick={onSubmitToUpload} disabled={currentPage !== 0} >
            アップロード
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        className={classes.modal}
        BackdropProps={{ timeout: 500 }}>
        <Fade in={modal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">アップロード中</h2>
            <p id="transition-modal-description">{currentPage} / {totalPages}</p>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

const BoxInput = styled.div`
  && {
  }
  label {
    display: block;
    padding: 4rem 0;
    text-align: center;
    background: #F0F0F0;
    border: 1px solid #8E8E8E;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    font-size: 3rem;
    color: rgba(0,0,0,0.5);
  }
  label.box__file__reupload {
    padding: .5rem;
    background: none;
    border: none;
    text-align: right;
    cursor: pointer;
    font-size: 1rem;
  }
  img {
    margin: auto;
    height: 340px;
    display: block;
    padding: 10px 96px;
    background: #F0F0F0;
    border: 1px solid #8E8E8E;
    border-radius: 5px;
  }
  .box__file {
    display: none;
  }
`;
const CanvasBox = styled.div`
  && {
    zoom: 0.3;
    display: flex;
    overflow-x: auto;
  }
  && > canvas {
    height: 1754px;
    width: 1240px;
  }
  #preview-pdf {
    height: 1754px;
    width: 2480px;
    border-left: 2px solid #aaa;
  }
  img {
    padding: 4px;
    height: initial;
  }
`;
