import React from "react";
import { useMediaQuery } from "react-responsive";
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbTruckLoading } from "react-icons/tb";
import { IoLibraryOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import { PiUsersDuotone } from "react-icons/pi";
import { BsFuelPump } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";
import { LiaHandshake } from "react-icons/lia";
import { TbReport } from "react-icons/tb";
import { RiExchangeBoxLine } from "react-icons/ri";
import { LiaFileContractSolid } from "react-icons/lia";
import { PiGearSix } from "react-icons/pi";
import { FaUserGear } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
import { MdOutlineSafetyCheck } from "react-icons/md";

interface ReactIconProp {
    height?: string | number;
    shrinkOnSmallScreen?: boolean;
    name: string
}
const getIcon = (name: string,height:string|number) => {
    switch (name) {
        case 'dashboard':
            return <TfiDashboard height={height} />
        case 'account':
            return <MdOutlineAccountBalanceWallet height={height} />
        case 'load':
            return <TbTruckLoading height={height} />
        case 'data-library':
            return <IoLibraryOutline height={height} />
        case 'driver-payroll':
            return <GiReceiveMoney height={height} />
        case 'driver':
            return <FaPersonDotsFromLine height={height} />
        case 'users':
            return <PiUsersDuotone height={height} />
        case 'fuel':
            return <BsFuelPump height={height} />
        case 'equipment':
            return <VscTools height={height} />
        case 'partner':
            return <LiaHandshake height={height} />
        case 'reports':
            return <TbReport height={height} />
        case 'docs-exchange':
            return <RiExchangeBoxLine height={height} />
        case 'agreement':
            return <LiaFileContractSolid height={height} />
        case 'setting':
            return <PiGearSix height={height} />
        case 'user-setting':
            return <FaUserGear height={height} />
        case 'message':
            return <MdOutlineMessage height={height} />
        case 'help':
            return <MdHelpOutline height={height} />
        case 'safety':
            return <MdOutlineSafetyCheck height={height} />
        default:
            return <TfiDashboard height={height} />
    }
}

const ReactIcon = ({ height, shrinkOnSmallScreen, name }: ReactIconProp) => {
    const below576 = useMediaQuery({ query: "(max-width: 576px)" });
    height = height || "40";

    return (
        <>
            {below576 && shrinkOnSmallScreen ? (
                getIcon(name,30)
            ) : (
                getIcon(name,height)
            )}
        </>
    );
};

export default ReactIcon;
