/* This is a configuration script for the Giellatekno's online dictionaries */

function swapLanguages() {
  var cs_lang = lpair.substring(0,3);
  var ct_lang = lpair.substring(4,7);
  lpair = ct_lang+'-'+cs_lang;
  ajaxFunction(lpair+'-lr');

  removeElement('spec_chars');
  addElement(ct_lang, cs_lang);
 
  var slabel = document.getElementById("src_label").innerHTML;
  var tlabel = document.getElementById("trg_label").innerHTML;

  document.getElementById("src_label").innerHTML = tlabel;
  document.getElementById("trg_label").innerHTML = slabel;
  
  var searchfield = document.getElementById("word");
  searchfield.focus();
  searchfield.value = "";
  searchfield.reset();
}

function addchar(mychar) {
  var searchfield = document.getElementById("word");
  var searchstring = searchfield.value;
  searchfield.value = searchstring + mychar;
  searchfield.focus();
  var event = document.createEvent("KeyboardEvent");
  event.initKeyEvent("keyup",        //  in DOMString typeArg,                                                           
		     true,             //  in boolean canBubbleArg,                                                        
		     true,             //  in boolean cancelableArg,                                                       
		     null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
		     false,            //  in boolean ctrlKeyArg,                                                               
		     false,            //  in boolean altKeyArg,                                                        
		     false,            //  in boolean shiftKeyArg,                                                      
		     false,            //  in boolean metaKeyArg,                                                       
		     9,               //  in unsigned long keyCodeArg,                                                      
		     0);              //  in unsigned long charCodeArg;    
  searchfield.dispatchEvent(event);
}

function addElement(lang, langt) {
  var scharta = "";
  switch (lang) {
  case "sme":
    scharta= '<table id=\'spec_chars\' class=\'spec_chars\'><tr><td><input type=\'button\' value=\'&aacute;\' onclick=\'addchar("&aacute;")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td></tr></table>'
      break
  case "smj":
    scharta= '<table id=\'spec_chars\' class=\'spec_chars\'><tr><td><input type=\'button\' value=\'&aacute;\' onclick=\'addchar("&aacute;")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td></tr></table>'
    break
  case "sjd":
    scharta= '<table id=\'spec_chars\' class=\'spec_chars\'><tr><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'??????\' onclick=\'addchar("??????")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'j\' onclick=\'addchar("j")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td></tr><tr><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td></tr></table>'
    break
  case "sjt":
    if (langt == 'eng') {
      scharta = '<table id=\'spec_chars\' class=\'spec_chars\'><tr><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td></tr><tr><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td></tr></table>'
    } else {
    scharta= '<table id=\'spec_chars\' class=\'spec_chars\'><tr><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'??????\' onclick=\'addchar("??????")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'j\' onclick=\'addchar("j")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td></tr><tr><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td><td><input type=\'button\' value=\'????\' onclick=\'addchar("????")\'></td></tr></table>'
    }
  break
  case "fkv":
    scharta= '<table id=\'spec_chars\' class=\'spec_chars\'><tr><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td><td><input type=\'button\' value=\'??\' onclick=\'addchar("??")\'></td></tr></table>'
    break
  default:
    scharta = '';
  }

//     <table id=\'spec_chars\' class=\'spec_chars\'>
//     <tr> 
//     <td><input type=\'button\' value=\'\' onclick=\'addchar("")\'></td>
//     </tr>
//     </table>

  var ni = document.getElementById('input_help');
  ni.innerHTML = scharta;

}

function removeElement(divNum) {
  var d = document.getElementById('input_help');
  var olddiv = document.getElementById(divNum);
  if (olddiv != null)  {
    d.removeChild(olddiv);
  }
}

function updateIH(current_lpair) {
  var csl = current_lpair.substring(0,3);
  var ctl = current_lpair.substring(4,7);
  removeElement('spec_chars');
  addElement(csl, ctl);
  var searchfield = document.getElementById("word");
  searchfield.focus();
  searchfield.value = "";
  searchfield.reset();
}

function updateDescription(xlp) {
  var xsl = xlp.substring(0,3);
  var xtl = xlp.substring(4,7);
  var d = document.getElementById('lmb');
  var olddiv = document.getElementById('di_de');
  if (olddiv != null)  {
    d.removeChild(olddiv);
  }

  var lp = xsl+xtl;
  
  var ttl = getDescription('eng',lp);
  var ndd = ' <span id=\'di_de\''+ ttl + '\'>About this dictionary</span>';

  //var dbg = document.getElementById('debug');
  //dbg.innerHTML = lp;

  d.innerHTML = ndd;
  return;
}

function getDescription(loc_lang, dict) {
  var hd = '';
  var bd = '';

  switch (dict) {
  case "nobsme":
    if (loc_lang == 'eng') {
      hd = 'Norwegian Bokm??l-North Sami';
      bd = 'The Norwegian Bokm??l-North Sami dictionary is based upon Giellatekno&#39;s North Sami-Norwegian Bokm??l dictionary, which in turn is based upon Nils Jernsletten&#39;s ??lgos??tnegirji. In addition, some common Norwegian words have been added. Yet, it is still in a preliminary stage and it is not based upon the Norwegian source language. It contains xxx lemmata.';
    }
    break
  case "nobsma":
      if (loc_lang == 'eng') {
	hd = 'Norwegian Bokm??l-South Sami';
	bd = 'This dictionary is based upon Giellatekno&#39;s South Sami-Norwegian Bokm??l dictionary, which in turn is based upon the wordlist material made by Albert J??ma and Tove Brustad. In addition, some common Norwegian words have been added. Yet, it is still in a preliminary stage and it is not based upon the Norwegian source language. It contains xxx lemmata.';
      }
    break
  case "nobfkv":
      if (loc_lang == 'eng') {
	hd = 'Norwegian Bokm??l-Kven';
	bd = 'The Norwegian Bokm??l-Kven dictionary is is written by Terje Aronsen, and edited by Verena Schall at Kainun institutti and by Giellatekno/Divvun. Some common Norwegian words are added. All in all the dictionary contains 3638 Norwegian lemmata.';
      }
    break
  case "smenob":
      if (loc_lang == 'eng') {
	hd = 'North Sami-Norwegian Bokm??l';
	bd = 'Giellatekno&#39;s North Sami-Norwegian Bokm??l dictionary is based upon Nils Jernsletten&#39;s ??lgos??tnegirji (4322 lemmata). Some of the words are adjusted to contemporary spelling. Additionally, common words from textbooks in use in Sami classes, from newspapers, as well as 600 place names have been included. The dictionary contains about 8695 lemmata.';
      }
    break
  case "smesmj":
      if (loc_lang == 'eng') {
	hd = 'North Sami-Lule Sami';
	bd = 'Describe me, please!';
      }
    break
  case "smjsme":
      if (loc_lang == 'eng') {
	hd = 'Lule Sami-North Sami';
	bd = 'Describe me, please!';
      }
    break
  case "smanob":
      if (loc_lang == 'eng') {
	hd = 'South Sami-Norwegian Bokm??l';
	bd = 'The dictionary is based upon the wordlist material made by Albert J??ma and Tove Brustad (<b>Hemnes Samiske Forening</b>). In addition, the most common words from South S??mi texts have been added, as well as about 1000 South S??mi place names from the Norwegian Map Authority and the Swedish S??mi Parliament. All the verbs in <em>Verbh!</em> have been added, with Swedish translations. All in all, the dictionary contains 7407 lemmata.';
      }
    break
  case "smaswe":
      if (loc_lang == 'eng') {
	hd = 'South Sami-Swedish';
	bd = 'This dictionary is based upon <em>Verbh!</em> by M??rit Fr??nd??n, Bj??rn Lundqvist and Karin Wilson and contains xxx lemmata.';
      }
    break
  case "swesma":
      if (loc_lang == 'eng') {
	hd = 'Swedish-South Sami';
	bd = 'This dictionary is based on the South Sami-Swedish dictionary, which in turn is based upon <em>Verbh!</em> by M??rit Fr??nd??n, Bj??rn Lundqvist and Karin Wilson. It contains xxx lemmata.';
      }
    break
  case "russjd":
      if (loc_lang == 'eng') {
	hd = 'Russian-Kildin Sami';
	bd = 'This dictionary is based on the Kildin Sami-Russian dictionary, which in turn contains basic vocabulary. Main sources are the Kildin Saami school dictionaries of Kuru?? et al. 1985, Kert 1986, Sammallahti et al. 1991 as well as unpublished wordlists created by Aleksandra Antonova and by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b>.';
      }
    break
  case "russjt":
      if (loc_lang == 'eng') {
	hd = 'Russian-Ter Sami';
	bd = 'This dictionary is the reversed version of the Ter Sami-Russian dictionary, which in turn contains only very few items belonging to basic vocabulary.  The words were collected by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b>.';
      }
    break
  case "sjdrus":
      if (loc_lang == 'eng') {
	hd = 'Kildin Sami-Russian';
	bd = 'This dictionary basic Kilding Sami vocabulary. Main sources are the Kildin Saami school dictionaries of Kuru?? et al. 1985, Kert 1986, Sammallahti et al. 1991 as well as unpublished wordlists created by Aleksandra Antonova and by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b>.';
      }
    break
  case "sjdsjt":
      if (loc_lang == 'eng') {
	hd = 'Kildin Sami-Ter Sami';
	bd = 'This dictionary is the reversed version of the Ter Sami-Kildin Sami dictionary, which contains only very few items belonging to basic vocabulary. The words were collected by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b>.';
      }
    break
  case "engsjt":
      if (loc_lang == 'eng') {
	hd = 'English-Ter Sami';
	bd = 'This dictionary is the reversed version of the Ter Sami-English dictionary, which contains only very few items belonging to basic vocabulary. The words were collected by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b>.';
      }
    break
  case "sjtrus":
      if (loc_lang == 'eng') {
	hd = 'Ter Sami-Russian';
	bd = 'This dictionary contains very few items belonging to basic vocabulary. The words were collected by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b></a>.';
      }
    break
  case "sjtsjd":
      if (loc_lang == 'eng') {
	hd = 'Ter Sami-Kildin Sami';
	bd = 'This dictionary contains very few items belonging to basic vocabulary. The words were collected by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b></a>.';
      }
    break
  case "sjteng":
      if (loc_lang == 'eng') {
	hd = 'Ter Sami-English';
	bd = 'This dictionary contains very few items belonging to basic vocabulary. The words were collected by collaborators of the <b>Kola Saami Documentation Project (DoBeS)</b></a>.';
      }
    break
  case "fkvnob":
      if (loc_lang == 'eng') {
	hd = 'Kven-Norwegian Bokm??l';
	bd = 'The Kven-Norwegian Bokm??l dictionary is is written by Terje Aronsen, and edited by Verena Schall at Kainun institutti and by Giellatekno/Divvun. All in all the dictionary contains 4731 Kven lemmata.';
      }
    break
  default:
      if (loc_lang == 'eng') {
	hd = 'Norwegian Bokm??l-North Sami';
	bd = 'The Norwegian Bokm??l-North Sami dictionary is based upon Giellatekno&#39;s North Sami-Norwegian Bokm??l dictionary, which in turn is based upon Nils Jernsletten&#39;s ??lgos??tnegirji. In addition, some common Norwegian words have been added. Yet, it is still in a preliminary stage and it is not based upon the Norwegian source language. It contains xxx lemmata.';
      }
  }
  return  'title=\'header=['+ hd + '] body=[' + bd + ']\'';
}

