let book = {
    "title": "Hello, world",
    "author": "Artem Teslenko",
    "year": 2022
    };

  function validateTitle() {
    let titleValue = book.title;

    if (typeof titleValue === "string") {
      console.log("Title is valid");
      return true;
    } else {
      console.log("Title is invalid");
      return false;
    }
  };


  function validateAuthor() {
    let authorValue = book.author;
    if (typeof authorValue === "string") {
      console.log("Author is valid");
      return true;
    } else {
      console.log("Author is invalid");
      return false;
    }
  };

  function validateYear(){
    let yearValue = book.year;
    if (typeof yearValue === "number") {
      console.log("Year is valid");
      return true;
    } else {
      console.log("Year is invalid");
      return false;
    }
  }



validateTitle();
validateAuthor();
validateYear();
