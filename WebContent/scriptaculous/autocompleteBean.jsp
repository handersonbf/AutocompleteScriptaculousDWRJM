<html>
<head>
	<script type='text/javascript' src='/AutocompleteScriptaculousDWRJM/dwr/interface/FacadeAjax.js'></script>
	<script type='text/javascript' src='/AutocompleteScriptaculousDWRJM/dwr/engine.js'></script>
	<script type='text/javascript' src='/AutocompleteScriptaculousDWRJM/dwr/util.js'></script>
	
	<script type="text/javascript" src="api/prototype/prototype.js"></script>
	<script type="text/javascript" src="api/script.aculo.us/effects.js"></script>
	<script type="text/javascript" src="api/script.aculo.us/controls.js"></script>
	<script type="text/javascript" src="api/autocomplete.js"></script>
	<script type="text/javascript" src="autocompleteBean.js"></script>
	
	<link rel="stylesheet" type="text/css" href="api/css/autocomplete.css"/>

<title>Script.aculo.us with Bean</title>
</head>
<body>
		  	<label>Search Name:</label>
	   		<input type="text" name="name" value=""  id="name" style="width: 20%;" maxlength="100"/>
			<div id="divName" class="auto_complete" style="width:auto;"></div>
		 	<script type="text/javascript">
		  		new Autocompleter.DWR("name", "divName", executeAutocomplete, {fullSearch:true}, function(o) {return o.name;});
          	</script>
          	
          	
          	<div id="divteste1"></div>
          	
          	<div id="divteste2"></div>
</body>
</html>