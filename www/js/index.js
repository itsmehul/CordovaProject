var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        document.getElementById("cameraTakePicture").addEventListener
            ("click", cameraTakePicture);
        document.getElementById("addContact").addEventListener
            ("click", createContact);
        document.getElementById("findContact").addEventListener
            ("click", findContacts);
        document.getElementById("deleteContact").addEventListener
            ("click", deleteContact);
        document.getElementById("devInfo").addEventListener
            ("click", devInfo);
        document.getElementById("getAcc").addEventListener
            ("click", getAcceleration);
        document.getElementById("watchAcc").addEventListener
            ("click", watchAcc);
        document.getElementById("beep").addEventListener
            ("click", beep);
        document.getElementById("devO").addEventListener
            ("click", devOrient);
        document.getElementById("gcurr").addEventListener
            ("click", getCurr);
        document.getElementById("chkConn").addEventListener
            ("click", checkConnection);
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            navigator.vibrate(2000);
        }
        document.getElementById("playAudio").addEventListener("click", playAudio);
        document.getElementById("pauseAudio").addEventListener("click", pauseAudio);
        document.getElementById("stopAudio").addEventListener("click", stopAudio);
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}
function createContact() {
    // create a new contact object
    var contact = navigator.contacts.create({ "displayName": "Jon Doe" });
    // save to device
    contact.save(onSuccess, onError);
    function onSuccess(contact) {
        alert("Save Success");
    };

    function onError(contactError) {
        alert("Error = " + contactError.code);
    };
}
function findContacts() {
    var options = new ContactFindOptions();
    options.filter = "Jon Doe";
    options.multiple = false;
    fields = ["displayName"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            alert("Display Name = " + contacts[i].displayName);
        }
    }

    function contactfindError(message) {
        alert('Failed because: ' + message);
    }
}
function deleteContact() {
    var options = new ContactFindOptions();
    options.filter = "Jon Doe";
    options.multiple = false;
    fields = ["displayName"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {
        var contact = contacts[0]
        contact.remove(onSuccess, onError);
        function onSuccess() {
            alert("Removal Success");
        };

        function onError(contactError) {
            alert("Error = " + contactError.code);
        };
    }

    function contactfindError(message) {
        alert('Failed because: ' + message);
    }
}
function devInfo() {
    alert(device.platform + "\n" + device.manufacturer + "\n" + device.model);
}
function getAcceleration() {
    function onSuccess(acceleration) {
        alert('Acceleration X: ' + acceleration.x + '\n' +
            'Acceleration Y: ' + acceleration.y + '\n' +
            'Acceleration Z: ' + acceleration.z + '\n' +
            'Timestamp: ' + acceleration.timestamp + '\n');
    }

    function onError() {
        alert('onError!');
    }

    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
}
function watchAcc() {
    function onSuccess(acceleration) {
        console.log('Acceleration X: ' + acceleration.x + '\n' +
            'Acceleration Y: ' + acceleration.y + '\n' +
            'Acceleration Z: ' + acceleration.z + '\n' +
            'Timestamp: ' + acceleration.timestamp + '\n');
    }

    function onError() {
        alert('onError!');
    }

    var options = { frequency: 3000 };  // Update every 3 seconds

    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}
function beep() {
    navigator.notification.beep(2);
}

function devOrient() {
    function onSuccess(heading) {
        alert('Heading: ' + heading.magneticHeading);
    };

    function onError(error) {
        alert('CompassError: ' + error.code);
    };

    navigator.compass.getCurrentHeading(onSuccess, onError);
}
function getCurr() {
    navigator.globalization.getCurrencyPattern(
        'USD',
        function (pattern) {
            alert('pattern: ' + pattern.pattern + '\n' +
                'code: ' + pattern.code + '\n' +
                'fraction: ' + pattern.fraction + '\n' +
                'rounding: ' + pattern.rounding + '\n' +
                'decimal: ' + pattern.decimal + '\n' +
                'grouping: ' + pattern.grouping);
        },
        function () { alert('Error getting pattern\n'); }
    );
}
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

var myMedia = null;
function playAudio() {
   var src = "/android_asset/www/assets/morty.mp3";

   if(myMedia === null) {
      myMedia = new Media(src, onSuccess, onError);

      function onSuccess() {
         console.log("playAudio Success");
      }

      function onError(error) {
         console.log("playAudio Error: " + error.code);
      }
   }
   myMedia.play();
}
function pauseAudio() {
    if(myMedia) {
       myMedia.pause();
    }
 }
 
 function stopAudio() {
    if(myMedia) {
       myMedia.stop(); 
    }
    myMedia = null;
 }