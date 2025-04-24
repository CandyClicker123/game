var bodyKeydown = false;
var candies = 0;
var totalClicks = 0;
var OCP = 1;
var ECP = 1;
var CPE = 1;
var OAP = 0;
var EAP = 0;
var APE = 1;
var itemList = [ // [0 name, 1 num, 2 cost, 3 ap]
  ["Candy producer"], // 0
  ["Candy tree"], // 1
  ["Candy factory"], // 2
  ["Candy alchemist"], // 3
  ["Candy wizard"], // 4
  ["Candy time machine"], // 5
  ["Candy treasure"], // 6
  ["Candy king"], // 7
  ["Candy JavaScripter"], // 8
  ["Candy mind power"] // 9
];
var numOfItem = [];
var recentItems = [];
var upgradeCost = 50;
var randomUpgradeCost = 30;
var costOfItem = [];
var impItems = [];
var decentEggCost = 1000000;
var prestigeCost = 1000000;
var prestigeLevel = 0;
var equippedPets = [];
var rarities = ["Common", "Uncommon", "Rare", "Very rare", "Epic", "Legendary", "Exotic"];
var petList = [ // [0 name, 1 rarity, 2 CPE, 3 APE, 4 SP, 5 num, 6 num of equipped]
  ["Candy Cane", 0, 1.2, 1.2, 0], // 0
  ["Candy Cat", 0, 1.1, 1.3, "x2 candy producers’ effect"], // 1
  ["Candy Monster", 0, 1.5, 1, 0], // 2
  ["Slimy Candy", 0, 1.4, 1.1, 0], // 3
  ["Triangular Candy", 0, 3, 0.3, 0], // 4
  ["C & Y", 1, 2, 1, 0], // 5
  ["Heart Candy", 1, 1.74, 1.32, 0], // 6
  ["Stoni Candy", 1, 1.6, 1.2, "x0.5 candy trees’ effect"], // 7
  ["Pixelized Candy", 2, 2.8, 1.86, "x1.4 events’ effects"], // 8
  ["Pot o' Candy", 2, 2.2, 2.17, "x2 candy parties’ duration"], // 9
  ["Gemdy", 3, 3.2, 2.72, "x1.25 candy treasure’s effect"], // 10
  ["False Dilemma Candy", 3, 0.01, 0.01, 0], // 11
  ["Failed Experimental Candy", 3, 1.2, 1, "Players can trade 3 of those for 1 rebirth level"], // 12
  ["Successful Experimental Candy", 4, 3.5, 2.99, "x10.2 candy alchemists and candy time machines’ effects"], // 13
  ["Candy Essence from Nature", 5, 9.78, 8, "x2 egg rewards"], // 14
  ["LORD of CANDIES", 6, 20, 20, "x7 all the other equipped pets’ CPEs and APEs"] // 15
]
var totalClicksAchs = [
  [10], // 0
  [314], // 1
  [1200], // 2
  [6000], // 3
  [16180], // 4
  [36000], // 5
  [80000] // 6
];
var finishedTotalClicksAchs = 0;

for (var i = 0; i < itemList.length; i++) {
  itemList[i].push(0, 20 ** i * 10, 10 ** i);
}
for (var i = 0; i < petList.length; i++) {
  petList[i].push(0, 0);
}
for (var i = 0; i < totalClicksAchs.length; i++) {
  totalClicksAchs[i].push(0);
}

setTimeout(function() {
  for (var i = 0; i < document.getElementsByClassName("petName").length; i++) {
    document.getElementsByClassName("petName")[i].innerHTML = "???";
    document.getElementsByClassName("numOfPets")[i].style["font-size"] = 0;
    document.getElementsByClassName("numOfPets")[i].style.position = "absolute";
  }
}, 1000);

// Cheat
if (window.location.href.includes("?")) {
  var start = Number(prompt("How many candies do you want to start with?"));
  if (start == "") {
    candies = 1000000000000;
  } else {
    candies = start;
  }
}

function percentage(a) {
  if (candies >= a) {
    return 100;
  } else {
    return Math.round(candies * 100 / a);
  }
}

function word(num) {
  return toWord(num).toLowerCase();
}

function increase(cost) {
  return Math.round(cost * 1.2);
}

function increase2(cost) {
  return Math.round(cost * 1.6);
}

function double(cost) {
  return Math.round(cost * 2);
}

function update() {
  if (candies == 0) {
    document.title = "Candy Clicker";
  } else if (candies == 1) {
    document.title = "1 candy - Candy Clicker"
  } else {
    document.title = word(candies) + " candies - Candy Clicker";
  }
  CPE = 1;
  APE = 1;
  for (var i = 0; i < 5; i++) {
    if (i < equippedPets.length) {
      document.getElementById("numOfEquippedPet" + i).innerHTML = rarities[petList[equippedPets[i]][1]] + " - " + petList[equippedPets[i]][0];
      document.getElementById("equippedPet" + i).dataset.id = equippedPets[i];
      CPE *= petList[equippedPets[i]][2];
      APE *= petList[equippedPets[i]][3];
    } else {
      document.getElementById("numOfEquippedPet" + i).innerHTML = "";
      document.getElementById("equippedPet" + i).removeAttribute("data-id");
    }
  }
  CPE = Math.round(CPE * 100) / 100;
  APE = Math.round(APE * 100) / 100;
  ECP = Math.round(OCP * CPE);
  EAP = Math.round(OAP * APE);
  document.getElementById("candies").innerHTML = word(candies);
  document.getElementById("prestigeCost").innerHTML = word(prestigeCost) + " (" + percentage(prestigeCost) + "%)";
  document.getElementById("prestigeLevel").innerHTML = prestigeLevel;
  document.getElementById("CPE").innerHTML = CPE;
  document.getElementById("APE").innerHTML = APE;
  document.getElementById("OCP").innerHTML = word(OCP);
  document.getElementById("ECP").innerHTML = word(ECP);
  document.getElementById("OAP").innerHTML = word(OAP);
  document.getElementById("EAP").innerHTML = word(EAP);
  document.getElementById("upgradeCost").innerHTML = word(upgradeCost) + " (" + percentage(upgradeCost) + "%)";
  document.getElementById("randomUpgradeCost").innerHTML = word(randomUpgradeCost) + " (" + percentage(randomUpgradeCost) + "%)";
  document.getElementById("decentEggCost").innerHTML = word(decentEggCost) + " (" + percentage(decentEggCost) + "%)";
  // for (var i = 0; i < numOfItem.length; i++) {
  //   document.getElementById("numOfItem" + i).innerHTML = numOfItem[i];
  //   document.getElementById("costOfItem" + i).innerHTML = word(costOfItem[i]) + " (" + percentage(costOfItem[i]) + "%)";
  // }
  for (var i = 0; i < 3; i++) {
    if (i < recentItems.length) {
      document.getElementById("nameOfRecentItem" + i).innerHTML = itemList[recentItems[i]][0];
      document.getElementById("numOfRecentItem" + i).innerHTML = " x" + itemList[recentItems[i]][1];
      document.getElementById("recentItem" + i).setAttribute("data-id", recentItems[i]);
    } else {
      document.getElementById("nameOfRecentItem" + i).innerHTML = "";
      document.getElementById("numOfRecentItem" + i).innerHTML = "";
      document.getElementById("recentItem" + i).removeAttribute("data-id");
    }
  }
}
 document.oncontextmenu = function() {
  window.event.returnValue = false; 
}
setInterval(mainBtns);
setInterval(update);
setInterval(function() {
  if (totalClicks >= totalClicksAchs[finishedTotalClicksAchs]) {
    totalClicksAch(finishedTotalClicksAchs);
  }
})
setInterval(function() {
  candies += EAP;
}, 1000)

function mainBtns() {
  if (candies >= upgradeCost) {
    document.getElementById("upgradeBtn").classList.remove("locked");
  } else {
    document.getElementById("upgradeBtn").classList.add("locked");
  }
  if (candies >= randomUpgradeCost) {
    document.getElementById("randomUpgradeBtn").classList.remove("locked");
  } else {
    document.getElementById("randomUpgradeBtn").classList.add("locked");
  }
  for (var i = 0; i < itemList.length; i++) {
    if (candies >= itemList[i][2]) {
      document.getElementById("itemBtn" + i).classList.remove("locked");
    } else {
      document.getElementById("itemBtn" + i).classList.add("locked");
    }
  }
  if (candies >= decentEggCost) {
    document.getElementById("decentEggBtn").classList.remove("locked");
  } else {
    document.getElementById("decentEggBtn").classList.add("locked");
  }
  if (candies >= prestigeCost) {
    document.getElementById("prestigeBtn").classList.remove("locked");
  } else {
    document.getElementById("prestigeBtn").classList.add("locked");
  }
}

function clickCandy() {
  candies += ECP;
  document.getElementById("candies").innerHTML = word(candies);
  if (candies == 1) {
    document.getElementById("CANDIES").innerHTML = "candy";
  } else {
    document.getElementById("CANDIES").innerHTML = "candies";
  }
  totalClicks++;
  document.getElementById("totalClicks").innerHTML = totalClicks;
}

function buyUpgrade() {
  if (candies >= upgradeCost) {
    candies -= upgradeCost;
    OCP += 5;
    upgradeCost = increase(upgradeCost);
    update();
  }
}

function buyRandomUpgrade() {
  if (candies >= randomUpgradeCost) {
    candies -= randomUpgradeCost;
    OCP += Math.floor(Math.random() * 5) + 1;
    randomUpgradeCost = increase(randomUpgradeCost);
    update();
  }
}

function buyItem(item) {
  if (candies >= itemList[item][2]) {
    candies -= itemList[item][2];
    itemList[item][1]++;
    itemList[item][2] = increase(itemList[item][2]);
    OAP += 10 ** item;
    for (var i = 0; i < recentItems.length; i++) {
      if (recentItems[i] == item) {
        recentItems.splice(i, 1);
      }
    }
    if (recentItems.length == 3) {
      recentItems.pop();
    }
    recentItems.unshift(item);
    var temp = [];
    for (var i = 0; i < itemList.length; i++) {
      if (itemList[i][1] != 0) {
        temp.push(i)
      }
    }
    console.log(temp);
    temp.sort((x, y) => itemList[y][1] - itemList[x][1]);
    impItems = [];
    for (var i = 0; i < Math.min(5, temp.length); i++) {
      impItems.push(temp[i]);
    }
  }
}

function pet(id) {
  setTimeout(function () {
    alert("You get " + petList[id][0] + " x1!");
  }, 100)
  document.querySelector("#pet" + id + " .petName").innerHTML = rarities[petList[id][1]] + " - " + petList[id][0] + " x";
  document.getElementById("pet" + id).dataset.owned = 1;
  document.getElementById("numOfPet" + id).style["font-size"] = "16px";
  document.getElementById("numOfPet" + id).style.position = "static";
  petList[id][5]++;
  document.getElementById("numOfPet" + id).innerHTML = petList[id][5];
}

function equip(id) {
  setTimeout(function() {
    alert(petList[id][0] + " x1 is equipped!");
    equippedPets.push(id);
    petList[id][6]++;
    document.getElementById("petPage_numOfEquipped").innerHTML = petList[id][6];
    equipBtns(id);
  }, 100)
}

function unequip(id) {
  setTimeout(function() {
    alert(petList[id][0] + " x1 is unequipped!");
    equippedPets.splice(equippedPets.lastIndexOf(id), 1);
    petList[id][6]--;
    document.getElementById("petPage_numOfEquipped").innerHTML = petList[id][6];
    equipBtns(id);
  }, 100)
}

function equipBtns(id) {
  if (equippedPets.length == 5 || petList[id][5] == petList[id][6]) {
    document.getElementById("equipBtn").classList.add("locked");
  } else {
    document.getElementById("equipBtn").classList.remove("locked");
  }
  if (petList[id][6] == 0) {
    document.getElementById("unequipBtn").classList.add("locked");
  } else {
    document.getElementById("unequipBtn").classList.remove("locked");
  }
}

function buyDecentEgg() {
  if (candies >= decentEggCost) {
    var random = Math.random() * 100;
    console.log(random);
    if (random < 12.8) {
      pet(0);
    } else if (random < 25.6) {
      pet(1);
    } else if (random < 38.4) {
      pet(2);
    } else if (random < 51.2) {
      pet(3);
    } else if (random < 64) {
      pet(4);
    } else if (random < 208 / 3) {
      pet(5);
    } else if (random < 224 / 3) {
      pet(6);
    } else if (random < 80) {
      pet(7);
    } else if (random < 86) {
      pet(8);
    } else if (random < 92) {
      pet(9);
    } else if (random < 97) {
      pet(10);
    } else if (random < 99.2) {
      pet(13);
    } else if (random < 99.95) {
      pet(14);
    } else {
      pet(15);
    }
    candies -= decentEggCost;
    decentEggCost = increase2(decentEggCost);
    document.getElementById("candies").innerHTML = candies;
    document.getElementById("decentEggCost").innerHTML = decentEggCost;
  }
}

function totalClicksAch(ach) {
  if (ach == 0) {
    alert("Achievement unlocked!\n");
  }
}

function prestige() {
  // if (candies >= prestigeCost) {
  //   OCP = OCP * 2;
  //   candies = 0;
  //   upgradeLevel = 1;
  //   upgradeCost = 50;
  //   randomUpgradeCost = 30;
  //   candyProducers = 0;
  //   candyProducerCost = 10;
  //   candyTrees = 0;
  //   candyTreeCost = 200;
  //   candyFactories = 0;
  //   candyFactoryCost = 4000;
  //   candyAlchemists = 0;
  //   candyAlchemistCost = 80000;
  //   candyWizards = 0;
  //   candyWizardCost = 1600000;
  //   candyTimeMachines = 0;
  //   candyTimeMachineCost = 32000000;
  //   candyTreasures = 0;
  //   candyTreasureCost = 640000000;
  //   candyKings = 0;
  //   candyKingCost = 12800000000;
  //   candyJavaScripters = 0;
  //   candyJavaScripterCost = 256000000000;
  //   candyMindPowers = 0;
  //   candyMindPowerCost = 5120000000000;
  //   prestigeLevel++;
  //   prestigeCost = prestigeCost * 2;
  //   OAP = 0;
  //   update();
  // }
}

function openMainPage() {
  document.getElementById("inventory").style.display = "none";
  closePetPage();
  document.getElementById("main").style.display = "block";
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

function openInventory() {
  document.getElementById("main").style.display = "none";
  document.getElementById("inventory").style.display = "block";
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

function openItemsPage() {
  document.getElementById("petsPage").style.display = "none";
  closePetPage();
  document.getElementById("itemsPageBtn").style.display = "none";
  document.getElementById("itemsPage").style.display = "block";
  document.getElementById("petsPageBtn").style.display = "inline-block";
}

function openPetsPage() {
  document.getElementById("itemsPage").style.display = "none";
  document.getElementById("petsPageBtn").style.display = "none";
  document.getElementById("petsPage").style.display = "block";
  document.getElementById("itemsPageBtn").style.display = "inline-block";
}

function openPetPage(id) {
  if (id != undefined) {
    document.getElementById("ownedPets").style.display = "none";
    document.getElementById("petPage").style.display = "block";
    scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    document.getElementById("petPage_name").innerHTML = rarities[petList[id][1]] + " - " + petList[id][0];
    document.getElementById("petPage_id").innerHTML = id;
    // document.getElementById("petPage_img").src = "1. Candy Area/Icons/P13" + i + 1;
    document.getElementById("petPage_num").innerHTML = petList[id][5];
    document.getElementById("petPage_numOfEquipped").innerHTML = petList[id][6];
    document.getElementById("petPage_CPE").innerHTML = petList[id][2];
    document.getElementById("petPage_APE").innerHTML = petList[id][3];
    if (petList[id][4] == 0) {
      document.getElementById("petPage_SPContainer").style.display = "none";
    } else {
      document.getElementById("petPage_SPContainer").style.display = "block";
      document.getElementById("petPage_SP").innerHTML = petList[id][4];
    }
    equipBtns(id);
  }
}

function closePetPage() {
  document.getElementById("petPage").style.display = "none";
  document.getElementById("ownedPets").style.display = "block";
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

function candyFlipped() {
  document.getElementById("candy").src = "0. Candy Area/Icons/P0010.png";
}

function candyOriginal() {
  document.getElementById("candy").src = "0. Candy Area/Icons/P0000.png";
}

setTimeout(function() {
  // Skip elements
  // Remove focus
  for (var i = 0; i < document.getElementsByTagName("*").length; i++) {
    document.getElementsByTagName("*")[i].setAttribute("tabindex", "-1");
    document.getElementsByTagName("*")[i].addEventListener("click", (event) => {
      event.target.blur();
    });
  }

  // Disable spacebar scrolling (not working?)
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", (e) => {
      if (e.key === " " || e.code === "Space") {
          e.preventDefault();
      }
    });
  });

  // An area is clicked
  for (var i = 0; i < document.getElementsByClassName("areas").length; i++) {
    document.getElementsByClassName("areas")[i].addEventListener("click", function() {
      for (var j = 0; j < document.getElementsByClassName("areas").length; j++) {
        document.getElementsByClassName("areas")[j].classList.remove("area_selected");
      }
      this.classList.add("area_selected");
    });
  }

  // An recent item is clicked
  for (var i = 0; i < document.getElementsByClassName("recentItems").length; i++) {
    document.getElementsByClassName("recentItems")[i].addEventListener("click", function() {
      alert("Imformation about '" + itemList[this.dataset.id][0] + "'\nAP: " + word(itemList[this.dataset.id][3]) + " cps");
    })
  }

  // An item is clicked
  // for (var i = 0; i < document.getElementsByClassName("items").length; i++) {
  //   document.getElementsByClassName("items")[i].addEventListener("click", function() {
  //     alert("Information about '" + this.dataset.name + "'\n" + this.dataset.info);
  //   });
  // }

  // An item button is clicked
  for (var i = 0; i < document.getElementsByClassName("itemBtns").length; i++) {
    (function(i) {
      document.getElementsByClassName("itemBtns")[i].addEventListener("click",  function() {
        buyItem(i);
      });
    }(i));
  }

  // An owned pet is clicked
  for (var i = 0; i < document.getElementsByClassName("ownedPets").length; i++) {
    document.getElementsByClassName("ownedPets")[i].addEventListener("click", function() {
      if (this.dataset.owned == 1) {
        openPetPage(this.dataset.id);
      } else {
        alert("An unowned pet\nYou haven't gotten this pet yet.");
      }
    });
  }

  // An equipped pet is clicked
  for (var i = 0; i < document.getElementsByClassName("equippedPets").length; i++) {
    document.getElementsByClassName("equippedPets")[i].addEventListener("click", function() {
      openPetPage(this.dataset.id);
    })
  }

  // The equip button is clicked
  document.getElementById("equipBtn").addEventListener("click", function() {
    if (!this.classList.contains("locked")) {
      equip(Number(document.getElementById("petPage_id").innerHTML));
    }
  })

  // The unequip button is clicked
  document.getElementById("unequipBtn").addEventListener("click", function() {
    if (!this.classList.contains("locked")) {
      unequip(Number(document.getElementById("petPage_id").innerHTML));
    }
  })

  // A key is pressed
  document.body.addEventListener("keydown", function() {
    if (!bodyKeydown && (event.key == "C" || event.key == "c")) {
      clickCandy();
      candyFlipped();
      bodyKeydown = true;
    }
  });
  document.body.addEventListener("keyup", function() {
    candyOriginal();
    bodyKeydown = false;
  });

  // Custom selects
  for (var i = 0; i < document.getElementsByClassName("itemOptions").length; i++) {
    for (var j = 0; j < itemList.length; j++) {
      var newOption = document.createElement("div");
      var itemName_str = itemList[j][0];
      var itemName_arr = itemName_str.split(" ");
      itemName_arr.shift();
      itemName_str = itemName_arr.join(" ");
      newOption.classList.add("option");
      newOption.innerHTML = itemName_str;
      document.getElementsByClassName("itemOptions")[i].appendChild(newOption);
    }
  }
  document.querySelectorAll('.custom-select').forEach(select => {
    const selected = select.querySelector('.selected');
    const options = select.querySelector('.options');

    selected.addEventListener('click', () => {
      closeAllSelects(selected);
      options.style.display = options.style.display === 'block' ? 'none' : 'block';
      selected.classList.toggle('open');
    });

    options.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        options.style.display = 'none';
        selected.classList.remove('open');
      });
    });
  });

  function closeAllSelects(current) {
    document.querySelectorAll('.custom-select').forEach(select => {
      const options = select.querySelector('.options');
      const selected = select.querySelector('.selected');
      if (selected !== current) {
        options.style.display = 'none';
        selected.classList.remove('open');
      }
    });
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.custom-select')) {
      document.querySelectorAll('.options').forEach(o => o.style.display = 'none');
      document.querySelectorAll('.selected').forEach(s => s.classList.remove('open'));
    }
  });
}, 100);
