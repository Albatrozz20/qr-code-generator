import { useState } from 'react'
import './qrcode.css'
const QrCode = () => {
    const [img, setImg] = useState("./images/sample.png");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    async function generateQR()
    {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
            setImg(url);
        }
        catch (error) {
            console.log(error)
        }
        finally
        {
            setLoading(false);
        }
    }
    function downloadQR()
    {
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.log("Error downloading QR Code", error);
        });
    }
  return (
    <div className='app-container'>
        <div className='row w-100'>
            <div className='col-md-6 p-4 align'>
                <br />
                <h1 className='proj-title'>QR Code Generator</h1>
                <br />
                <div className="data-input">
                <input type="text" id='input-data' placeholder='Data for QR Code' value={data} onChange={(e)=>setData(e.target.value)} />
                </div>
                <br />
                <div className="buttons">
                    <button className='gen' onClick={() => generateQR()}
                        disabled={loading}>Generate QR Code</button>
                    <button className='dow'  onClick={() =>downloadQR()}>Download QR Code</button>
                </div>
                <br />
                <footer>
                    <h6>Designed by <i className='name'>Albatrozz</i></h6>
                </footer>
            </div>
            <div className="col-md-6 p-4 pic-align">
            {loading && <p>Please wait while loading ...</p>}
                <br />
                {img && <img className='logo' src={img} alt="QR Code" />}
            </div>
        </div>
    </div>
  )
}

export default QrCode