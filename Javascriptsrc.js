//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changecouleur(elementId,color1,color2) {
   document.body.style.backgroundColor=color2;
   var element=document.getElementById(elementId);
   var element=document.getElementById(elementId);
   element.style.color=color1;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ChercherPays(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, param, output) {
    //just for aesthetics
     const tableavoid = document.getElementById("table_improved"); // Get table body element
    tableavoid.style.display='none';

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
    var parameter=document.getElementById(param);
	//passage du param�tre � la feuille de style
	xsltProcessor.setParameter("", "param",param);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById(output);

	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
    if(output=='data_pays'){
       // elementHtmlParent.style.display='block';
        var car = window.document.getElementById('square');
        car.style.display='inline-block';
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function svg(svgfileURL) {

    // Chargement du l'image svg � l'aide de XMLHttpRequest synchrone
    var svgimage = chargerHttpXML(svgfileURL);

	//serealize it
	const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgimage);
    //console.log(svgString);

   var elementHtmlParent = window.document.getElementById("load_svg");

	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=svgString




}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clickable(attribute){
    var output=document.getElementById('square2');
    output.style.display='none';
  var shapeElements = document.querySelectorAll('g');


for (var i = 0; i < shapeElements.length; i++) {
  var childElement = shapeElements[i];
  childElement.addEventListener('click', function(event) {
    // get the value of the title attribute
    var title = event.target.getAttribute(attribute);

    // display the value of the title attribute
    //alert(title);});
    output.innerHTML=title;
    output.style.display='inline-block';});

}

}
///////////////////////////////////////////////////////////////////////////////
function Mouse(xslfile){

    var shapeElements = document.querySelectorAll('g');
    var tooltip = window.document.getElementById('table_pays');


for (var i = 0; i < shapeElements.length; i++) {

  var childElement = shapeElements[i];
  childElement.addEventListener("mouseover", function(event) {

    // get the value of the title attribute
      event.target.setAttribute("style","fill:#0096FF");
      tooltip.style.display='block';
      ChercherPays('countriesTP.xml',xslfile,'pays_affiche',event.target.getAttribute('id'),'table_pays');

      });
childElement.addEventListener("mouseout", function(event) {

      event.target.removeAttribute("style");
      //tooltip.style.display='none';
   });
    }
}
//////////////////////////////////////////////////////////////////////
function datalist_load(XMLdoc){
    var xmlDoc=chargerHttpXML(XMLdoc);
    var nameTags=xmlDoc.getElementsByTagName("cca2");
    var datalist = window.document.getElementById('countriesid');


for (var i = 0; i < nameTags.length; i++) {
    var id = nameTags[i].textContent;
    const option = document.createElement("option");
    option.value = id;
    datalist.appendChild(option);

    // display the value of the title attribute

}

}
////////////////////////////////////////////////////////////////////////
function Json_table(JSONdoc){
   const tableBody = document.getElementById("table_improved"); // Get table body element
    const tableavoid = document.getElementById("table_pays"); // Get table body element
    tableavoid.style.display='none';
          tableBody.style.display='block';

      var jsondoc=chargerHttpJSON(JSONdoc);
      var row='';
       for (var i = 0; i < jsondoc.languages.length; i++) {
                 row+=jsondoc.languages[i].name;
                 if(i!=jsondoc.languages.length-1){
                 row+=',';
                 }
                }

      tableBody.innerHTML=`
        <table bgColor="#FFFDD0" border="3" width="70%" align="center">
	 <tr>
	            <th>Name</th>
	            <th>Capital</th>
                <th>Spoken languages</th>
	            <th>Flag</th>
                <th>Currencies</th>
    </tr>
        <td> ${jsondoc.name}  </td>
        <td> ${jsondoc.capital}  </td>
        <td> ${row} </td>
        <td> <img src=${jsondoc.flag} + width="100%" height="100"> </td>
      <td>
        ${jsondoc.currencies[0].name} (${jsondoc.currencies[0].symbol})

      </td>`;
  }

///////////////////////////////////////////////////////////////////////////////////////////////
function Mouse_finance(){
    var shapeElements = document.querySelectorAll('g');
for (var i = 0; i < shapeElements.length; i++) {
  var childElement = shapeElements[i];
  childElement.addEventListener("mouseover", function(event) {
    // get the value of the title attribute
      event.target.setAttribute("style","fill:0096FF");
      var code=event.target.getAttribute("id").toLowerCase();
      var JSONdoc='https://restcountries.com/v2/alpha/'+code;
      Json_table(JSONdoc);


       });
childElement.addEventListener("mouseout", function(event) {
      event.target.removeAttribute("style");
      //tooltip.style.display='none';
   });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
function languages(countryid){
   var shapeElements = document.getElementById("load_svg");
   var oldelem=shapeElements.querySelectorAll("path");
  oldelem.forEach(element => {
    element.removeAttribute("style");
  });
var code=countryid.toLowerCase();
var jasonurl='https://restcountries.com/v2/alpha/'+code;
var jasoncode=chargerHttpJSON(jasonurl);
for (var i = 0; i < jasoncode.languages.length; i++) {
    parameter=jasoncode.languages[i].name;
    // document.getElementById('hiddenlang').style.display='none';
    ChercherPays('countriesTP.xml','Lang_pays.xsl','pays_recherche',parameter,'hiddenlang');
    var text_to_split=document.getElementById('hiddenlang').innerHTML;
    let string1 = "\n&gt;\n\n";
    text_to_split= text_to_split.replace(string1, "").trim();
    const line = text_to_split.split("<br>");

        for (var j = 0; j < line.length; j++) {
        if(line[j]!=""){
            var country =shapeElements.getElementById(line[j]);
            if(country){
                country.setAttribute("style","fill:green");
            }
        }
    }
}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function getRandomIDFromDatalist() {
      var block1=document.getElementById('table_pays');
      var block2=document.getElementById('table_improved');
      block1.style.display='none';
      block2.style.display='none';
      var disp=document.getElementById('challenge');
  disp.style.display='inline-block';


  datalist_load('countriesTP.xml');
  var datalist = document.getElementById('countriesid');
  var options = datalist.getElementsByTagName('option');
  var randomIndex = Math.floor(Math.random() * options.length);
  var param = options[randomIndex].value;
  ChercherPays('countriesTP.xml','cherchePays.xsl','pays_recherche',param,'text_challenge');

  response(param);
}

/////////////////////////////////////////////////////////////////////////////////////////////
function response(param){

   //var shapeElements = document.getElementById("load_svg");
   var shapeElements = document.querySelectorAll('path');
  var correct=document.getElementById(param);
  ///to clear old filling
     var image = document.getElementById("load_svg");
    var oldelem=image.querySelectorAll("path");
  oldelem.forEach(element => {
    element.removeAttribute("style");
  });

for (var i = 0; i < shapeElements.length; i++) {
  var childElement = shapeElements[i];
  childElement.addEventListener('click', function(event, param) {
  ///to clear old filling
    oldelem.forEach(element => {
    element.removeAttribute("style");
  });

    // get the value of the title attribute
    var title = event.target.getAttribute('id');
    if(title!=param){
       // alert("wrong!!")
        event.target.setAttribute("style","fill:red");
        correct.setAttribute("style","fill:green")
    }else if (title=param){
       // alert("correct!!")
        event.target.setAttribute("style","fill:green");
    }



    });
}






}


















