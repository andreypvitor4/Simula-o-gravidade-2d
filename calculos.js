const aceleracao = (m, d) => {
    return  d == 0? 0.001: m/(d**2)
}

const distancia = (x1, y1, x2, y2) => {
    return Math.sqrt( ((x1-x2)**2) + ((y1-y2)**2) )
}

const angulo = (x1, y1, x2, y2) => {
    if(x1 != x2) {
        return Math.atan((Math.abs(y1 - y2))/(Math.abs(x1 - x2)))
    }else {
        return 0.0001
    }
}

const direcao = (b, a) => {
    return a == b? 0: Math.abs(a - b)/(a - b)
}

const aclx = (x1, y1, x2, y2, massa) => {
    let dist = distancia(x1, y1, x2, y2)
    
    let ang = angulo(x1, y1, x2, y2)
    let vel = aceleracao(massa, dist)
    let dir = direcao(x1, x2)
    return dir*vel*Math.cos(ang)
}

const acly = (x1, y1, x2, y2, massa) => {
    let dist = distancia(x1, y1, x2, y2)
    let ang = angulo(x1, y1, x2, y2)
    let vel = aceleracao(massa, dist)
    let dir = direcao(y1, y2)
    return dir*vel*Math.sin(ang)
}
export {aclx, acly}