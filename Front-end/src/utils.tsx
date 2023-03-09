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

export const bookPTO: (bookingSubmit: any) => Promise<any> = async (
	bookingSubmit: any
) => {
	let bookingReq: AxiosResponse<any, any> | undefined;

	try {
		bookingReq = await Axios.put(
			"http://localhost:8000/requestPTO",
			bookingSubmit
		);
	} catch (error) {
		console.log(error);
	}

	return bookingReq;
};

export const inputPTO: (inputPTOSubmit: any) => Promise<any> = async (
	inputPTOSubmit: any
) => {
	let inputPTO: AxiosResponse<any, any> | undefined;
  console.log(inputPTOSubmit)

	try {
		inputPTO = await Axios.put(
			"http://localhost:8000/inputPTO",
			inputPTOSubmit
		);
	} catch (error) {
		console.log(error);
	}
};
