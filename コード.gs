// プロダクトバックログのシート名
var PBL_SHEET = "pbl";

// 施策プールのシート名
var POOL_SHEET = "pool";

// プロダクトバックログに追加するステータスおよび列数
var TARGET_STATUS = "PBL転記済み",
    TARGET_COL = "2";

// global
var spdsht = SpreadsheetApp.getActiveSpreadsheet(),
    act_sht_name = spdsht.getActiveSheet().getName(),
    pbl_sht = spdsht.getSheetByName(PBL_SHEET),
    p_sht = spdsht.getSheetByName(POOL_SHEET);

function index() {
}

// 変更時に発火
function onEdit(e)
{
  var row = e.range.getRow(),
      col = e.range.getColumn(),
      val = e.range.getValue();

  // 施策ブールの施策のステータスを指定したステータスに変更した場合
  if (act_sht_name == POOL_SHEET && col == TARGET_COL && val == TARGET_STATUS) {
    var pbl_col_num =  pbl_sht.getLastColumn(),
        pbl_header = getHeader(pbl_sht),
        data_box = new Array(pbl_col_num);
    
    var p_col_num = p_sht.getLastColumn(),
        p_header = getHeader(p_sht, 'reverse'),
        target = p_sht.getRange(row, 1, 1, p_col_num).getValues()[0];

    // ヘッダーの項目が同じデータを追加
    pbl_header.forEach(function(col_name, col_idx) {
      data_box[col_idx] = target[p_header[col_name]] ? target[p_header[col_name]] : '';
    });

    pbl_sht.appendRow(data_box);
  }
}

// ヘッダーの辞書を取得
// [flagなし] key: col_index, value: col_name
// [flagあり] key: col_name, value: col_index 
function getHeader(sht, flag) {
  var col_num =  sht.getLastColumn(),
      header = sht.getRange(1, 1, 1, col_num).getValues()[0];

  if (!flag) {
    return header;
  }

  var header_reverse = {};
  header.forEach(function(col_name, col_idx) {
    header_reverse[col_name] = col_idx;
  });

  return header_reverse;
}