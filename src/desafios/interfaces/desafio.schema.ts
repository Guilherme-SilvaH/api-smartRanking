import * as mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema({
    dataHoraDesafio: { type: Date },
    status: { type: String }, // Corrigido: String com S maiúsculo
    dataHoraSolicitacao: { type: Date },
    dataHoraResposta: { type: Date }, // Corrigido: dataHoraRespota para dataHoraResposta
    solicitante: { type: mongoose.Schema.Types.ObjectId, ref: "Jogador" }
});