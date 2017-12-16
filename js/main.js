
const normalSearchButton = document.getElementsByClassName('buttons__search');

normalSearchButton[0].addEventListener('click', makeCORSRequest, false);

function createCORSRequest(method, url) {
	var request = new XMLHttpRequest();
	if ('withCredentials' in request){
		request.open(method, url, true);
	} else if (typeof XDomainRequest != 'undefined'){
		request = new XDomainRequest();
		request.open(method, url);
	} else {
		request = null;
	}
	return request;
}

function makeCORSRequest(e) {
	e.preventDefault();
	const inputText = document.getElementById('search').value.trim();
	if (!inputText) {
		return;
	} else {
		const wikipediaAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + inputText + '&limit=10&namespace=0&origin=*&format=json';
		const request = createCORSRequest('GET', wikipediaAPI);
		if(!request) {
			console.log('CORS not supported');
			return;
		}

		request.onload = function(e){
			if(this.readyState === 4){
				if(this.status >= 200 && this.status <= 400){
					return success(this.responseText);
				} else {
					console.error(this.statusText);
				}
			}
		};

		request.onerror = function(e){
			console.log(request.statusText);
		};

		request.send(null);
	}
	
}

 function success(responseText){
 	var response = JSON.parse(responseText);
 	
 	for(var i = 0; i < 10; ++i) {
 		let element = document.createElement('a');
 		element.setAttribute('href', response[3][i]);
 		let block_div = '<div><h3>' + response[1][i] + '</h3><p>' + response[2][i] + '</p></div></a>';
 		element.innerHTML = block_div;
 		document.body.appendChild(element);
 	}
 }

