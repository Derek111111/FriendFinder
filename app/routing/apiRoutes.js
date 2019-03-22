var path = require("path");
var friends = require("./../data/friends.js");

module.exports = function(app){

    app.get("/api/friends",function(req,res){

        res.json(friends);

    });

    app.post("/api/friends",function(req,res){


        var closestMatch = {
            diff: 999,
            name:"nobody",
            image:""
        }

        var newUser = req.body;
        for(var i = 0; i < friends.length; i++){

            var currFriend = friends[i];
            //make sure they arent matching with themselves
            if((currFriend.image !== newUser.image) && (currFriend.name !== newUser.name)){
                console.log("check!");
                var diff = findDifference(newUser, currFriend);
                console.log(diff);
                //if they are a closer match set it
                if( diff < closestMatch.diff){
                    closestMatch.diff = diff;
                    closestMatch.name = currFriend.name;
                    closestMatch.image = currFriend.image;
                }
            }

        }

        console.log(closestMatch);

        //add it after because they would just match with themselves!
        friends.push(req.body);

        res.json(closestMatch);

    });

    function findDifference(user, user2){

        var user1Answers = user.answers;
        var user2Answers = user2.answers;
        console.log(user1Answers, user2Answers);

        var totalDiff = 0;
        for(var i = 0; i < user1Answers.length; i++){

            var diff = Math.abs(user1Answers[i]- user2Answers[i]);
            console.log(diff);
            totalDiff += diff;

        }

        return totalDiff;


    }


};