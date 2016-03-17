/// <reference path="../../plugins/jQuery/jquery-2.1.3.js" />
var curdHelper = {};
curdHelper.addEditedData = function (obj, editdObj) {
    if(editdObj==null){
        return;
    }
   
    for (var i in editdObj) {
        obj[editdObj[i]["name"]] = editdObj[i]["value"];
    }
    return obj;
}
curdHelper.getCookie = function (name) {
    var bikky = document.cookie;
    name += "=";
    var i = 0;
    while (i < bikky.length) {
        var offset = i + name.length;
        if (bikky.substring(i, offset) == name) {
            var endstr = bikky.indexOf(";", offset);
            if (endstr == -1) endstr = bikky.length;
            return unescape(bikky.substring(offset, endstr));
        }
        i = bikky.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
curdHelper.checkPremission = function () {
    var doms = $(".shouldPremission");
    for (var v = 0 ;v<doms.length; v++) {
        if (this.innercheckPremission(doms[v]) != true) {
            $(doms[v]).remove();
        }
        
    }
}
curdHelper.innercheckPremission = function (v) {
    var modules = this.getCookie("PremissionModules");
    var modulesArray = modules.split(',');
    for (var module = 0; module < modulesArray.length ; module++) {
        if ($(v).attr("premission") ==modulesArray[ module]) {
            return true;
        }
    }
    return false;
}
$(function () {
    curdHelper.checkPremission();
})

