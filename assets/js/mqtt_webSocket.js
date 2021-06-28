var selectedClientID;
var sensors;
var hasil;
var topic;
var StatusPompa = true;
var mqtt;
function startConnect() {
    clientID = "clientID-" + "Control Panel";
    host = "broker.emqx.io";
    port = "8083";
    user = "1710510160@stmikbumigora.ac.id";
    pass = "acongmursan";
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
    phSensor = "1710510160@stmikbumigora.ac.id/sensor/ph";
    sensorKelembaban = "1710510160@stmikbumigora.ac.id/kelembaban";
    watherLevel = "1710510160@stmikbumigora.ac.id/sensor/levelair";
    suhuArea = "1710510160@stmikbumigora.ac.id/sensor/suhu";
    suhuAir = "1710510160@stmikbumigora.ac.id/sensor/suhuair";
    client.subscribe(phSensor);
    client.subscribe(sensorKelembaban);
    client.subscribe(watherLevel);
    client.subscribe(suhuArea);
    client.subscribe(suhuAir);
}
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}
function onMessageArrived(message) {
    switch (message.destinationName) {
        case "1710510160@stmikbumigora.ac.id/sensor/suhuair":
            document.getElementById("temp").innerHTML = '<h6 class="font-extrabold mb-0"> ' + message.payloadString + '</h6>';
            break;
        case "1710510160@stmikbumigora.ac.id/sensor/levelair":
            document.getElementById("Watherlevel").innerHTML = '<h6 class="font-extrabold mb-0"> ' + message.payloadString + ' Cm</h6>';
            break;
        case "1710510160@stmikbumigora.ac.id/sensor/ph":
            document.getElementById("pHmessages").innerHTML = '<h6 class="font-extrabold mb-0"> ' + message.payloadString + '</h6>';
            break;
        case "1710510160@stmikbumigora.ac.id/sensor/suhu":
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
    var topic = "1710510160@stmikbumigora.ac.id/controll/pompa";
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
    var topic = "1710510160@stmikbumigora.ac.id/controll/nutrisi";
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
