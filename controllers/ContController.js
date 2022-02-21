const ContSchema = require("../models/ContModels");
const ContModels = require("../models/ContModels");


class ContController {

    static async addCont(req, res){
        const { value, title, description, opcode } = req.body;
        let date = req.body.date;
        // date = new Date(2022, 11, 25);

        // date = date.getMonth(date);
        let filter = new Date(date);
        // d = d.getDay;
        // date = req.body.date;
        // date = date.toDateString();
        // let mes = date.getMonth();
        // var d = date.getDate();
        console.log(d);
        // console.log(date);
        // date = req.body.date;
        // d = date.getMonth;
        // console.log(d);
        let filterDate = filter.getMonth()+1;
        console.log(filterDate);
        const cont = ContModels({date, value, title, description, opcode});
        console.log(cont);
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

        // let conteudoTeste = await ContSchema.findOne({$match: {_id:_id}});
        // console.log(conteudoTeste);

        await ContSchema.findByIdAndDelete(_id);
        
        res.status(202).json({message: `registro- ${_id} - removido`});
    }

    static async updateCont(req, res){
        
        const { _id, value, title, description, opcode } = req.body;

        await ContSchema.findByIdAndUpdate(_id, {value, title, description, opcode});

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
