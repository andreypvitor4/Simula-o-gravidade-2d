const pegarPosicao = (bag, e) => {
    let area = document.getElementById("area")
    bag.divs.push(document.createElement('div'))
    area.appendChild(bag.divs[bag.n])
    bag.divs[bag.n].setAttribute("id", `p${bag.n}`)
    bag.setCorpos.push(document.getElementById(`p${bag.n}`))
    bag.setCorpos[bag.n].style = `
        background: red;\n
        color: red;\n
        width: 20px;\n
        height: 20px;
        border-radius: 10px;\n
        position: absolute;\n
        top: ${e.pageY - 70}px;\n
        left: ${e.pageX - 18}px;`
    bag.n += 1
    criaCorpo(bag, e)
}

const criaCorpo = (bag, e) => {
    let Vix = document.getElementById('vix')
    let Viy = document.getElementById('viy')
    let m = document.getElementById('massa')
    bag.corpos.push({
        x: e.pageX -18,
        y: e.pageY -70,
        velx: Number(Vix.value),
        vely: Number(Viy.value),
        massa: Number(m.value)
    })
}

export{pegarPosicao}