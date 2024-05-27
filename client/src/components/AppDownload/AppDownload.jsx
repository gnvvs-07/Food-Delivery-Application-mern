import "./AppDownload.css"
import { assets } from '../../assets/assets'
export default function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
        <p>download app <br /> Tomato</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}
