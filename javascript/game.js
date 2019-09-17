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
    hp: 150,
    ap: 6,
}

var winCounter = 0;


var characterSelected = "";
var enemySelected = "";

$(document).ready(function () {




    function characterSelection() {
        $(".character").one("click", function () { // using .one instead of .on makes it so this only runs once (could do off("click") otherwise to reset) (see below)

            characterSelected = $(this).attr("name");

            console.log("character selected is" + " " + characterSelected);
            enemyPlacement();
        });

    }

    function enemyPlacement() {
        if (characterSelected === "darthVader") {

            $("#luke").addClass("hidden");
            $("#lukeEnemy").removeClass("hidden")
            $("#obiWan").addClass("hidden");
            $("#obiWanEnemy").removeClass("hidden")
        }
        else if (characterSelected === "luke") {

            $("#darthVader").addClass("hidden");
            $("#darthVaderEnemy").removeClass("hidden")
            $("#obiWan").addClass("hidden");
            $("#obiWanEnemy").removeClass("hidden")
        }
        else if (characterSelected === "obiWan") {
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
        $(".enemy").one("click", function () { // using .one instead of .on makes it so this only runs once (could do off("click") otherwise to reset) (see below)

            enemySelected = $(this).attr("name");
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

        // enemy is vader, character is luke  
        if (enemySelected === "darthVader" && characterSelected === "luke") {
            console.log("vader has been chosen as an enemy")
            $("#lukeEnemy").addClass("hidden"); 
            $("#darthVaderEnemy").addClass("hidden");
            $("#darthVaderDefender").removeClass("hidden")
        }
        // enemy is vader, character is obi wan
        if (enemySelected === "darthVader" && characterSelected === "obiWan") {
            console.log("vader has been chosen as an enemy")
            $("#obiWanEnemy").addClass("hidden"); 
            $("#darthVaderEnemy").addClass("hidden");
            $("#darthVaderDefender").removeClass("hidden")
        }
        // enemy is luke, character is vader
        else if (enemySelected === "luke" && characterSelected === "darthVader") {
            console.log("luke has been chosen as an enemy")
            $("#darthVaderEnemy").addClass("hidden");
            $("#lukeEnemy").addClass("hidden");
            $("#lukeDefender").removeClass("hidden");
        }
        // enemy is luke, character is obiwan
        else if (enemySelected === "luke" && characterSelected === "obiWan") {
            console.log("luke has been chosen as an enemy")
            $("#obiWanEnemy").addClass("hidden");
            $("#lukeEnemy").addClass("hidden");
            $("#lukeDefender").removeClass("hidden");
        }

        // enemy is obiwan, character is luke
        else if (enemySelected === "obiWan" && characterSelected === "luke") {
            console.log("obiWan has been chosen as an enemy")
            $("#lukeEnemy").addClass("hidden");
            $("#obiWanEnemy").addClass("hidden");
            $("#obiWanDefender").removeClass("hidden");
        }
        // enemy is obiwan, character is vader 
        else if (enemySelected === "obiWan" && characterSelected === "darthVader") {
            console.log("obiWan has been chosen as an enemy")
            $("#darthVaderEnemy").addClass("hidden");
            $("#obiWanEnemy").addClass("hidden");
            $("#obiWanDefender").removeClass("hidden");
        }
        else {

        }
        assignRole1();
        assignRole2();
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
        $("#attackButton").on("click", attack)
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
            console.log("enemy defeated was" + " " + enemySelected);
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











