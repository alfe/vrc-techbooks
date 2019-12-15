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
const renderToPreview = async (fileData, canvasRef, pageNum) => {
  const pdf = await pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise
  const page = await pdf.getPage(pageNum)
  const canvas = canvasRef.current
  await page.render({
    canvasContext: canvas.getContext('2d'),
    viewport: page.getViewport({ scale: 1 }),
    transform: [1, 0, 0, 1, 0, 0],
  }).promise
}

const renderCoverToCanvas = async (fileData, canvasRef) => {
  const pdf = await pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise
  // 1ページ目をcanvasにレンダリング

  const page = await pdf.getPage(1)
  const canvas = canvasRef.current
  await page.render({
    canvasContext: canvas.getContext('2d'),
    viewport: page.getViewport({ scale: 1 }),
    transform: [1, 0, 0, 1, 0, 0],
  }).promise
  uploadImage({ canvas, index: 0, page: 'cover' })

  // for bk cover
  // window.setTimeout(async () => {
  //   const page = await pdf.getPage(pdf.numPages)
  //   const canvas = canvasRef.current
  //   await page.render({
  //     canvasContext: canvas.getContext('2d'),
  //     viewport: page.getViewport({ scale: 1 }),
  //     transform: [1, 0, 0, 1, 0, 0],
  //   }).promise
  //   uploadImage({ canvas, index: 0, page: 'bkcover' })
  // }, 300);

  // window.setTimeout(async () => {
  //   const page = await pdf.getPage(1)
  //   const canvas = canvasRef.current
  //   await page.render({
  //     canvasContext: canvas.getContext('2d'),
  //     viewport: page.getViewport({ scale: 1 }),
  //     transform: [1, 0, 0, 1, 0, 0],
  //   }).promise
  // }, 1000);
}

// Canvasへコンテンツ（表紙以外）書き込み
const renderMainToCanvas = async (fileData, canvasRef, setTotalPages, setPage, successCallback) => {
  const pdf = await pdfjsLib.getDocument({ data: fileData, cMapUrl: '/cmaps/', cMapPacked: true }).promise
  const canvas = canvasRef.current
  const canvasContext = canvas.getContext('2d')
  const renderAndUpload = (page) => {
    setPage(page)
    if (page > pdf.numPages) {
      updateStore({
        sampleSubmittedAt: new Date().toLocaleString(),
        totalPages: pdf.numPages,
      })
      alert("アップロードが完了しました")
      if (successCallback) successCallback()
      return
    }
    renderPageToCanvas(pdf, page, canvasRef, canvasContext);
    window.setTimeout(() => {
      renderPageToCanvas(pdf, page + 1, canvasRef, canvasContext, true)
      window.setTimeout(() => {
        uploadImage({ canvas, index: 0, page: page/2, successCallback: () => {
          renderAndUpload(page + 2)
        }})
      }, 300);
    }, 300);
  }
  setTotalPages(pdf.numPages - 1)
  renderAndUpload(2)
}

// Canvasへページ書き込み
const renderPageToCanvas = async (pdf, pageNum, canvasRef, canvasContext, isRight) => {
  if (pageNum > pdf.numPages) return
  const page = await pdf.getPage(pageNum)
  const viewport = page.getViewport({ scale: 1 })
  return await page.render({
    canvasContext,
    viewport,
    transform: [1, 0, 0, 1, isRight ? 595 : 0, 0],
    background: isRight ? 'transparent' : '#FFFFFF',
  }).promise
}

// GCPへのアップロード
const uploadImage = ({ canvas, index, page, successCallback }) => {
  // canvasにレンダリングされた画像をファイル化
  const base64 = canvas.toDataURL('image/png')
  const tmp = base64.split(',')
  const data = atob(tmp[1])
  const mime = tmp[0].split(':')[1].split(';')[0]
  const buf = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    buf[i] = data.charCodeAt(i)
  }
  const blob = new Blob([buf], { type: mime })
  const imageName = `${sessionStorage.getItem('username')}-${index}-${page}.png`
  const imageFile = new File([blob], imageName, {
    lastModified: new Date().getTime(),
  })
  uploadStorage(imageFile, imageName, successCallback)
}

export const SampleBookInput = () => {
  const [pdfFile, setPdf] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  const [currentPage, setPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)
  // const [hasBkCover, setBkCover] = React.useState(true)
  const page1Ref = React.useRef(null)
  const page2Ref = React.useRef(null)
  const page3Ref = React.useRef(null)
  const coverRef = React.useRef(null)
  const canvasRef = React.useRef(null)

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
    renderCoverToCanvas(pdfFile, coverRef)
    renderMainToCanvas(pdfFile, canvasRef, setTotalPages, setPage, () => {
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
          id="samplebook"
          className="box__file"
          type="file"
          accept="application/pdf"
          onChange={onChangeBook} />
        {!pdfFile && <label htmlFor="samplebook">PDF: A4(595×842)</label>}

        {pdfFile && (
        <CanvasBox>
          <canvas height="842" width="595" ref={page1Ref} />
          <canvas height="842" width="595" ref={page2Ref} />
          <canvas height="842" width="595" ref={page3Ref} />
        </CanvasBox>)}
        {pdfFile && <label htmlFor="samplebook" className="box__file__reupload">再アップロード[A4(595×842)]</label>}
        <Button disabled={!pdfFile} variant="contained" color="primary" onClick={onClickOpenUploadDialog}>
          アップロード
        </Button>
      </BoxInput>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>見本誌をアップロード</DialogTitle>
        <DialogContent>
          <DialogContentText>
            見本誌をVRCで表示できる形式に変換してアップロードします
          </DialogContentText>
          {/* <form noValidate>
            <FormControlLabel
              control={
                <Switch checked={hasBkCover} onChange={() => setBkCover(!hasBkCover)} value="hasBkCover" />
              }
              label="最終ページが裏表紙"
            />
          </form> */}
          <CanvasBox>
            <canvas id="preview-cover-pdf" height="842" width="595" ref={coverRef} />
            <canvas id="preview-pdf" height="842" width="1190" ref={canvasRef} />
          </CanvasBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
          <Button
            onClick={onSubmitToUpload} disabled={currentPage !== 0}
            variant="contained" color="primary">
            アップロード
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        className={classes.modal}
        BackdropProps={{
          timeout: 500,
        }}
      >
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
    zoom: 0.5;
    display: flex;
    overflow-x: auto;
  }
  && > canvas {
    height: 842px;
    width: 595px;
  }
  #preview-pdf {
    height: 842px;
    width: 1190px;
    border-left: 2px solid #aaa;
  }
`;
