//Inicializando o Autocomplete
new Autocompleter.DWR("name", "divName", executeAutocomplete, {fullSearch:false});

function executeAutocomplete(oAutocomplete, token) {
	FacadeAjax.allUsersStrings(token,{
		callback:function(listResult){
			oAutocomplete.setChoices(listResult);
		},errorHandler: function(msg, error){
            alert(msg);
        }
	}); 
}