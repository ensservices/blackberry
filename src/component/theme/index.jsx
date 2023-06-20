import SideBar from "./sidebar";
import NavBar from "./navBar";


const ThemeMaker = ({ children }) => {
    return (
        <>
            <div class="container-scroller">
                <NavBar />
                <div class="container-fluid page-body-wrapper">
                    <SideBar />
                    <div class="main-panel">
                        {children}
                        <footer class="footer">
                            <div class="d-sm-flex justify-content-center justify-content-sm-between">
                                <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023 All rights reserved.</span>
                                <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Made With <i class="ti-heart text-danger ml-1"></i></span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThemeMaker;