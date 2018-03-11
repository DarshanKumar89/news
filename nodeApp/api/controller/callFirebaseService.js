var firebaseAdmin = require('../../config/firbase');
var db = firebaseAdmin.database();
var ref = db.ref();
var fs = require("fs");
var newsRef = ref.child("news");
var path = require('path');
var jsonData = require('../../data/data.json');

exports.callFirebaseApi = function(){
    newsRef.set(null);
    var newsIndex = 0;
    setInterval(function(){
        var newPostRef = newsRef.push();
        fs.readFile(path.join(__dirname, '../../data/data.json'), function(err, data){
            if(err) return;
            result = JSON.parse(data);
            if(newsIndex <= (result.length -1)) {
                newPostRef.push().set(result[newsIndex]);
            }
            console.log(newsIndex, ' saved successfully');
            newsIndex++;
        });
    },2000);
}


