import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import router from "./src/routes";
import mongoClient from "./src/db";

const app = express();
 mongoClient()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(cors());


app.get("/hello", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});
app.use(router);

const buildPath = path.join(__dirname, './ui/build');
app.use(express.static(buildPath));
app.get('*', (req, res)=>{
    res.sendFile(path.join(buildPath, 'index.html'));
});


const portNumber = process.env.PORT || 8000;

app.listen(portNumber, () => {
    console.log(`server is running on http://localhost:${portNumber}`);
})