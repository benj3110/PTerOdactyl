import { useEffect, useState } from "react";
import { getBankHols } from "../utils";

const BankHols = () => {
    const [bankHols, setBankHols] = useState<string[]>([])
    
    useEffect(() => {
      const getHols= async () => {
        const data = await getBankHols()
        setBankHols(data.BankHolidays)
      }
      getHols()
      
    }, [])
    console.log(bankHols);
    
    
    return ( <div>
        Bank Holidays
        {bankHols.map((date)=>(<div>{date}</div>))}

    </div> );
}
 
export default BankHols;