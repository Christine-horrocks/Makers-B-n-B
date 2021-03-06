'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var spaceSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  spaceName: {
    type: String,
    required: true
  },
  spaceLocation: String,
  spacePricePerNight: String,
  spaceNumberOfRooms: String,
  spaceDescription: String,
  spacePetFriendlyTrue: Boolean
});

mongoose.model('spaces', spaceSchema);
