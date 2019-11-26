var heroName = localStorage.getItem("hero_name");

set_css_data(cssData, heroName);
set_title(heroName);
get_hero_id();

function set_css_data(cssData, heroName){
    if (cssData[heroName]){
        
        document.body.style.backgroundImage = cssData[heroName]["background_img"];
        document.documentElement.style.setProperty('--header-color', cssData[heroName]["header-color"]);
        document.documentElement.style.setProperty('--main-color', cssData[heroName]["main-color"]);
        document.documentElement.style.setProperty('--secondary-color', cssData[heroName]["secondary-color"]);
    
    } else {
        document.body.style.backgroundImage = 'url("https://images2.alphacoders.com/474/474206.jpg")';
        document.documentElement.style.setProperty('--header-color', cssData["antimage"]["header-color"]);
        document.documentElement.style.setProperty('--main-color', cssData["antimage"]["main-color"]);
        document.documentElement.style.setProperty('--secondary-color', cssData["antimage"]["secondary-color"]);
    
    }
}

function set_title(heroName){
    
    let hero_header_name = document.getElementById("hero-name");
    str = heroName.split('_');

    if (str.length < 2){
        document.title = heroName[0].toUpperCase() + heroName.slice(1);
    
    } else {
        for (x in str){
            // console.log(str[x].charAt(0).ToUpperCase());
            str[x] = str[x][0].toUpperCase() + str[x].slice(1);
        }
        
    heroName = str.join(" ");
    document.title = heroName;
}

hero_header_name.innerText = heroName.toUpperCase();

}


function get_hero_id(){

    const api = "http://dotastats.bitvivaz.com/GetHeroes/";

    fetch(api)
        .then(response => response.json())
        .then(data => {

            for (x in data){
                if (heroName == data[x]['hero_name']){
                    hero_id = data[x]['hero_id'];
                }
            }

            get_match_data(hero_id);
            get_average_stats(hero_id);
            get_win_rate(hero_id);
        })
        .catch(err => console.log("error: " + err));
}

function get_match_data(hero_id){

    const api = 'http://dotastats.bitvivaz.com/GetRecentMatches/?matches_requested=30&hero_id=' + hero_id;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            if (data[0] == undefined){
                alert("No match data found");
                window.location.replace("../index.html");
            } else {
            set_recent_matches(data);
            }
        })
        .catch(err => console.log("error: " + err));
}

function set_recent_matches(data){
    
    var recent_matches_row_one = document.getElementById('recent-matches-row-one');
    var recent_matches_row_two = document.getElementById('recent-matches-row-two');
    
    for (x in data){
        var col = document.createElement("div");
        col.className = "col no-padding";
        
        var matchTab = document.createElement("div");
        matchTab.className = "match-tab";
        matchTab.value = x;
        matchTab.id = "match-tab-" + x;
        matchTab.innerHTML = ++x;
        matchTab.onclick = function(){set_match_data(this.value, data); select_tab(this.value);};

        if (x < 15){
            recent_matches_row_one.appendChild(col);
            col.appendChild(matchTab);
        } else if (x > 15) {
            recent_matches_row_two.appendChild(col);
            col.appendChild(matchTab);
        }
   }
   
   // select match tab one on window load
   var matchTabOne = document.getElementById("match-tab-0");
   if (matchTabOne){
       matchTabOne.click();
   }

}

function select_tab(matchTab){
    deselect_tabs(); 
    matchTabID = "match-tab-" + matchTab;
    var selectedTab = document.getElementById(matchTabID);
    selectedTab.className = "match-tab match-tab-selected";

}

function deselect_tabs(){
    var matchTabs = document.querySelectorAll(".match-tab-selected");
    for (x in matchTabs) {
    matchTabs[x].className = "match-tab";
    }
}

function set_match_data(x, data){

    // get div's
    let matchIdDiv = document.querySelector('#match-id');
    let matchStatusDiv = document.querySelector('#match-status');
    let heroLevelDiv = document.querySelector('#hero-level');
    let gameModeDiv = document.querySelector('#game-mode');
    let durationDiv = document.querySelector("#duration");
    let dateDiv = document.querySelector("#match-date");
    let netWorthDiv = document.querySelector("#net-worth");
    let killsDiv = document.querySelector("#kills");
    let deathsDiv = document.querySelector("#deaths");
    let assistsDiv = document.querySelector("#assits");
    let lastHitsDiv = document.querySelector("#last-hits");
    let deniesDiv = document.querySelector("#denies");
    let gpmDiv = document.querySelector("#gpm");
    let xpmDiv = document.querySelector("#xpm");
    let heroDamageDiv = document.querySelector("#hero-damage");
    let towerDamageDiv = document.querySelector("#tower-damage");
    let healingDiv = document.querySelector("#healing");
    let itemBuildDiv = document.querySelector("#item-build");
    let backpackDiv = document.querySelector("#backpack");
    let abilityBuildDiv = document.querySelector("#ability-build");

    // assign temp variables
    let assists = data[x]['assists'];
    let backpack = data[x]['backpack'];
    let deaths = data[x]['deaths'];
    let denies = data[x]['denies'];
    let dire_team = data[x]['dire_team'];
    let match_duration = data[x]['match_duration'];
    let gpm = data[x]['gold_per_min'];
    let gold_spent = data[x]['gold_spent'];
    let hero_abilities = data[x]['hero_abilities'];
    let hero_damage = data[x]['hero_damage'];
    let hero_healing = data[x]['hero_healing'];
    let hero_level = data[x]['hero_level'];
    let items = data[x]['items'];
    let kills = data[x]['kills'];
    let last_hits = data[x]['last_hits'];
    let leaver_status = data[x]['leaver_status'];
    let match_date_time = data[x]['match_date_time'];
    let game_mode = data[x]['game_mode'];
    let match_id = data[x]['match_id'];
    let radiant_win = data[x]['radiant_win'];
    let remaining_gold = data[x]['remaining_gold'];
    let tower_damage = data[x]['tower_damage'];
    let xpm = data[x]['xp_per_min'];

    // assign data to divs

    // set game mode
    new Promise(function(resolve){
        resolve(game_mode);
    }).then(function(mode){
        switch(mode){
            case 0:
                gameModeDiv.innerText = "Unknown";
            case 1:
                gameModeDiv.innerText = "All Pick";
            case 2:
                gameModeDiv.innerText = "Captains Mode";
            case 3:
                gameModeDiv.innerText = "Random Draft";
            case 4:
                gameModeDiv.innerText = "Single Draft";
            case 5:
                gameModeDiv.innerText = "All Random";
            case 12:
                gameModeDiv.innerText = "Least Player";
            case 16:
                gameModeDiv.innerText = "Captains Draft";
            case 19:
                gameModeDiv.innerText = "Event";
            case 22:
                gameModeDiv.innerText = "All Pick";
        }
    }).catch(err => console.log("error: " + err));


    // set duration
    new Promise(function(resolve){
        resolve(match_duration);
    }).then(function(match_duration){
        let minutes = Math.floor(match_duration / 60);
        let seconds = match_duration - minutes * 60;
        let hours = Math.floor(match_duration / 3600);
        if (hours === 0){
            match_duration = minutes + ":" + seconds;
        } else {
            match_duration = hours + ":" + minutes + ":" + seconds;
        }

        durationDiv.innerText = match_duration;

    }).catch(err => console.log("error: " + err));
    
    // calculated net worth
    let net_worth = gold_spent + remaining_gold;
    netWorthDiv.innerText = net_worth;
    
    // calculate match status
    new Promise(function(resolve){
        resolve(dire_team, radiant_win);
    }).then(function(dire_team, radiant_win){
        if ((dire_team && !radiant_win) || (!dire_team && radiant_win)){
            matchStatusDiv.innerText = "Won";        
        } else {
            matchStatusDiv.innerText = "Lost"
        }
    }).catch(err => console.log("error: " + err));
    
    // clear items
    itemBuildDiv.innerHTML = "";
    backpackDiv.innerHTML = "";
    
    // set item build
    new Promise(function(resolve){
        resolve(items);
    }).then(function(items){
        
        const api = 'http://dotastats.bitvivaz.com/GetItems/';

        fetch(api)
        .then(response => response.json())
        .then(data => {
            get_item_name(data, items, null);
        })
    }).catch(err => console.log("error: " + err));
    
    // set backpack
    new Promise(function(resolve){
        resolve(backpack);
    }).then(function(backpack){

        const api = 'http://dotastats.bitvivaz.com/GetItems/';

        fetch(api)
        .then(response => response.json())
        .then(data => {
            get_item_name(data, null, backpack);
        })
    }).catch(err => console.log("error: " + err));

    // clear abilities
    abilityBuildDiv.innerHTML = "";

    // set abilities
    new Promise(function(resolve){
        resolve(hero_abilities);
    }).then(function(hero_abilities){
        
        const api = 'https://raw.githubusercontent.com/odota/dotaconstants/master/build/ability_ids.json'

        fetch(api)
        .then(response => response.json())
        .then(data => {
            var abilities = []
            for (x in hero_abilities){
                let hero_level = hero_abilities[x]['level'];
                let hero_ability_id = hero_abilities[x]['ability'];
                let ability_time = hero_abilities[x]['time'];
                
                let ability_name = data[hero_ability_id];
                abilities.push(ability_name);
            }

            if (abilities.length > 16){
             
                abilities.splice(16, 0, 'none');
                abilities = abilities.slice(0,18); // trim to 18
            
            }   else if (abilities.length > 0 && abilities.length < 7) {
                
                var i = abilities.length + 1;
                
                while(i < 7){
                    console.log(i);
                    abilities.push("none");
                    i++;
                }  
            
            }   else if (abilities.length > 6 && abilities.length < 13) {
                
                var i = abilities.length + 1;
                
                while(i < 13){
                    
                    abilities.push("none");
                    i++;
                }

            }   else if (abilities.length > 12 && abilities.length < 17) {
                
                var i = abilities.length + 1;
                
                while(i < 19){
                    abilities.push("none");
                    i++;
                }
            
            }

            add_to_ability_build(abilities);
        
        }).catch(err => console.log("error: " + err));
    })
    
    // set match date
    dateDiv.innerText = match_date_time.substring(0,10);

    matchIdDiv.innerText = match_id;
    heroLevelDiv.innerText = hero_level;
    killsDiv.innerText = kills;
    deathsDiv.innerText = deaths;
    assistsDiv.innerText = assists;
    lastHitsDiv.innerText = last_hits;
    deniesDiv.innerText = denies;
    gpmDiv.innerText = gpm;
    xpmDiv.innerText = xpm;
    heroDamageDiv.innerText = hero_damage;
    towerDamageDiv.innerText = tower_damage;
    healingDiv.innerText = hero_healing;
}

function get_average_stats(hero_id){

    const api = "http://dotastats.bitvivaz.com/GetAveragesOfLatestMatches/?matches_requested=30&hero_id=" + hero_id;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            set_average_stats(data);

        }).catch(err => console.log("error: " + err));
}

function set_average_stats(data){

    // get divs
    let avgAssistsDiv = document.querySelector('#avg-assists');
    let avgDeathsDiv = document.querySelector('#avg-deaths');
    let avgDeniesDiv = document.querySelector('#avg-denies');
    let avgGpmDiv = document.querySelector('#avg-gpm');
    let avgHeroDamageDiv = document.querySelector('#avg-hero-damage');
    let avgHeroHealingDiv = document.querySelector('#avg-hero-healing');
    let avgKillsDiv = document.querySelector('#avg-kills');
    let avgLastHitsDiv = document.querySelector('#avg-last-hits');
    let avgNetWorthDiv = document.querySelector('#avg-net-worth');
    let avgTowerDamageDiv = document.querySelector('#avg-tower-damage');
    let avgXpmDiv = document.querySelector('#avg-xpm');

    // get data
    let avg_assists = data['average_assists'];
    let avg_deaths = data['average_deaths'];
    let avg_denies = data['average_denies'];
    let avg_gpm = data['average_gold_per_min'];
    let avg_hero_damage = data['average_hero_damage'];
    let avg_hero_healing = data['average_hero_healing'];
    let avg_kills = data['average_kills'];
    let avg_last_hits = data['average_last_hits'];
    let avg_net_worth = data['average_net_worth'];
    let avg_tower_damage = data['average_tower_damage'];
    let avg_xpm = data['average_xp_per_min'];

    // assign data to divs
    avgAssistsDiv.innerText = avg_assists;
    avgDeathsDiv.innerText = avg_deaths;
    avgDeniesDiv.innerText = avg_denies;
    avgGpmDiv.innerText = avg_gpm;
    avgHeroDamageDiv.innerText = avg_hero_damage;
    avgHeroHealingDiv.innerText = avg_hero_healing;
    avgKillsDiv.innerText = avg_kills;
    avgLastHitsDiv.innerText = avg_last_hits;
    avgNetWorthDiv.innerText = avg_net_worth;
    avgTowerDamageDiv.innerText = avg_tower_damage;
    avgXpmDiv.innerText = avg_xpm;
}


function get_item_name(data, items, backpack){
    if (backpack === null){
        for (x in items){
            for (y in data){
                if (items[x] == data[y]['item_id']){
                    let item_name = data[y]['item_name'];
                    let item_pic = "http://cdn.dota2.com/apps/dota2/images/items/" + 
                    item_name + "_lg.png";
                    add_to_item_build(item_pic, "#item-build");
                }
            }
            if (items[x] === 0 ){
                add_to_item_build(null, "#item-build");
            }    
    }
 } else if (items == null){
          for (x in backpack){
            for (y in data){
                if (backpack[x] == data[y]['item_id']){
                    let item_name = data[y]['item_name'];
                    let item_pic = "http://cdn.dota2.com/apps/dota2/images/items/" + 
                    item_name + "_lg.png";
                    add_to_item_build(item_pic, "#backpack");
                }
            }
            if (backpack[x] === 0 ){
                add_to_item_build(null, "#backpack");
            }
        }
    } 
}


function add_to_item_build(item_pic, div){    
    let selectedDiv = document.querySelector(div);
    var item_col = document.createElement("div");
    item_col.className = "item-col";

    selectedDiv.appendChild(item_col);

    if (item_pic !== null){
        var item_img = document.createElement("img");
        item_img.className = "img-cover";
        item_img.src = item_pic;    
        item_col.appendChild(item_img);
    }

}

function add_to_ability_build(abilities){

    var hero_level = 1;
    for (x in abilities){
        var abilityBuildDiv = document.querySelector("#ability-build");
        var ability_col = document.createElement("div");
        ability_col.className = "col-xl-2 ability-col no-padding"
        
        var rowOne = document.createElement("div");
        rowOne.className = "row";

        var rowTwo = document.createElement("div");
        rowTwo.className = "row";

        var hero_lvl_col = document.createElement("div");
        hero_lvl_col.innerText = hero_level;
        
        if (x % 2 && x < 6 ){
            hero_lvl_col.className = "hero-lvl-col normalblue";
        } else if ( x > 5 && !(x % 2) && x < 11) {
            hero_lvl_col.className = "hero-lvl-col normalblue";
        } else if ( x > 11 && (x % 2) && x < 18) {
            hero_lvl_col.className = "hero-lvl-col normalblue";
        } else {
            hero_lvl_col.className = "hero-lvl-col";
        }

        var hero_ability_pic = document.createElement("div");
        hero_ability_pic.className = "hero-ability-pic";
        
        var ability_img = document.createElement("img");
        ability_img.className = "img-cover";
        ability_img.id = "ability-pic";
    
        if (abilities[x].substring(0, 7) === "special"){
            ability_img.src = "../pictures/talenttree.jpg";
        } else if (abilities[x] == "none") {
            ability_img.src = cssData[heroName]["none"];
            console.log(ability_img.src);
        }else {
            ability_img.src = "http://cdn.dota2.com/apps/dota2/images/abilities/" + abilities[x] + "_hp1.png";
        }
        
        
        abilityBuildDiv.appendChild(ability_col);
        ability_col.appendChild(rowOne);
        rowOne.appendChild(hero_lvl_col);
        ability_col.appendChild(rowTwo);
        rowTwo.appendChild(hero_ability_pic);
        hero_ability_pic.appendChild(ability_img);   
        
        hero_level++;
    }
}

function get_win_rate(hero_id){

    const api = "http://dotastats.bitvivaz.com/GetWinRate/?matches_requested=30&hero_id=" + hero_id;

    fetch(api)
        .then(response => response.text())
        .then(data => {
            
            var darkColor = document.documentElement.style.getPropertyValue('--header-color');
            var lightColor = document.documentElement.style.getPropertyValue('--secondary-color');

            // console.log(data);
            var winRateChart = new CircleChart();
            winRateChart.setColors(darkColor, lightColor);
            winRateChart.init("win-rate-chart", data);
            
        })
        .catch(err => console.log("error: " + err));

}

