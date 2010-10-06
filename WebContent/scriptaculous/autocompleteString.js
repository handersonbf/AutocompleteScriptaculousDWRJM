function executeAutocomplete(oAutocomplete, token) {
	FacadeAjax.allUsersStrings(token,{
		callback:function(listResult){
			oAutocomplete.setChoices(listResult);
		},errorHandler: function(msg, error){
            alert(msg);
        }
	}); 
}