import {QRCodeCanvas} from "qrcode.react"

type textToPass = {
  textToQR: string
}

const QRCodeGenerator = ({textToQR}: textToPass) => {
  return (
    <div className="bg-white rounded-3xl w-fit mx-auto my-5">
      <QRCodeCanvas value={textToQR} className="mx-auto p-5" id="generatedQRCode" size={200} level="H"/>
    </div>
  )
}

export default QRCodeGenerator;