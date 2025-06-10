

const Account = () => {

    const inputStyle = "text-amber-500 text-2xl font-semibold";

    return(

        <div className="flex flex-col gap-10 items-center justify-around w-[98%] my-4">          

                <div className="flex flex-col w-[60%] gap-4 justify-center">
                    <h1 className="my-4 text-amber-500 text-2xl font-extrabold font-mono">Account Details</h1>
                    <form className="flex flex-col gap-4" action="">
                        <label className={inputStyle} htmlFor="name">Name:</label>
                        <input type="text" name="name"/>
                        <label className={inputStyle} htmlFor="mobile">Mobile No:</label>
                        <input type="number" name="mobile" />
                        <label className={inputStyle} htmlFor="aadhar">Aadhar No:</label>
                        <input type="text" name="aadhar" />
                        <label className={inputStyle} htmlFor="address">Address:</label>
                        <input type="text" name="address" />                        
                    </form>              
                </div>

            <div className="flex flex-col w-[60%]">
                <h1 className="my-4 text-amber-500 text-2xl font-extrabold font-mono">Notifications</h1>
                <label htmlFor="">
                <input type="checkbox" />
                Email notifications for new uploads.
                </label>

                <label htmlFor="">
                <input type="checkbox" />
                Email notifications for new uploads.
                </label>

                <label htmlFor="">
                <input type="checkbox" />
                Email notifications for new uploads.
                </label>

            </div>
        </div>
    )
}

export default Account;