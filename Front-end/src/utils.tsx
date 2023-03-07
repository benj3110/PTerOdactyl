import Axios, { AxiosResponse } from "axios";
import bookingObject from "./interfaces/bookingInterfaces";
// const url = require("url")

export const getEmployeeData: (name: string) => Promise<any> = async (
  name: string
) => {
  let userFetch: AxiosResponse<any, any>;

  try {
    userFetch = await Axios.get(
      `http://localhost:8000/getEmployeeData/${name}`
    );
    //console.log(userFetch.data);
    return userFetch.data;
  } catch (error) {
    console.log(error);
  }
};

// export const makeBooking: (
//   bookingSubmit: bookingObject
// ) => Promise<AxiosResponse<any, any> | undefined> = async (
//   bookingSubmit: bookingObject
// ) => {
//   let bookingPut: AxiosResponse<any, any> | undefined;

//   try {
//     bookingPut = await Axios.put(
//       "http://localhost:8000/booking",
//       bookingSubmit
//     );
//   } catch (error) {
//     console.log(error);
//   }

//   return bookingPut;
// };
