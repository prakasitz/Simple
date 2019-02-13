const resErrorList = ["กรุณากรอกช่องว่างให้ครบถ้วน!", "คุณกรอก a,b,c ซ้ำ!", "กรุณากรอก \"การกำหนดแผนการจัดจ้าง\" \n ในรูปแบบ a,b,c ตามลำดับ"];
$(document).ready(function () {
    //----------check res-detail empty-----------------------------
    $(document).on("click", ".keyABC input:not(:disabled):not(:input[readonly])", function (e) {
        var thisInput = $(this);
        var tr = thisInput.closest("tr");
        var resDetail = tr.find("[for]");
        chkResDetail(resDetail);
    });

    $(document).on('keypress', '#kulupan_ tr input:not(:input[readonly])', function (e) {
        var thisInput = $(this);
        var td = thisInput.closest("td");
        var tr = thisInput.closest("tr");
        var abcList = tr.attr("itemlist");
        var resDetail = tr.find("[for]");
        var ekey = e.originalEvent.key;
        if (td.hasClass("keyABC")) {
            if (e.which != 8 && e.which != 0 && (e.which < 97 || e.which > 99)) { // a97 b98 c99 A65 B66 C67
                return false;
            } else {
                var succ = chkResDetail(resDetail);

                if (!succ) return false; //ถ้า resDetail มีช่องว่าง ให้กลับไปเติม

                if (abcList.indexOf(ekey) == -1) {
                    return false;
                } else {
                    abcList = abcList.replace(ekey, '');
                    tr.attr("itemlist", abcList);
                    addCommaABC(thisInput);
                }
            }
        }
    }).on("keyup", "#kulupan_ tr input:not(:input[readonly])", function (e) {
        var thisInput = $(this);
        var tr = thisInput.closest("tr");
        setStatusRow(tr);

        var ping = chkRowInput(tr);
        if(ping) {
            chkABC(tr);
        }
    });

    $(document).on('keydown', ".keyABC input:not(:input[readonly])", function (e) { //ตอน delete
        var thisInput = $(this);
        var tr = thisInput.closest("tr");
        if (e.keyCode == 8) {
            thisInput.removeClass("tb-fnt-input");
            delRowABC(tr);
        }
    });

    function chkResDetail(resDetail) {
        var status = true;
        $(resDetail).each(function (index, element) {
            var input = $(this)
            if (input.val() == "") {
                alert(resErrorList[0]);
                input.focus();
                status = false;
                return false;
            }
        });
        return status;
    }

    function delRowABC(tr) {
        tr.attr("itemlist", "abc");
        tr.find(".keyABC input").val("");
    }

    function addCommaABC(input) {
        var val = input.val();
        if (val.length > 0 && val.length <= 4) {
            input.val(val + ",");
        }
    }

    function chkABC(tr) {
        var abc = "";
        var inptABCList = tr.find(".keyABC input:not(:disabled)");

        $(inptABCList).each(function (index, element) { //วน loop ดึงค่า abc จาก abc ในแถวนั้นๆ
            var input = $(this);
            if (input.val() != "") {
                var str = input.val().replace(/,/g, "");
                abc = abc + str;
            }
        });

        if (abc != "abc") {
            alert(resErrorList[2]);
            delRowABC(tr);
            chkRowInput(tr);
            abc = "";
        }
    }

    function setStatusRow(tr) {
        var inputList = tr.find("input");
        $(inputList).each(function (index, element) {
            var input = $(this);
            if (input.val().length != 0) {
                tr.attr("status-row", "busy");
                return false;
            } else if (index == inputList.length - 1) {
                tr.attr("status-row", "empty");
            }
        });
    }

    function chkRowInput(tr) { //ต้องมีการเช็กตลอด ทุกคร้งที่ พิม //inputEmptyInRowBusy
        var inputList = tr.find("input:not(input:disabled)");
        var ping = false;
        $(inputList).each(function (index, element) {
            var inpt = $(this);
            if (tr.attr("status-row") != "empty") {
                var td = inpt.closest("td");
                if (inpt.val() == "") {
                    invalidInputRes(inpt, true);
                    if (td.hasClass("keyABC") && tr.attr("itemlist") == "") {
                        ping = true;
                        invalidInputRes(inpt, false);
                    }
                } else if (inpt.val() != "") {
                    if (td.hasClass("keyABC") && tr.attr("itemlist") == "") {
                        ping = true;
                        invalidInputRes(inpt, false);
                    } else if(td.hasClass("keyABC") && tr.attr("itemlist") != "") { 
                        console.log("xxx");
                        invalidInputRes(inpt, true);
                    } else {
                        invalidInputRes(inpt, false);
                    }
                }
            } else { // empty
                invalidInputRes(inpt, false);
            }
        });

        return ping;
    }

    function invalidInputRes(input, add) {
        if (add) {
            input.addClass("inputEmptyInRowBusy");
            input.attr("title", "กรุณากรอกช่องที่ขึ้น \"กรอบแดง\" ให้ครบ")
        } else {
            var td = input.closest("td").has("input")
            input.removeClass("inputEmptyInRowBusy");
            if (td.hasClass("keyABC")) {
                input.attr("title", "a,b,c");
            } else {
                input.attr("title", "");
            }
        }
    }
});


function chkResInputInvalidAll(fieldContent) {
    var inputInvalidList = fieldContent.find(".inputEmptyInRowBusy");
    var notEmpty = true;
    console.log(inputInvalidList);
    $(inputInvalidList).each(function (index, element) {
        var input = $(this);
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        input.focus();
        notEmpty = false;
        return false;
    });
    return notEmpty;
}

function C_to_Num(tbodyRes) {
    var row = tbodyRes;
    var input = row.find("#res_sum");
    var sum = 0;
    var sumCol = input.each(function () {
        if ($(this).closest("tr").css("display") != "none") {
            if ($(this).text() != "") {
                sum += parseInt($(this).text().replace(/,/g, ''));
            }
        }
    });
    $.when(sumCol).done(function () {
        var total_sum = row.find(".sumCol");
        total_sum.text(parseInt(sum).toLocaleString());
        total_sum.attr("title", parseInt(sum).toLocaleString());
        $('.mainFields > .field-content > .table-responsive2 > .table .keyABC input:not(input:disabled)').each(function () {
            var sumC = $(this).parents("tr").find("#res_sum").text();
            var getval = $(this).val().replace(/,/g, '')
            var row = $(this).closest("tr");
            var itemlist = row.attr("itemlist");
            if (getval.length != 3) {
                console.log(getval);
                itemlist = itemlist.replace(getval, "");
                row.attr("itemlist", itemlist);
            } else {
                row.attr("itemlist", "");
            }
            var val = $(this).val().replace("c", sumC);
            $(this).val(val);
        });
    });
}

function chk_c_numberic(input, sum, v) {
    var row_input = input.closest("tr").find(".keyABC input:enabled").not($(this));
    $(row_input).each(function () { //ตัว input ทุกตัวที่ไม่ใช่ ตัวมันเอง
        var x = $(this).val();
        if (x.match(/\d/g) == null) {
            if (v == "") {
                input.val(sum);
            } else {
                input.val(v + "," + sum);
            }
            return false;
        } else {
            return false;
        }
    });
}

function strReplace(valABC) {
    if (valABC != "a" || valABC != "b" || str != "a,b" || valABC != "") {
        var newStr = valABC.replace(/\d+/g, "c");
        return newStr;
    } else {
        return false;
    }
}