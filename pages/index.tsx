import QRCodeGenerator from "@/components/QRCodeGenerator";
import useDebounce from '@/hooks/useDebounce';
import Head from "next/head";
import { useState } from 'react';

export default function Home() {
  const [textToPass, setTextToPass] = useState<string>('')
  const debounceValue = useDebounce<string>(textToPass, 500)

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTextToPass(e.currentTarget.value);
  }

  const downloadQRCode = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const qrCodeURL = document.getElementById('generatedQRCode') as HTMLCanvasElement;
    const pngUrl = qrCodeURL
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <>
      <Head>
        <title>QR Code Generator</title>
        <meta name="description" content="Web App for Transforming any form of Text into a QR Code that can download" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="QR Code, Text To QR, Generate QR Code"/>
        <meta name="robots" content="follow"/>
      </Head>
      <main className="flex justify-center items-center h-screen m-auto min-w-fit">
        <div className="card text-white rounded-3xl w-1/5 drop-shadow-2xl min-w-fit">
          <QRCodeGenerator textToQR={debounceValue}/>
          <h3 className="cardBoldText font-bold text-center text-lg pb-5 px-3">
            Turn your Text into a QR Code.
          </h3>
          <input type="text" name="userInput" id="userInput" value={textToPass} onChange={onChange} className="text-black w-full p-2 text-center" placeholder="Enter Text or Link Here."/>
          <p className="cardNormalText font-normal text-center m-3">
            Scan the QR code to visit<br/>the link or view the text.
          </p>
          <button onClick={downloadQRCode} className="block m-3 p-2 border-2 mx-auto rounded-lg w-60">Download</button>
        </div>
      </main>
      <footer>
        <p className="w-full text-center -mt-10">
          Designed by <a href="http://frontendmentor.com/">FRONTENDMENTOR</a>, Coded by <a href="https://github.com/JamesRomero2">JAMES ROMERO</a>
        </p>
      </footer>
    </>
  )
}
