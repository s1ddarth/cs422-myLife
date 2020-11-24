function foo1(){
    let inputValue = document.getElementById("foodName").value;
    document.getElementById("mealNameConfirm").innerText=inputValue;
}


function newFood(){
    let foodList = document.createElement("li");
    let inputValue = document.getElementById("foodName").value;
    let t = document.createTextNode(inputValue);
    // let str1 = "Dinner: ";
    // let str2 = "world!";
    // let res = str1.concat(foodList);
    foodList.appendChild(t);
    if (inputValue === '') {
        alert("Type in a food");
    } else {
        foodList.className = "pageList";
        document.getElementById("mealList").appendChild(foodList);
    }
    document.getElementById("myInput").value = "";
    // x.querySelector("mealNameConfirm").innerHTML = "Hello World!";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    foodList.appendChild(span);

    let i = 0;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}