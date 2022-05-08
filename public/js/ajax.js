function $s(sel) {
    return document.querySelector(sel);
}

const Request = {

    get: function(url, success) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200)
                success(this.responseText);

        }

        xhttp.open("GET", url);
        xhttp.send();

    },

    post: function(url, params, success) { // params: JSON
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200)
                success(this.responseText);

        }

        xhttp.open("POST", url);
        xhttp.setRequestHeader("Content-type", "application/json") // application/x-www-form-urlencoded
        xhttp.send(JSON.stringify(params || {}));

    }

}

//ebbe "jönnek" a megjelenítéshez az adatok
let centerlineDatas = [];

//Header
let header = [{
        title: "Gépszám",
        key: "machine_Number"
    },
    {
        title: "Gép rész",
        key: "machine_Part"
    },
    {
        title: "Centerline neve",
        key: "cl_name"
    },
    {
        title: "Érték",
        key: "value"
    },
    {
        title: "Mértékegység",
        key: "measure"
    },
    {
        title: "OPL szám",
        key: "opl"
    },
    {
        title: "Ellenőrzés frekvenciája",
        key: "freq"
    }
];


//Centerline adatok a JSON fájlból + táblázat generálása

let renderCenterlines = (centerlineDatas) => {

    let clListDiv = $s("#cl_list");

    clListDiv.innerHTML = "";
    let row = "";
    let out = "";
    let headers = "";
    let headersOut = "";

    for (const h of header) {
        headers += `<div class="cell header">${h.title}</div>`
    }
    headersOut += `<div class="row">${headers}</div>`;;

    for (let i = 0; i < centerlineDatas.length; i++) {
        row = "";
        for (let key in centerlineDatas[i]) {
            if (key != "_id") {
                row += `<div class="cell">${centerlineDatas[i][key]}</div>`;
            }
        }
        out += `<div class="row">${row}</div>`;

    }

    clListDiv.innerHTML = headersOut + out;

};

// Centerline lista megjelenítése
$s("#cllists").onclick = () => {

    Request.get("/cllist", (res) => {
        centerlineDatas = JSON.parse(res);
        renderCenterlines(centerlineDatas);
    });
}


//Centerline adatok bevitele

$s("#save").onclick = () => {
    let machine_Number = $s("#machineName").value.trim();
    let machine_Part = $s("#machineParts").value.trim();
    let cl_Name = $s("#cl_name").value.trim();
    let value = Number($s("#value").value.trim());
    let measure = $s("#measure").value.trim();
    let opl = $s("#opl").value.trim();
    let freq = $s("#freq").value.trim();

    Request.post("/save", { machine_Number, machine_Part, cl_Name, value, measure, opl, freq }, (res) => {

        $s("#machineName").value = "";
        $s("#machineParts").value = "";
        $s("#cl_name").value = "";
        $s("#value").value = "";
        $s("#measure").value = "";
        $s("#opl").value = "";
        $s("#freq").value = "";
        $s("#cllists").onclick();

    });
}