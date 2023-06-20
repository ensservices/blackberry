import { useState, useEffect } from "react";
import ThemeMaker from "../../component/theme";
import { Link } from "react-router-dom";

import axios from "axios";

const ViewProducts = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        setLoading(true);
        const { data } = await axios({
            method: "GET",
            url: "http://localhost:8000/admin/product"
        });
        console.log(data);
        setProducts(data.data);
        setLoading(false);
    }
    const updateStatus = async (_id) => {
        alert(_id)
        const getPro = products.filter(item => item._id == _id);
        const currentPri = {
            ...getPro[0],
            status: getPro[0].status == "active" ? "draft" : "active"
        }
        console.log(currentPri);
        const { data } = await axios({
            url: `/admin/product`,
            method: "PUT",
            data: currentPri
        });
        fetchProducts();
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <ThemeMaker>

            <div class="content-wrapper">
                <div class="row">
                    <div class="col-md-12 grid-margin">
                        <div class="row">
                            <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 class="font-weight-bold">View Products</h3>
                            </div>

                        </div>
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <p class="card-description">
                                    </p>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        SN
                                                    </th>
                                                    <th>
                                                        Product Title
                                                    </th>
                                                    <th>
                                                        Price
                                                    </th>
                                                    <th>
                                                        Sku
                                                    </th>
                                                    <th>
                                                        State
                                                    </th>
                                                    <th>
                                                        Rank
                                                    </th>
                                                    <th>
                                                        Status
                                                    </th>
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    loading ? <h2> Loading.... </h2> :
                                                        products.map((item, index) => {
                                                            return (
                                                                <tr key={item._id}>
                                                                    <td class="py-1">
                                                                        {index + 1}
                                                                    </td>
                                                                    <td>
                                                                        {item?.title}
                                                                    </td>
                                                                    <td>
                                                                        {item?.price}
                                                                    </td>
                                                                    <td>
                                                                        {item?.sku}
                                                                    </td>
                                                                    <td>
                                                                        {item?.product_state}
                                                                    </td>
                                                                    <td>
                                                                        {item?.rank}
                                                                    </td>
                                                                    <td>
                                                                        <label className={`badge badge-${item?.status == "active" ? "success" : "warning"}`} >{item?.status}</label>

                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex justify-content-between" >
                                                                            <div class="form-check">
                                                                                <label class="form-check-label">
                                                                                    <input type="checkbox" class="form-check-input" checked={ item?.status == "active" ? true : false }
                                                                                    onChange={() => updateStatus(item?._id)}
                                                                                    />
                                                                                       
                                                                                        <i class="input-helper"></i></label>
                                                                            </div>
                                                                            <Link className="btn btn-warning" to={`/edit-product?id=${item?._id}`}>View</Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">

                </div>




            </div>

        </ThemeMaker>
    )
}

export default ViewProducts