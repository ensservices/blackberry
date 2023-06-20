import axios from "axios";
import { useEffect, useState } from "react";
const sizechart = {
    "male": {
        "size": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        "Shoulder": ["32", "34", "36", "38", "40", "42", "44", "46"],
        "Chest": ["22", "44", "66", "88", "100", "122", "144", "166"],
        "Armlength": ["22", "44", "66", "88", "100", "122", "144", "166"],
        "key": ["size","Shoulder", "Armlength", "Chest"]
    },
    "female": {
        "sizew": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        "UK": ["6", "8", "10", "12", "14", "16", "18", "20"],
        "US": ["2", "4", "6", "8", "10", "12", "14", "16"],
        "Waist": ["32", "34", "36", "38", "40", "42", "44", "46"],
        "Hips": ["22", "44", "66", "88", "100", "122", "144", "166"],
        "key": ["sizew", "UK", "US", "Waist", "Hips"]
    }
}

// Tshirt, Shirt, Jeans
// Tshirt , Jeans
// Jeans - Waist, Hips, Length
//"UK": ["6", "8", "10", "12", "14", "16", "18", "20"],
//"US": ["2", "4", "6", "8", "10", "12", "14", "16"],

// Not sure about size which last brand cloths you have purchase
// brands name will list
// Male or female
// tshirts , Jeans ect.
//  size


const Demo = () => {
    const [op1dataView, setOp1dataView] = useState(false);
    const [op2dataView, setOp2dataView] = useState(false);
    const [op3dataView, setOp3dataView] = useState(false);



    const [genderdata, setGenderdata] = useState("");
    const [op1data, setOp1data] = useState("");
    const [op2data, setOp2data] = useState("");
    const [op3data, setOp3data] = useState("");


    const [gender, setGender] = useState(["male", "female"]);
    const [op1, setOp1] = useState([]);
    const [op2, setOp2] = useState([]);
    const [op3, setOp3] = useState([]);

    const [output, setOutput] = useState("");

    const genderhandler = (e) => {
        if (e.target.value !== "") {
            setOp1dataView(true);
            setGenderdata(e.target.value);
            console.log("jj", sizechart[e.target.value].key);
            setOp1(sizechart[e.target.value].key)

            if(op1dataView){
                setOp2dataView(false);
                setOp3dataView(false);
            }
        } else {
            setOp1dataView(false);
            setOp2dataView(false);
            setOp3dataView(false);
            alert("please select any value !")
        }
        
    }
    const op1handler = (e) => {
        if (e.target.value !== "") {
            setOp2dataView(true);
            setOp1data(e.target.value)
            console.log(genderdata, e.target.value );
            setOp2(sizechart[genderdata][e.target.value]);
            setOp3dataView(false);
            setOp3data("");
            setOutput("");
        } else {
            setOp2dataView(false);
            alert("please select any value !")
        }
        // if(genderdata, op1data, op2data, op3data){
        //     console.log("vv", genderdata, e.target.value, op2data, op3data);
        //     getOutPut(genderdata, e.target.value, op2data, op3data);
        // }
    }
    const op2handler = (e) => {
        if (e.target.value !== "") {
            setOp3dataView(true);
            console.log(genderdata, op1, e.target.value );
            setOp2data(e.target.value);
            setOp3(sizechart[genderdata].key);

        } else {
            setOp3dataView(false);
            alert("please select any value !")
        }
        if(genderdata, op1data, op2data, op3data){
            getOutPut(genderdata, op1data, e.target.value, op3data);
        }
    }
    const op3handler = (e) => {
            console.log(genderdata, op1data, op2data, e.target.value);
            setOp3data(e.target.value);
            getOutPut(genderdata, op1data, op2data, e.target.value);
    }

    function getOutPut(gender, _op1, _op2, _op3){
        //male Waist 14 US
        const index = sizechart[gender][_op1].indexOf(_op2);
        const fin = sizechart[gender][_op3][index];
        console.log("fin", fin);
        setOutput(fin)

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
                                            }
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


