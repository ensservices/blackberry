import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ProtectedRoute from "../component/protected";
import Dashboard from "../pages/dashboard";
import AddNewProduct from "../pages/addProduct";
import ViewProducts from "../pages/viewProduct";
import EditProduct from "../pages/editProduct";
import Demo from "../pages/demo";


const pages = [
    {
        path: "/",
        compo: <Dashboard />,
        isProtected: true
    },
    {
        path: "/add-product",
        compo: <AddNewProduct />,
        isProtected: true
    },
    {
        path: "/view-product",
        compo: <ViewProducts />,
        isProtected: true
    },
    {
        path: "/edit-product",
        compo: <EditProduct />,
        isProtected: true
    },
    {
        path: "/demo",
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
                                <ProtectedRoute>
                                    {item.compo}
                                </ProtectedRoute>
                            </Route>
                        )
                    })
                }
            </Switch>
        </Router>
    )
}

export default AllRoutes;
