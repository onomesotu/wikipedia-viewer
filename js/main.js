
//Function to run when DOM is ready
document.addEventListener('DOMContentLoaded', function(e){
	// give focus to the input element on page load
	const input = document.querySelector('#search');
	input.focus();

	//Add event listener and handler to the search button
	const normalSearchButton = document.getElementsByClassName('buttons__search');
	normalSearchButton[0].addEventListener('click', makeCORSRequest, false);

	// Event listener and handler for when the enter key is pressed
	const enterKey = document.querySelector('input');
	enterKey.addEventListener('keyup', function(e){
		if(e.keyCode === 13) {
			makeCORSRequest();
		}
	});

	//Create CORS request and check if it is supported by the users client
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

	//Make CORS request 
	function makeCORSRequest(e) {
		const inputText = document.getElementById('search').value.trim();
		if (!inputText) {//Do nothing if input field is empty
			return;
		} else {
			const wikipediaAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + inputText + '&limit=10&namespace=0&origin=*&format=json';
			const request = createCORSRequest('GET', wikipediaAPI);
			if(!request) {
				error('CORS not supported');
				console.log('CORS not supported');
				return;
			}

			request.onload = function(e){
				if(this.readyState === 4){
					if(this.status >= 200 && this.status <= 400){
						return success(this.responseText);
					} else {
						error(this.statusText);
					}
				}
			};

			request.onerror = function(e){
				error(request.statusText);
			};

			request.send(null);
		}	
	}

	function success(responseText){
	 	var response = JSON.parse(responseText);
	 	var mainDiv = document.getElementById('main');
	 	if (!mainDiv.hasChildNodes()){
	 		// If content div is empty, call result function
	 		// Use a smoooth transition to move header from center to the top of the page
	 		result(mainDiv, response);
	 		const headerMargin = document.getElementsByClassName('header__title');
	 		headerMargin[0].style.marginTop = '20px';
	 	} else {
	 		mainDiv.innerHTML = "";
	 		result(mainDiv, response);
	 	}

	 	function result(div, response){
	 		//Notify user if pages requested does not exist
	 		if(response[1].length < 10){
	 			let element = document.createElement('p');
	 			element.setAttribute('class', 'text-center main__error');
	 			let inputText = document.getElementById('search').value.trim();
	 			let text = 'The page \"' + inputText  + '\" does not exist. You can <a href="https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation" target="_blank">ask for it to be created.</a>';
	 			element.innerHTML = text;
	 			div.appendChild(element);
	 			return;
	 		}
	 		//This result function parses the api response.
	 		//The response contains 10 results hence the loop up until 10
	 		//In the loop, an <a> element is created and it's attributes set.
	 		//A div that contains the corresponding title and description of the query result is created and 
	 		//appended to the <a> element. This is repeated for the 10 query results.
		 	for(var i = 0; i < 10; ++i) {
		 		let element = document.createElement('a');
		 		element.setAttribute('href', response[3][i]);
		 		element.setAttribute('class', 'main__anchors');
		 		element.setAttribute('target', '_blank');
		 		let block_div = '<div><h3>' + response[1][i] + '</h3><p class="main__paragraphs">' + response[2][i] + '</p></div></a>';
		 		element.innerHTML = block_div;
		 		div.appendChild(element);
		 	}
		 }
	 }

	 function error(responseText){
	 	var element = document.createElement('p');
	 	element.setAttribute('class', 'error text-center');
	 	element.innerHTML = responseText;
	 	var main = document.getElementById('main');
	 	main.innerHTML = element;
	 }
});

 

