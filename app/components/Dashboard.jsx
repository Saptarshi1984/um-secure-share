

const Dashboard = () => {

    return ( 

        <div className="flex flex-col gap-10 items-center justify-around w-[98%] my-4">          

                <div className="flex flex-row w-[60%] gap-10 justify-center">
                    <div className="border-1 border-gray-400 p-4 rounded-2xl text-center">
                     <h1 className="my-4 text-amber-500 text-lg font-extrabold font-mono">Files uploaded this week</h1>
                     <p className="text-amber-400">10</p>
                     </div>
                    <div className="border-1 border-gray-400 p-4 rounded-2xl text-center">
                     <h1 className="my-4 text-amber-500 text-lg font-extrabold font-mono">Total Size of ulploads</h1>
                     <p className="text-amber-400">1.4 GB</p>
                     </div>               
                </div>

            <div className="flex flex-col w-[60%]">
                <h1 className="my-4 text-amber-500 text-4xl font-extrabold font-mono">Recent Uploads</h1>

            </div>
        </div>
    )
    
}

export default Dashboard;