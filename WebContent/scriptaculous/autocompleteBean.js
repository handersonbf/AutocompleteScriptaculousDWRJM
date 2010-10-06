function executeAutocomplete(oAutocomplete, token) {
	FacadeAjax.allUsersBean(token,{
		callback:function(listResult){
			oAutocomplete.setChoices(listResult);
		},errorHandler: function(msg, error){
            alert(msg);
        }
	}); 
}