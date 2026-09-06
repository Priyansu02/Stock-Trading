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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");

const PORT= process.env.PORT || 3002;
const uri=process.env.MONGO_URL;

const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.get("/allHoldings", authMiddleware, async (req, res) => {
    try {
        const holdings = await HoldingModel.find({
            userId: req.userId,
        });

        res.json(holdings);

    } catch (err) {
        console.log("HOLDINGS ERROR:", err);

        res.status(500).json({
            message: "Failed to fetch holdings",
            error: err.message,
        });
    }
});

app.get("/allPositions",async(req,res)=>{
    let allPositions= await PositionsModel.find({});
    res.json(allPositions);
})

app.get("/allOrders", authMiddleware, async (req, res) => {
    try {
        const orders = await OrdersModel.find({
            userId: req.userId,
        }).sort({ _id: -1 });

        res.json(orders);

    } catch (err) {
        console.log("ORDERS ERROR:", err);

        res.status(500).json({
            message: "Failed to fetch orders",
            error: err.message,
        });
    }
});

app.get("/allTransactions", authMiddleware, async (req, res) => {
    try {
        const transactions = await OrdersModel.find({
            userId: req.userId,
        }).sort({ _id: -1 });

        res.json(transactions);

    } catch (err) {
        console.log("TRANSACTIONS ERROR:", err);

        res.status(500).json({
            message: "Failed to fetch transactions",
            error: err.message,
        });
    }
});

app.post("/newOrder",authMiddleware,async (req,res)=>{
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
    const userId = req.userId;

    const wallet = await PaperTradingModel.findOne({
        userId: userId,
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
      userId:req.userId,  
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    
    await newOrder.save();  // important to await

    let holding = await HoldingModel.findOne({
        userId: req.body.userId,
        name:req.body.name,
    });

    if(holding){
        const toalQty=holding.qty+ Number(req.body.qty);

        const newAvg=
            (
                holding.qty * holding.avg +Number(req.body.qty)*Number(req.body.price)
            )/toalQty;
        
        holding.qty=toalQty;
        holding.avg=Number(newAvg.toFixed(2));
        holding.price=Number(req.body.price);

        await holding.save();

    }else{
        const newHolding=new HoldingModel({
            userId:req.userId,
            name: req.body.name,
            qty: Number(req.body.qty),
            avg: Number(req.body.price),
            price: Number(req.body.price),
            net: "+0%",
            day: "+0%",        
        });

        await newHolding.save();
    }

    res.json({ message: "Order created successfully" });
  } catch (err) {
         // Print just the message

        alert(err.response?.data?.message || "Something went wrong");
    }
});

//sell order
app.post("/sellOrder",authMiddleware, async(req,res)=>{
    try{

        const userId = req.userId;

        const wallet= await PaperTradingModel.findOne({
           userId: userId,

        })

        if(!wallet){
            return res.status(404).json({message:"Wallet not found",});
        }

        const holding = await HoldingModel.findOne({
            userId,
            name: req.body.name,
        });

        if(!holding){
            return res.status(404).json({
                message:"Holding not found",
            });
        }

        if(holding.qty < Number(req.body.qty)){
            return res.status(400).json({
                message:"Not enough shares",
            });
        }

        holding.qty -= Number(req.body.qty);

        const totalAmount = Number(req.body.qty)* Number(req.body.price);

        wallet.balance += totalAmount;

        if(holding.qty === 0){
            await HoldingModel.deleteOne({
                _id: holding._id,
            });
        }else{
            await holding.save();
        }

        await wallet.save();

        const order=new OrdersModel({
                userId,
                name:req.body.name,
                qty:req.body.qty,
                price:req.body.price,
                mode:"SELL",
        })

        await order.save();

        res.json({
            message:"sell Order Successful",
        })
    }catch(err){
       alert(err.response?.data?.message || "Something went wrong");
    }
})

app.get("/wallet",authMiddleware, async (req, res) => {
    try {
        const wallet = await PaperTradingModel.findOne({
            userId: req.userId,
        });

        if (!wallet) {
            return res.status(404).json({
                message: "Wallet not found",
            });
        }

        res.json(wallet);

    } catch (err) {
        console.log("WALLET ERROR:", err);

        res.status(500).json({
            message: "Failed to fetch wallet",
            error: err.message,
        });
    }
});

app.get("/user",authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            name: user.name,
            email: user.email,
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

app.get("/transactions",authMiddleware, async (req, res) => {
    try {

        const transactions = await OrdersModel.find({
            userId: req.userId,
        }).sort({ _id: -1 });

        res.json(transactions);

    } catch (err) {

        alert(err.response?.data?.message || "Something went wrong");

    }
});


//holding count
app.get("/holdings",authMiddleware, async (req, res) => {
    try {
        const holdings = await HoldingModel.find({
            userId: req.userId,
        });

        res.json(holdings);
    } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
    }
});

//order count
app.get("/orders",authMiddleware, async (req, res) => {
    try {
        const orders = await OrdersModel.find({
            userId: req.userId,
        });

        res.json(orders);
    } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
    }
});

//dashboard
app.get("/dashboard",authMiddleware, async (req, res) => {
    try {

        const holdings = await HoldingModel.find({
            userId: req.userId,
        });

        let investment = 0;
        let currentValue = 0;

        holdings.forEach((stock) => {

            investment += stock.avg * stock.qty;

            currentValue += stock.price * stock.qty;

        });

        res.json({
            investment,
            currentValue,
            profitLoss: currentValue - investment,
        });

    } catch (err) {
       alert(err.response?.data?.message || "Something went wrong");
    }
});
// New user( Sign up )
app.post("/newUser",async (req,res)=>{

   // console.log("Signup root hit");
    try{

        const existingUser = await UserModel.findOne({email :req.body.email});

        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let newUser=new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
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

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password",});
        }
        
       const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }catch (err) {
        console.error(err);
       res.status(400).json({ message: "Error" });
    }

   
});

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log("Connected DB:", mongoose.connection.name);
       
    });
})
.catch((err) => {
     console.error(err);
});