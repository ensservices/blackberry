import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
            <ul class="nav">
                <li class="nav-item">
                    <Link class="nav-link" to="/">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">Dashboard</span>
                    </Link>
                </li>
       
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <i class="icon-layout menu-icon"></i>
                        <span class="menu-title">Products</span>
                        <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="ui-basic">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <Link class="nav-link" to="/add-product">Add new Product</Link></li>
                            <li class="nav-item"> <Link class="nav-link" to="/view-product">View Product</Link></li>
                        </ul>
                    </div>
                </li>
              
                
               
            </ul>
        </nav>
    )
}


export default SideBar;