import {aclx, acly} from "./calculos.js"
import {pegarPosicao} from "./modulo.js"

let bag = {
    n: 0,
    loop: 1,
    divs: [],
    setCorpos: [],
    corpos: [],
}

function start(bag) {
    bag.loop = 1
    let velsx = {}
    let velsy = {}

    loop()
    function loop() {
        
        velsx.O = [ [], [], [], [], [], [], [], [], [], [] ]
        for(let i in bag.corpos) {
            for(let j in bag.corpos)  {
                if(i == j) continue
                velsx.O[i][j] = aclx(bag.corpos[i], bag.corpos[j])
            }
            
        }
        velsy.O = [ [], [], [], [], [], [], [], [], [], [] ]
        for(let i in bag.corpos) {
            for(let j in bag.corpos)  {
                if(i == j) continue
                velsy.O[i][j] = acly(bag.corpos[i], bag.corpos[j])
            }
            
        }

        
        
        for(let i in bag.corpos) {
            bag.corpos[i].x += bag.corpos[i].velx
            bag.corpos[i].y += bag.corpos[i].vely
            let somax = 0
            let somay = 0
            for(let j = 0; j < bag.n; j++) {
                if(i == j) continue
                somax += velsx.O[i][j]
                somay += velsy.O[i][j]
            }
            
            bag.corpos[i].velx += somax
            bag.corpos[i].vely += somay
            
            bag.setCorpos[i].style.left = `${bag.corpos[i].x - bag.corpos[i].raio}px`
            bag.setCorpos[i].style.top = `${bag.corpos[i].y - bag.corpos[i].raio - 50}px`
            
        }
        document.getElementById('botaoStop').addEventListener("click", function() {
            bag.loop = 0
        })
        if(bag.loop == 1) {
            return setTimeout(loop, 50)
        }else {
            return null
        }
    }
}

function Eventos() {
    area.addEventListener("click", function(e) {
        pegarPosicao(bag, e)
    })
    document.getElementById('botaoStart').addEventListener("click", function() {
        start(bag)
    })
}
window.onload = Eventos()