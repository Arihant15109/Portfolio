let userScore = 0;
let compScore = 0;

const userScore_span = document.getElementById("userscore");

const compScore_span = document.getElementById("compscore");

const choices = document.querySelectorAll(".choice-button");
const msg = document.querySelector("#result")
const style = document.links

const drawGame = () => {
    msg.innerText = "It's a Draw!"
    msg.style.backgroundColor = "grey";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        msg.innerText = `Congratulations! Your ${userChoice} beats Computer's ${compChoice}.`
        msg.style.backgroundColor = "green";
        userScore++;
        userScore_span.innerText = userScore;
    } else {
        msg.innerText = `Oops try again! Computer's ${compChoice} beats Your ${userChoice}.`
        msg.style.backgroundColor = "red";
        compScore++;
        compScore_span.innerText = compScore;
    }
}

const genCompChoice = () => {
    const options = ["Rock", "Paper", "Scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const playGame = (userChoice) => {
    console.log(userChoice);
    const compChoice = genCompChoice();
    console.log(compChoice);

    if(userChoice === compChoice){
        drawGame ();
        return;
    } else {
        let userWin = true;
        if(userChoice === "Rock") {
            userWin = compChoice === "Paper" ? false : true;
        }
        else if(userChoice === "Paper") {
            userWin = compChoice === "Scissor" ? false : true;
        }
        else{
            userWin = compChoice === "Rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}



choices.forEach( (choice) => {
    choice.addEventListener("click", function() {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});