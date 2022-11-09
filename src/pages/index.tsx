import { useMemo } from "react"
import Genesis from "./genesis"

const SwapPage = () => {
    useMemo(()=>{
        document.location.href="/genesis"
    }, [])
    // return <Swap />
    return <Genesis />
}
export default SwapPage