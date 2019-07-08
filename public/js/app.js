var vm;

document.addEventListener("DOMContentLoaded", function () {
	vm = new Vue({
		el: "#app",
		data: function() {
			return {
				currentTab: 'about',
				galleryImages: ['shanaise-1', 'shanaise-2', 'shanaise-3', 'shanaise-4', 'shanaise-5'],
				isMobileMenuActive: false,
				imageViewerVisible: false,
				currImage: 'shanaise-1',				
			}
		},
		created: function() {

			var self = this;
			
			var p = getParameterByName('p');
			
			if (p) {
			   	self.currentTab = p;
			} else {
			   	window.history.replaceState(null, null, window.location.href + '?p=' + self.currentTab);
			}

			window.addEventListener("popstate", function (e) {
			   	var page = getParameterByName('p');
			   	if (page) {
			      	self.currentTab = page;
			   	} else {
			    	self.currentTab = 'about';
			   	}
			});
		},
		methods: {
			setCurrentTabTo: function(str) {
				if(this.currentTab !== str){
					this.currentTab = str;
				   	var cleanUrl = removeURLParameter('p');
				    window.history.pushState(null, null, cleanUrl + '?p=' + str);				   	
				}
			},
			onMobileMenuBtnClick: function() {
				this.isMobileMenuActive = !this.isMobileMenuActive;
			},
			onThumbnailClick: function(img) {
				this.imageViewerVisible = true;
				this.currImage = img;
			}
		}
	});

	function removeURLParameter(parameter, url) {
	   	url = url || window.location.href;   
	   	var urlparts = url.split('?');
	   	if (urlparts.length >= 2) {

	    	var prefix = encodeURIComponent(parameter) + '=';
	      	var pars = urlparts[1].split(/[&;]/g);
	      	
	      	for (var i = pars.length; i-- > 0;) {	         	
	         	if (pars[i].lastIndexOf(prefix, 0) !== -1) {
		            pars.splice(i, 1);
	         	}
	      	}
	      	url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
	      	return url;
	   	} else {
	      	return url;
	   	}
   	}

   	function getParameterByName(name, url) {
	   	if (!url) {
	      	url = window.location.href;
	   	}
	   	name = name.replace(/[\[\]]/g, "\\$&");
	   	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	    results = regex.exec(url);
	   	if (!results) return null;
	   	if (!results[2]) return '';
	   	return decodeURIComponent(results[2].replace(/\+/g, " "));
	}	
});

function onThumbnailClick(img){
	vm.onThumbnailClick(img);
}