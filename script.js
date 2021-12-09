const outputLists = document.getElementById("list-output");
const bookURL = "https://www.googleapis.com/books/v1/volumes?q=";
const placeHldr = '<img src="https://via.placeholder.com/150">';
const error = document.getElementById("demo");
var searchData, item, title, author, publisher, bookLink, BookImg;

document.getElementById("search").addEventListener("click", searchResults);
function searchResults() {
	outputLists.innerHTML = "";
	searchData = document.getElementById("search-box").value;
	//handling empty search results
	if (searchData === "" || searchData === null) {
		alert("Please write the name of the book");
	} else {
		let url = bookURL + searchData;
		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				if (result.totalItems === 0) {
					error.innerHTML ="<h5>No results are found. Please try again...</h5>"
					setTimeout(() =>{
						const showBookList = document.getElementById("book-list");
						showBookList.style.visibility = "hidden";
					}, 0);
					
				} else {
					const showBookList = document.getElementById("book-list");
					showBookList.style.visibility = "visible";
					error.classList.add("error");
					displayResults(result);
				}
			});
		document.getElementById("search-box").value = "";
	}
}
function displayResults(result) {
	for (var i = 0; i < result.items.length; i += 3) {
		item = result.items[i];
		title1 = item.volumeInfo.title;
		author1 = item.volumeInfo.authors;
		publishDate1 = item.volumeInfo.publishedDate;
		bookLink1 = item.volumeInfo.previewLink;
		bookIdentifier1 = item.volumeInfo.industryIdentifiers[1].identifier;
		avgRating1 = item.volumeInfo.averageRating  ? item.volumeInfo.averageRating : '' ;
		bookImg1 = item.volumeInfo.imageLinks
			? item.volumeInfo.imageLinks.thumbnail
			: placeHldr;

		item = result.items[i + 1];
		title2 = item.volumeInfo.title;
		author2 = item.volumeInfo.authors;
		publishDate2 = item.volumeInfo.publishedDate;
		bookLink2 = item.volumeInfo.previewLink;
		bookIdentifier2 = item.volumeInfo.industryIdentifiers[1].identifier;
		avgRating2 = item.volumeInfo.averageRating ? item.volumeInfo.averageRating : '' ;
		bookImg2 = item.volumeInfo.imageLinks
			? item.volumeInfo.imageLinks.thumbnail
			: placeHldr;

		item = result.items[i + 2];
		title3 = item.volumeInfo.title;
		author3 = item.volumeInfo.authors;
		publishDate3 = item.volumeInfo.publishedDate;
		bookLink3 = item.volumeInfo.previewLink;
		bookIdentifier3 = item.volumeInfo.industryIdentifiers[1].identifier;
		avgRating3 = item.volumeInfo.averageRating ? item.volumeInfo.averageRating : '' ;
		bookImg3 = item.volumeInfo.imageLinks
			? item.volumeInfo.imageLinks.thumbnail
			: placeHldr;
		outputLists.innerHTML +=
			'<div class="row mt-5">' +
			formatOutput(
				bookImg1,
				title1,
				author1,
				publishDate1,
				bookLink1,
				bookIdentifier1,
				avgRating1
			) +
			formatOutput(
				bookImg2,
				title2,
				author2,
				publishDate2,
				bookLink2,
				bookIdentifier2,
				avgRating2
			) +
			formatOutput(
				bookImg3,
				title3,
				author3,
				publishDate3,
				bookLink3,
				bookIdentifier3,
				avgRating3
			);
		("</div>");
	}
}

function formatOutput(
	bookImg,
	title,
	author,
	publishDate,
	bookLink,
	bookIdentifier,
	avgRating
) {
	var viewUrl = "book.html?isbn="+bookIdentifier;
	var htmlCard = `<div class="col-lg-4 col-md-6 col-sm-12  mb-5">
    <div class="card h-100 m-auto">
      <img src="${bookImg}" class="card-img-top" alt="..." width=200>
      <div class="card-body">
        <h5 class="card-title" style="font-size:1.2rem;">${title}</h5>
        <p class="card-text">Author: ${author}</p>
        <p class="card-text">Published Date: ${publishDate}</p>
        <a target="_blank" href="${viewUrl}" class="btn btn-info">View Book</a>
		<i class='bx bxs-star'>${avgRating}</i>
      </div>
    </div>
  </div>`;
	return htmlCard;
}
