import mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
    title: { type: String, requried: true },
    description: { type: String, default: ''},
    done: {type: Boolean, default: false}
})