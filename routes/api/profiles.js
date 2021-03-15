'use strict';

const express = require('express');
const router = express.Router();
const profiles = require('../../client/json/Profile.json').profiles;

router.get('/:id', (req, res) => {
    const found = profiles.some(profile => (profile.id === parseInt(req.params.id)));
    if (found) {
        res.json(profiles.filter(profile => (profile.id === parseInt(req.params.id)))[0]);
    }
    else {
        res.json({ msg: "There is no profile with the id: " + req.params.id});
    }
})

module.exports = router;