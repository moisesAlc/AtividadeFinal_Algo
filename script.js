
function iniciar() {
	const input = document.getElementById("qtdAlunosInput")
	const qtdAlunos = parseInt(input.value)
	escrita_pagina(qtdAlunos, 2)
}

function escrita_pagina(qtdAlunos, avs) {

	document.write(`
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Atividade Final de Algoritmos</title>
			<link href="dist/css/bootstrap.min.css" rel="stylesheet">
			<link href="style.css" rel="stylesheet">
    </head>

    <body>
    <div class="container text-center border p-5 pt-0 my-3 ">
			<div class="row">
				<h1 class="mt-3 mb-4">Cálculo de Média Simples</h1>
			</div>

			<div class="row alert alert-success pb-0" role="alert">
				<h4>A turma tem <span id="qtdAlunos">${qtdAlunos}</span> aluno(s).<h4>
			</div>

			<div class="row d-flex justify-content-center">

	`)

	for (i = 1; i <= avs; i++) {
		escreve_form(qtdAlunos, i, "body-secondary")
	}

	escreve_form_resultado(qtdAlunos, "dark-subtle")

	document.write(`
		</div>
		<div class="row">
		<input type="button" class="form-control btn btn-primary" value="Calcular" onclick="calcular(${avs})">
		</div>
	`)
	document.write(``)
}

function escreve_form(qtdAlunos, numAvaliacao, cor) {

	document.write(`
		<form class="col card alert bg-${cor} px-5 mx-2 align-items-center">
			<h3 class="alert mb-0">Avaliação ${numAvaliacao}</h3>
    `)

	for (indice = 0; indice < qtdAlunos; indice++) {
		document.write(`<label class="form-text mb-2" for="nota${indice + 1}av${numAvaliacao}">Aluno ${indice + 1} :</label>`)
		document.write(`<input class="form-control w-50 mx-auto mb-3 notaAv${numAvaliacao}" type="number" id="nota${indice}av${numAvaliacao}" min="0" max=10 step=0.1 value=${(Math.random() * 10).toFixed(1)}>`)
	}

	document.write(`<label class="form-text mb-2" for="av${numAvaliacao}">Maior nota da avaliação ${numAvaliacao}:</label>`)
	document.write(`<input class="form-control w-50 mx-auto mb-3" type="number" id="av${numAvaliacao}maiorNota" min="0" max=10 step=0.1 readonly>`)
	document.write(`<label class="form-text mb-2" for="av${numAvaliacao}">Menor nota da avaliação ${numAvaliacao}:</label>`)
	document.write(`<input class="form-control w-50 mx-auto mb-3" type="number" id="av${numAvaliacao}menorNota" min="0" max=10 step=0.1 readonly>`)

	document.write(`</form>`)

}

function escreve_form_resultado(qtdAlunos, cor) {

	document.write(`
		<form class="col card alert bg-${cor} px-5 mx-2 align-items-center">
			<h3 class="alert mb-0">Resultados</h3>
    `)

	for (indice = 0; indice < qtdAlunos; indice += 1) {
		document.write(`<label class="form-text mb-2" for="mediaAluno${indice}">Média Aluno ${indice + 1} :</label>`)
		document.write(`<input class="form-control w-50 mx-auto mb-3" type="number" id="mediaAluno${indice}" min="0" max=10 step=0.1 readonly>`)
	}

	document.write(`<label class="form-text mb-2" for="maiorMedia">Maior média:<span class="text-danger"> A implementar 🚧</span></label>`)
	document.write(`<input class="form-control w-50 mx-auto mb-3" type="number" id="maiorMedia" min="0" max=10 step=0.1 readonly>`)
	document.write(`<label class="form-text mb-2" for="menorMedia">Menor média:<span class="text-danger"> A implementar 🚧</span></label>`)
	document.write(`<input class="form-control w-50 mx-auto mb-3" type="number" id="menorMedia" min="0" max=10 step=0.1 readonly>`)

	document.write(`</form>`)

}

function calcular(avs) {

	const menor = (arr) => arr.reduce((min, atual) => (atual < min ? atual : min), Infinity)
	const maior = (arr) => arr.reduce((max, atual) => (atual > max ? atual : max), -Infinity)
	const soma = (arr) => arr.reduce((acumulador, atual) => acumulador + atual, 0)
	const media = (arr) => parseFloat((soma(arr) / arr.length).toFixed(2)).toFixed(1)

	qtdAlunos = parseInt(document.getElementById("qtdAlunos").innerHTML)

	let avaliacoes = new Array()

	for (av = 1; av <= avs; av++) {

		notasElems = document.getElementsByClassName(`notaAv${av}`)

		const notasAvaliacao = new Array()

		Array.from(notasElems).forEach((element, index) => {
			nota = parseFloat(element.value)
			notasAvaliacao.push(nota)
		})

		menorNota = menor(notasAvaliacao)
		maiorNota = maior(notasAvaliacao)

		document.getElementById(`av${av}menorNota`).value = menorNota.toFixed(1)
		document.getElementById(`av${av}maiorNota`).value = maiorNota.toFixed(1)

		avaliacoes.push(notasAvaliacao)

	}

	avaliacoes.forEach((subarray, index) => {
		console.log(`Avaliação ${index + 1}:`)
		subarray.forEach((item, subIndex) => {
			console.log(`  Aluno ${subIndex + 1}: ${item.toFixed(1)}`)
		})
	})

	for (i = 0; i < qtdAlunos; i++) {
		const notasAluno = new Array()

		for (j = 0; j < avs; j++) {
			console.log(`Aluno ${i + 1} Av ${j + 1}: ${avaliacoes[j][i]}`)
			notasAluno.push(avaliacoes[j][i])
		}

		console.log(`Média: ${media(notasAluno)}`)

		document.getElementById(`mediaAluno${i}`).value = media(notasAluno)
		//console.log(document.getElementById(`mediaAluno${i}`))

	}
}
