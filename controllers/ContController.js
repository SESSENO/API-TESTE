const e = require("express");
const { response } = require("express");
const ContSchema = require("../models/ContModels");
const ContModels = require("../models/ContModels");


class ContController {

    static async addCont(req, res){
        const { value, title, description, opcode } = req.body;
        let date = req.body.date;
        date = new Date(date);
        let filter = new Date(date);
        const cont = ContModels({date, value, title, description, opcode});
        await cont.save();
        res.status(201).json({message: 'Adicionado, deu certo!!'})
    }

    static async removeCont(req, res){ 
        const {_id} = req.body;

        console.log(_id);

        if(!_id){
            res.status(401).json({message: `parâmetro-remoção-nulo`});
            return
        }
        const cont = await ContSchema.find({_id:_id});
        console.log(cont);

        if(cont == null || !cont || cont == ""){
            res.status(401).json({message: `parâmetro-${_id}-inexistente`});
            return
        }
        
        await ContSchema.findByIdAndDelete(_id);
        
        res.status(202).json({message: `registro- ${_id} - removido`});
    }

    static async updateCont(req, res){
        
        const { _id, date, value, title, description, opcode } = req.body;

        const cont = await ContSchema.find({_id:_id});
        console.log(cont);

        if(cont == null || !cont || cont == ""){
            res.status(401).json({message: `parâmetro-${_id}-inexistente`});
            return
        }

        await ContSchema.findByIdAndUpdate(_id, {value, date,  title, description, opcode});

        res.status(202).json({message: `registro - ${_id} - atualizado`});
    }

    static async showCont(req, res){
        const cont = await ContSchema.find({});
        res.status(202).json(cont);
    }

    static async showOpcode(req, res){
        const{opcode} = req.params;
        const cont = await ContSchema.find({opcode:opcode});
        res.status(202).json(cont);
    }

    static async showAvExpenses(req, res){
        let soma =0;
        const cont = await ContSchema.find({opcode: false});
        for(let opcode of cont){ soma = soma + opcode.value}
        let media = soma/cont.length;
        res.status(202).json(media);
    }

    static async showAvRevenue(req, res){
        let soma =0;
        const cont = await ContSchema.find({opcode: true});
        for(let opcode of cont){ soma = soma + opcode.value}
        let media = soma/cont.length;
        res.status(202).json(media);
    }

    static async monthReport(req, res){
        let {month, year, opcode}  = req.params;

        if(opcode != 1 && opcode!=0)
        {
            res.status(402).json({message: `lista-parâmetros-inválidos-nulo`});
            return
        }

        const desc= [];
        let soma =0;
        const cont = await ContSchema.find({date: {$gte: new Date(`${year},${month-1},30`), $lte: new Date(`${year},${month},30`)}}).find({opcode:`${opcode}`});
        for(let desc of cont){soma += desc.value};
        console.log(cont, month, year, opcode);


        if(opcode == true){ 
            res.status(201).json({histórico_receitas : cont, receitas: `RECEITAS ${month}/${year} : R$ ${soma}`});
            return
        }else{
            res.status(201).json({histórico_despesas : cont, despesas: `DESPESAS ${month}/${year} : R$ ${soma}`});

        }

    }

    static async balanceReport(req, res){
        let {month, year}  = req.params;


        const descR = [];
        const descD = [];
        let somaR =0;
        let somaD =0;
        const contR = await ContSchema.find({date: {$gte: new Date(`${year},${month-1},30`), $lte: new Date(`${year},${month},30`)}}).find({opcode: 1});
        for(let descR of contR){somaR += descR.value};

        const contD = await ContSchema.find({date: {$gte: new Date(`${year},${month-1},30`), $lte: new Date(`${year},${month},30`)}}).find({opcode: 0});
        for(let descD of contD){somaD += descD.value};
        console.log(month, year);

        let resultado = parseFloat(somaR - somaD);
        console.log(resultado);

        res.status(201).json({despesas: `DESPESAS ${month}/${year} : R$ ${somaD}`, receitas: `RECEITAS ${month}/${year} : R$ ${somaR}`, resultado});
        
        }
    }


module.exports = ContController;
