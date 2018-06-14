/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        document.getElementById('fetchCall').addEventListener('click', function(evt){
            fetchFunc();
        },false);
        document.getElementById('ajaxCall').addEventListener('click', function(evt){
            ajaxFunc();
        },false);
        document.getElementById('clean').addEventListener('click', function(evt){
            document.getElementById("result").innerHTML = '';
        },false);
    }
};

app.initialize();

function ajaxFunc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open(getMethod(), getTestingURL(), true);
    if (shouldSetHeaders()) {
        xhttp.setRequestHeader('Content-Type', 'application/json');
    }
    var params = null;
    if (getMethod() === "POST") {
        params = "name=test&password=test";
    }
    xhttp.send(params);
}

function fetchFunc() {
    
    var options = {
        method: getMethod(),
        mode: 'cors',
    }
    if (getMethod() === "POST") {
        options.body = JSON.stringify({
            name: 'testname',
            password: 'testpassword'
        })
    }
    if (shouldSetHeaders()) {
        var myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        options.headers = myHeader;
    }
    fetch(getTestingURL(), options).then(function(response) {
        return response.text();
    }).then(function(result) {
        document.getElementById("result").innerHTML = result;
    }).catch(function(err) {
        document.getElementById("result").innerHTML = JSON.stringify(err);
    });
}

function getTestingURL() {
    var secure = document.getElementById("secure");
    if (secure.checked) {
        return "https://httpbin.org/anything";
    } else {
        return "http://httpbin.org/anything";
    }
}

function shouldSetHeaders(){
    var headers = document.getElementById("headers");
    return headers.checked;
}

function getMethod(){
    var postCheck = document.getElementById("post");
    if (postCheck.checked) {
        return "POST";
    } else {
        return "GET";
    }
}