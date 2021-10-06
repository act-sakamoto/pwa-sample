import { BrowserMultiFormatOneDReader, IScannerControls } from "@zxing/browser"
// import { Result } from '@zxing/library'
import { useRef, useEffect, useState } from 'react';

export const QrCodeReader  = () => {
    const codeReader = useRef(new BrowserMultiFormatOneDReader())
    const controlsRef = useRef<IScannerControls|null>()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [barcode, setBarcode] = useState<string>('読み取り中...'); 

  useEffect(() => {
    if (!videoRef.current) {
      return 
    }
    codeReader.current.decodeFromVideoDevice(
      undefined, 
      videoRef.current, 
      (result, error, controls) => {
        if (error) {
          return
        }
        if (result) {
//          props.onReadQRCode(result)
            console.log(result)
            setBarcode(result.getText())
        }
        controlsRef.current = controls
      })
    return () => {
      if (!controlsRef.current) {
        return
      }
      
      controlsRef.current.stop()
      controlsRef.current = null
    }
  }, [])

  return (
  <div>
    <video
      style={{ maxWidth: "100%", maxHeight: "100%",height:"100%" }}
      ref={videoRef}
    />
    <p>{barcode}</p>
  </div>
  );

}