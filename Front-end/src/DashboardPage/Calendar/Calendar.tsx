import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import "./Calendar.css"
import { getBankHols } from "../../utils";

const CalendarComp = ({ startDates, endDates }: any) => {
    startDates = startDates.map((date: moment.MomentInput) => moment(date, 'DD/MM/YYYY, HH:mm:ss').format('DD/MM/YYYY'))
    endDates = endDates.map((date: moment.MomentInput) => moment(date, 'DD/MM/YYYY, HH:mm:ss').format('DD/MM/YYYY'))

    const [bankHols, setBankHols] = useState<String[]>([])

    useEffect(() => {
        const getHols = async () => {
            const data = await getBankHols();
            let bankHolFormated: String[] = []

            data.BankHolidays?.forEach((bankHol: moment.MomentInput, index: any) => {
                bankHolFormated[index] = moment(moment(bankHol, "ddd MMM DD YYYY").toDate()).format("YYYY-MM-DD")

            });
            setBankHols(bankHolFormated);
        };
        getHols();
    }, []);
    //console.log(bankHols);


    const holidayRanges = startDates.map((date: any, index: any) => {
        return (
            {
                start: moment(date, 'DD/MM/YYYY').toDate(),
                end: moment(endDates[index], 'DD/MM/YYYY').toDate()
            })
    })

    console.log(holidayRanges);


    const holidayCheck = ({ date, view }: any) => {

        for (let i = 0; i < holidayRanges.length; i++) {
            let { start, end }: any = holidayRanges[i];

            start = moment(start).format("YYYY-MM-DD")
            end = moment(end).format("YYYY-MM-DD")
            date = moment(date).format("YYYY-MM-DD")
            if (moment(date).day() == 6 || moment(date).day() == 0) {
                return "weekend"
            }

            if (bankHols.includes(date)) {
                return "bankHoliday"
            } else if (date >= start && date <= end) {

                // If the current date falls within a holiday range, return a custom class
                return "holiday";
            }




        }
        return null
    }


    return (
        <div className={"Calendar"}>
            {startDates ? <Calendar

                tileClassName={holidayCheck}
            /> : null}
        </div>
    );
};


export default CalendarComp;