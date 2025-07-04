var bodyKeydown = false;
var candies = 0n;
var totalClicks = 0n;
var OCP = 1n;
var ECP = 1n;
var CPE = 1;
var hCPE = 100n;
var OAP = 0n;
var EAP = 0n;
var APE = 1;
var hAPE = 100n;
var itemList0 = [ // [0 name, 1 num, 2 cost, 3 oap]
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
var itemList;
var recentItems = [];
var upgradeCost = 50n;
var randomUpgradeCost = 30n;
var specialUpgrades = [ // [0 name, 1 cost, 2 ocp]
  ["grand", 6000n, 160n], // 0
  ["super", 920000n, 5500n], // 1
  ["mega", 520000000n, 177000n], //2
  ["ultimate", 540000000000n, 5760000n] // 3
];
var decentEggCost = 1000000n;
var superEggCost = 1000000000n;
var prestigeCost = 1000000n;
var prestigeLevel = 0;
var prestigeLimit = 10;
var rebirthLevel = 0;
var equippedPets = [];
var rarities = ["Common", "Uncommon", "Rare", "Very rare", "Epic", "Legendary", "Exotic"];
var petList = [ // [0 name, 1 rarity, 2 CPE, 3 APE, 4 SP, 5 num, 6 num of equipped]
  ["Candy Cane", 0, 1.2, 1.2, 0], // 0
  ["Candy Cat", 0, 1.1, 1.3, "x2 candy producer's effect"], // 1
  ["Candy Monster", 0, 1.5, 1, 0], // 2
  ["Slimy Candy", 0, 1.4, 1.1, 0], // 3
  ["Triangular Candy", 0, 3, 0.3, 0], // 4
  ["C & Y", 1, 2, 1, 0], // 5
  ["Heart Candy", 1, 1.74, 1.32, 0], // 6
  ["Stoni Candy", 1, 1.6, 1.2, "x0.5 effect of candy tree"], // 7
  ["Pixelized Candy", 2, 2.8, 1.86, "x1.4 effect of events"], // 8
  ["Pot o' Candy", 2, 2.2, 2.17, "x2 duration of candy parties"], // 9
  ["Gemdy", 3, 3.2, 2.72, "x1.25 effect of candy treasure"], // 10
  ["False Dilemma Candy", 3, 0.01, 0.01, 0], // 11
  ["Failed Experimental Candy", 3, 1.2, 1, "Players can trade 3 of these for 1 rebirth level"], // 12
  ["Successful Experimental Candy", 4, 3.5, 2.99, "x10.2 effects of candy alchemist and candy time machine"], // 13
  ["Candy Essence from Nature", 5, 9.78, 8, "x2 egg rewards"], // 14
  ["LORD of CANDIES", 6, 20, 20, "x7 APEs and CPEs of all the other equipped pets"] // 15
]
var achCategories = ["Total Clicks", "Auto Production", "Click Power", "Collections", "Candies", "Secret"];
var totalClicksAchs = [
  ["Off to a Good Start", 10n, "candy x2"], // 0
  ["π", 314n, "candy x1,000"], // 1
  ["Moving On", 1200n, "+60 cpc OCP"], // 2
  ["On Great Pace", 6000n, "+4,000 cps OAP"], // 3
  ["Golden Ratio", 16180n, "super egg x1"], // 4
  ["Top Clicker", 36000n, "super egg x3"], // 5
  ["Clicker God", 80000n, "+1 rebirth level"] // 6
];
var oAPAchs = [
  ["1 Candy, 2 Candies, 3 Candies, ...", 1n, "candy x5"], // 0
  ["Getting Productive", 50n, "+10 cpc OCP"], // 1
  ["Efficient Candy Flow", 2000n, "lottery ticket x1"], // 2
  ["Fountain of Candies", 60000, "decent egg x1"], // 3
  ["Speed Mastery", 10000000n, "+154 cpc OCP"], // 4
  ["Raining Candies", 800000000n, "super egg x1"], // 5
  ["AP Greatness", 100000000000000n, "+3 prestige levels"] // 6
]
var oCPAchs = [
  ["Baby Cursor", 11n, "+2 cps OAP"], // 0
  ["Elementary Cursor", 225n, "+100 cps OAP"], // 1
  ["Medium Cursor", 480n, "decent egg x1"], // 2
  ["Euler's Cursor", 740n, "+2,718,282 (2.7 million) cps OAP"], // 3
  ["Gigantic Cursor", 1234n, "+321 cpc OCP"], // 4
  ["Universal Cursor", 1800n, "chocolate super egg x1"], // 5
  ["Immortal Cursor", 2700n, "+1 rebirth level"] // 6
]
var candiesAchs = [
  ["Hello, New Player", 5n, "candy x1"], // 0
  ["Lucky Number", 777n, "candy x100"], // 1
  ["Live on Candies", 10000n, "+40 cpc OCP"], // 2
  ["Candy Millionaire", BigInt(10 ** 6), "+1000 cps OAP"], // 3
  ["Solve World Hunger", BigInt(8 * 10 ** 9), "super egg x1"], // 4
  ["Build Candyland", BigInt(2 * 10 ** 12), "+2.0 billion cps OAP"], // 5
  ["Become LORD of CANDIES", BigInt(4 * 10 ** 15), "LORD of CANDIES x1"] // 6
]

for (var i = 0; i < itemList0.length; i++) {
  itemList0[i].push(0, BigInt(20 ** i * 10), 10 ** i);
}
itemList = itemList0.map(item => [...item]);
for (var i = 0; i < petList.length; i++) {
  petList[i].push(0, 0);
}
for (var i = 0; i < totalClicksAchs.length; i++) {
  totalClicksAchs[i].push(0);
}
for (var i = 0; i < oAPAchs.length; i++) {
  oAPAchs[i].push(0);
}
for (var i = 0; i < oCPAchs.length; i++) {
  oCPAchs[i].push(0);
}
for (var i = 0; i < candiesAchs.length; i++) {
  candiesAchs[i].push(0);
}

// PWA
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("SW.js")
//     .then(() => console.log("SW success"))
//     .catch(err => console.log("SW failure", err));
// }

setTimeout(function() {
  for (var i = 0; i < document.getElementsByClassName("petName").length; i++) {
    document.getElementsByClassName("petName")[i].innerHTML = "???";
    document.getElementsByClassName("numOfPets")[i].style["font-size"] = 0;
    document.getElementsByClassName("numOfPets")[i].style.position = "absolute";
  }
}, 1000);

// Cheat
if (window.location.href.includes("?")) {
  var start = BigInt(prompt("How many candies do you want to start with?"));
  if (start == "") {
    candies = 100000000000000000n;
  } else {
    candies = start;
  }
}

function percentage(a) {
  if (candies >= a) {
    return 100;
  } else {
    return candies * 100n / a;
  }
}

function word(num) {
  return toWord(BigInt(num)).toLowerCase();
}

function increase(cost) {
  return cost * 12n / 10n;
}

function increase2(cost) {
  return cost * 16n / 10n;
}

function double(cost) {
  return cost * 2n;
}

function title(str) {
  if (!str) {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
}

function scrollSmoothly() {
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

function update() {
  if (candies == 0n) {
    document.title = "Candy Clicker";
  } else if (candies == 1n) {
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
  CPE *= 2 ** prestigeLevel;
  APE *= 2 ** prestigeLevel;
  hCPE = BigInt(Math.round(CPE * 100));
  hAPE = BigInt(Math.round(APE * 100));
  ECP = OCP * hCPE / 100n;
  EAP = OAP * hAPE / 100n;
  for (var i = 0; i < oAPAchs.length; i++) {
    if (OAP >= oAPAchs[i][1] && oAPAchs[i][3] == 0) {
      APAch(i);
    }
  }
  for (var i = 0; i < oCPAchs.length; i++) {
    if (OCP >= oCPAchs[i][1] && oCPAchs[i][3] == 0) {
      CPAch(i);
    }
  }
  for (var i = 0; i < candiesAchs.length; i++) {
    if (candies >= candiesAchs[i][1] && candiesAchs[i][3] == 0) {
      candiesAch(i);
    }
  }
  document.getElementById("candies").innerHTML = word(candies);
  document.getElementById("prestigeLevel").innerHTML = prestigeLevel;
  document.getElementById("CPE").innerHTML = Number(hCPE) / 100;
  document.getElementById("APE").innerHTML = Number(hAPE) / 100;
  document.getElementById("OCP").innerHTML = word(OCP);
  document.getElementById("ECP").innerHTML = word(ECP);
  document.getElementById("OAP").innerHTML = word(OAP);
  document.getElementById("EAP").innerHTML = word(EAP);
  document.getElementById("upgradeCost").innerHTML = word(upgradeCost) + " (" + percentage(upgradeCost) + "%)";
  document.getElementById("randomUpgradeCost").innerHTML = word(randomUpgradeCost) + " (" + percentage(randomUpgradeCost) + "%)";
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < itemList.length; j++) {
      if (itemList[j][0].includes(document.getElementsByClassName("selected")[i].innerHTML)) {
        document.getElementById("costOfSelectedItem" + i).innerHTML = word(itemList[j][2]) + " (" + percentage(itemList[j][2]) + "%)";
      }
    }
  }
  if (document.getElementsByClassName("selected")[3].innerHTML == "Decent") {
    document.getElementById("costOfSelectedEgg").innerHTML = word(decentEggCost) + " (" + percentage(decentEggCost) + "%)";
  } else if (document.getElementsByClassName("selected")[3].innerHTML == "Super") {
    document.getElementById("costOfSelectedEgg").innerHTML = word(superEggCost) + " (" + percentage(superEggCost) + "%)";
  }
  if (document.getElementsByClassName("selected")[4].innerHTML == "Prestige") {
    document.getElementById("costOfSelectedPB").innerHTML = word(prestigeCost) + " (" + percentage(prestigeCost) + "%)";
  } else if (document.getElementsByClassName("selected")[4].innerHTML == "Rebirth") {
    document.getElementById("costOfSelectedPB").innerHTML = "";
    // document.getElementById("costOfSelectedPB").innerHTML = ;
  }
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
  if (prestigeLevel == 1) {
    document.getElementById("grandUpgradeBtn").classList.remove("lockedSpecialUpgradeBtns");
  } else if (prestigeLevel == 2) {
    document.getElementById("superUpgradeBtn").classList.remove("lockedSpecialUpgradeBtns");
  } else if (prestigeLevel == 3) {
    document.getElementById("megaUpgradeBtn").classList.remove("lockedSpecialUpgradeBtns");
    document.getElementById("specialBr").style.display = "inline";
  } else if (prestigeLevel == 4) {
    document.getElementById("ultimateUpgradeBtn").classList.remove("lockedSpecialUpgradeBtns");
    document.getElementById("specialBr").style.display = "inline";
  }
}
 document.oncontextmenu = function() {
  window.event.returnValue = false; 
}
setInterval(mainBtns);
setInterval(update);
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
  for (var i = 0; i < specialUpgrades.length; i++) {
    if (candies >= specialUpgrades[i][1]) {
      document.getElementsByClassName("specialUpgradeBtns")[i].classList.remove("locked");
    } else {
      document.getElementsByClassName("specialUpgradeBtns")[i].classList.add("locked");
    }
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
  if (candies >= superEggCost) {
    document.getElementById("superEggBtn").classList.remove("locked");
  } else {
    document.getElementById("superEggBtn").classList.add("locked");
  }
  if (candies >= prestigeCost && prestigeLevel < prestigeLimit) {
    document.getElementById("prestigeBtn").classList.remove("locked");
  } else {
    document.getElementById("prestigeBtn").classList.add("locked");
  }
}

function clickCandy() {
  candies += ECP;
  document.getElementById("candies").innerHTML = word(candies);
  if (candies == 1n) {
    document.getElementById("CANDIES").innerHTML = "candy";
  } else {
    document.getElementById("CANDIES").innerHTML = "candies";
  }
  totalClicks++;
  document.getElementById("totalClicks").innerHTML = word(totalClicks);
  for (var i = 0; i < totalClicksAchs.length; i++) {
    if (totalClicks >= totalClicksAchs[i][1] && totalClicksAchs[i][3] == 0) {
      totalClicksAch(i);
    }
  }
}

function buyUpgrade() {
  if (candies >= upgradeCost) {
    candies -= upgradeCost;
    OCP += 5n;
    upgradeCost = increase(upgradeCost);
    update();
  }
}

function buyRandomUpgrade() {
  if (candies >= randomUpgradeCost) {
    candies -= randomUpgradeCost;
    OCP += BigInt(Math.floor(Math.random() * 5) + 1);
    randomUpgradeCost = increase(randomUpgradeCost);
    update();
  }
}

function buySpecialUpgrade(upgrade) {
  if (candies >= specialUpgrades[upgrade][1]) {
    candies -= specialUpgrades[upgrade][1];
    OCP += specialUpgrades[upgrade][2];
    update();
  }
}

function buyItem(item) {
  if (candies >= itemList[item][2]) {
    candies -= itemList[item][2];
    itemList[item][1]++;
    itemList[item][2] = increase(itemList[item][2]);
    OAP += 10n ** BigInt(item);
    for (var i = 0; i < recentItems.length; i++) {
      if (recentItems[i] == item) {
        recentItems.splice(i, 1);
      }
    }
    if (recentItems.length == 3) {
      recentItems.pop();
    }
    recentItems.unshift(item);
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

function buyDecentEgg(free = false) {
  if (candies >= decentEggCost || free) {
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
    if (!free) {
      candies -= decentEggCost;
      decentEggCost = increase2(decentEggCost);
    }
    document.getElementById("candies").innerHTML = candies;
  }
}

function buySuperEgg(free = false) {
  if (candies >= superEggCost || free) {
    var random = Math.random() * 100;
    console.log(random);
    if (random < 22.5) {
      pet(8);
    } else if (random < 45) {
      pet(9);
    } else if (random < 86) {
      pet(10);
    } else if (random < 94) {
      pet(13);
    } else if (random < 98.5) {
      pet(14);
    } else {
      pet(15);
    }
    if (!free) {
      candies -= superEggCost;
      superEggCost = increase2(superEggCost);
    }
    document.getElementById("candies").innerHTML = candies;
  }
}

function totalClicksAch(ach) {
  alert("Achievement unlocked: " + totalClicksAchs[ach][0] + "\nYou've reached " + word(totalClicksAchs[ach][1]) + " total clicks.\nReward: " + totalClicksAchs[ach][2]);
  totalClicksAchs[ach][3] = 1;
  if (ach == 0) {
    candies += 2n;
  } else if (ach == 1) {
    candies += 1000n;
  } else if (ach == 2) {
    OCP += 60n;
  } else if (ach == 3) {
    OAP += 4000n;
  } else if (ach == 4) {
    buySuperEgg(true);
  } else if (ach == 5) {
    buySuperEgg(true);
    buySuperEgg(true);
    buySuperEgg(true);
  } else if (ach == 6) {
    rebirthLevel++;
  }
}

function APAch(ach) {
  alert("Achievement unlocked: " + oAPAchs[ach][0] + "\nYou've reached " + word(oAPAchs[ach][1]) + " cps OAP.\nReward: " + oAPAchs[ach][2]);
  oAPAchs[ach][3] = 1;
  if (ach == 0) {
    candies += 5n;
  } else if (ach == 1) {
    OCP += 10n;
  } else if (ach == 2) {
    // Lottery ticket x1
  } else if (ach == 3) {
    buyDecentEgg(true);
  } else if (ach == 4) {
    OCP += 154n;
  } else if (ach == 5) {
    buySuperEgg(true);
  } else if (ach == 6) {
    prestigeLevel += 3;
  }
}

function CPAch(ach) {
  alert("Achievement unlocked: " + oCPAchs[ach][0] + "\nYou've reached " + word(oCPAchs[ach][1]) + " cpc OCP.\nReward: " + oCPAchs[ach][2]);
  oCPAchs[ach][3] = 1;
  if (ach == 0) {
    OAP += 2n;
  } else if (ach == 1) {
    OAP += 100n;
  } else if (ach == 2) {
    buyDecentEgg(true);
  } else if (ach == 3) {
    OAP += 2718282n;
  } else if (ach == 4) {
    OCP += 321n;
  } else if (ach == 5) {
    // Chocolate super egg x1
  } else if (ach == 6) {
    rebirthLevel++;
  }
}

function candiesAch(ach) {
  alert("Achievement unlocked: " + candiesAchs[ach][0] + "\nYou own " + word(candiesAchs[ach][1]) + " candies.\nReward: " + candiesAchs[ach][2]);
  candiesAchs[ach][3] = 1;
  if (ach == 0) {
    candies += 1n;
  } else if (ach == 1) {
    candies += 100n;
  } else if (ach == 2) {
    OCP += 40n;
  } else if (ach == 3) {
    OAP += 1000n;
  } else if (ach == 4) {
    buySuperEgg(true);
  } else if (ach == 5) {
    OAP += 2000000000n;
  } else if (ach == 6) {
    pet(15);
  }
}

function createAchRow(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    var newAch = document.createElement("tr");
    for (var j = 0; j < 3; j++) {
      newAch.appendChild(document.createElement("td"));
    }
    if (arr[i][3] == 0) {
      newAch.children[0].innerHTML = "???";
      newAch.children[2].innerHTML = "???";
    } else {
      newAch.children[0].innerHTML = arr[i][0];
      newAch.children[2].innerHTML = title(arr[i][2]);
    }
    newAch.children[1].innerHTML = func(i);
    newAch.classList.add("achRow");
    document.getElementById("achTbody").appendChild(newAch);
  }
}

function buyPrestige() {
  if (candies >= prestigeCost && prestigeLevel < prestigeLimit) {
    OCP = 1n;
    OAP = 0n;
    candies = 0n;
    upgradeCost = 50n;
    randomUpgradeCost = 30n;
    itemList = itemList0.map(item => [...item]);
    recentItems = [];
    prestigeLevel++;
    prestigeCost *= 10n;
    update();
  }
}

function buyRebirth() {

}

function openMainPage() {
  document.getElementById("inventory").style.display = "none";
  closePetPage();
  document.getElementById("achPage").style.display = "none";
  document.getElementById("main").style.display = "block";
  scrollSmoothly();
}

function openInventory() {
  document.getElementById("main").style.display = "none";
  document.getElementById("inventory").style.display = "block";
  scrollSmoothly();
  for (var i = 0; i < itemList.length; i++) {
    document.getElementById("numOfItem" + i).innerHTML = " x" + itemList[i][1];
  }
}

function openAchPage() {
  document.getElementById("main").style.display = "none";
  document.getElementById("achPage").style.display = "block";
  openSpecificAchPage(0);
}

function openSpecificAchPage(page) {
  for (var i = 0; i < achCategories.length; i++) {
    if (i == page) {
      document.getElementById("achPageBtn" + i).style.display = "none";
    } else {
      document.getElementById("achPageBtn" + i).style.display = "inline-block";
    }
  }
  document.getElementById("achCategory").innerHTML = achCategories[page] + " Achievements";
  for (var i = 0; i < document.getElementsByClassName("achRow").length;) {
    document.getElementsByClassName("achRow")[0].remove();
  }
  if (page == 0) {
    createAchRow(totalClicksAchs, i => "Reaching " + word(totalClicksAchs[i][1]) + " total clicks");
  } else if (page == 1) {
    createAchRow(oAPAchs, i => "Reaching " + word(oAPAchs[i][1]) + " cps EAP");
  } else if (page == 2) {
    createAchRow(oCPAchs, i => "Reaching " + word(oCPAchs[i][1]) + " cpc ECP");
  } else if (page == 4) {
    createAchRow(candiesAchs, i => "Owning " + word(candiesAchs[i][1]) + " candies");
  }
  scrollSmoothly();
}

function openItemsPage() {
  document.getElementById("itemsPageBtn").style.display = "none";
  document.getElementById("itemsPage").style.display = "block";
  document.getElementById("petsPageBtn").style.display = "inline-block";
  document.getElementById("petsPage").style.display = "none";
  scrollSmoothly();
  closePetPage();

}

function openPetsPage() {
  document.getElementById("itemsPageBtn").style.display = "inline-block";
  document.getElementById("itemsPage").style.display = "none";
  document.getElementById("petsPageBtn").style.display = "none";
  document.getElementById("petsPage").style.display = "block";
  scrollSmoothly();
}

function openPetPage(id) {
  if (id != undefined) {
    document.getElementById("ownedPets").style.display = "none";
    document.getElementById("petPage").style.display = "block";
    scrollSmoothly();
    document.getElementById("petPage_name").innerHTML = rarities[petList[id][1]] + " - " + petList[id][0];
    document.getElementById("petPage_id").innerHTML = id;
    try {
      document.getElementById("petPage_img").src = "0. Candy Area/Pets/P0" + (100 + Number(id)) + ".png";
    }
    catch(err) {
      document.getElementById("petPage_img").src = "0. Candy Area/Icons/P0000.png";
    }
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
  scrollSmoothly();
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

  // A special upgrade button is clicked
  for (var i = 0; i < document.getElementsByClassName("specialUpgradeBtns").length; i++) {
    document.getElementsByClassName("specialUpgradeBtns")[i].addEventListener("click", function() {
      buySpecialUpgrade(this.dataset.id);
    })
  }

  // A recent item is clicked
  for (var i = 0; i < document.getElementsByClassName("recentItems").length; i++) {
    document.getElementsByClassName("recentItems")[i].addEventListener("click", function() {
      alert("Imformation about '" + itemList[this.dataset.id][0] + "'\nAP: " + word(itemList[this.dataset.id][3]) + " cps");
    })
  }

  // An item is clicked
  for (var i = 0; i < document.getElementsByClassName("items").length; i++) {
    document.getElementsByClassName("items")[i].addEventListener("click", function() {
      alert("Information about '" + this.dataset.name + "'\n" + this.dataset.info);
    });
  }

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

  // An achievement page button is clicked
  for (var i = 0; i < achCategories.length; i++) {
    document.getElementById("achPageBtn" + i).addEventListener("click", function() {
      openSpecificAchPage(this.dataset.page);
    });
  }

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
  document.querySelectorAll(".custom-select").forEach(select => {
    var selected = select.querySelector(".selected");
    var options = select.querySelector(".options");
    selected.addEventListener("click", () => {
      closeAllSelects(selected);
      options.style.display = options.style.display === "block" ? "none" : "block";
      selected.classList.toggle("open");
      if (selected.classList.contains("open")) {
        for (var i = 0; i < document.getElementsByClassName("itemOptions").length; i++) {
          document.getElementsByClassName("itemOptions")[i].scrollTop = 0;
        }
      }
    });
    options.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        options.style.display = "none";
        selected.classList.remove("open");
      });
    });
  });
  function closeAllSelects(current) {
    document.querySelectorAll(".custom-select").forEach(select => {
      const options = select.querySelector(".options");
      const selected = select.querySelector(".selected");
      if (selected !== current) {
        options.style.display = "none";
        selected.classList.remove("open");
      }
    });
  }
  document.addEventListener("click", e => {
    if (!e.target.closest(".custom-select")) {
      document.querySelectorAll(".options").forEach(o => o.style.display = "none");
      document.querySelectorAll(".selected").forEach(s => s.classList.remove("open"));
    }
  });
}, 100);
