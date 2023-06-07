import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import "./SearchPage.css"
import Header from "../Header/Header"
import { Search } from "@mui/icons-material"
import { useRef, useState } from "react"
import { employeeDataInterface } from "../interfaces/employDataInterface"
import { getEmployeeDataSearch } from "../utils"
import "./SearchPage.css"

const SearchPage = () => {
    const searchInput = useRef<HTMLInputElement | null>(null)
    const [searchUsersData, setSearchUsersData] = useState<employeeDataInterface[] | null>(null)

    const handleSearch = async () => {
        if (searchInput.current) {
            const searchName = searchInput.current.value;
            const searchData = await getEmployeeDataSearch(searchName)
            setSearchUsersData(searchData)
        }
    };
    console.log(searchUsersData);


    return (<>
        <Header title={"Search Users"} />
        <Box className="Box">
            <div className="Row">
                <TextField id="outlined-basic" label="Name" variant="outlined" inputRef={searchInput} />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Remaining
                        </TableCell>
                        <TableCell>
                            Pending Approval
                        </TableCell>
                        <TableCell>
                            Approved
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchUsersData?.map((user) => (
                        <TableRow key={user.Name}>
                            <TableCell>{user.Name}</TableCell>
                            <TableCell>{user.Remaining}</TableCell>
                            <TableCell>
                                {user.toApprove?.map((date) => (
                                    <TableRow key={date}><TableCell>{date.replace(" # ", " to ")}</TableCell></TableRow>
                                ))}
                            </TableCell>
                            <TableCell>{user.PendingDates?.map((date) => (
                                <TableRow key={date}><TableCell>{date.replace(" # ", " to ")}</TableCell></TableRow>
                            ))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>


            </Table>
        </Box>
    </>

    )
}
export default SearchPage