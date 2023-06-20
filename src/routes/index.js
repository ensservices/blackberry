import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Demo from "../pages/demo";


const pages = [
    {
        path: "/",
        compo: <Demo />,
        isProtected: true
    }
]

const AllRoutes = () => {
    return (
        <Router>
            <Switch>
                {
                    pages.map((item) => {
                        return (
                            <Route exact path={item.path} key={item.path} >
                                {item.compo}
                            </Route>
                        )
                    })
                }
            </Switch>
        </Router>
    )
}

export default AllRoutes;
