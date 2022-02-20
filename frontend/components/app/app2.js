subs = JSON.parse(localStorage.getItem("subs") || "[]");
valemail = localStorage.getItem("email");
console.log(subs);


var body = document.querySelector(".tablebody");

for(let i=0;i<subs.length;i++)
{

var row = body.innerHTML+= '<tr>' + '<td>' + subs[i].subscription +  '</td>' + 
                                '<td>' + subs[i].start +  '</td>' +
                                '<td>' + subs[i].renewal +  '</td>' +
                                '<td>' +  '<a class="add" title="Add" data-toggle="tooltip">' + '<i class="material-icons">' + '&#xE03B;' + 
                                '</i>' + '</a>'
                                 + '<a class="edit" title="edit" data-toggle="tooltip">' + '<i class="material-icons">' + '&#xE254;' + 
                                 '</i>' + '</a>' +
                                 '<a class="delete" title="delete" data-toggle="tooltip">' + '<i class="material-icons">' + '&#xE872;' + 
                                  '</i>' + '</a>'
                                   +  '</td>' +
                                '</tr>'

}
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="name" id="name" oninput="show()"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;

		var input = $(this).parents("tr").find('input[type="text"]');
		const payload = {
		email: valemail,
        subscription: document.getElementById('name').value,
        start: document.getElementById('department').value,
        renewal: document.getElementById('phone').value,
    }
     axios.post("http://localhost:8080/addSubs", payload)
     .then((response) => {
       console.log(response);
       if (response.status === 201) {
         //successfully logged in
         errorMessage = "Success";
         console.log(response.data);
         localStorage.setItem("subs", JSON.stringify(response.data.subscriptions));
          window.location.replace("../app/app2.html");
       } else {
         console.log("Some error ocurred");
         errorMessage = 'failure';
         
       }
     })
     .catch((error) => {
       console.log(error);
       // backend sends error due to wrong password
       if (error.response.status === 404) {
        errorMessage = "Invalid Credentials"
        console.log(errorMessage);
       }
       })
	
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
			   
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});
