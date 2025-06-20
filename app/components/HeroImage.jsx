import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroImage = () => {

    const imgStyle = "w-40 rounded-2xl";
    const imgDiv = 'flex flex-col items-center gap-2 text-center';
    const h1Style = 'text-lg text-amber-500 font-bold';
    const pStyle = 'w-40 text-lg  p-1 text-gray-300 align-center';

    return (
        
        
        <div className="w-6xl flex flex-row gap-8 justify-around items-center">
            <motion.div
            initial= {{opacity: 0, y: 40, scale: 0.95}}
            animate= {{opacity: 1, y: 0, scale: 1}}
            transition={{duration: 1}} 
            className= {imgDiv}>
            <img className={imgStyle} src="/img/file_upload.png" alt="fileUploadImg" />
            <h1 className={h1Style}>Upload Your File</h1>
            <p className={pStyle}>Select Your file and upload it to our encrypted storage.</p>
            </motion.div>
            
            <motion.div
            initial= {{opacity: 0, y: 40, scale: 0.95}}
            animate= {{opacity: 1, y: 0, scale: 1}}
            transition={{duration: 3}}
            className= {imgDiv}>
            <img className={imgStyle} src="/img/encrypt.PNG" alt="encryptImg" />
            <h1 className={h1Style}>Encrypt & Secure</h1>
            <p className={pStyle}>Your file is protected with encryption.</p>
            </motion.div>
           
            <motion.div
            initial= {{opacity: 0, y: 40, scale: 0.95}}
            animate= {{opacity: 1, y: 0, scale: 1}}
            transition={{duration: 5}} 
            className= {imgDiv}>
            <img className={imgStyle} src="/img/secured.png" alt="securedImg" />
            <h1 className={h1Style}>Share with Confidence</h1>
            <p className={pStyle}>Generate a secure link and share it instantly.</p>
            </motion.div>
        </div>
        
    )
}

export default HeroImage;