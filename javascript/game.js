var luke = {
    hp: 150,
    ap: 6,
    initialap: 6,
    name: "luke",
}

var darthVader = {
    hp: 200,
    ap: 6,
    initialap: 4,
    name: "darth vader",
}

var obiWan = {
    hp: 150,
    ap: 6,
}

var darthMaul = {
    hp: 150,
    ap: 6,
}



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
        }
        else if (characterSelected === "luke") {

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
        console.log("Enemy assigned is" + " " + enemySelected.name);
        console.log("enemy assigned HP is" + " " + enemySelected.hp)
    }

    function defenderPlacement() {
        if (enemySelected === "darthVader") {
            console.log("vader has been chosen as an enemy")
            $("#lukeEnemy").addClass("hidden");
            $("#darthVaderEnemy").addClass("hidden");
            $("#darthVaderDefender").removeClass("hidden")
        }
        else if (enemySelected === "luke") {
            console.log("luke has been chosen as an enemy")
            $("#darthVaderEnemy").addClass("hidden");
            $("#lukeEnemy").addClass("hidden");
            $("#lukeDefender").removeClass("hidden");
        }
        else {
        }
        assignRole1();
        assignRole2();
        

    }


    function check() {
        if (characterSelected.hp < 1) {
            $("#defeat").text("You Lose")
            $("#attackButton").unbind("click", attack)
        }
        if (enemySelected.hp < 1) {
            $("#battleWin").text("You defeated your opponent.  Choose another opponent")
            $("#attackButton").unbind("click", attack)
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
            $("#characterHP").text(characterSelected.hp);
            $(".defenderHP").text(enemySelected.hp);
            check();
        
    }

    characterSelection(); //does enemyPlacement
    enemySelection(); //does defenderPlacement
    $("#attackButton").on("click", attack) //attack button wasn't working when this was within the attack() function
    
});









