const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeexpTag = document.querySelector(".timeexp span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
wordTag = document.querySelector(".WM span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = words = isTyping = 0;

/// timestamp!
/// word mistake = a mistake of any given index before space = 1 word = find the position of the space and before anygiven position mistake = 1 word = if after word + 1 and any mistake before a word = 1 word mistake


function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
        });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function wo () {
    let characters = typingText.querySelectorAll("span");
    characters[charIndex].classList.add("word");
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }else {
            if(characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
                
            }
            }

            
            
        if(typedChar == null) {
            charIndex--;
            characters[charIndex].classList.remove("correct","incorrect");
         }else {
            
            if(characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
                
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
                
            }
            //
               // words mistake only change after the mistake is change
               /// if the mistake does not change the word mistake  does not change
            if(characters[charIndex].innerText === " ") {
                wo();
                if ( mistakes > 0) {mistakes*0;words++;} 
                if(words != mistakes++) {words*0}
               

                    
                   

                    //if((".typing-text p span.incorrect") > 1) {words+1}
                       // if (wo()) {mistakes*0;words++}
                
                   // words++;
                    //mistakes*0;
                
           }
           
           
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakes = mistakes;
        words = words;
        wordTag.innerText = words ;
            if(mistakeTag.innerText > 0) {wordTag.innerText = words};
            
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes - words;
            if (mistakeTag.innerText <= 0) {mistakeTag.innerText = mistakes};
        cpmTag.innerText = charIndex - mistakes - words;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

// word mistake = a mistake of any given index before space = 1 word = find the position of the space and before anygiven position mistake = 1 word = if after word + 1 and any mistake before a word = 1 word mistake

function xx() {
    let characters = typingText.querySelectorAll("span");
    characters.matchall(" ");
    return position (characters.matchall(" "))
}
console.log(xx);

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeexpTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeexp.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);