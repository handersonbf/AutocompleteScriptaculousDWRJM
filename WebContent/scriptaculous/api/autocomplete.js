/**
 * First version Bram Smeets (http://bram.jteam.nl/index.php/about-me/)
 * Update 2009: Handerson Frota (www.handersonfrota.com.br)
 */
Autocompleter.DWR = Class.create();

/**
 * Ex: new Autocompleter.DWR("name", "divName", functionDWR, {fullSearch:false});
 */
Autocompleter.DWR.prototype = Object.extend(new Autocompleter.Base(), {
    initialize: function(element, update, populator, options) {
        this.baseInitialize(element, update, options);
        this.options.array = new Array(0);
        this.populator = populator;
        if (this.options.afterUpdateElement ) {
             this.afterUpdateCallback = this.options.afterUpdateElement;
             this.options.afterUpdateElement = this.afterUpdateElement.bind(this);
        }
    },

    // called by the autocompleter on an event.
    getUpdatedChoices: function() {
        this.populator(this, this.getToken()); // this is the populator specified in the constructor.
    },

    afterUpdateElement: function(element,selectedElement) {
        this.afterUpdateCallback(element, selectedElement,this.options.array[this.index]);
     },

    // should be called by the populator (specified in the constructor)
    setChoices: function(array) {
        this.options.array = array;
        this.updateChoices(this.options.selector(this));
    },

    setOptions: function(options) {
        this.options = Object.extend({
            choices: 10,
            partialSearch: true,
            partialChars: 2,
            ignoreCase: true,
            fullSearch: false,
            selector: function(instance) {
                var ret       = []; // Beginning matches
                var partial   = []; // Inside matches
                var entry     = instance.getToken();
                var count     = 0;
                var valueSelector = instance.options.valueSelector;

                for (var i = 0; i < instance.options.array.length && ret.length < instance.options.choices ; i++) {
                	
                    var elem = valueSelector(instance.options.array[i]);
                    
                    var foundPos = instance.options.ignoreCase ?
                            elem.toLowerCase().indexOf(entry.toLowerCase()) :
                            elem.indexOf(entry);

                    while (foundPos != -1) {
                        if (foundPos == 0 && elem.length != entry.length) {
                        	//Criado nova funcao para deixa em cor destaque a string digitada - Handerson Frota - handersonbf@gmail.com
                          	ret.push("<li>" + elem.substr(0, foundPos) + "<font style='auto_complete'>" + elem.substr(foundPos, entry.length) + "</font>" +
                            elem.substr(foundPos+entry.length,elem.length) + "</li>");
                            break;
                        } else if (entry.length >= instance.options.partialChars &&
                                instance.options.partialSearch && foundPos != -1) {
                            if (instance.options.fullSearch || /\s/.test(elem.substr(foundPos-1,1))) {
                        		 partial.push("<li>" + elem.substr(0, foundPos) + "<font style='auto_complete'>" +
                                         elem.substr(foundPos, entry.length) + "</font>" +
                                         elem.substr(foundPos + entry.length) + "</li>");
                                break;
                            }
                        }

                        foundPos = instance.options.ignoreCase ?
                                elem.toLowerCase().indexOf(entry.toLowerCase(), foundPos  + 1) :
                                elem.indexOf(entry, foundPos + 1);

                    }
                }
                if (partial.length)
                    ret = ret.concat(partial.slice(0, instance.options.choices - ret.length))
                    return "<ul>" + ret.join('') + "</ul>";
            },

            valueSelector: function(object){ return object; }
        }, options || {});
    }
});


/**
 * Autocomplete with support for Java beans
 * 
 * Ex: new Autocompleter.DWR("name", "divName", functionDWR, functionBean ,{fullSearch:false});
 * 
 * @author Handerson Frota (www.handersonfrota.com.br)
 * @version v1.0
 */
Autocompleter.DWR.prototype = Object.extend(new Autocompleter.Base(), {
	    initialize: function(element, update, populator, options, functionBean) {
	        this.baseInitialize(element, update, options);
	        this.options.array = new Array(0);
	        this.populator = populator;
	        if(typeof functionBean == 'function'){
	        	this.functionBean = functionBean;
	        }else{
	        	this.functionBean = null;
	        }

	        if (this.options.afterUpdateElement ) {
	             this.afterUpdateCallback = this.options.afterUpdateElement;
	             this.options.afterUpdateElement = this.afterUpdateElement.bind(this);
	        }
	    },
	
	    // called by the autocompleter on an event.
	    getUpdatedChoices: function() {
	        this.populator(this, this.getToken()); // this is the populator specified in the constructor.
	    },
	
	    afterUpdateElement: function(element,selectedElement) {
	        this.afterUpdateCallback(element, selectedElement,this.options.array[this.index]);
	     },
	
	    // should be called by the populator (specified in the constructor)
	    setChoices: function(array) {
	        this.options.array = array;
	        this.updateChoices(this.options.selector(this, this.functionBean));
	    },
	
	    setOptions: function(options) {
	        this.options = Object.extend({
	            choices: 10,
	            partialSearch: true,
	            partialChars: 2,
	            ignoreCase: true,
	            fullSearch: false,
	            selector: function(instance, functionBean) {
	                var ret       = []; // Beginning matches
	                var partial   = []; // Inside matches
	                var entry     = instance.getToken();
	                var count     = 0;
	                var valueSelector = instance.options.valueSelector;

	                for (var i = 0; i < instance.options.array.length && ret.length < instance.options.choices ; i++) {
	                	
	                	if(functionBean != null){
	                		var elem = functionBean(instance.options.array[i]);
	                	}else{
	                		var elem = valueSelector(instance.options.array[i]);
	                	}

	                	var foundPos = instance.options.ignoreCase ?
	                            elem.toLowerCase().indexOf(entry.toLowerCase()) :
	                            elem.indexOf(entry);
	
	                    while (foundPos != -1) {
	                        if (foundPos == 0 && elem.length != entry.length) {
	                        	//Criado nova fun��o para deixa em cor destaque a string digitada - Handerson Frota - handersonbf@gmail.com
	                          	ret.push("<li>" + elem.substr(0, foundPos) + "<font style='auto_complete'>" + elem.substr(foundPos, entry.length) + "</font>" +
	                            elem.substr(foundPos+entry.length,elem.length) + "</li>");
	                            break;
	                        } else if (entry.length >= instance.options.partialChars &&
	                                instance.options.partialSearch && foundPos != -1) {
	                            if (instance.options.fullSearch || /\s/.test(elem.substr(foundPos-1,1))) {
	                        		 partial.push("<li>" + elem.substr(0, foundPos) + "<font style='auto_complete'>" +
	                                         elem.substr(foundPos, entry.length) + "</font>" +
	                                         elem.substr(foundPos + entry.length) + "</li>");
	                                break;
	                            }
	                        }
	
	                        foundPos = instance.options.ignoreCase ?
	                                elem.toLowerCase().indexOf(entry.toLowerCase(), foundPos  + 1) :
	                                elem.indexOf(entry, foundPos + 1);
	
	                    }
	                }
	                if (partial.length)
	                    ret = ret.concat(partial.slice(0, instance.options.choices - ret.length))
	                    return "<ul>" + ret.join('') + "</ul>";
	            },
	
	            valueSelector: function(object){ return object; }
	        }, options || {});
	    }
	});