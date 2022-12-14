window.onload = startGame;

let gameconfig;
let titleLoading = "";
let lvlnumber = "";
let backgroundimg = "";
let unlockAll = false;

function startGame() {
    prepareGame()
    let canvas = document.querySelector("#myCanvas");

    gameconfig = new GameConfig(canvas)
    resize()
    let startingscreen = "";
    if(sessionStorage.getItem("startingscreen")!=null)
        startingscreen = sessionStorage.getItem("startingscreen")
    new MainMenu(gameconfig,startingscreen)
}

function resize() {
    var width = window.document.body.clientWidth;
    var height = window.document.body.clientHeight;
    
    if (width > height) {
        width = height * 16 / 9
    }
    else height = width*9 / 16
    let canvas = document.querySelector("#container");
    canvas.style.width = width+"px";
    canvas.style.height = height+"px";

    gameconfig.engine.setSize(width, height)
}

window.addEventListener("resize", () => {
    resize()
});


function prepareGame(){
    localStorage.setItem("0",true)
    localStorage.setItem("Fang",true)

}

function clearChapterOne(){
    localStorage.setItem("0",true)
    localStorage.setItem("1-1",true)
    localStorage.setItem("1-2",true)
    localStorage.setItem("1-3",true)
    localStorage.setItem("1-4",true)
    localStorage.setItem("1-5",true)
    localStorage.setItem("1-6",true)
    localStorage.setItem("1-7",true)
    localStorage.setItem("1-8",true)
    localStorage.setItem("1-9",true)
    localStorage.setItem("1-10",true)
    localStorage.setItem("Fang",true)
    localStorage.setItem("Adnachiel",true)
    localStorage.setItem("Melantha",true)
    localStorage.setItem("Orchid",true)
    localStorage.setItem("Plume",true)
    localStorage.setItem("Hibiscus",true)
    localStorage.setItem("Ansel",true)
    localStorage.setItem("Durin",true)
    localStorage.setItem("Popukar",true)
    localStorage.setItem("Beagle",true)
    localStorage.setItem("Midnight",true)
}

function clearChapterTwo(){
    localStorage.setItem("2-1",true)
    localStorage.setItem("2-2",true)
    localStorage.setItem("2-3",true)
    localStorage.setItem("2-4",true)
    localStorage.setItem("2-5",true)
    localStorage.setItem("2-6",true)
    localStorage.setItem("2-7",true)
    localStorage.setItem("2-8",true)
    localStorage.setItem("2-9",true)
    localStorage.setItem("2-10",true)
    localStorage.setItem("2-11",true)
    localStorage.setItem("2-12",true)
    localStorage.setItem("Meteor",true)
    localStorage.setItem("Courier",true)
    localStorage.setItem("Mousse",true)
    localStorage.setItem("Matoimaru",true)
    localStorage.setItem("Perfumer",true)  
}

function clearChapterThree(){
    localStorage.setItem("3-1",true)
    localStorage.setItem("3-2",true)
    localStorage.setItem("3-3",true)
    localStorage.setItem("3-4",true)
    localStorage.setItem("3-5",true)
    localStorage.setItem("3-6",true)
    localStorage.setItem("3-7",true)
    localStorage.setItem("3-8",true)
    localStorage.setItem("3-9",true)
    localStorage.setItem("3-10",true)
    localStorage.setItem("3-11",true)
    localStorage.setItem("Liskarm",true)
    localStorage.setItem("Beeswax",true)
    localStorage.setItem("Savage",true)
}

function clearChapterThreeH(){
    localStorage.setItem("3-H1",true)
    localStorage.setItem("3-H2",true)
    localStorage.setItem("3-H3",true)
    localStorage.setItem("3-H4",true)
    localStorage.setItem("Shining",true)
    localStorage.setItem("Saileach",true)
}

function clearChapterFour(){
    localStorage.setItem("4-1",true)
    localStorage.setItem("4-2",true)
    localStorage.setItem("4-3",true)
    localStorage.setItem("4-4",true)
    localStorage.setItem("4-5",true)
    localStorage.setItem("4-6",true)
    localStorage.setItem("4-7",true)
    localStorage.setItem("4-8",true)
    localStorage.setItem("4-9",true)
    localStorage.setItem("4-10",true)
    localStorage.setItem("4-11",true)
    localStorage.setItem("Ceylon",true)
    localStorage.setItem("Matterhorn",true)
    localStorage.setItem("Exusiai",true)
}

function clearChapterFourH(){
    localStorage.setItem("4-H1",true)
    localStorage.setItem("4-H2",true)
    localStorage.setItem("4-H3",true)
    localStorage.setItem("4-H4",true)
    localStorage.setItem("Lappland",true)
    localStorage.setItem("Angelina",true)
}


function clearChapterFive(){
    localStorage.setItem("5-1",true)
    localStorage.setItem("5-2",true)
    localStorage.setItem("5-3",true)
    localStorage.setItem("5-4",true)
    localStorage.setItem("5-5",true)
    localStorage.setItem("5-6",true)
    localStorage.setItem("5-7",true)
    localStorage.setItem("5-8",true)
    localStorage.setItem("5-9",true)
    localStorage.setItem("5-10",true)
    localStorage.setItem("5-11",true)
    localStorage.setItem("5-12",true)
    localStorage.setItem("5-13",true)
    localStorage.setItem("5-14",true)
    localStorage.setItem("Schwarz",true)
    localStorage.setItem("Ceobe",true)
    localStorage.setItem("Franka",true)
    localStorage.setItem("Skadi",true)
}

function clearChapterFiveH(){
    localStorage.setItem("5-H1",true)
    localStorage.setItem("5-H2",true)
    localStorage.setItem("5-H3",true)
    localStorage.setItem("5-H4",true)
    localStorage.setItem("Saga",true)
    localStorage.setItem("Texas",true)
}



function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
