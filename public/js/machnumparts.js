var $s = res => document.querySelector(res);

var spanTag = document.createElement("span");



var out = '<div class="inputs" id="inputs">';

$s(".add").onclick = function() {

    var divTag = document.createElement("div");
    divTag.setAttribute("class", "inputs");
    changeIdNum($s("#content").childElementCount - 1);
    var inputTemp = `
        <div>Géprész</div>
        <input type="text" class="parts" name="machineParts" id="machineParts"></input>
    `;
    divTag.innerHTML += inputTemp;
    $s("#content").appendChild(divTag);

}

var changeIdNum = count => {
    for (let i = 0; i < count; i++) {
        //var inputTag = document.createElement("input");
        //inputTag.innerHTML = `<input type="text" class="parts" name="machineParts${i}" id="machineParts"></input>`;
        //console.log(inputTag);
        //return inputTag;
        console.log(i);
    }
}