//Inicializando o Autocomplete
new Autocompleter.DWR("name", "divName", executeAutocomplete, {fullSearch:true}, function(o) {return o.name;});

function executeAutocomplete(oAutocomplete, token) {
	FacadeAjax.allUsersBean(token,{
		callback:function(listResult){
			oAutocomplete.setChoices(listResult);
		},errorHandler: function(msg, error){
            alert(msg);
        }
	}); 
}