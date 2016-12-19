// 1. make getJSON into a function so you can call it whenever you want to DONE
// 2. instead of auto saving, give the user a save option 
// 3. retrieve button
//4. bookmarks on the side of the page
//5. auto refresh all stocks every x seconds
//6. keep the watchlist stockls in a seperate table from searched stocks
//7. keep a recent localStorage var, and a saved localStorage var
//8. pair up with blackjack


// WAIT FOR THE DOM!!!
$(document).ready(function(){

	$('#arrow1').click(function(){
		$('#page1,#page2').animate({
			'right':'100vw'
		},100);
	})
	$('#arrow2').click(function(){
		$('#page1,#page2').animate({
			'right':'0vw'
		},100);
	})
	$('#save').click(function(){
		var symbol = $('#symbol').val();
		localStorage.setItem("userStocks", symbol);
	})
	$('#retrieve').click(function(){
		var userStocksSaved = localStorage.getItem('userStocks');

	})


	// See if the user has any stored stocks. If so, then load them
	// var userStocksSaved = localStorage.getItem('userStocks');

	$('#send').submit(function(){
		// Stop the form from submitting (default action)
		event.preventDefault();
		// Get whatever the user typed out of the input and store it in symbol
		var symbol = $('#symbol').val();
		// localStorage.setItem("userStocks", symbol);
		getJSON(symbol);
	});
});

function getJSON(query){
	var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${query}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
		$.getJSON(url, function(dataJSGotIfAny){
			var stockInfo = dataJSGotIfAny.query.results.quote;
			if(dataJSGotIfAny.query.count == 1){
				// we know this is a single object becaues theres only 1
				var htmlToPlot = buildStockRow(stockInfo);
				$('#stock-body').append(htmlToPlot);				
			}else{
				// we know this is an array, because the count isnt 1
				for(let i = 0; i < stockInfo.length; i++){
					var htmlToPlot = buildStockRow(stockInfo[i]);
					$('#stock-body').append(htmlToPlot);
				}
			}
		});
}

function buildStockRow(stock){
	// check to see if change is + or -
	if(stock.Change.indexOf('+') > -1 ){
		// if > -1, there is a + somewhere in this string
		var classChange = "success";
	}else{
		var classChange = "danger";
	}
	var newHTML = '';
	newHTML += '<tr>';
		newHTML += '<td>'+stock.Symbol+'</td>';
		newHTML += '<td>'+stock.Name+'</td>';
		newHTML += '<td>'+stock.Ask+'</td>';
		newHTML += '<td>'+stock.Bid+'</td>';
		newHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
	newHTML += '</tr>';
	return newHTML;
}