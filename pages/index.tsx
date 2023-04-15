import QRCodeGenerator from "@/components/QRCodeGenerator"
import {useState, useEffect} from 'react'
import useDebounce from '@/hooks/useDebounce';
import Head from "next/head";

export default function Home() {
  const [textToPass, setTextToPass] = useState<string>('')
  const debounceValue = useDebounce<string>(textToPass, 500)

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTextToPass(e.currentTarget.value);
  }

  const download = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const qrCodeURL = document.getElementById('generatedQRCode') as HTMLCanvasElement;
    const pngUrl = qrCodeURL
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <>
      <Head>
        <title>QR Code Generator</title>
      </Head>
      <main className="flex justify-center items-center h-screen m-auto">
        <div className="card text-white rounded-3xl w-1/5 drop-shadow-2xl min-w-fit">
          <QRCodeGenerator textToQR={debounceValue}/>
          <h3 className="cardBoldText font-bold text-center text-lg pb-5 px-3">
            Turn your Text into a QR Code.
          </h3>
          <input type="text" name="userInput" id="userInput" value={textToPass} onChange={onChange} className="text-black w-full p-2 text-center" placeholder="Enter Text or Link Here."/>
          <p className="cardNormalText font-normal text-center m-3">
            Scan the QR code to visit<br/>the link or view the text.
          </p>
        </div>
        <button onClick={download}>Download</button>
      </main>
    </>
  )
}
