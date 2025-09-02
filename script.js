const button = document.querySelector(".button")
const quote = document.querySelector("#quote");
const author = document.querySelector("#author")
const getQuote = async () => {
    try {
        const fetchQuote = await fetch("https://thequoteshub.com/api/")
        console.log("quote")
        if (!fetchQuote.ok) {
            throw new Error('failed to fetch quote')
        }
        const data = await fetchQuote.json();
        quote.textContent = data.text;
        author.textContent = data.author;
        console.log(data)
    } catch (error) {
        console.error("cannot fetch", error)
    }
}
button.addEventListener('click',()=>{
    const gettingQuote = getQuote();
    if(gettingQuote){
        quote.textContent = "Generating new Quote...";
        author.textContent = null;
    }
})

getQuote();