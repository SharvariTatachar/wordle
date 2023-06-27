  document.addEventListener("DOMContentLoaded", () => {
    createSquares()

    let Guesses = [[]]
    let squareID = 1; 
    let guessCount = 0;  

    function getCurrentGuess(){
        const numGuesses = Guesses.length
        return Guesses[numGuesses-1]
    }
    function updateGuesses(letter){
        const currentGuess = getCurrentGuess()
        if (currentGuess && currentGuess.length < 5){
            currentGuess.push(letter)
            const squareIDElement = document.getElementById(String(squareID))
            squareID = squareID + 1
            
            squareIDElement.textContent = letter; 
        }
    }
    function createSquares(){
        const gameBoard = document.getElementById("board")

        for(let idx = 0; idx <30; idx++){
            let square = document.createElement("div")
            square.classList.add("square")
            square.classList.add("animate__animated");
            square.setAttribute("id", idx +1)
            gameBoard.appendChild(square)
        }
    }
    function setTileColor(letter, index){
        const isInWord = word.includes(letter); 
        if(!isInWord){
            return "rgb(58, 58, 60)"; 
        }

        const correctLetter = word.charAt(index); 
        const isCorrect = letter === correctLetter; 
        if (isCorrect){
            word = word.replace(letter, "-")
            return "rgb(83, 141, 78)"; 
        }
        else{ 
            word = word.replace(letter, "-")
            return "rgb(181, 159, 59)"; 
        }
    }
    
    function handleSubmitGuess(){
        word = word.replace(/"/g,"")
        sampleword = sampleword.replace(/"/g,"")
        const currentGuess = getCurrentGuess(); 
        if (currentGuess.length !==5){
            window.alert("Incorrect Length")
        }
        const thisGuess = currentGuess.join(""); 
        const interval = 200; 
        const firstLetterID = guessCount*5 +1; 
        currentGuess.forEach((letter, index) => {
            setTimeout(() => {
                const color = setTileColor(letter, index); 
                const letteridx = firstLetterID + index; 
                const letterEl = document.getElementById(letteridx)
                letterEl.classList.add("animate__flipInX"); 
                letterEl.style = `border-color:${color};`; 
            }, interval * index); 
        }); 
        word = sampleword 
        window.alert(`${word}`)
        guessCount += 1; 
        Guesses.push([])
        if (thisGuess == word){
            window.alert("Congrats! Reload to play again!")
        }
        else if (Guesses.length >= 7){
            window.alert(`You Lost. The word was ${word}. Reload to try again!`)
        }
    }

    function handleDelete() {
        const currWord = getCurrentGuess(); 
        if (currWord.length == 0){
            window.alert("Cannot delete!")
            return; 
        }
        const removeThis = currWord.pop(); 
        Guesses[Guesses.length - 1] = currWord; 
        const removeLetterEl = document.getElementById(String(squareID -1)); 
        removeLetterEl.textContent = ""; 
        squareID = squareID -1; 

    }

    const keys = document.querySelectorAll(".keyboard-row button")
    for (let i = 0; i<keys.length; i++){
        keys[i].onclick = ({target})=>{
            const letter = target.getAttribute("data-key"); 
            if (letter == 'enter'){
                handleSubmitGuess(); 
                return; 
            }
            if (letter == "del"){
                handleDelete(); 
                return; 
            }
            else {
                updateGuesses(letter); 
            } 
        }; 
    }

})