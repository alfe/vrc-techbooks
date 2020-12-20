import React from 'react'
import styled from 'styled-components'
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
import { uploadStorage } from '../config';
import lib from './sampleBookLib';

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
const FIREBASE_ROOT = `${process.env.REACT_APP_FIREBASE_STORAGE_URL}v2%2F`

const SampleBookInput = ({ num='', PDFSubmittedAt, uploadedPages }) => {
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
    const file = await lib.readFileAsync(e.target.files[0])
    setPdf(file)
    lib.renderToPreview(file, page1Ref, 1)
    lib.renderToPreview(file, page2Ref, 2)
    lib.renderToPreview(file, page3Ref, 3)
  }
  const onClickOpenUploadDialog = () => {
    setOpen(true)
    lib.renderToPreview(pdfFile, coverRef, 1)
    lib.renderToPreview(pdfFile, canvasRef, 2)
  }
  const onSubmitToUpload = () => {
    setModal(true)
    uploadStorage(pdfFile, `${username}${!num ? '' : `-${num}` }.pdf`, 'pdf')
    lib.renderCoverToCanvas(pdfFile, coverRef, num)
    lib.renderMainToCanvas(pdfFile, num, canvasRef, setTotalPages, setPage, () => {
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
              <img src={`${FIREBASE_ROOT}cover%2F${sessionStorage.getItem('username')}-cover.png?alt=media`} alt="cover.png"/>
              {lib.getImgUrlList(uploadedPages, num).map((url, i) => (
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
export default SampleBookInput;

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
