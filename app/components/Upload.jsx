import { useRef } from "react";
const Upload = () => {

    const inputStyle = "hidden";
     const buttonStyle =
    "text-amber-500 border-2 border-amber-500 rounded-md px-4 py-2 font-semibold hover:bg-amber-500 hover:text-white transition";

    const fileInputRef = useRef(null);

    const handleClick = () => {

        fileInputRef.current.click();
    }



    return(

        <div className="flex flex-col  items-center justify-center w-[98%] m-auto">            
            

                <div className="flex flex-col w-[60%] gap-4">
                    <div>
                     <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">Upload</h1>
                     <p className="text-amber-400">Drag & drop files here or click to browse</p>
                     </div>
                    <div className="flex flex-col gap-4 m-auto w-[100%] h-100 border-2 border-dashed rounded-md border-amber-500 justify-center items-center">
                        <h2 className="text-amber-500">Drag & drop files here</h2>
                        <p className="text-amber-500">Or, click to select files from your computer</p>
                        <button className={buttonStyle} onClick={handleClick}>Select File</button>
                        <input
                        ref={fileInputRef} 
                        className={inputStyle} type="file" />
                    </div>                
                </div>

            <div className="flex flex-col w-[60%]">
                <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">Recent Uploads</h1>

            </div>
        </div>
    )
}

export default Upload;