//Waiting for event by clicking
document.addEventListener('click', evtClick);
var preVal = '';

function evtClick(evt) {
    //console.log(evt.target.className);
    
    let className = evt.target.className;
    let newVal = evt.target.id;

    if (className.substring(0,7) != 'cal-btn') return;
    
    screenVal = document.getElementById("outPuts").innerHTML;   

    if (newVal == 'AC'){
        document.getElementById("outPuts").innerHTML = '';
        return;
    }

    if (newVal == 'CE'){
        console.log (screenVal);
        let length = screenVal.length
        //console.log(screenVal.substring (0,length-1));

        document.getElementById("outPuts").innerHTML = screenVal.substring (0,length-1);
        return;
    }

    if (screenVal.length == 1 && preVal == 0 && (parseInt(newVal) == newVal) ){
        console.log("no start with 02,03,04...");
        return;        
    }

    if ( (parseInt(preVal) != preVal) && (parseInt(newVal) != newVal) ){
        console.log("no repeat operator");
        return;        
    }

    if (preVal == newVal) {
        
        if (screenVal.length == 1 && newVal == 0) {
            console.log("no start double 0");
            return;
        }
        
        if (parseInt(newVal) != newVal) {
        console.log("it is the same string, ingnore it");
        return;
        }
    }

    if ((screenVal.length == 0) && (parseInt(newVal) != newVal) && newVal != '-') {
        console.log("no start with operator");
        return;
    }

     //Calculate 
     if (newVal == '='){
        var result = eval(lastVal);
        console.log (result);
        document.getElementById("outPuts").innerHTML = result;
        return;
    }

    lastVal = screenVal+newVal;
    document.getElementById("outPuts").innerHTML = lastVal;

    preVal = newVal;
    console.log('--->'+lastVal );
}

function btnClick(btnId) {
    console.log(btnId);
}
