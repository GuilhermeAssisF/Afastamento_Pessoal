/*
GESTOR - 7
DIRETOR - 8
CORREÇÃO - 41
ADMISSAO - 74
VALIDA KIT - 97
GERAR KIT - 89
*/

function enableFields(form){ 

	log.info("INICIO do EnableFields do formulário FLUIG-0007 - AFASTAMENTOS");
	
	var atividade = parseInt(getValue("WKNumState"));
	
	var Campos = new Array(
			//inicio e correcao
		{"campo" : "Empresa","atividade" : "0,1,41"},
		{"campo" : "CentroCC","atividade" : "0,1,41"},
		{"campo" : "NomeColaborador","atividade" : "0,1,41"},
		{"campo" : "CargoCol","atividade" : "0,1,41"},
		{"campo" : "MatriculaCod","atividade" : "0,1,41"},
		{"campo" : "cpCodSituacao","atividade" : "0,1,41"}, 
		
		// Linha adicionada para Código da Situação
		{"campo" : "Gestor","atividade" : "0,1,41"},

		// Adição de novos campos
        {"campo" : "cpTipoAfastamentoRM","atividade" : "0,1,41"},
        {"campo" : "cpMotivoAfastamento","atividade" : "0,1,41"},

		//Continuação dos campos
		{"campo" : "cpTipoAfastamento","atividade" : "0,1,41"},
		{"campo" : "DataInicio","atividade" : "0,1,41"},
		{"campo" : "DataFim","atividade" : "0,1,41"},
		{"campo" : "cpParecerObs","atividade" : "0,1,41"},
		//REABERTURA
		{"campo" : "cpReaberturaChamado","atividade" : "41"},
		{"campo" : "cpParecerReabertura","atividade" : "41"},
		//ANALISTA BPO
		{"campo" : "cpAprovacaoGestor","atividade" : "106"},
		{"campo" : "cpParecercol","atividade" : "106"},
		{"campo" : "cpRespGestor","atividade" : "106"}
	);

	for (var item in Campos){
		var Campo = Campos[item],
			atividades = Campo["atividade"].split(",");
		
		if(atividades.indexOf(atividade.toString()) >= 0){
			form.setEnabled(Campo["campo"],true);
			
		} else {
			form.setEnabled(Campo["campo"],false);
		}
	}

	log.info("Fim do EnableFields do formulário FLUIG-0007 - AFASTAMENTOS");
	
}



