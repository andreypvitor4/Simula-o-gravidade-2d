const aceleracao = (m, d) => {
    return  d == 0? 0.001: (m/(d**2))/10
}

const distancia = (x1, y1, x2, y2) => {
    return Math.sqrt( ((x1-x2)**2) + ((y1-y2)**2) )
}

const angulo = (x1, y1, x2, y2) => {
    if(x1 != x2) {
        return Math.atan((Math.abs(y1 - y2))/(Math.abs(x1 - x2)))
    }else {
        return 0.001
    }
}

const direcao = (b, a) => {
    return a == b? 0: Math.abs(a - b)/(a - b)
}

const aclx = (corpo1, corpo2) => {
    let dist = distancia(corpo1.x, corpo1.y, corpo2.x, corpo2.y)
    let ang = angulo(corpo1.x, corpo1.y, corpo2.x, corpo2.y)
    if(dist <= (corpo1.raio+corpo2.raio)) {
        if(corpo1.colisao == 0) { 
            console.log(corpo1.n)
            colisao(corpo1, corpo2)
        } 
        corpo1.colisao = 0 //pode colidir
    }
    let vel = aceleracao(corpo2.massa, dist)
    let dir = direcao(corpo1.x, corpo2.x)
    return dir*vel*Math.cos(ang)
}

const acly = (corpo1, corpo2) => {
    let dist = distancia(corpo1.x, corpo1.y, corpo2.x, corpo2.y)
    let ang = angulo(corpo1.x, corpo1.y, corpo2.x, corpo2.y)
    let vel = aceleracao(corpo2.massa, dist)
    let dir = direcao(corpo1.y, corpo2.y)
    return dir*vel*Math.sin(ang)
}

const colisao = (corpo1, corpo2) => {
    let baseC = [[1,0], [0,1]]
    let baseD = criaBaseComVetorDirecao(corpo1, corpo2)
    let invBaseD = inverteMatriz(baseD)
    let MatrizDC = multiplicaMatriz(invBaseD, baseC)

    let vetorVelC1 = criaMatriz2x2(corpo1.velx, corpo1.vely, 0, 0)
    let vetorVelD1 = multiplicaMatriz(MatrizDC, vetorVelC1)
    let vetorVelC2 = criaMatriz2x2(corpo2.velx, corpo2.vely, 0, 0)
    let vetorVelD2 = multiplicaMatriz(MatrizDC, vetorVelC2)
    let vetoresVelD = calculoImpacto(vetorVelD1, vetorVelD2, corpo1, corpo2)

    let MatrizCD = inverteMatriz(MatrizDC)
    vetorVelC1 = multiplicaMatriz(MatrizCD, vetoresVelD.v1)
    vetorVelC2 = multiplicaMatriz(MatrizCD, vetoresVelD.v2)

    corpo1.velx = vetorVelC1[0][0]
    corpo1.vely = vetorVelC1[1][0]
    corpo2.velx = vetorVelC2[0][0]
    corpo2.vely = vetorVelC2[1][0]
    corpo1.colisao = 1
    corpo2.colisao = 1
}

const calculoImpacto = (vetorVelD1, vetorVelD2, corpo1, corpo2) => {
    let novaVel1 = vetorVelD1[0][0]*((corpo1.massa - corpo2.massa)/(corpo1.massa + corpo2.massa)) + vetorVelD2[0][0]*((2*corpo2.massa)/(corpo1.massa + corpo2.massa))

    let novaVel2 = vetorVelD2[0][0]*((corpo2.massa - corpo1.massa)/(corpo1.massa + corpo2.massa)) + vetorVelD1[0][0]*((2*corpo1.massa)/(corpo1.massa + corpo2.massa))
    vetorVelD1[0][0] = novaVel1
    vetorVelD2[0][0] = novaVel2
    return {v1: vetorVelD1, v2: vetorVelD2}
}

const criaBaseComVetorDirecao = (corpo1, corpo2) => {
    let baseD = [[], []]
    baseD[0][0] = corpo1.x - corpo2.x
    baseD[1][0] = corpo1.y - corpo2.y
    let moduloVet1 = distancia(baseD[0][0], baseD[1][0], 0, 0)
    baseD[0][0] = baseD[0][0]/moduloVet1
    baseD[1][0] = baseD[1][0]/moduloVet1
    //um vetor ortogonal ao vetor direcao
    baseD[0][1] = 1
    baseD[1][1] = -baseD[0][0]/baseD[1][0]
    let moduloVet2 = distancia(baseD[0][1], baseD[1][1], 0, 0)
    baseD[0][1] = baseD[0][1]/moduloVet2
    baseD[1][1] = baseD[1][1]/moduloVet2
    return baseD
}

const inverteMatriz = (A) => {
    let invDet = 1/((A[0][0]*A[1][1]) - (A[0][1]*A[1][0]))
    let B = [[], []]
    B[0][0] = A[1][1]*invDet; B[1][1] = A[0][0]*invDet
    B[0][1] = -A[0][1]*invDet; B[1][0] = -A[1][0]*invDet
    return B
}

const multiplicaMatriz = (A, B) => {
    let C = [[], []]
    let c = 0
    for(let i in A) {
        for(let j in A) {
            c = 0
            for(let k in A) {
                c += A[i][k]*B[k][j]
            }
            C[i][j] = c
        }
    }
    return C
}

const criaMatriz2x2 = (a, b, c ,d) => {
    let M = [[], []]
    M[0][0] = a
    M[0][1] = c
    M[1][0] = b
    M[1][1] = d
    return M
}

export {aclx, acly}