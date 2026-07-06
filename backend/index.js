require('dotenv').config();

const express=require('express');
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser");

const  HoldingModel  = require('./model/HoldingModel');
const  PositionsModel  = require('./model/PositionsModel');
const OrdersModel = require('./model/OrdersModel');
const  UserModel  = require("./model/UserModel");
const  PaperTradingModel  = require("./model/PaperTradingModel");

const PORT= process.env.PORT || 3002;
const uri=process.env.MONGO_URL;

const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// app.get('/addHoldings',async(req,res)=>{

//     let tempHoldings= [
//         {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
        
        
//     ];

//     tempHoldings.forEach((item)=>{
//         let newHolding= new HoldingModel({
//             name:item.name,
//             qty:item.qty,  
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         });
//         newHolding.save();
//      });
//      res.send("done");
//  });


// app.get("/addPositions",async(req , res)=>{
//     let tempPosition=[
//         {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//     ];
//     tempPosition.forEach((item)=>{
//         let newPosition=new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });
//         newPosition.save();
//     })
//     res.send("Done");
// })

app.get("/allHoldings",async(req,res)=>{
    let allHoldings= await HoldingModel.find({});
    res.json(allHoldings);
})

app.get("/allPositions",async(req,res)=>{
    let allPositions= await PositionsModel.find({});
    res.json(allPositions);
})

app.post("/newOrder",async (req,res)=>{
    console.log(req.body);
   try {

    // total cost 
    const totalCost= Number(req.body.qty) * Number(req.body.price);

  console.log("Searching for userId:", req.body.userId);

    const allWallets = await PaperTradingModel.find();

    console.log(
        "All Wallets:",
        allWallets.map((w) => ({
            userId: w.userId.toString(),
            balance: w.balance,
        }))
    );

    const wallet = await PaperTradingModel.findOne({
        userId: req.body.userId,
    });

    console.log("Wallet Found:", wallet);

    if (!wallet) {
        return res.status(404).json({
            message: "wallet not found",
        });
    }

    if(wallet.balance < totalCost){
        return res.status(400).json({
            message:"Insufficient balance",
        });
    }
    
    wallet.balance -= totalCost;

    await wallet.save();

    let newOrder = new OrdersModel({
      userId:req.body.userId,  
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    console.log(newOrder);
    await newOrder.save();  // important to await

    res.json({ message: "Order created successfully" });
  } catch (err) {
        console.log(err);          // Print the complete error
        console.log(err.message);  // Print just the message

        res.status(500).json({
            error: err.message,
        });
    }
});

// New user( Sign up )
app.post("/newUser",async (req,res)=>{

    console.log("Signup root hit");
    try{

        const existingUser = await UserModel.findOne({email :req.body.email});

        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }


        let newUser=new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        await newUser.save();

        const paperTrading= new PaperTradingModel({
            userId: newUser._id,
        });

        await paperTrading.save();

        res.json({ message : "Done"});
    } catch (err){
        res.status(500).json({ error: err.message });
    }
})

app.post("/login",async(req,res)=>{
    try{
        const user=await UserModel.findOne({email: req.body.email});
        
        console.log("Email:", req.body.email);
        console.log("Password:", req.body.password);

        if(!user){
            return res.status(404).json({
                message: "User not found",
            });
        }

        if(user.password !== req.body.password){
            return res.status(400).json({ message: "Invalid password"});
        }
        
        console.log("Logged in user:", user);

        res.status(200).json({
        message: "Login successful",
        user,
        });
    }catch (err) {
        res.status(500).json({
        message: "Server Error",
        });
    }

   
});
// app.listen(PORT,()=>{
//     console.log("app started");
//     mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("DB Connected"))
//     .catch((err) => console.log(err));
//     console.log("db connected");
// })

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log("Connected DB:", mongoose.connection.name);
       
    });
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});