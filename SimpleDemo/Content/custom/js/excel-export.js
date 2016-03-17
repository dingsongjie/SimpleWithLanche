/* 
* 默认转换实现函数，如果需要其他功能，需自行扩展
* 参数：
* tableID : HTML中Table对象id属性值
* 详细用法参见以下 TableToExcel 对象定义 
*/
function saveAsExcel() {
    var tb = new TableToExcel();
    tb.setFontStyle("Courier New");
    tb.setFontSize(10);
    tb.setTableBorder(2);
    tb.setColumnWidth(7);
    tb.isLineWrap(true);
    tb.getExcelFile();
}

/*
* 功能：HTML中Table对象转换为Excel通用对象.
* 参数：tableID HTML中Table对象的ID属性值
* 说明：
* 能适应复杂的HTML中Table对象的自动转换，能够自动根据行列扩展信息
* 合并Excel中的单元格，客户端需要安装有Excel
* 详细的属性、方法引用说明参见：Excel的Microsoft Excel Visual Basic参考
* 示范：
* var tb = new TableToExcel('demoTable');
* tb.setFontStyle("Courier New");
* tb.setFontSize(10); //推荐取值10
* tb.setFontColor(6); //一般情况不用设置
* tb.setBackGround(4); //一般情况不用设置
* tb.setTableBorder(2); //推荐取值2
* tb.setColumnWidth(10); //推荐取值10
* tb.isLineWrap(false);
* tb.isAutoFit(true);
* 
* tb.getExcelFile();
* 如果设置了单元格自适应，则设置单元格宽度无效
* 版本：1.0
* BUG提交：QQ:18234348 或者 http://jeva.bokee.com
*/
function TableToExcel() {
    this.tableBorder = -1; //边框类型，-1没有边框 可取1/2/3/4
    this.backGround = 0; //背景颜色：白色 可取调色板中的颜色编号 1/2/3/4....
    this.fontColor = 1; //字体颜色：黑色
    this.fontSize = 10; //字体大小
    this.fontStyle = "宋体"; //字体类型
    this.rowHeight = -1; //行高
    this.columnWidth = -1; //列宽
    this.lineWrap = true; //是否自动换行
    this.textAlign = -4108; //内容对齐方式 默认为居中
    this.autoFit = false; //是否自适应宽度
}

TableToExcel.prototype.setTableBorder = function (excelBorder) {
    this.tableBorder = excelBorder;
};

TableToExcel.prototype.setBackGround = function (excelColor) {
    this.backGround = excelColor;
};

TableToExcel.prototype.setFontColor = function (excelColor) {
    this.fontColor = excelColor;
};

TableToExcel.prototype.setFontSize = function (excelFontSize) {
    this.fontSize = excelFontSize;
};

TableToExcel.prototype.setFontStyle = function (excelFont) {
    this.fontStyle = excelFont;
};

TableToExcel.prototype.setRowHeight = function (excelRowHeight) {
    this.rowHeight = excelRowHeight;
};

TableToExcel.prototype.setColumnWidth = function (excelColumnWidth) {
    this.columnWidth = excelColumnWidth;
};

TableToExcel.prototype.isLineWrap = function (lineWrap) {
    if (lineWrap == false || lineWrap == true) {
        this.lineWrap = lineWrap;
    }
};

TableToExcel.prototype.setTextAlign = function (textAlign) {
    this.textAlign = textAlign;
};

TableToExcel.prototype.isAutoFit = function (autoFit) {
    if (autoFit == true || autoFit == false)
        this.autoFit = autoFit;
}
//文件转换主函数
TableToExcel.prototype.getExcelFile = function () {
    var jXls, myWorkbook, myWorksheet, myHTMLTableCell, myExcelCell, myExcelCell2;
    var myCellColSpan, myCellRowSpan;

    try {
        jXls = new ActiveXObject('Excel.Application');
    }
    catch (e) {
        alert("无法启动Excel!\n\n" + e.message +
"\n\n如果您确信您的电脑中已经安装了Excel，" +
"那么请调整IE的安全级别。\n\n具体操作：\n\n" +
"工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
        return false;
    }

    jXls.Visible = true;
    myWorkbook = jXls.Workbooks.Add();
    myWorksheet = myWorkbook.ActiveSheet;

    var table = document.all["SearchListTable"];
    var drift = 0;

    for (i = 0; i < table.rows.length; i++) {
        drift = 0;
        for (j = 1; j < 19; j++) {
            if (j == 6) {
                drift = 1;
            }
            myWorksheet.Cells(i + 1, j).Value = table.rows(i).cells(j + drift).innerHTML;
            if (i== 0 || j == 3) {
                myWorksheet.Cells(i + 1, j).Value = table.rows(i).cells(j + drift).childNodes[0].innerHTML;
            }
        }
    }

    myWorksheet.Columns.AutoFit;

    jXls.UserControl = true;
    jXls = null;
    myWorkbook = null;
    myWorksheet = null;
};