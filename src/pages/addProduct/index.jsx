import { useState } from "react";
import ThemeMaker from "../../component/theme"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

const AddNewProduct = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormDara] = useState({
        title: "",
        product_state: "National",
        description: "",
        rank: "1",
        type: "",
        vendor: "",
        price: "",
        sku: "",
        status: "draft"
    });
    const formChangehandler = (e) => {
        setFormDara({ ...formData, [e.target.name]: e.target.value });
    }
    const formhanlder = async () => {
        console.log("formData => ", formData);
        setLoading(true);
        const { data } = await axios({
            url: `/admin/product`,
            method: "POST",
            data: formData
        });
        setLoading(false);
        if (data.code == 201) {
            alert("Product Created !")
        } else {
            alert("error while creating product !")
        }

    }
    return (
        <ThemeMaker>

            <div class="content-wrapper">
                <div class="row">
                    <div class="col-md-12 grid-margin">
                        <div class="row">
                            <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 class="font-weight-bold">Add New Product</h3>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product Title</label>
                                                    <input type="text" class="form-control"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product State</label>
                                                    <select class="form-control"
                                                        name="product_state"
                                                        value={formData.product_state}
                                                        onChange={(e) => formChangehandler(e)}
                                                    >
                                                        <option value="National">National</option>
                                                        <option value="Local">Local</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <label for="exampleInputUsername1">Description</label>

                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={``}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setFormDara({ ...formData, description: data });
                                                        // console.log({ event, editor, data });
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product Rank</label>
                                                    <select class="form-control"
                                                        name="rank"
                                                        value={formData.rank}
                                                        onChange={(e) => formChangehandler(e)}
                                                    >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product Type</label>
                                                    <input type="text" class="form-control"
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Vendor</label>
                                                    <input type="text" class="form-control"
                                                        name="vendor"
                                                        value={formData.vendor}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Price</label>
                                                    <input type="number" class="form-control"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Sku</label>
                                                    <input type="text" class="form-control"
                                                        name="sku"
                                                        value={formData.sku}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product Status</label>
                                                    <select class="form-control"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={(e) => formChangehandler(e)}
                                                    >
                                                        <option value="draft">Draft</option>
                                                        <option value="active">Active</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {
                                                loading ? <div className="col-md-12">
                                                    <button type="submit" class="btn btn-primary mr-2"
                                                       
                                                    >Loading...</button>
                                                </div> :
                                                    <div className="col-md-12">
                                                        <button type="submit" class="btn btn-primary mr-2"
                                                            onClick={formhanlder}
                                                        >Submit</button>
                                                    </div>
                                            }
                                        </div>
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

export default AddNewProduct