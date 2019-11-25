let DivHeroes = document.querySelector('.row');
get_heroes_images();

function get_heroes_images(){

    const api = 'https://dotaapi.herokuapp.com//GetHeroes/';

    fetch(api)
        .then(response => response.json())
        .then(data => {

            var heroes = [];
            var x;

            for (x in data){
                let hero_name = data[x]['hero_name'];
                let hero_pic = "http://cdn.dota2.com/apps/dota2/images/heroes/" +
                    hero_name + "_lg.png";
                let hero_page = "/hero-stats.html";

                var heroDiv = document.createElement("div");
                heroDiv.className = "hero_" + hero_name + " hero";

                var hero_link = document.createElement("a");
                hero_link.href = hero_page;
                hero_link.onclick = function(){set_hero(hero_name)};

                var hero_img = document.createElement("img");
                hero_img.className = "heropic";
                hero_img.src = hero_pic;

                DivHeroes.appendChild(heroDiv);
                heroDiv.appendChild(hero_link);
                hero_link.appendChild(hero_img);
            }

        });

}

function set_hero(hero_name){
    localStorage.setItem("hero_name", hero_name);
}
