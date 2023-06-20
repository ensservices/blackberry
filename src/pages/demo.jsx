import axios from "axios";
import { useEffect, useState } from "react";

const sizechart = {
    "male": {
        "size": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        "category": ["T-shirt", "Shirt", "Jeans"],
        "sub-cate": {
            "T-shirt": {
                "chest": [10, 20, 30],
                "sleeve": [30, 40, 50],
                "shoulder": [30, 40, 50],
                "size": {
                    "10-30": 1,
                    "10-40": 2,
                    "10-50": 3,
                    "20-30": 5,
                    "20-40": 6,
                    "20-50": 7,
                    "30-30": 8,
                    "30-40": 8,
                    "30-50": 8,
                }
            },
            "Shirt": {
                "chest": [30, 40, 50],
                "shoulder": [60, 70, 80],
                "sleeve": [60, 70, 80],
                "size": {
                    "30-60": 1,
                    "30-70": 2,
                    "30-80": 3,
                    "40-60": 5,
                    "40-70": 6,
                    "50-80": 7,
                    "50-60": 8,
                    "50-70": 8,
                    "50-80": 8,
                }
            },
            "Jeans": {
                "waist": [30, 40, 50],
                "length": [60, 70, 80],
                "size": {
                    "30-60": 1,
                    "30-70": 2,
                    "30-80": 3,
                    "40-60": 5,
                    "40-70": 6,
                    "50-80": 7,
                    "50-60": 8,
                    "50-70": 8,
                    "50-80": 8,
                }
            }
        }
    },
    "female": {
        "size": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        "category": ["T-shirt", "Jeans"],
        "sub-cate": {
            "T-shirt": {
                "chest": [10, 20, 30],
                "sleeve": [30, 40, 50],
                "shoulder": [30, 40, 50],
                "size": {
                    "10-30": 1,
                    "10-40": 2,
                    "10-50": 3,
                    "20-30": 5,
                    "20-40": 6,
                    "20-50": 7,
                    "30-30": 8,
                    "30-40": 8,
                    "30-50": 8,
                }
            },
            "Jeans": {
                "waist": [30, 40, 50],
                "length": [60, 70, 80],
                "size": {
                    "30-60": 1,
                    "30-70": 2,
                    "30-80": 3,
                    "40-60": 5,
                    "40-70": 6,
                    "50-80": 7,
                    "50-60": 8,
                    "50-70": 8,
                    "50-80": 8,
                }
            }
        }
    }
}

const Demo = () => {
    const [categoryView, setCategoryView] = useState(false);
    const [chestView, setChestView] = useState(false);
    const [lengthView, setLengthView] = useState(false);
    const [shoulderView, setShoulderView] = useState(false);


    const [genderdata, setGenderdata] = useState("");
    const [categoryViewData, setCategoryViewData] = useState("");
    const [chestViewData, setChestViewData] = useState("");
    const [lengthViewData, setLengthViewData] = useState("");
    const [shoulderViewData, setShoulderViewData] = useState("");


    const [gender, setGender] = useState(["male", "female"]);
    const [categoryViewList, setCategoryViewList] = useState([]);
    const [chestViewList, setChestViewList] = useState([]);
    const [lengthViewList, setLengthViewList] = useState([]);
    const [shoulderViewList, setShoulderViewList] = useState([]);


    const [output, setOutput] = useState("");

    const genderhandler = (e) => {
        if (e.target.value !== "") {
            setGenderdata(e.target.value);
            setCategoryViewList(sizechart[e.target.value].category);
            setCategoryView(true);
        } else {
            alert("please select any value !")
        }
    }

    const categoryhandler = (e) => {
        if (e.target.value !== "") {
            setCategoryViewData(e.target.value);
            console.log("--", sizechart[genderdata]["sub-cate"][e.target.value]);
            console.log("--", e.target.value);
            if (e.target.value === 'Jeans') {
                const { waist, length } = sizechart[genderdata]["sub-cate"][e.target.value];
            } else {
                const { chest, shoulder, sleeve } = sizechart[genderdata]["sub-cate"][e.target.value];
                setChestViewList(chest);
                setLengthViewList(sleeve);
                setShoulderViewList(shoulder);
                setChestView(categoryViewData === "" || e.target.value ? true : false);
                setLengthView(categoryViewData === "" || e.target.value ? true : false);
                setShoulderView(categoryViewData === "" || e.target.value ? true : false);
            }
        } else {
            alert("please select any value !")
        }
    }

    const chesthandler = (e) => {
        if (e.target.value !== "") {
            setChestViewData(e.target.value);
            if (chestViewData != "" && lengthViewData != "") {
                getOutPut(e.target.value, lengthViewData);
            }
        } else {
            alert("please select any value !")
        }
    }

    const shoulderHandler = (e) => {
        if (e.target.value !== "") {
            setShoulderViewData(e.target.value);
            if (chestViewData != "" && lengthViewData != "") {
                getOutPut(e.target.value, lengthViewData);
            }
        } else {
            alert("please select any value !")
        }
    }

    const lengthhandler = (e) => {
        if (e.target.value !== "") {
            setLengthViewData(e.target.value);
            //console.log(chestViewData, "--", e.target.value);
            getOutPut(chestViewData, e.target.value);
            //if()
        } else {
            alert("please select any value !")
        }
    }

    const getOutPut = (che, len) => {
        console.log(`${che}-${len}`);
        const le = sizechart[genderdata]["sub-cate"][categoryViewData].size[`${che}-${len}`];
        console.log("output -- ", le);

        setOutput(sizechart[genderdata].size[le - 1])
    }

    return (
        <>
            {/* <ThemeMaker> */}
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
                                        <div className="col-md-6" >
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Gender</label>
                                                <select class="form-control"
                                                    onChange={(e) => genderhandler(e)}
                                                >
                                                    <option value="">select option</option>
                                                    {
                                                        gender.map(item => <option value={item}>{item}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            categoryView ?
                                                <div className="col-md-6" >
                                                    <div class="form-group">
                                                        <label for="exampleInputUsername1">Category</label>
                                                        <select class="form-control"
                                                            onChange={(e) => categoryhandler(e)}
                                                        >
                                                            <option value="">select option</option>
                                                            {
                                                                categoryViewList.map(item => <option value={item}>{item}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div> : ""
                                        }
                                        {
                                            chestView ?
                                                <div className="col-md-6" >
                                                    <div class="form-group">
                                                        <label for="exampleInputUsername1">Chest</label>
                                                        <select class="form-control"
                                                            onChange={(e) => chesthandler(e)}
                                                        >
                                                            <option value="">select option</option>
                                                            {
                                                                chestViewList.map(item => <option value={item}>{item}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div> : ""
                                        }
                                        {
                                            shoulderView ?
                                                <div className="col-md-6" >
                                                    <div class="form-group">
                                                        <label for="exampleInputUsername1">Shoulder</label>
                                                        <select class="form-control"
                                                            onChange={(e) => shoulderHandler(e)}
                                                        >
                                                            <option value="">select option</option>
                                                            {
                                                                shoulderViewList.map(item => <option value={item}>{item}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div> : ""
                                        }
                                        {
                                            lengthView ?
                                                <div className="col-md-6" >
                                                    <div class="form-group">
                                                        <label for="exampleInputUsername1">Sleeve</label>
                                                        <select class="form-control"
                                                            onChange={(e) => lengthhandler(e)}
                                                        >
                                                            <option value="">select option</option>
                                                            {
                                                                lengthViewList.map(item => <option value={item}>{item}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div> : ""
                                        }
                                        {/* {
                                                op1dataView ?
                                                    <div className="col-md-6" >
                                                        <div class="form-group">
                                                            <label for="exampleInputUsername1">Option 1</label>
                                                            <select class="form-control"
                                                                name=""
                                                                onChange={(e) => op1handler(e)}
                                                            >
                                                                <option value="">select option</option>
                                                                {
                                                                    op1.map(item => <option value={item}>{item}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                    </div> : ""
                                            }
                                            {
                                                op2dataView ?
                                                    <div className="col-md-6" >
                                                        <div class="form-group">
                                                            <label for="exampleInputUsername1">Option 1 value</label>
                                                            <select class="form-control"
                                                                name=""
                                                                onChange={(e) => op2handler(e)}
                                                            >
                                                                {
                                                                    op2.map(item => <option value={item}>{item}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                    </div> : ""
                                            }
                                            {
                                                op3dataView ?
                                                    <div className="col-md-6" >
                                                        <div class="form-group">
                                                            <label for="exampleInputUsername1">Option 2</label>
                                                            <select class="form-control"
                                                                name=""
                                                                onChange={(e) => op3handler(e)}
                                                            >
                                                                {
                                                                    op3.map(item => <option value={item}>{item}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                    </div> : ""
                                            } */}
                                        <div className="col-md-6" >
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Size Output</label>
                                                <h3>{output}</h3>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </ThemeMaker> */}


        </>
    )
}

export default Demo;


