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
function devInfo(){
    alert(device.platform+"\n"+device.manufacturer+"\n"+device.model);
}