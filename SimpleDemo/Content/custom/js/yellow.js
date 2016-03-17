//获取表单Json对象
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//根据时间返回时间字符串"2015-06-11"
function getDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + month + "-" + day;
}

//根据时间返回时间字符串"2015-06-11 12:48:16"
function getDateTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
}

//过滤错误时间 add by zx 160119
function isNullDate(date) {
    if (date != null && date.indexOf("-") != -1) {
        var year = date.split("-")[0];
        if (year < 2010) {
            return "";
        }
        else {
            return date;
        }
    }
    else {
        return "";
    }
}

//获取QueryString的数组
function getQueryString() {
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
    for (var i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

//根据QueryString参数索引获取值
function getQueryStringByIndex(index) {
    if (index == null) {
        return "";
    }

    var queryStringList = getQueryString();
    if (index >= queryStringList.length) {
        return "";
    }

    var result = queryStringList[index];
    var startIndex = result.indexOf("=") + 1;

    result = result.substring(startIndex);
    return result;
}

//添加一个cookie
function setCookie(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString(); //d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; " + expires;
}

//根据名字获取Cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return decodeURIComponent(arr[2]);
    else return null;
}

//根据名字删除Cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getDate() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
}

function getJsonObj(jsonStr) {
    return eval('(' + jsonStr + ')');
}

//function getRootPath() {
//    //获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
//    var curWwwPath = window.document.location.href;

//    //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
//    var pathName = window.document.location.pathname;
//    var pos = curWwwPath.indexOf(pathName);

//    //获取主机地址，如： http://localhost:8080
//    var localhostPath = curWwwPath.substring(0, pos);
//    //获取带"/"的项目名，如：/ems
//    //var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

//    return localhostPath;
//}

//根据当前Url获取根路径
function getRootPath(currentUrl) {
    var curWwwPath = window.document.location.href;
    var pos = curWwwPath.indexOf(currentUrl);
    var localhostPath = curWwwPath.substring(0, pos);
    return localhostPath;
}

//自定义BootStrap警告框
function bootStrapAlert(elementId, insertType, alertType, alertContent, fadeOutTime, isFloat) {
    //拼接警告框字符串
    var alertString = "<div id=\"myAlert\" class=\"alert";
    switch (alertType) {
        case "success": alertString += " alert-success"; break;
        case "info": alertString += " alert-info"; break;
        case "warning": alertString += " alert-warning"; break;
        case "danger": alertString += " alert-danger"; break;
        default: alertString += " alert-info"; break;
    }

    if (isFloat == true) alertString += " floatAlert";
    alertString += " alert-dismissible  \" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>";
    alertString += alertContent;
    alertString += "</strong></div>";

    //显示处理好的警告框（表示是在元素前中后哪个位置插入）
    if (insertType == "append") {
        $('#' + elementId).append(alertString);
    } else if (insertType == "before") {
        $('#' + elementId).before(alertString);
    } else if (insertType == "after") {
        $('#' + elementId).after(alertString);
    }

    //添加警告框关闭效果
    if (fadeOutTime != null && fadeOutTime != 0) {
        $('#myAlert').fadeOut(fadeOutTime, function () {
            $('#myAlert').alert('close');
        });
    }
}

//根据类型和值获取中文解释
function getTypeNameByValue(type, value) {
    switch (type) {
        //是或否
        case "YesOrNo": {
            switch (value) {
                case 0: return "否";
                case 1: return "是";
                default: return value;
            }
        }
            //是否处置
        case "IsDisposal": {
            switch (value) {
                case 0: return "未处置";
                case 1: return "已处置";
                default: return value;
            }
        }
            //启用或停用
        case "IsEnable": {
            switch (value) {
                case 0: return "停用";
                case 1: return "启用";
                default: return value;
            }
        }
            //预警等级
        case "AlarmGrade": {
            switch (value) {
                case 0: return "事件";
                case 1: return "预警";
                default: return value;
            }
        }
            //是否智能锁预警
        case "IsSealAlarm": {
            switch (value) {
                case 0: return "否";
                case 1: return "是";
                case 2: return "共有";
                default: return value;
            }
        }
            //设备状态
        case "DeviceStatus": {
            switch (value) {
                case 0: return "丢失报废";
                case 1: return "使用中";
                case 2: return "备用中";
                case 3: return "维修中";
                case 4: return "待维修";
                default: return value;
            }
        }
            //智能锁版本
        case "SealType": {
            switch (value) {
                case 1: return "二代锁";
                case 2: return "三代锁";
                default: return value;
            }
        }
            //智能锁类型
        case "SealDetailType": {
            switch (value) {
                case 1: return "一体式";
                case 2: return "分体式";
                default: return value;
            }
        }
            //图片类型
        case "ImageCustomType": {
            switch (value) {
                case "VehicleImage": return "车辆图片";
                case "VehicleIcon": return "车辆图标";
                case "ConIcon": return "箱类型图标";
                default: return value;
            }
        }
            //用户类型
        case "UserType": {
            switch (value) {
                case 0: return "海关用户";
                case 1: return "运维管理用户";
                case 2: return "四方物流平台用户";
                case 31: return "仓库外理用户";
                case 32: return "码头外理用户";
                case 4: return "武警";
                default: return value;
            }
        }
            //是否标识
        case "NeedEdit": {
            switch (value) {
                case 0: return "已标识";
                case 1: return "未标识";
                default: return value;
            }
        }
            //是否标识
        case "ConSize": {
            switch (value) {
                case "20": return "20";
                case "40": return "40";
                default: return "自定义";
            }
        }
            //操作类型 add by zx 151230
        case "RECORD_TYPE": {
            switch (value) {
                case 1: return "施封";
                case 2: return "验封";
                default: return value;
            }
        }
            //施验封结果 add by zx 151230
        case "SEAL_RESULT": {
            switch (value) {
                case "Match": return "完全相符";
                case "UnMatch": return "封志不相符";
                case "Damaged": return "封志已损毁";
                case "TruckUnMatch": return "车牌号不符";
                case "AllUnMatch": return "封志车牌全不符";
                case "NormalNoAlarm": return "正常验封、无预警";
                case "NormalAlarm": return "正常验封、有预警";
                case "EmergencyOpen": return "应急验封、允许开锁";
                case "ManualNoAlarm": return "手工验封、无预警";
                case "ManualAlarm": return "手工验封、有预警";
                default: return value;
            }
        }

        default: return value;
    }
}

function getSpeedStr(speed) {
    if (speed == null || speed == "") speed = "-";
    return speed + " km/h"
}

function getDirectionStr(direction) {
    if (direction == null || direction == "") return "-";
    direction = direction % 360;
    if (direction >= 0 && direction < 22.5)
        return "北";
    else if (direction >= 22.5 && direction < 67.5)
        return "东北";
    else if (direction >= 67.5 && direction < 112.5)
        return "东";
    else if (direction >= 112.5 && direction < 157.5)
        return "东南";
    else if (direction >= 157.5 && direction < 202.5)
        return "南";
    else if (direction >= 202.5 && direction < 247.5)
        return "西南";
    else if (direction >= 247.5 && direction < 292.5)
        return "西";
    else if (direction >= 292.5 && direction < 237.5)
        return "西北";
    else if (direction >= 237.5 && direction < 360)
        return "北";
    else
        return "-";
}

//function openIntegrationPage(vehicleSim, vehicleVoyage, conId, sealId, sealNumber) {
//    var myTop = (screen.height - 700 - 50) / 2;
//    var myLeft = (screen.width - 1300) / 2;
//    var myString = "height=700,width=1300,top=" + myTop + ",left=" + myLeft + ",toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no";
//    var myUrl = "/Monitor/IntegrationViewer?VehicleSim=" + vehicleSim + "&Voyage1=" + vehicleVoyage + "&SealID1=" + sealId + "&ConID1=" + conId + "&SealNumber1=" + sealNumber;
//    window.open(myUrl, '智能锁集成信息查询页面', myString);
//}