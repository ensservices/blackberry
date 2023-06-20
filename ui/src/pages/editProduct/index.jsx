import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ThemeMaker from "../../component/theme"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}
const EditProduct = () => {
    let query = useQuery();
    const id = query.get("id");
    const [loading, setLoading] = useState(false);
    const [formData, setFormDara] = useState({

    });
    const [updateData, setUpdateData] = useState({});
    const formChangehandler = (e) => {
        console.log("yess");
        setFormDara({ ...formData, [e.target.name]: e.target.value });
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });

    }
    const formhanlder = async () => {
        console.log("formData => ", updateData);
        setLoading(true);
        const { data } = await axios({
            url: `/admin/product`,
            method: "PUT",
            data: updateData
        });
        setLoading(false);
        if (data.code == 201) {
            alert("Product Updated !")
        } else {
            alert("error while updating product !")
        }
    }
    const fetchPro = async () => {
        const { data } = await axios.get(`/admin/productid?id=${id}`);
        console.log("yesss", data.data[0]);
        setUpdateData(data.data[0]);
        setFormDara({...formData, ...data.data[0]});
    } 
    const ckUpdate = (event, editor) => {
        const data = editor.getData();
        setUpdateData({ ...updateData, description: data });
        // console.log({ event, editor, data });
    }

    useEffect(() => {
        fetchPro();
    }, []);
    return (
        <ThemeMaker>

            <div class="content-wrapper">
                <div class="row">
                    <div class="col-md-12 grid-margin">
                        <div class="row">
                            <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 class="font-weight-bold">Edit Product</h3>
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
                                                        value={updateData?.title}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product State</label>
                                                    <select class="form-control"
                                                        name="product_state"
                                                        value={updateData?.product_state}
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
                                                    data={updateData?.description}
                                                    // onChange={(event, editor) => ckUpdate(event, editor)}
                                                />
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product Rank</label>
                                                    <select class="form-control"
                                                        name="rank"
                                                        value={updateData?.rank}
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
                                                        value={updateData?.type}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Vendor</label>
                                                    <input type="text" class="form-control"
                                                        name="vendor"
                                                        value={updateData?.vendor}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Price</label>
                                                    <input type="number" class="form-control"
                                                        name="price"
                                                        value={updateData?.price}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Sku</label>
                                                    <input type="text" class="form-control"
                                                        name="sku"
                                                        value={updateData?.sku}
                                                        onChange={(e) => formChangehandler(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Product Status</label>
                                                    <select class="form-control"
                                                        name="status"
                                                        value={updateData?.status}
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
                                                        >Update</button>
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

export default EditProduct