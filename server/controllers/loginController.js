const db = require("../config/adminModelConfig.js");
const Sequelize = require('sequelize');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const md5 = require('md5');
const Op = Sequelize.Op;
const adminModel = db.adminUsers;
const clientModel = db.client;
const customerModel = db.customer;
const campaignModel = db.campaigns;
var express = require('express');
var app = express();
const { Validator } = require('node-input-validator');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

exports.dashboardCount = async (req, res) => {
    let clientData = customerData = '';
    let result = [];
    try {
        
        await clientModel.findAndCountAll({where:{status:{[Op.not]: '-1'}}}).then((countClient)=> {
            result.push({'No. Of Clients':countClient.count});
        }).catch(err => {
            clientData = res.json({clientMessage:'Error'+err});    
        });
        await customerModel.findAndCountAll({}).then((countCustomer)=> {
            customerData = ({'No. Of Customers':countCustomer.count});
            result.push(customerData);
        }).catch(err => {
            customerData = res.json({customerMessage:'Error'+err});    
        });
        await campaignModel.findAndCountAll({}).then((countCampaign)=> {
            campaignData = {'No. Of Campaigns':countCampaign.count};
            result.push(campaignData);
    }).catch(err => {
        customerData = res.json({status:'False',Message:'Error'+err});    
    });
    res.send(result);
} catch (error) {
    res.status(501).json(error);
}   
};

exports.login = async (req, res) => {
    //console.log(md5('123456'));
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required|minLength:6'
    });
    
      v.check().then((matched) => {
        if (!matched) {
          res.status(422).send(v.errors);
        }
      });

    await adminModel.findOne({
        where:{
            email:req.body.email,
            password:md5(req.body.password)
        }
    }).then( async (user)=> {
        if(!user){
            return res.status(401).send({Message:'UserName And Password is Not Correct.'});    
        }else{
            if(user.role_id=='1001'){
                let twk = await jwt.sign({id:user.id, iat: Math.floor(Date.now() / 1000) - 30 },jwtKey);
                return res.status(200).send({Message:'Login Successfully.',data:user,Token:twk}); 
            }
        }
    }).catch(err => {
        res.status(500).send({Message:'Error'+err});    
    });
    
};
