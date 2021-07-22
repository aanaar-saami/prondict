/* This is a configuration script for the Meänkieli<->Swedish dictionaries */

function swapLanguages() {
  var cs_lang = lpair.substring(0,3);
  var ct_lang = lpair.substring(4,7);
  lpair = ct_lang+'-'+cs_lang;
  ajaxFunction(lpair+'-lr');

  var slabel = document.getElementById("src_label").innerHTML;
  var tlabel = document.getElementById("trg_label").innerHTML;

  document.getElementById("src_label").innerHTML = tlabel;
  document.getElementById("trg_label").innerHTML = slabel;
  
  var searchfield = document.getElementById("word");
  searchfield.focus();
  searchfield.value = "";
  searchfield.reset();
}

function updateIH(current_lpair) {
  var csl = current_lpair.substring(0,3);
  var ctl = current_lpair.substring(4,7);
  var searchfield = document.getElementById("word");
  searchfield.focus();
  searchfield.value = "";
  searchfield.reset();
}
