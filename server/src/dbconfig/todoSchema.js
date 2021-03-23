import mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
    title: { type: String, requried: true },
    description: { type: String, default: ''},
    category: {type: String, enum: ['todo', 'doing', 'done'], default: 'todo'}
})