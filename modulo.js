import {distancia} from "./calculos.js"

const pegarPosicao = (bag, e) => {
    let corpoSelecionado = confereEspaco(bag, e)
    if(corpoSelecionado) {
        corpoEdit(bag, corpoSelecionado)
    }
    else {
        let area = document.getElementById("area")
        bag.divs.push(document.createElement('div'))
        area.appendChild(bag.divs[bag.n])
        bag.divs[bag.n].setAttribute("id", `p${bag.n}`)
        bag.setCorpos.push(document.getElementById(`p${bag.n}`))
        criaCorpo(bag, e)
        bag.setCorpos[bag.n].style = `
            background: red;\n
            color: red;\n
            width: ${2*bag.corpos[bag.n].raio}px;\n
            height: ${2*bag.corpos[bag.n].raio}px;
            border-radius: ${bag.corpos[bag.n].raio}px;\n
            position: absolute;\n
            left: ${bag.corpos[bag.n].x - bag.corpos[bag.n].raio}px;\n
            top: ${bag.corpos[bag.n].y - bag.corpos[bag.n].raio - 50}px;`
        bag.n += 1
        console.log(e.pageX, e.pageY)
    }
}

const criaCorpo = (bag, e) => {
    let Vix = document.getElementById('vix')
    let Viy = document.getElementById('viy')
    let m = document.getElementById('massa')
    let d = document.getElementById('densidade')
    let Raio = criaRaio(Number(m.value), Number(d.value))
    bag.corpos.push({
        deletado: false,
        n: bag.n,
        x: e.pageX,
        y: e.pageY,
        velx: Number(Vix.value),
        vely: Number(Viy.value),
        massa: Number(m.value),
        densidade: Number(d.value),
        raio: Raio,
        colisao: true
    })
}

const criaRaio = (m, d) => {
    return Math.pow( (3*m/d)/(4*Math.PI) , (1/3)  )
}

const confereEspaco = (bag, e) => {
    for(let i in bag.corpos) {
        let dist = distancia(e.pageX, e.pageY, bag.corpos[i].x, bag.corpos[i].y)
        if(dist <= bag.corpos[i].raio) {
            return bag.corpos[i]
        }
    }
    return false
}

const corpoEdit = (bag, corpo) => {
    let editDelete = document.getElementsByName('edit')

    if(editDelete[0].checked) {
        corpo.velx = Number(document.getElementById('vix').value)
        corpo.vely = Number(document.getElementById('viy').value)
        corpo.massa = Number(document.getElementById('massa').value)
        corpo.densidade = Number(document.getElementById('densidade').value)
        let raio = criaRaio(corpo.massa, corpo.densidade)
        corpo.raio = raio
        bag.setCorpos[corpo.n].style = `
            background: red;\n
            color: red;\n
            width: ${2*corpo.raio}px;\n
            height: ${2*corpo.raio}px;
            border-radius: ${corpo.raio}px;\n
            position: absolute;\n
            left: ${corpo.x - corpo.raio}px;\n
            top: ${corpo.y - corpo.raio - 50}px;`
    }else {
        corpo.x = -1
        corpo.y = -1
        corpo.velx = 0
        corpo.vely = 0
        corpo.massa = 0
        corpo.densidade = 1
        corpo.raio = 0
        corpo.deletado = true
        bag.setCorpos[corpo.n].style = ''
    }
}



export{pegarPosicao}