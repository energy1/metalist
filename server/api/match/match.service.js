'use strict';

import Match from './match.model';

export function findById(matchId) {
  return Match.findOne({_id: matchId}).populate("priceSchema");
}

export function getNextMatches() {
  return Match.find({
    $or: [
      {date: {$gt: Date.now()}},
      {date: null}
    ]
  })
    .populate("priceSchema")
    .sort({date: 1});
}

export function getPrevMatches() {
  return Match.find({date: {$lt: Date.now()}})
    .sort({date: -1});
}

export function getNextMatch() {
  let date = new Date;
  return Match.find({ date: { $gt: date.setHours(date.getHours() + 3) }})
    .sort({date: 1})
    .then( matches => matches[0] );
}

export function createMatch(newMatch) {
  let match = new Match({
    rival: newMatch.rival,
    info: newMatch.info,
    poster: newMatch.poster,
    priceSchema: newMatch.priceSchema.id,
    stadiumName: newMatch.priceSchema.priceSchema.stadiumName
  });
  return match.save();
}

export function removeById(matchId) {
  return Match.findByIdAndRemove(matchId);
}

export function updateMatch(match, modifiedMatch) {
  match.round = modifiedMatch.round;
  match.rival = modifiedMatch.rival;
  match.date = modifiedMatch.date;
  match.poster = modifiedMatch.poster;
  match.info = modifiedMatch.info;
  match.abonement = modifiedMatch.abonement;
  match.priceSchema = modifiedMatch.priceSchema.id;

  return match.save();
}
