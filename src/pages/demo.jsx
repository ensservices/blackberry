import axios from "axios";
import { useEffect, useState } from "react";
import { sizechart } from './sizeChart';

const Demo = () => {
    const [brandView, setBrandView] = useState(false);
    const [brandCategoryView, setBrandCategoryView] = useState(false);
    const [categoryView, setCategoryView] = useState(false);
    const [chestView, setChestView] = useState(false);
    const [lengthView, setLengthView] = useState(false);
    const [shoulderView, setShoulderView] = useState(false);
    const [sizeView, setSizeView] = useState(false);

    const [brandData, setBrandData] = useState("");
    const [genderdata, setGenderdata] = useState("");
    const [questionData, setQuestionData] = useState("");
    const [brandCategoryViewData, setBrandCategoryViewData] = useState("");
    const [categoryViewData, setCategoryViewData] = useState("");
    const [chestViewData, setChestViewData] = useState("");
    const [lengthViewData, setLengthViewData] = useState("");
    const [shoulderViewData, setShoulderViewData] = useState("");
    const [sizeViewData, setSizeViewData] = useState("");

    const [gender, setGender] = useState(["male", "female"]);
    const [question, setQuestion] = useState(["Do you know your size ?", "Not sure about size , Please choose the last branded clothes you purchase"]);
    const [brand, setBrand] = useState(["Levis", "VanHuesen", "AllenSolley", "Flying Machine"]);

    const [categoryViewList, setCategoryViewList] = useState([]);
    const [brandCategoryViewList, setBrandCategoryViewList] = useState([]);
    const [chestViewList, setChestViewList] = useState([]);
    const [lengthViewList, setLengthViewList] = useState([]);
    const [shoulderViewList, setShoulderViewList] = useState([]);
    const [sizeViewList, setSizeViewList] = useState([]);

    const [output, setOutput] = useState("");
    const [brandOutput, setBrandOutput] = useState("");

    const genderHandler = (e) => {
        if (e.target.value !== "") {
            setGenderdata(e.target.value);
        } else {
            alert("please select any value !");
        }
    };

    const questionHandler = (e) => {
        if (e.target.value !== "") {
            if (e.target.value === "Not sure about size , Please choose the last branded clothes you purchase") {
                setQuestionData(e.target.value);
                setBrandView(true);
                setCategoryView(false);
                setChestView(false);
                setLengthView(false);
                setShoulderView(false);
                setOutput("");
            } else {
                setQuestionData(e.target.value);
                setCategoryViewList(sizechart[genderdata][e.target.value].category);
                setCategoryView(true);
                setBrandView(false);
                setBrandCategoryView(false);
                setSizeView(false);
                setBrandOutput("");
            }
        } else {
            alert("please select any value !");
        }
    };

    const brandHandler = (e) => {
        if (e.target.value !== "") {
            setBrandData(e.target.value);
            setBrandCategoryViewList(sizechart[genderdata][questionData].category);
            setBrandCategoryView(true);
        } else {
            alert("please select any value !");
        }
    };

    const categoryHandler = (e) => {
        if (e.target.value !== "") {
            setCategoryViewData(e.target.value);
            // console.log("--", sizechart[genderdata]["sub-cate"][e.target.value]);
            // console.log("--", e.target.value);
            if (e.target.value === "Jeans") {
                const { waist, length } = sizechart[genderdata][questionData]["sub-cate"][e.target.value];
            } else {
                const { chest, shoulder, sleeve } = sizechart[genderdata][questionData]["sub-cate"][
                    e.target.value
                ];
                setChestViewList(chest);
                setLengthViewList(sleeve);
                setShoulderViewList(shoulder);
                setChestView(categoryViewData === "" || e.target.value ? true : false);
                setLengthView(categoryViewData === "" || e.target.value ? true : false);
                setShoulderView(categoryViewData === "" || e.target.value ? true : false);
            }
        } else {
            alert("please select any value !");
        }
    };

    const brandCategoryHandler = (e) => {
        if (e.target.value !== "") {
            setBrandCategoryViewData(e.target.value);
            // console.log("--", sizechart[genderdata]["sub-cate"][e.target.value]);
            // console.log("--", e.target.value);
            setSizeViewList(sizechart[genderdata][questionData][brandData][e.target.value].size);
            setSizeView(true);
        } else {
            alert("please select any value !");
        }
    };

    const chestHandler = (e) => {
        if (e.target.value !== "") {
            setChestViewData(e.target.value);
            if (chestViewData !== "" && lengthViewData !== "") {
                getOutput(e.target.value, lengthViewData);
            }
        } else {
            alert("please select any value !");
        }
    };

    const shoulderHandler = (e) => {
        if (e.target.value !== "") {
            setShoulderViewData(e.target.value);
            if (chestViewData !== "" && lengthViewData !== "") {
                getOutput(e.target.value, lengthViewData);
            }
        } else {
            alert("please select any value !");
        }
    };

    const lengthHandler = (e) => {
        if (e.target.value !== "") {
            setLengthViewData(e.target.value);
            getOutput(chestViewData, e.target.value);
        } else {
            alert("please select any value !");
        }
    };

    const getOutput = (che, len) => {
        console.log(`${che}-${len}`);
        const le = sizechart[genderdata][questionData]["sub-cate"][categoryViewData].size[`${che}-${len}`];
        console.log("output -- ", le);

        setOutput(sizechart[genderdata][questionData].size[le - 1]);
    };

    const sizeOutputHandler = (e) => {
        setSizeViewData(e.target.value);
        getBrandOutput();
    };

    const getBrandOutput = (e) => {
        console.log('>>>>>', sizechart[genderdata][questionData][brandData].size);
        const size = sizechart[genderdata][questionData][brandData].size[`${brandCategoryViewData}-${sizeViewData}`];
        console.log('size', size);
        setBrandOutput(sizechart[genderdata][questionData].size[size - 1]);
    };

    return (
        <>
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-md-12 grid-margin">
                        <div class="row">
                            <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 class="font-weight-bold">Size Checker</h3>
                            </div>
                        </div>
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Gender</label>
                                                <select
                                                    class="form-control"
                                                    onChange={(e) => genderHandler(e)}
                                                >
                                                    <option value="">select option</option>
                                                    {gender.map((item) => (
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {genderdata && <div className="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Familiar about your size</label>
                                                <select
                                                    class="form-control"
                                                    onChange={(e) => questionHandler(e)}
                                                >
                                                    <option value="">select option</option>
                                                    {question.map((item) => (
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>}
                                        {brandView && <div className="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Brands</label>
                                                <select
                                                    class="form-control"
                                                    onChange={(e) => brandHandler(e)}
                                                >
                                                    <option value="">select option</option>
                                                    {brand.map((item) => (
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>}

                                        {brandCategoryView && (
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Brand Category</label>
                                                    <select
                                                        class="form-control"
                                                        onChange={(e) => brandCategoryHandler(e)}
                                                    >
                                                        <option value="">select option</option>
                                                        {brandCategoryViewList.map((item) => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}

                                        {categoryView && (
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Category</label>
                                                    <select
                                                        class="form-control"
                                                        onChange={(e) => categoryHandler(e)}
                                                    >
                                                        <option value="">select option</option>
                                                        {categoryViewList.map((item) => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {sizeView && (
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Select size</label>
                                                    <select
                                                        class="form-control"
                                                        onChange={(e) => sizeOutputHandler(e)}
                                                    >
                                                        <option value="">select option</option>
                                                        {sizeViewList.map((item) => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {chestView && (
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Chest</label>
                                                    <select
                                                        class="form-control"
                                                        onChange={(e) => chestHandler(e)}
                                                    >
                                                        <option value="">select option</option>
                                                        {chestViewList.map((item) => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {shoulderView && (
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Shoulder</label>
                                                    <select
                                                        class="form-control"
                                                        onChange={(e) => shoulderHandler(e)}
                                                    >
                                                        <option value="">select option</option>
                                                        {shoulderViewList.map((item) => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {lengthView && (
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">Sleeve</label>
                                                    <select
                                                        class="form-control"
                                                        onChange={(e) => lengthHandler(e)}
                                                    >
                                                        <option value="">select option</option>
                                                        {lengthViewList.map((item) => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {
                                            output && <div className="col-md-6">
                                                <div class="form-group">
                                                    <h3>As per your selection please buy {output} size, </h3>
                                                    <h5 style={{ color: 'red' }}>Thanks for shopping with us.</h5>
                                                </div>
                                            </div>
                                        }
                                        {
                                            brandOutput && <div className="col-md-6">
                                                <div class="form-group">
                                                    <h3>As per your selection please buy {brandOutput} size, </h3>
                                                    <h5 style={{ color: 'red' }}>Thanks for shopping with us.</h5>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Demo;