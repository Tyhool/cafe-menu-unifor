//Salva no banco de dados
import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  userEmail: String,
  telefone: String,
  endereco: String,
  cep: String,
  bairro: String,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);