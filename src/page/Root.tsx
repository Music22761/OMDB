import { Outlet } from "react-router-dom";
// import SearchAppBar from "./Appbar";
// import Appbar from "./Appbar"

function RootPage() {
    
    return (
        <>
            {/* <SearchAppBar /> */}
            <Outlet/>
        </>
    );
}

export default RootPage;