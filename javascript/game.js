var luke = {
    hp: 150,
    ap: 6,
    initialap: 6,
    name: "luke",
}

var darthVader = {
    hp: 200,
    ap: 4,
    initialap: 4,
    name: "darthVader",
}

var obiWan = {
    hp: 100,
    ap: 10,
    initialap: 10,
    name: "obiWan",
}

var darthMaul = {
    hp: 125,
    ap: 8,
    initialap: 8,
    name: "darthMaul",
}

var winCounter = 0;

var characterSelected = "";
var enemySelected = "";

$(document).ready(function () {

    function characterSelection() {
        $(".character").one("click", function () { // using .one instead of .on makes it so this only runs once (could do off("click") otherwise to reset) (see below)

            characterSelected = $(this).attr("name");
            //$("#attackButton").off("click");
            assignRole1();
            console.log("character selected is" + " " + characterSelected.name);
            enemyPlacement();
        });

    }

    function enemyPlacement() {
        if (characterSelected.name === "darthVader") {

            $("#luke").addClass("hidden");
            $("#lukeEnemy").removeClass("hidden")
            $("#obiWan").addClass("hidden");
            $("#obiWanEnemy").removeClass("hidden")
        }
        else if (characterSelected.name === "luke") {

            $("#darthVader").addClass("hidden");
            $("#darthVaderEnemy").removeClass("hidden")
            $("#obiWan").addClass("hidden");
            $("#obiWanEnemy").removeClass("hidden")
        }
        else if (characterSelected.name === "obiWan") {
            $("#luke").addClass("hidden");
            $("#lukeEnemy").removeClass("hidden")
            $("#darthVader").addClass("hidden");
            $("#darthVaderEnemy").removeClass("hidden")
        }

        else {
        }
        //$(".character").unbind("click") ** are alternatively could have done .one click so it's a one time thing (see above)


    }

    function enemySelection() {
        $(".enemy").unbind("click"); // and weird double click happening, needed this. 
        $(".enemy").one("click", function () { // using .one instead of .on makes it so this only runs once (could do off("click") otherwise to reset) (see below)

            enemySelected = $(this).attr("name");
            $("#battleWin").text("");
            //$("#attackButton").off("click");
            assignRole2();
            defenderPlacement();
            
        });
        
    }

    function assignRole1() {
        if (characterSelected === "luke") {
            characterSelected = luke;
        }
        else if (characterSelected === "darthVader") {
            characterSelected = darthVader;
        }   
        else if (characterSelected === "obiWan") {
            characterSelected = obiWan;
        }

        console.log("Character assigned is" + " " + characterSelected.name);
        console.log("Character assigned HP is" + " " + characterSelected.hp);
    }

    function assignRole2() {
        if (enemySelected === "luke") {
            enemySelected = luke;
        }
        else if (enemySelected === "darthVader") {
            enemySelected = darthVader;
        }
        else if (enemySelected === "obiWan") {
            enemySelected = obiWan;
        }
        console.log("Enemy assigned is" + " " + enemySelected.name);
        console.log("enemy assigned HP is" + " " + enemySelected.hp)
    }

    function defenderPlacement() {
        // guidelines:  hide yourself, hide your enemy.  unhide that defender.  everyone else is unhidden
        console.log("if you see this, defenderPlacement is working up to here");
        console.log(enemySelected.name);
        console.log(characterSelected.name);
        
        // enemy is vader, character is luke  
        if (enemySelected.name === "darthVader" && characterSelected.name === "luke") {
            console.log("you are luke and vader is your enemy")
            $("#lukeEnemy").addClass("hidden"); 
            $("#darthVaderEnemy").addClass("hidden");
            $("#darthVaderDefender").removeClass("hidden")
        }
        // enemy is vader, character is obi wan
        if (enemySelected.name === "darthVader" && characterSelected.name === "obiWan") {
            console.log("you are obi wan and vader is your enemy")
            if (winCounter > 0) {
                console.log("round 2");
            }
            $("#obiWanEnemy").addClass("hidden"); 
            $("#darthVaderEnemy").addClass("hidden");
            $("#darthVaderDefender").removeClass("hidden")
        }
        // enemy is luke, character is vader
        else if (enemySelected.name === "luke" && characterSelected.name === "darthVader") {
            console.log("you are vader and luke is your enemy")
            $("#darthVaderEnemy").addClass("hidden");
            $("#lukeEnemy").addClass("hidden");
            $("#lukeDefender").removeClass("hidden");
        }
        // enemy is luke, character is obiwan
        else if (enemySelected.name === "luke" && characterSelected.name === "obiWan") {
            console.log("you are obi wan and luke is your enemy")
            
            $("#obiWanEnemy").addClass("hidden");
            $("#lukeEnemy").addClass("hidden");
            $("#lukeDefender").removeClass("hidden");
        }

        // enemy is obiwan, character is luke
        else if (enemySelected.name === "obiWan" && characterSelected.name === "luke") {
            console.log("you are luke and obi wan is your enemy")
            $("#lukeEnemy").addClass("hidden");
            $("#obiWanEnemy").addClass("hidden");
            $("#obiWanDefender").removeClass("hidden");
        }
        // enemy is obiwan, character is vader 
        else if (enemySelected.name === "obiWan" && characterSelected.name === "darthVader") {
            console.log("you are darth vader and obi wan is your enemy")
            $("#darthVaderEnemy").addClass("hidden");
            $("#obiWanEnemy").addClass("hidden");
            $("#obiWanDefender").removeClass("hidden");
        }
        else {

        }
        
        $(".defenderHP").text(enemySelected.hp);
        
    }

    function restart() {
        $(".restart").removeClass("hidden");
        $(".restart").one("click", function () {
            luke = {
                hp: 150,
                ap: 6,
                initialap: 6,
                name: "luke",
            }

            darthVader = {
                hp: 200,
                ap: 4,
                initialap: 4,
                name: "darthVader",
            }

            obiWan = {
                hp: 100,
                ap: 10,
                initialap: 10,
                name: "obiWan",
            }
            /*
            darthMaul = {
                hp: 150,
                ap: 6,
            }*/
            winCounter = 0;
            characterSelected = "";
            enemySelected = "";
            $("#luke").removeClass("hidden");
            $("#darthVader").removeClass("hidden");
            $("#obiWan").removeClass("hidden");
            $("#lukeHP").text(luke.hp);
            $("#darthVaderHP").text(darthVader.hp);
            $("#obiWanHP").text(obiWan.hp);
            $("#defeat").text("");
            $("#battleWin").text("");
            mainGame();
        });
    }

    function enemiesLeftChecker() {
        if (winCounter === 3) {
            $("#battleWin").text("You win!  Game Over.");
            restart();
        }
    }

    function continueGame() {
        enemySelection(); //does defenderPlacement
        $("#attackButton").on("click", attack);
    }

    function check() {
        enemiesLeftChecker();
        if (characterSelected.hp < 1) {
            $("#defeat").text("You Lose.  Game Over.");
            $("#attackButton").unbind("click", attack);
            restart();

        }
        else if (enemySelected.hp < 1) {
            $("#battleWin").text("You defeated your opponent.  Choose another opponent");
            $("#attackButton").unbind("click", attack);
            winCounter++;
            console.log("Wins so far is" + " " + winCounter);
            //have to hide person that lost 
            console.log("enemy defeated was" + " " + enemySelected.name);
            if (enemySelected.name === "darthVader") {
                $("#darthVaderDefender").addClass("hidden");
            }
            else if (enemySelected.name === "luke") {
                $("#lukeDefender").addClass("hidden");
            }
            else if (enemySelected.name === "obiWan") {
                $("#obiWanDefender").addClass("hidden");
            }
            continueGame();
        }

    }

    function attack() {

        console.log("attacking...");
        enemySelected.hp -= characterSelected.ap;
        characterSelected.ap += characterSelected.initialap;
        characterSelected.hp -= enemySelected.ap;
        console.log("Your character's HP is" + "" + characterSelected.hp);
        console.log("Your enemy's HP is" + "" + enemySelected.hp);
        console.log("Your character's AP is" + "" + characterSelected.ap);
        $(".characterHP").text(characterSelected.hp);
        $(".defenderHP").text(enemySelected.hp);
        check();

    }

    function mainGame() {
        $("#lukeHP").text(luke.hp);
        $("#darthVaderHP").text(darthVader.hp);
        $("#obiWanHP").text(obiWan.hp);
        $(".restart").addClass("hidden");
        characterSelection(); //does enemyPlacement
        enemySelection(); //does defenderPlacement
        $("#attackButton").on("click", attack) //attack button wasn't working when this was within the attack() function
    }

    mainGame();
});











