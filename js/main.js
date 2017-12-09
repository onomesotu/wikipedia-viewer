
const normalSearch = document.getElementsByClassName('buttons__search');

normalSearch.addEventListener('click', ajaxCall, true);

function ajaxCall(e){
	e.preventDefault();
	const inputText = document.getElementById('search').value;
	const wikipediaAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + inputText + '&limit=2&namespace=0&format=jsonfm';
	const request = new XMLHttpRequest();
	request.open('GET', wikipediaAPI, true);
	request.onload = function(e){
		if(this.readyState === 4){
			if(this.status >= 200 && this.status <= 400){
				console.log(this.responseText);
			} else {
				console.error(this.statusText);
			}
		}
	};
	request.onerror = function(e){
		console.error(xhr.statusText);
	};
	request.send(null);
}