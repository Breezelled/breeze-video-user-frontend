import { useState } from 'react'
import Loader from './Loader'
import {useSession} from "next-auth/react";

function AccountInfo() {

    const { data: session } = useSession();

    return (
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">

            <div className="col-span-3">
                <div className="flex flex-col justify-between md:flex-row">
                    <div className="accountInfo">
                        <h4>Email</h4>
                        <p>
                            {session?.user.email}
                        </p>
                    </div>
                    <div className="accountInfo">
                        <h4>Interest</h4>
                        <p>
                            {session?.user.interestType.replaceAll('|', ", ")}
                        </p>
                    </div>
                    <div className="">
                        {/*<p className="membershipLink">Change Email</p>*/}
                        {/*<p className="membershipLink">Change password</p>*/}
                    </div>
                </div>

                <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
                    <div className="md:text-right">
                        {/*<p className="membershipLink">Manage payment info</p>*/}
                        {/*<p className="membershipLink">Add backup payment method</p>*/}
                        {/*<p className="membershipLink">Billing Details</p>*/}
                        {/*<p className="membershipLink">Change billing day</p>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo