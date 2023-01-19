import React from 'react'
import { WhiteIconButton } from '../../../styles/globals/formularios';

const DownloadQRButton = ({ nombreTest, destinatarios }) => {
  function downloadSVGAsPNG(e){
    const canvas = document.createElement("canvas");
    const svg = document.getElementById("QRCode");
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const QRw = 400;
    const QRh = 400;
    const img_to_download = document.createElement('img');
    img_to_download.src = 'data:image/svg+xml;base64,' + base64doc;
    img_to_download.onload = function () {
      canvas.setAttribute('width', QRw);
      canvas.setAttribute('height', QRh);
      const context = canvas.getContext("2d");
      context.drawImage(img_to_download,0,0,QRw,QRh);
      const dataURL = canvas.toDataURL('image/png');
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
        e.preventDefault();
      } else {
        const a = document.createElement('a');
        const my_evt = new MouseEvent('click');
        a.download = `${nombreTest.replaceAll(" ", "_")}_${destinatarios}_QR.png`;
        a.href = dataURL;
        a.dispatchEvent(my_evt);
      }
    }  
  }

  return (
    <WhiteIconButton title="Descargar QR" onClick={downloadSVGAsPNG}>
      <i className="fa-regular fa-floppy-disk"></i>
    </WhiteIconButton>
  )
}

export default DownloadQRButton