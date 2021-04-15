'use strict';

const express = require('express');
const router = express.Router();
const profiles = require('../../client/json/Profile.json').profiles;

router.get('/:id', (req, res) => {
    const found = profiles.some(profile => (profile.id === req.params.id));
    if (found) {
        res.json(profiles.filter(profile => (profile.id === req.params.id))[0]);
    }
    else {
        res.json({ msg: "There is no profile with the id: " + req.params.id});
    }
})

router.post('/add', (req, res) => {
    let newUser = req.body;
    profiles.push(newUser);
})

router.put('/review', (req, res) => {
    const found = profiles.some(profile => (profile.id === req.body.id));
    if (found) {
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].id === req.body.id) {
                let newProfile = profiles[i];
                newProfile.rating = parseFloat(Number.parseFloat((newProfile.rating * newProfile.numberOfRatings + req.body.rating)/(newProfile.numberOfRatings + 1)).toFixed(1));
                newProfile.numberOfRatings++;
                profiles[i] = newProfile;
            }
        }
    }
    else {
        res.json({ msg: "There is no profile with the id: " + req.body.id});
    }
})

module.exports = router;