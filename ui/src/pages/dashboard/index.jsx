import ThemeMaker from "../../component/theme";
import axios from "axios";
import { useState, useEffect } from "react";


const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        totalProduct: 0,
        liveProducts: 0,
        draftProducts: 0
    });

    const fetchProducts = async () => {
        setLoading(true);
        const { data } = await axios({
            method: "GET",
            url: "/admin/product"
        });
        console.log(data);
        setProducts(data.data);
        const livePro = data.data.filter(item => item.status == "active");
        const draftPro = data.data.filter(item => item.status == "draft");
        setProducts({
            totalProduct: data.data.length,
            liveProducts: livePro.length,
            draftProducts: draftPro.length
        })

        setLoading(false);
    }

    useEffect(() =>{
     fetchProducts();

    }, []);
    return (
        <ThemeMaker>


            <div class="content-wrapper">
                <div class="row">
                    <div class="col-md-12 grid-margin">
                        <div class="row">
                            <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 class="font-weight-bold">Welcome To Product-PY</h3>
                                <h6 class="font-weight-normal mb-0">All systems are running smoothly :)!</h6>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 grid-margin stretch-card">
                        <div class="card tale-bg">
                            <div class="card-people mt-auto">
                                <img src="images/dashboard/people.svg" alt="people" />
                                <div class="weather-info">
                                    <div class="d-flex">
                                        <div>
                                            <h2 class="mb-0 font-weight-normal"><i class="icon-sun mr-2"></i>31<sup>C</sup></h2>
                                        </div>
                                        <div class="ml-2">
                                            <h4 class="location font-weight-normal">Noida</h4>
                                            <h6 class="font-weight-normal">India</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 grid-margin transparent">
                        <div class="row">
                            <div class="col-md-6 mb-4 stretch-card transparent">
                                <div class="card card-tale">
                                    <div class="card-body">
                                        <p class="mb-4">Total Products</p>
                                        <p class="fs-30 mb-2">{products.totalProduct}</p>
                                        <p>.</p>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4 stretch-card transparent">
                                <div class="card card-dark-blue">
                                    <div class="card-body">
                                        <p class="mb-4">Drafts Products</p>
                                        <p class="fs-30 mb-2">{products.draftProducts}</p>
                                        <p>.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                                <div class="card card-light-blue">
                                    <div class="card-body">
                                        <p class="mb-4">Active Products</p>
                                        <p class="fs-30 mb-2">{products.liveProducts}</p>
                                        <p>.</p>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 stretch-card transparent">
                                <div class="card card-light-danger">
                                    <div class="card-body">
                                        <p class="mb-4">Number of Clients</p>
                                        <p class="fs-30 mb-2">47033</p>
                                        <p>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>

        </ThemeMaker>



    )
}

export default Dashboard;