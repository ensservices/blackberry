const axios = require("axios");
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRvbTFAbmVkaXZhdGVjaC5jb20iLCJuYW1laWQiOiIxNTE0IiwibmJmIjoxNjg3MDEwMjk2LCJleHAiOjE2ODcwMTM4OTYsImlhdCI6MTY4NzAxMDI5Nn0.IikGEIumy6PzffXQR75OwPDYK_ObufnmwZuCchl9jCM';

async function fetchPokemons() {
    const promises = [];
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const bids = ['62977', '64558', '64618', '63191', '63431', '63043', '64797', '62351', '62520', '64126'];
    bids.forEach(item => {
        const result = axios.get(`https://grnappapi-prod.grnconnect.com/api/Book/bookingdetails?BookingId=BID-${item}`,
            config);
        promises.push(result);
    })
    const results = await Promise.all(promises);

    const actualDatas = results.map((result) => result.data.data);
    console.log(actualDatas);
}

//fetchPokemons();


// zara roadstar nike reebok
// m      l       s     m
// s      m       x     l
// x      xl      x     s


const bb = [
    {
        key_1: "zara",
        key_2: "roastar",
        key_1_value: "s",
        key_2_value: "m"
    },
    {
        key_1: "zara",
        key_2: "nike",
        key_1_value: "s",
        key_2_value: "x"
    },
    {
        key_1: "zara",
        key_2: "reebok",
        key_1_value: "s",
        key_2_value: "l"
    }
]

const size = {
    "male": {
        "size": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        "UK": ["6", "8", "10", "12", "14", "16", "18", "20"],
        "US": ["2", "4", "6", "8", "10", "12", "14", "16"],
        "Waist": ["32", "34", "36", "38", "40", "42", "44", "46"],
        "Hips": ["2", "4", "6", "8", "10", "12", "14", "16"],
    },
    "female": {
        "size": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
        "UK": ["6", "8", "10", "12", "14", "16", "18", "20"],
        "US": ["2", "4", "6", "8", "10", "12", "14", "16"],
        "Waist": ["32", "34", "36", "38", "40", "42", "44", "46"],
        "Hips": ["2", "4", "6", "8", "10", "12", "14", "16"],
    }
}

console.log(size["male"]["size"]);
console.log(size["male"]["size"].indexOf("L"));