const newQuote = document.querySelector("#newQuote")
const quote = document.querySelector("#quote");
const author = document.querySelector("#author")
const copy = document.querySelector("#copy")
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
newQuote.addEventListener('click',()=>{
    const gettingQuote = getQuote();
    if(gettingQuote){
        quote.textContent = "Generating new Quote...";
    }
})
copy.addEventListener('click',async ()=>{
    const text = quote.innerHTML;
    navigator.clipboard.writeText(text).then(()=>{
        alert("Quote Copied")
    }).catch(err =>{
        console.error("Error copying text: ", err)

    })
})

getQuote();