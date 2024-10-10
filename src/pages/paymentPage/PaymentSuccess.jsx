import { Link, useParams } from "react-router-dom";
import success from "/paymentsuccess.png"

const PaymentSuccess = () => {
    const { tranId } = useParams()
    return (
        <div className="flex justify-center items-center">
            {/* <h1>Payment Success : {tranId}</h1> */}
            <div className="max-w-screen-sm pb-8 border border-gray-300 flex justify-start items-center flex-col px-10">
                <figure>
                    <img src={success} alt="" className="w-60 " />
                </figure>
                <h2 className="text-2xl text-gray-500">Payment Successful</h2>
                <div className="flex justify-center items-center flex-col pt-10 gap-5">
                    <Link to="/" className="bg-primary hover:bg-transparent hover:border-2 border-primary hover:text-primary duration-500 active:scale-75 shadow-inner shadow-secondary border-2 px-6 py-2 text-background font-nunito font-semibold">
                       Go Back Homepage
                    </Link>
                    <button className="hover:bg-primary bg-transparent hover:border-2 border-primary text-primary duration-500 active:scale-75 shadow-inner shadow-secondary border-2  px-6 py-2 hover:text-background font-nunito font-semibold">
                        View Order Details
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;