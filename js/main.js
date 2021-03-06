let selected = 1;
let money = {
        data: {
            name: "Money",
            total: 0,
        },
        add: (amount) => {
            money.total += amount;
        }
    },
    fish = {
        data: {
            name: "Fish",
            total: 0,
            price: 5,
            power: 1,
        },
        add: (amount) => {
            fish.data.total += amount;
        },
        sell: () => {
            money.data.total += fish.data.total * fish.data.price;
            fish.data.total = 0;
        }
    },
    container = {
        data: {
            name: "Container",
            level: 1,
            capacity: 10,
            icost: 25,
            cost: 25,
            costmultiplier: 1.2,
        },
        upgrade: (amount) => {
            let cost = container.data.cost * Math.pow(container.data.costmultiplier, amount-1);
            if(money.data.total >= cost){
                money.data.total -= cost;
                container.data.level += amount;
            }
            container.data.capacity = container.data.level * 10;
        }
    },
    fisher = {
        data: {
            name: "Fisher",
            level: 0,
            icost: 100,
            cost: 100,
            costmultiplier: 1.2,
        },
        upgrade: (amount) => {
            let cost = fisher.data.cost * Math.pow(fisher.data.costmultiplier, amount-1);
            if(money.data.total >= cost){
                money.data.total -= cost;
                fisher.data.level += amount;
            }
        }
    }

// Sets up savegame stuff
function saveG() {
    let save = {
        money: money.data,
        fish: fish.data,
        container: container.data,
    }
    localStorage.setItem("save", JSON.stringify(save));
}
// Loads the game state from a save file
function loadG() {
    let savegame;
    savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.money !== "undefined") money.data = savegame.money;
    if (typeof savegame.fish !== "undefined") fish.data = savegame.fish;
    if (typeof savegame.container !== "undefined") container.data = savegame.container;
}
// Resets the values of the game
function resetG() {
    localStorage.removeItem("save")

    money = {
        data: {
            name: "money",
            total: 0,
        },
        add: (amount) => {
            money.total += amount;
        }
    },
    fish = {
        data: {
            name: "fish",
            total: 0,
            price: 5,
        },
        add: (amount) => {
            fish.data.total += amount;
        },
        sell: () => {
            money.data.total += fish.data.total * fish.data.price;
            fish.data.total = 0;
        }
    },
    container = {
        data: {
            name: "container",
            total: 0,
            capacity: 10,
        },
        upgrade: (amount) => {
            container.data.capacity += amount;
        }
    }
}


// afasfasaf
document.getElementById("fish-btn").onclick = function(){
    fish.add(fish.data.power);
};
document.getElementById("sell-btn").onclick = function(){
    fish.sell();
};

// Sets the game speed
let spd = 1000;

function speed(number) {
    spd = number;
    window.clearInterval(id);
    id = setInterval(update, spd);
}

let id = setInterval(update, spd);

function update() {
    if(fish.data.total < container.data.capacity){
        fish.add(fisher.data.level);
    }
}

let interval = setInterval(() => {
    // Limits fish to capacity
    if(fish.data.total >= container.data.capacity){
        fish.data.total = container.data.capacity;
    }
    //Updates costs
    container.data.cost = container.data.icost * Math.pow(container.data.costmultiplier, container.data.level-1);
    if(fisher.data.level == 0) {
        fisher.data.cost = fisher.data.icost / fisher.data.costmultiplier;
    } else{

        fisher.data.cost = fisher.data.icost * Math.pow(fisher.data.costmultiplier, fisher.data.level-1);
    }
    // Updates the HTML
    document.getElementById('fish-counter').innerHTML = fish.data.total;
    document.getElementById('fish-max').innerHTML = container.data.capacity;
    document.getElementById('money-counter').innerHTML = numberformat.formatShort(money.data.total);
    document.getElementById('fish-power').innerHTML = fish.data.power;
    document.getElementById('buy-selected1').innerHTML = selected;
    document.getElementById('buy-selected2').innerHTML = selected;
    document.getElementById('buy-selected3').innerHTML = selected;
    document.getElementById('buy-selected4').innerHTML = selected;
    document.getElementById('buy-selected5').innerHTML = selected;
    document.getElementById('buy-selected6').innerHTML = selected;
    // Upgrade 1 HTML
    document.getElementById('u1-name').innerHTML = container.data.name;
    document.getElementById('u1-level').innerHTML = container.data.level;
    document.getElementById('u1-price').innerHTML = numberformat.formatShort(container.data.cost * Math.pow(container.data.costmultiplier, selected-1));
    // Upgrade 2 HTML
    document.getElementById('u2-name').innerHTML = fisher.data.name;
    document.getElementById('u2-level').innerHTML = fisher.data.level;
    document.getElementById('u2-price').innerHTML = numberformat.formatShort(fisher.data.cost * Math.pow(fisher.data.costmultiplier, selected-1));
    // Progressbar
    let current_progress = Math.round(fish.data.total / container.data.capacity * 100);
    $("#dynamic")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text("Container " + current_progress + "%");
    if (current_progress >= 50) {
        $('#dynamic').removeClass("progress-bar progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar bg-warning progress-bar-striped progress-bar-animated");
    } else {
        $('#dynamic').removeClass("progress-bar bg-warning progress-bar-striped progress-bar-animated");
        $('#dynamic').removeClass("progress-bar bg-danger progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar progress-bar-striped progress-bar-animated");
    }
    if (current_progress >= 90) {
        $('#dynamic').removeClass("progress-bar bg-warning progress-bar-striped progress-bar-animated");
        $('#dynamic').removeClass("progress-bar progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar bg-danger progress-bar-striped progress-bar-animated");
    } else {
        $('#dynamic').removeClass("progress-bar bg-danger progress-bar-striped progress-bar-animated");
        $('#dynamic').addClass("progress-bar progress-bar-striped progress-bar-animated");
}

}, 1);