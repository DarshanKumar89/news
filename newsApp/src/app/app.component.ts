import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import * as _ from "lodash";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  public newsArray: any = [];
  public db: any;
  public dataAvailable: boolean = false;
  constructor(db: AngularFireDatabase) {
    this.db = db;
  }

  ngOnInit() {
    var me = this;
    this.db.object("news").valueChanges().subscribe(function(data) {
      me.newsArray = [];
      _.forEach(data, function(val, key) {
        _.values(val)[0]["firebaseKey_1"] = key;
        _.values(val)[0]["firebaseKey_2"] = _.keys(val)[0];
        me.newsArray.push(_.values(val)[0]);
      });
      me.newsArray = _.sortBy(me.newsArray, ["date"]).reverse();
    });
  }

  archiveNews(newsId, firebase_key_1, firebase_key_2) {
    var me = this;
    var obj = {};
    _.forEach(me.newsArray, function(val, key) {
      if (val.id === newsId) {
        me.newsArray[key].isArchived = true;
        me.newsArray[key].isNew = false;
        me.db.database.ref("news/" + firebase_key_1 + "/" + firebase_key_2).set(me.newsArray[key]);
      }
    });
  }

  removeNews(newsId, firebase_key_1, firebase_key_2) {
    var me = this;
    _.forEach(me.newsArray, function(val, key) {
      if (val.id === newsId) {
        me.db.database.ref("news/" + firebase_key_1 + "/" + firebase_key_2).set(null);
      }
    });
  }
}
