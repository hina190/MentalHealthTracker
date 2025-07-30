import mongoose, { Schema, model, models } from 'mongoose'

const MoodSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// This line exports 'Mood'
export const Mood = models.Mood || model('Mood', MoodSchema)
