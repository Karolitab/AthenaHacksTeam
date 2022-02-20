subs = JSON.parse(localStorage.getItem("subs") || "[]");
console.log(subs);


var table = document.getElementById("table");
var header = table.createTHead();
var row = header.insertRow(0);    
row.insertCell(0).outerHTML="<th>"+"#"+"</th>";
row.insertCell(1).outerHTML="<th>"+"Subs_name"+"</th>";
row.insertCell(2).outerHTML="<th>"+"start"+"</th>";
row.insertCell(3).outerHTML="<th>"+"renewal(in months)"+"</th>";
row.insertCell(4).outerHTML="<th>"+"options"+"</th>";
var body = table.createTBody();
// Create an empty <tr> element and add it to the 1st position of the table:
for(let i=0;i<subs.length;i++)
{

var row = body.insertRow(i);
 row.insertCell(0).outerHTML = "<th>"+(i+1)+"</th>";
// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 =row.insertCell(4);

// Add some text to the new cells:
cell1.innerHTML = subs[i].subscription;
cell2.innerHTML = subs[i].start;
cell3.innerHTML = subs[i].renewal;
      
var html = '<ul class="list-inline m-0">';
 html += '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-edit"></i></button></li>';
html += '<li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-trash"></i> </button></li>';
html += '</ul>';
cell4.innerHTML = html;

}


  
