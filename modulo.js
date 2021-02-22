const pegarPosicao = (bag, e) => {
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

const criaCorpo = (bag, e) => {
    let Vix = document.getElementById('vix')
    let Viy = document.getElementById('viy')
    let m = document.getElementById('massa')
    let d = document.getElementById('densidade')
    let Raio = criaRaio(Number(m.value), Number(d.value))
    bag.corpos.push({
        x: e.pageX,
        y: e.pageY,
        velx: Number(Vix.value),
        vely: Number(Viy.value),
        massa: Number(m.value),
        densidade: Number(d.value),
        raio: Raio
    })
}

const criaRaio = (m, d) => {
    return Math.pow( (3*m/d)/(4*Math.PI) , (1/3)  )
}

export{pegarPosicao}