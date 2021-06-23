var selectedClientID;
var sensors;
var hasil;
var topic;
var StatusPompa = true;
var mqtt;
function startConnect() {
    clientID = "clientID-" + "Control Panel";
    host = "test.mosquitto.org";
    port = "8081";
    user = "";
    pass = "";
    client = new Paho.MQTT.Client(host, Number(port), clientID);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({
        onSuccess: onConnect,
        userName: user,
        password: pass
    });
}
function onConnect() {
    phSensor = "1710510160UlulAzmi/esp32/ph";
    temperatureSensor = "1710510160UlulAzmi/esp32/temperature";
    watherLevel = "1710510160UlulAzmi/esp32/whaterlevel";
    suhu = "1710510160UlulAzmi/esp32/suhu";
    client.subscribe(phSensor);
    client.subscribe(temperatureSensor);
    client.subscribe(watherLevel);
    client.subscribe(suhu);
}
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}
function onMessageArrived(message) {
    switch (message.destinationName) {
        case "1710510160UlulAzmi/esp32/temperature":
            document.getElementById("temp").innerHTML = '<h6 class="font-extrabold mb-0"> ' + message.payloadString + '</h6>';
            break;
        case "1710510160UlulAzmi/esp32/whaterlevel":
            document.getElementById("Watherlevel").innerHTML = '<h6 class="font-extrabold mb-0"> ' + message.payloadString + ' Cm</h6>';
            break;
        case "1710510160UlulAzmi/esp32/ph":
            document.getElementById("pHmessages").innerHTML = '<h6 class="font-extrabold mb-0"> ' + message.payloadString + '</h6>';
            break;
        case "1710510160UlulAzmi/esp32/suhu":
            document.getElementById("SuhuSekitar").innerHTML = '<h6 class="font-extrabold mb-0"> ' + message.payloadString + ' C</h6>';
            break;
    }
}
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}

function tblPompa() {
    var btn = document.getElementById("tblPompa").value;
    var topic = "1710510160UlulAzmi/esp32/controll/pompa";
    tblmessage = new Paho.MQTT.Message(btn);
    if (btn == "pompa_off") {
        tblmessage.destinationName = topic;
        document.getElementById("tblPompa").value = "pompa_on";
        console.log("Pompa OFF");
    } else {
        tblmessage.destinationName = topic;
        document.getElementById("tblPompa").value = "pompa_off";
        console.log("Pompa ON");
    }
    client.send(tblmessage);
    return false;
}

function tblNutrisi() {
    var btn = document.getElementById("tblNutrisi").value;
    var topic = "1710510160UlulAzmi/esp32/controll/nutrisi";
    tblmessage = new Paho.MQTT.Message(btn);
    if (btn == "nutrisi_off") {
        tblmessage.destinationName = topic;
        document.getElementById("tblNutrisi").value = "nutrisi_on";
        console.log("Nutrisi OFF");
    } else {
        tblmessage.destinationName = topic;
        document.getElementById("tblNutrisi").value = "nutrisi_off";
        console.log("Nutrisi ON");
    }
    client.send(tblmessage);
    return false;
}