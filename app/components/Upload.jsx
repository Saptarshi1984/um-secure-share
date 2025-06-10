
const Upload = () => {

    const inputStyle = "border-[2px] border-amber-300 p-1 rounded-4xl text-amber-500";

    return(

        <div className="flex flex-col  items-center justify-center w-[98%] m-auto">            
            

                <div className="flex flex-col w-[60%] gap-4">
                    <div>
                     <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">Uploads</h1>
                     <p className="text-amber-400">Drag & drop files here or click to browse</p>
                     </div>
                    <div className="flex flex-col gap-4 m-auto w-[100%] h-100 border-2 border-dashed rounded-md border-amber-500 justify-center items-center">
                        <h2 className="text-amber-500">Drag & drop files here</h2>
                        <p className="text-amber-500">Or, click to select files from your computer</p>
                        <input className="text-amber-500 text-md p-2 font-semibold border-2 border-amber-500" type="file" />
                    </div>                
                </div>

            <div className="flex flex-col w-[60%]">
                <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">Recent Uploads</h1>

            </div>
        </div>
    )
}

export default Upload;