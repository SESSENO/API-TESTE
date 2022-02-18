const ContSchema = require("../models/ContModels");
const ContModels = require("../models/ContModels");


class ContController {

    static async addCont(req, res){
        const { value, title, description, opcode } = req.body;
        const date = req.body.date;
        console.log(req.body.date);
        const cont = ContModels({date, value, title, description, opcode});
        console.log(cont);
        await cont.save();
        res.status(201).json({message: 'Adicionado, deu certo!!'})
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
        const{opcode} = req.params;
        let soma =0;
        const cont = await ContSchema.find({opcode: false});
        for(let opcode of cont){ soma = soma + opcode.value}
        let media = soma/cont.length;
        res.status(202).json(media);
    }

    static async showAvRevenue(req, res){
        const{opcode} = req.params;
        let soma =0;
        const cont = await ContSchema.find({opcode: true});
        for(let opcode of cont){ soma = soma + opcode.value}
        let media = soma/cont.length;
        res.status(202).json(media);
    }

    
}

module.exports = ContController;
