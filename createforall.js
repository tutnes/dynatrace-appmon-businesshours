process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Needed because of wrong Cipher 
var http = require("https");

var username = 'admin';
var password = 'admin';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');


var options = {
  "method": "GET",
  "hostname": "localhost",
  "port": "8021",
  "path": "/api/v2/profiles",
  "headers": {
    "content-type": "application/json",
    "authorization": auth
  }

};

var exampleHour2 = {
  "businesshoursName": "ExcludeDaily 06:50-07:10",
  "body": {
    "exclusions": [{
        "timespan": {
        "start": "06:50",
        "end": "07:10"
      }
    }]
  }
};

var exampleHour = {
  "businesshoursName": "ExcludeDaily 06:50-07:10",
  "body": {
    "inclusions": [{
      "timespan": {
        "start": "07:40",
        "end": "19:50"
      }
    }]
  }
};


function getBusinessHours(profile) {
  let path = encodeURI("/api/v2/profiles/" + d + "/businesshours");
  options.path = path;
  invokeRest(options, logOutput);
}

function getBusinessHour(profile, name) {
  let path = encodeURI("/api/v2/profiles/" + profile + "/businesshours/" + name);
  options.path = path;
  invokeRest(options, logOutput);
}

function putBusinessHour(profile, name, body) {
  let path = encodeURI("/api/v2/profiles/" + profile + "/businesshours/" + name);
  options.method = "PUT";
  options.path = path;
  options.body = body;
  invokeRest(options, logOutput);
}

function deleteBusinessHour(profile, name) {
  let path = encodeURI("/api/v2/profiles/" + profile + "/businesshours/" + name);
  options.method = "DELETE";
  options.path = path;
  invokeRest(options, logOutput);
}


function logOutput(d) {
  console.log(d);
}

function getProfiles(d) {
  for (let i = 0; i < d.systemprofiles.length; i++) {
    //deleteBusinessHour(d.systemprofiles[i].id,exampleHour2.businesshoursName);
    //putBusinessHour(d.systemprofiles[i].id,exampleHour2.businesshoursName,exampleHour2.body);
    //getBusinessHours(d.systemprofiles[i].id);
  }
}

function invokeRest(options, cb) {
  var req = http.request(options, function(res) {
    var chunks = [];
    res.on("data", function(chunk) {
      chunks.push(chunk);
    });
    res.on("end", function() {
      var body = Buffer.concat(chunks);
      var d = JSON.parse(body.toString());
      cb(d);
    });
  });
  if (options.body) {
    req.write(JSON.stringify(options.body));
  }
  req.end();
}

invokeRest(options, getProfiles);