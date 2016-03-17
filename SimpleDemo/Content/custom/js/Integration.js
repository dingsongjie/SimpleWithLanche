
var alarmTable;

function getParameterStr(conId, vehicleSim, voyage, sealId, sealNumber) {
    var myParameterArray = new Array();
    var conIdValue = $.parseJSON('{"name":"conId","value":"' + conId + '"}');
    myParameterArray.push(conIdValue);
    var vehicleSimValue = $.parseJSON('{"name":"vehicleSim","value":"' + vehicleSim + '"}');
    myParameterArray.push(vehicleSimValue);
    var voyageValue = $.parseJSON('{"name":"voyage","value":"' + voyage + '"}');
    myParameterArray.push(voyageValue);
    var sealIdValue = $.parseJSON('{"name":"sealId","value":"' + sealId + '"}');
    myParameterArray.push(sealIdValue);
    var sealNumberValue = $.parseJSON('{"name":"sealNumber","value":"' + sealNumber + '"}');
    myParameterArray.push(sealNumberValue);
    return myParameterArray;
}

//function getParameterStrForCustoms(conId, vehicleSim, voyage, sealId, sealNumber, orderNo, typeNo) {
function getParameterStrForCustoms(conId, vehicleSim, sealId, sealNumber, vehicleNo, orderNo, typeNo) {
    var myParameterArray = new Array();
    var conIdValue = $.parseJSON('{"name":"conId","value":"' + conId + '"}');
    myParameterArray.push(conIdValue);
    var vehicleSimValue = $.parseJSON('{"name":"vehicleSim","value":"' + vehicleSim + '"}');
    myParameterArray.push(vehicleSimValue);
    //var voyageValue = $.parseJSON('{"name":"voyage","value":"' + voyage + '"}');
    //myParameterArray.push(voyageValue);
    var sealIdValue = $.parseJSON('{"name":"sealId","value":"' + sealId + '"}');
    myParameterArray.push(sealIdValue);
    var sealNumberValue = $.parseJSON('{"name":"sealNumber","value":"' + sealNumber + '"}');
    myParameterArray.push(sealNumberValue);
    var vehicleNoValue = $.parseJSON('{"name":"vehicleNo","value":"' + vehicleNo + '"}');
    myParameterArray.push(vehicleNoValue);
    var orderNoValue = $.parseJSON('{"name":"orderNo","value":"' + orderNo + '"}');
    myParameterArray.push(orderNoValue);
    var typeNoValue = $.parseJSON('{"name":"typeNo","value":"' + typeNo + '"}');
    myParameterArray.push(typeNoValue);
    return myParameterArray;
}

function getDetailParameterStr(data) {
    var obj = {};
    if (data != null) {
        obj.conId = data.SealInfo.CON_ID;
        obj.vehicleSim = data.SealInfo.VEHICLE_SIM;
        obj.voyage = data.SealInfo.VEHICLE_VOYAGE;
        obj.sealId = data.SealInfo.SEAL_ID;
        obj.sealNumber = data.SealInfo.SEAL_NUMBER;

        if (data.SealInfo.IS_SIMULATION_PDA_BEGIN == 0) {
            if (data.SealInfo.PDA_IS_END == 1) {
                obj.startTime = moment(data.SealInfo.PDA_BEGIN_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
                obj.endTime = moment(data.SealInfo.PDA_END_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
            }
            else if (data.SealInfo.IS_FIXED_READER_END == 1) {
                obj.startTime = moment(data.SealInfo.PDA_BEGIN_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
                obj.endTime = moment(data.SealInfo.PDA_END_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
            }
            else {
                obj.startTime = moment(data.SealInfo.PDA_BEGIN_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
            }
        }
        else {
            if (data.SealInfo.PDA_IS_END == 1) {
                obj.startTime = moment(data.SealInfo.BEGIN_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
                obj.endTime = moment(data.SealInfo.PDA_END_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
            }
            else if (data.SealInfo.IS_FIXED_READER_END == 1) {
                obj.startTime = moment(data.SealInfo.BEGIN_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
                obj.endTime = moment(data.SealInfo.FIXED_READER_END_TIME).format('YYYY-MM-DD HH:mm:ss');
            }
            else {
                obj.startTime = moment(data.SealInfo.BEGIN_AREA_TIME).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }
    return obj;

    //var Str = "";
    //if (data != null) {
    //    Str += ("conId=" + data.SealInfo.CON_ID + "&");
    //    Str += ("vehicleSim=" + data.SealInfo.VEHICLE_SIM + "&");
    //    Str += ("voyage=" + data.SealInfo.VEHICLE_VOYAGE + "&");
    //    Str += ("sealId=" + data.SealInfo.SEAL_ID + "&");
    //    Str += ("sealNumber=" + data.SealInfo.SEAL_NUMBER + "&");

    //    if (data.SealInfo.IS_SIMULATION_PDA_BEGIN == 0) {
    //        if (data.SealInfo.PDA_IS_END == 1) {
    //            Str += ("startTime=" + data.SealInfo.PDA_BEGIN_AREA_TIME + "&");
    //            Str += ("endTime=" + data.SealInfo.PDA_END_AREA_TIME + "&");
    //        }
    //        else if (data.SealInfo.IS_FIXED_READER_END == 1) {
    //            Str += ("startTime=" + data.SealInfo.PDA_BEGIN_AREA_TIME + "&");
    //            Str += ("endTime=" + data.SealInfo.PDA_END_AREA_TIME + "&");
    //        }
    //        else {
    //            Str += ("startTime=" + data.SealInfo.PDA_BEGIN_AREA_TIME + "&");
    //            Str += ("endTime=");
    //        }
    //    }
    //    else {
    //        if (data.SealInfo.PDA_IS_END == 1) {
    //            Str += ("startTime=" + data.SealInfo.BEGIN_AREA_TIME + "&");
    //            Str += ("endTime=" + data.SealInfo.PDA_END_AREA_TIME + "&");
    //        }
    //        else if (data.SealInfo.IS_FIXED_READER_END == 1) {
    //            Str += ("startTime=" + data.SealInfo.BEGIN_AREA_TIME + "&");
    //            Str += ("endTime=" + data.SealInfo.FIXED_READER_END_TIME + "&");
    //        }
    //        else {
    //            Str += ("startTime=" + data.SealInfo.BEGIN_AREA_TIME + "&");
    //            Str += ("endTime=");
    //        }
    //    }
    //}
    //return Str;

    //if (data != null) {
    //    var myParameterArray = new Array();
    //    //var conIdValue = $.parseJSON('{"name":"conId","value":"' + data.SealInfo.CON_ID + '"}');
    //    //myParameterArray.push(conIdValue);
    //    var vehicleSimValue = $.parseJSON('{"name":"vehicleSim","value":"' + data.SealInfo.VEHICLE_SIM + '"}');
    //    myParameterArray.push(vehicleSimValue);
    //    var voyageValue = $.parseJSON('{"name":"voyage","value":"' + data.SealInfo.VEHICLE_VOYAGE + '"}');
    //    myParameterArray.push(voyageValue);
    //    var sealIdValue = $.parseJSON('{"name":"sealId","value":"' + data.SealInfo.SEAL_ID + '"}');
    //    myParameterArray.push(sealIdValue);
    //    var sealNumberValue = $.parseJSON('{"name":"sealNumber","value":"' + data.SealInfo.SEAL_NUMBER + '"}');
    //    myParameterArray.push(sealNumberValue);

    //    if (data.SealInfo.IS_SIMULATION_PDA_BEGIN == 0) {
    //        if (data.SealInfo.PDA_IS_END == 1) {
    //            var startTime = $.parseJSON('{"name":"startTime","value":"' + data.SealInfo.PDA_BEGIN_AREA_TIME + '"}');
    //            myParameterArray.push(startTime);
    //            var endTime = $.parseJSON('{"name":"endTime","value":"' + data.SealInfo.PDA_END_AREA_TIME + '"}');
    //            myParameterArray.push(endTime);
    //        }
    //        else if (data.SealInfo.IS_FIXED_READER_END == 1) {
    //            var startTime = $.parseJSON('{"name":"startTime","value":"' + data.SealInfo.PDA_BEGIN_AREA_TIME + '"}');
    //            myParameterArray.push(startTime);
    //            var endTime = $.parseJSON('{"name":"endTime","value":"' + data.SealInfo.FIXED_READER_END_TIME + '"}');
    //            myParameterArray.push(endTime);
    //        }
    //        else {
    //            var startTime = $.parseJSON('{"name":"startTime","value":"' + data.SealInfo.PDA_BEGIN_AREA_TIME + '"}');
    //            myParameterArray.push(startTime);
    //            var endTime = $.parseJSON('{"name":"endTime","value":""}');
    //            myParameterArray.push(endTime);
    //        }
    //    }
    //    else {
    //        if (data.SealInfo.PDA_IS_END == 1) {
    //            var startTime = $.parseJSON('{"name":"startTime","value":"' + data.SealInfo.BEGIN_AREA_TIME + '"}');
    //            myParameterArray.push(startTime);
    //            var endTime = $.parseJSON('{"name":"endTime","value":"' + data.SealInfo.PDA_END_AREA_TIME + '"}');
    //            myParameterArray.push(endTime);
    //        }
    //        else if (data.SealInfo.IS_FIXED_READER_END == 1) {
    //            var startTime = $.parseJSON('{"name":"startTime","value":"' + data.SealInfo.BEGIN_AREA_TIME + '"}');
    //            myParameterArray.push(startTime);
    //            var endTime = $.parseJSON('{"name":"endTime","value":"' + data.SealInfo.FIXED_READER_END_TIME + '"}');
    //            myParameterArray.push(endTime);
    //        }
    //        else {
    //            var startTime = $.parseJSON('{"name":"startTime","value":"' + data.SealInfo.BEGIN_AREA_TIME + '"}');
    //            myParameterArray.push(startTime);
    //            var endTime = $.parseJSON('{"name":"endTime","value":""}');
    //            myParameterArray.push(endTime);
    //        }
    //    }
    //    return myParameterArray;
    //}
    //else return "";
}

function initAlarmGrid(isInit, alarmList) {
    if (!isInit) {
        alarmTable.destroy();
        //$('#AlarmListTable').empty();
    }

    alarmTable = $('#AlarmListTable').DataTable({
        "data": alarmList,
        "bProcessing": true,
        "columnDefs": [
            { "data": "ID", "visible": false },
            { "searchable": false, "orderable": false, "targets": 0, "sWidth": "4%", "data": null },
            {
                "targets": 1, "sWidth": "48%", "data": "ALARM_NAME", "searchable": false, "orderable": true, "render": function (data, type, row) {
                    //return "<table class=\"alarmTableTable\"><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">预警类型</td><td class=\"alarmTableTdContent\">" + row.ALARM_NAME + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">预警内容</td><td class=\"alarmTableTdContent\">" + row.ALARM_CONTENT + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">是否处置</td><td class=\"alarmTableTdContentRed\">" + getTypeNameByValue("IsDisposal", row.DISPOSAL_STATUS) + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">操&nbsp;&nbsp;&nbsp;&nbsp;作</td><td class=\"alarmTableTdContent\"><a href=\"javascript:void(0);\" onclick=\"loadDisposalModal('" + row.ID + "')\">预警处置</a></td></tr></table>";
                    if (row.DISPOSAL_STATUS == "1") {
                        return "<table class=\"alarmTableTable\"><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">预警类型</td><td class=\"alarmTableTdContent\">" + row.ALARM_NAME + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">预警内容</td><td class=\"alarmTableTdContent\">" + row.ALARM_CONTENT + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">是否处置</td><td class=\"alarmTableTdContentGreen\">已处置</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">操&nbsp;&nbsp;&nbsp;&nbsp;作</td><td class=\"alarmTableTdContent\"><a href=\"javascript:void(0);\" onclick=\"loadDisposalModal('" + row.ID + "')\">预警处置</a></td></tr></table>";
                    }
                    else {
                        return "<table class=\"alarmTableTable\"><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">预警类型</td><td class=\"alarmTableTdContent\">" + row.ALARM_NAME + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">预警内容</td><td class=\"alarmTableTdContent\">" + row.ALARM_CONTENT + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">是否处置</td><td class=\"alarmTableTdContentRed\">未处置</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">操&nbsp;&nbsp;&nbsp;&nbsp;作</td><td class=\"alarmTableTdContent\"><a href=\"javascript:void(0);\" onclick=\"loadDisposalModal('" + row.ID + "')\">预警处置</a></td></tr></table>";
                    }
                }
            },
            {
                "targets": 2, "sWidth": "48%", "data": "ALARM_CONTENT", "searchable": false, "orderable": false, "render": function (data, type, row) {
                    var alarmTime = row.ALARM_TIME == null ? "" : moment(row.ALARM_TIME).format('YYYY-MM-DD HH:mm:ss');
                    var disposalContent = row.DISPOSAL_CONTENT == null ? "" : row.DISPOSAL_CONTENT;
                    var disposalUserName = row.DISPOSAL_USER_NAME == null ? "" : row.DISPOSAL_USER_NAME;
                    var disposalTime = row.DISPOSAL_TIME == null ? "" : moment(row.DISPOSAL_TIME).format('YYYY-MM-DD HH:mm:ss');
                    return "<table class=\"alarmTableTable\"><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">预警时间</td><td class=\"alarmTableTdContent\">" + alarmTime + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">处置内容</td><td class=\"alarmTableTdContent\">" + disposalContent + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">处置人</td><td class=\"alarmTableTdContent\">" + disposalUserName + "</td></tr><tr class=\"alarmTableTr\"><td class=\"alarmTableTdTitle\">处置时间</td><td class=\"alarmTableTdContent\">" + disposalTime + "</td></tr></table>";
                }
            }
        ],
        "order": [[1, 'asc']],
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false
    });

    alarmTable.on('order.dt search.dt', function () {
        alarmTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

function stepStart(data) {
    var step1 = false;
    var step2 = false;
    var step3 = false;
    var step4 = false;
    var step5 = false;

    setBasicInfo(data.SealInfo);

    if (data.CurrentStep >= 1) {
        step1 = setStep1Data(data);

        if (data.CurrentStep >= 2) {
            step2 = setStep2Data(data);

            if (data.CurrentStep >= 3) {
                step3 = setStep3Data(data);

                if (data.CurrentStep >= 4) {
                    step4 = setStep4Data(data);

                    if (data.CurrentStep >= 5) {
                        step5 = setStep5Data(data);
                    }
                }
            }
        }
    }
    startAnimate(data, step1, step2, step3, step4, step5);
}

function setBasicInfo(data) {
    $("#basic-VehicleNo").text(stringChecker(data.VEHICLE_NO));
    $("#basic-VehicleSim").text(stringChecker(data.VEHICLE_SIM));
    $("#basic-VehicleSpeed").text(getSpeedStr(data.SPEED));
    $("#basic-UpdateTime").text(timeChecker(data.GPS_TIME));
    $("#basic-Direction").text(getDirectionStr(data.DIRECTION));
    $("#basic-Position").text(stringChecker(data.ACTION_POSITION));
    $("#basic-ConId").text(stringChecker(data.CON_ID));
    $("#basic-SealId").text(stringChecker(data.SEAL_ID));
    $("#basic-Voyage").text(stringChecker(data.VEHICLE_VOYAGE));
    $("#basic-SignalLevel").text(stringChecker(data.SIGNAL_LEVEL));
    $("#basic-BizName").text(stringChecker(data.BIZ_TYPE_NAME));
    $("#basic-OrderNo").text(stringChecker(data.DECLARATION_NO));
    $("#basic-SchemeName").text(stringChecker(data.SCHEME_NAME));
}

function setStep1Data(data) {
    //属性赋值
    $("#timeClockStep1").html('<i class="fa fa-clock-o"></i>&nbsp;' + timeChecker(data.Step1Time));
    $("#step1Time").text(timeChecker(data.Step1Time));
    $("#step1Position").text(stringChecker(data.Step1Position));
    //checkStep1Alarm(data);
    return data.StepOnLock_IsOnlock;
}

function setStep2Data(data) {
    //属性赋值
    $("#timeClockStep2").html('<i class="fa fa-clock-o"></i>&nbsp;' + timeChecker(data.Step2Time));
    $("#step2Time").text(timeChecker(data.Step2Time));
    $("#step2Person").text(stringChecker(data.Step2Person));
    $("#step2Position").text(stringChecker(data.Step2Position));
    //checkStep2Alarm(data);
    return (data.StepOnSeal_SealIdCheck && data.StepOnSeal_IsFullPower && data.StepOnSeal_IsOnline && data.StepOnSeal_BlackListCheck && data.StepOnSeal_IsOnLock && data.StepOnSeal_IsSealPosition && data.StepOnSeal_IsLockPosition && data.StepOnSeal_VehicleNoCheck && data.StepOnSeal_IsSealPosition);
}

function setStep3Data(data) {
    //属性赋值
    $("#timeClockStep3").html('<i class="fa fa-clock-o"></i>&nbsp;' + timeChecker(data.Step3Time));
    $("#step3Time").text(timeChecker(data.Step3Time));
    //checkStep3Alarm(data);
    return (data.StepOnRoad_IsGpsOnline && data.StepOnRoad_IsSealOnline && data.StepOnRoad_IsUnPack && data.StepOnRoad_IsUnlink && data.StepOnRoad_IsSkinUnBroken && data.StepOnRoad_IsLeverUnBroken && data.StepOnRoad_IsNoHighRiskPark);
}

function setStep4Data(data) {
    //属性赋值
    $("#timeClockStep4").html('<i class="fa fa-clock-o"></i>&nbsp;' + timeChecker(data.Step4Time));
    $("#step4Time").text(timeChecker(data.Step4Time));
    $("#step4Person").text(stringChecker(data.Step4Person));
    $("#step4Position").text(stringChecker(data.Step4Position));

    //if (data.SealInfo.BIZ_TYPE_VALUE == "TP") {
    //    if (data.SealInfo.PDA_IS_END == 1) return (data.StepUnSeal_SealIdCheck && data.StepUnSeal_IsFullPower && data.StepUnSeal_IsPdaIntact && data.StepUnSeal_IsLockPosition && data.StepUnSeal_ConIdCheck && data.StepUnSeal_VehicleNoCheck);
    //}
    //else {
    //    if (data.SealInfo.PDA_IS_END == 1) return (data.StepUnSeal_SealIdCheck && data.StepUnSeal_IsFullPower && data.StepUnSeal_IsPdaIntact && data.StepUnSeal_IsLockPosition && data.StepUnSeal_ConIdCheck && data.StepUnSeal_VehicleNoCheck);
    //    else if (data.SealInfo.IS_FIXED_READER_END == 1) return (data.StepUnSeal_SealIdCheck && data.StepUnSeal_IsFullPower && data.StepUnSeal_IsPdaIntact && data.StepUnSeal_IsLockPosition && data.StepUnSeal_ConIdCheck && data.StepUnSeal_VehicleNoCheck);
    //}
    //return null;
    return (data.StepUnSeal_SealIdCheck && data.StepUnSeal_IsFullPower && data.StepUnSeal_IsPdaIntact && data.StepUnSeal_IsLockPosition && data.StepUnSeal_ConIdCheck && data.StepUnSeal_VehicleNoCheck);
}

function setStep5Data(data) {
    //属性赋值
    $("#timeClockStep5").html('<i class="fa fa-clock-o"></i>&nbsp;' + timeChecker(data.Step5Time));
    $("#step5Time").text(timeChecker(data.Step5Time));
    $("#step5Position").text(stringChecker(data.Step5Position));
    //checkStep5Alarm(data);
    return (data.StepUnLock_InArea && data.StepUnLock_UnOpenBefore);
}

function checkStep1Alarm(data) {
    //安全智能锁正常
    $("#stepOnLock_IsOnlock").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnLock_IsOnlock) {
        $("#stepOnLock_IsOnlock").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnLock_IsOnlock").addClass('glyphicon-remove').addClass('text-red');
    }
}

function checkStep2Alarm(data) {
    //校验安全智能锁锁号成功
    $("#stepOnSeal_SealIdCheck").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_SealIdCheck) {
        $("#stepOnSeal_SealIdCheck").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_SealIdCheck").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁电池电量充足
    $("#stepOnSeal_IsFullPower").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_IsFullPower) {
        $("#stepOnSeal_IsFullPower").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_IsFullPower").addClass('glyphicon-remove').addClass('text-red');
    }
    //车台正常在线
    $("#stepOnSeal_IsOnline").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_IsOnline) {
        $("#stepOnSeal_IsOnline").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_IsOnline").addClass('glyphicon-remove').addClass('text-red');
    }
    //车辆未列入黑名单
    $("#stepOnSeal_BlackListCheck").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_BlackListCheck) {
        $("#stepOnSeal_BlackListCheck").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_BlackListCheck").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁已锁闭
    $("#stepOnSeal_IsOnLock").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_IsOnLock) {
        $("#stepOnSeal_IsOnLock").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_IsOnLock").addClass('glyphicon-remove').addClass('text-red');
    }
    //指定施封地施
    $("#stepOnSeal_IsSealPosition").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_IsSealPosition) {
        $("#stepOnSeal_IsSealPosition").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_IsSealPosition").addClass('glyphicon-remove').addClass('text-red');
    }
    //挂锁位置正确
    $("#stepOnSeal_IsLockPosition").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_IsLockPosition) {
        $("#stepOnSeal_IsLockPosition").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_IsLockPosition").addClass('glyphicon-remove').addClass('text-red');
    }
    //箱号一致
    $("#stepOnSeal_ConIdCheck").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_ConIdCheck) {
        $("#stepOnSeal_ConIdCheck").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_ConIdCheck").addClass('glyphicon-remove').addClass('text-red');
    }
    //车牌号一致
    $("#stepOnSeal_VehicleNoCheck").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnSeal_VehicleNoCheck) {
        $("#stepOnSeal_VehicleNoCheck").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnSeal_VehicleNoCheck").addClass('glyphicon-remove').addClass('text-red');
    }
}

function checkStep3Alarm(data) {
    //车台未异常离线
    $("#stepOnRoad_IsGpsOnline").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnRoad_IsGpsOnline) {
        $("#stepOnRoad_IsGpsOnline").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnRoad_IsGpsOnline").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁未异常离线
    $("#stepOnRoad_IsSealOnline").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnRoad_IsSealOnline) {
        $("#stepOnRoad_IsSealOnline").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnRoad_IsSealOnline").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁运输途中未开启
    $("#stepOnRoad_IsUnPack").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnRoad_IsUnPack) {
        $("#stepOnRoad_IsUnPack").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnRoad_IsUnPack").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁无锁杆搭接信息
    $("#stepOnRoad_IsUnlink").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnRoad_IsUnlink) {
        $("#stepOnRoad_IsUnlink").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnRoad_IsUnlink").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁无壳体破损信息
    $("#stepOnRoad_IsSkinUnBroken").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnRoad_IsSkinUnBroken) {
        $("#stepOnRoad_IsSkinUnBroken").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnRoad_IsSkinUnBroken").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁锁杆未被外力破坏
    $("#stepOnRoad_IsLeverUnBroken").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnRoad_IsLeverUnBroken) {
        $("#stepOnRoad_IsLeverUnBroken").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnRoad_IsLeverUnBroken").addClass('glyphicon-remove').addClass('text-red');
    }
    //无高风险区超时停车记录
    $("#stepOnRoad_IsNoHighRiskPark").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepOnRoad_IsNoHighRiskPark) {
        $("#stepOnRoad_IsNoHighRiskPark").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepOnRoad_IsNoHighRiskPark").addClass('glyphicon-remove').addClass('text-red');
    }
}

function checkStep4Alarm(data) {
    //校验安全智能锁锁号成功
    $("#stepUnSeal_SealIdCheck").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnSeal_SealIdCheck) {
        $("#stepUnSeal_SealIdCheck").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnSeal_SealIdCheck").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁电池电量充足
    $("#stepUnSeal_IsFullPower").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnSeal_IsFullPower) {
        $("#stepUnSeal_IsFullPower").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnSeal_IsFullPower").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁未被外力破坏
    $("#stepUnSeal_IsPdaIntact").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnSeal_IsPdaIntact) {
        $("#stepUnSeal_IsPdaIntact").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnSeal_IsPdaIntact").addClass('glyphicon-remove').addClass('text-red');
    }
    //挂锁位置正确
    $("#stepUnSeal_IsLockPosition").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnSeal_IsLockPosition) {
        $("#stepUnSeal_IsLockPosition").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnSeal_IsLockPosition").addClass('glyphicon-remove').addClass('text-red');
    }
    //箱号一致
    $("#stepUnSeal_ConIdCheck").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnSeal_ConIdCheck) {
        $("#stepUnSeal_ConIdCheck").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnSeal_ConIdCheck").addClass('glyphicon-remove').addClass('text-red');
    }
    //车牌号一致
    $("#stepUnSeal_VehicleNoCheck").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnSeal_VehicleNoCheck) {
        $("#stepUnSeal_VehicleNoCheck").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnSeal_VehicleNoCheck").addClass('glyphicon-remove').addClass('text-red');
    }
}

function checkStep5Alarm(data) {
    //安全智能锁于指定区域开锁
    $("#stepUnLock_InArea").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnLock_InArea) {
        $("#stepUnLock_InArea").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnLock_InArea").addClass('glyphicon-remove').addClass('text-red');
    }
    //安全智能锁验封前未擅自开启
    $("#stepUnLock_UnOpenBefore").removeClass('glyphicon-minus-sign').removeClass('text-darkgray');
    if (data.StepUnLock_UnOpenBefore) {
        $("#stepUnLock_UnOpenBefore").addClass('glyphicon-ok').addClass('text-green');
    }
    else {
        $("#stepUnLock_UnOpenBefore").addClass('glyphicon-remove').addClass('text-red');
    }
}

function startAnimate(data, step1, step2, step3, step4, step5) {
    startStep1Anime(data, step1, step2, step3, step4, step5);
}

function startStep1Anime(data, step1, step2, step3, step4, step5) {
    if (data.CurrentStep >= 1) {
        $("#timelineStart").text(moment(data.SealInfo.UPDATE_TIME).format('YYYY-MM'));
        $("#timelineStart").removeClass('bg-gray').addClass('bg-green-gradient').fadeTo(500, 0.6).fadeTo(500, 1, function () {
            checkStep1Alarm(data);
            $("#timelineStep1").removeClass('bg-gray');
            if (step1 == true) $("#timelineStep1").addClass('bg-blue');
            else $("#timelineStep1").addClass('bg-red');
            $("#timelineStep1").fadeTo(500, 0.6).fadeTo(500, 1, function () {
                startStep2Anime(data, step1, step2, step3, step4, step5);
            });
        });
    }
}

function startStep2Anime(data, step1, step2, step3, step4, step5) {
    if (data.CurrentStep >= 2) {
        checkStep2Alarm(data);
        $("#timelineStep2").removeClass('bg-gray');
        if (step2 == true) $("#timelineStep2").addClass('bg-blue');
        else $("#timelineStep2").addClass('bg-red');
        $("#timelineStep2").fadeTo(500, 0.6).fadeTo(500, 1, function () {
            startStep3Anime(data, step1, step2, step3, step4, step5);
        });
    }
}

function startStep3Anime(data, step1, step2, step3, step4, step5) {
    if (data.CurrentStep >= 3) {
        checkStep3Alarm(data);
        $("#timelineStep3").removeClass('bg-gray');
        if (step3 == true) $("#timelineStep3").addClass('bg-blue');
        else $("#timelineStep3").addClass('bg-red');
        $("#timelineStep3").fadeTo(500, 0.6).fadeTo(500, 1, function () {
            startStep4Anime(data, step1, step2, step3, step4, step5);
        });
    }
}

function startStep4Anime(data, step1, step2, step3, step4, step5) {
    if (data.CurrentStep >= 4) {
        //if (data.SealInfo.BIZ_TYPE_VALUE == "TP") {
        //    if (data.SealInfo.PDA_IS_END == 1) {
        //        checkStep4Alarm(data);
        //        $("#timelineStep4").removeClass('bg-gray');
        //        if (step4 == true) $("#timelineStep4").addClass('bg-blue');
        //        else $("#timelineStep4").addClass('bg-red');
        //    }
        //}
        //else {
        //    if (data.SealInfo.PDA_IS_END == 1) {
        //        checkStep4Alarm(data);
        //        $("#timelineStep4").removeClass('bg-gray');
        //        if (step4 == true) $("#timelineStep4").addClass('bg-blue');
        //        else $("#timelineStep4").addClass('bg-red');
        //    }
        //    else if (data.SealInfo.IS_FIXED_READER_END == 1) {
        //        checkStep4Alarm(data);
        //        $("#timelineStep4").removeClass('bg-gray');
        //        if (step4 == true) $("#timelineStep4").addClass('bg-blue');
        //        else $("#timelineStep4").addClass('bg-red');
        //    }
        //}

        checkStep4Alarm(data);
        $("#timelineStep4").removeClass('bg-gray');
        if (step4 == true) $("#timelineStep4").addClass('bg-blue');
        else $("#timelineStep4").addClass('bg-red');

        $("#timelineStep4").fadeTo(500, 0.6).fadeTo(500, 1, function () {
            startStep5Anime(data, step1, step2, step3, step4, step5);
        });
    }
}

function startStep5Anime(data, step1, step2, step3, step4, step5) {
    if (data.CurrentStep >= 5) {
        checkStep5Alarm(data);
        $("#timelineStep5").removeClass('bg-gray');
        if (step5 == true) $("#timelineStep5").addClass('bg-blue');
        else $("#timelineStep5").addClass('bg-red');
        $("#timelineStep5").fadeTo(500, 0.6).fadeTo(500, 1, function () {
            $("#timelineEnd").removeClass('bg-gray').addClass('bg-green').fadeTo(500, 0.6).fadeTo(500, 1);
        });
    }
}

function timeChecker(time) {
    if (time == null || time == "") return "-";
    else return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

function stringChecker(str) {
    if (str == null || str == "") return "-";
    else return str;
}