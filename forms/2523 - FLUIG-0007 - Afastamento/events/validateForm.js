/*
GESTOR - 7
DIRETOR - 8
CORREÇÃO - 41
ADMISSAO - 74
VALIDA KIT - 97
GERAR KIT - 89
*/
function validateForm(form){

	var atividade = parseInt(getValue("WKNumState"));
	var msg = "";
	var acaoUsuario = getValue("WKCompletTask");
	var Errors = [];
	
	function validaAprovacao(aprovacao, parecer) {
		if (form.getValue(aprovacao) == 0) {
			Errors.push('Aprovação não preenchida');
		}

		if (form.getValue(aprovacao) == 2 && form.getValue(parecer) == '') {
			Errors.push('Parecer não prenchido'); 
		}
	}

	function validaVazio(campo, mensagem) {
		if (form.getValue(campo) == '') {
			Errors.push(mensagem);
		}
	}

	function validaNotSelected(campo, mensagem) {
		if (form.getValue(campo) == '') {
			Errors.push(mensagem);
		}
	}

	var getDtConvertida = function(campo) {
		var dtArray = String(form.getValue(campo)).split('/');
		return new Date(dtArray[2], dtArray[1] - 1, dtArray[0]);
	};
	
	
	validaVazio('Empresa', 'Empresa');
	validaVazio('CentroCC', 'Centro de Custo');
	validaVazio('NomeColaborador', 'Nome do Colaborador');
	validaVazio('DatadaAdmissao', 'Data Admissão');
	validaVazio('CargoCol', 'Cargo');
	validaVazio('MatriculaCod', 'Matrícula');
	validaVazio('Gestor', 'Gestor');
	validaVazio('cpTipoAfastamento', 'Tipo Afastamento'); 
	
	//Indice novo horário
	if (form.getValue("CpNovoHorario") !="" && form.getValue("CpIndiceCodHorario")==""){
		msg += "Índice Horário." + "<br>";	
	}
	
	
	//Tipo Afastamento
	if (form.getValue("cpTipoAfastamento")=="1"  && (acaoUsuario=="true")) { //GESTOR IMEDIATO
		validaVazio('DataInicio', 'Data de Início');
		validaVazio('DataFim', 'Data de Fim');
	}
	if (form.getValue("cpTipoAfastamento")=="2"  && (acaoUsuario=="true")) { //GESTOR IMEDIATO
		validaVazio('DataInicio', 'Data de Início');
	}
	if (form.getValue("cpTipoAfastamento")=="3"  && (acaoUsuario=="true")) { //GESTOR IMEDIATO
		validaVazio('DataInicio', 'Data de Início');
		validaVazio('DataFim', 'Data de Fim');
	}


	if (Errors.length) {
	throw Errors[0];
	}



	if (msg != ""){

		throw "<br> ERRO! <br>Campo(s) n&atilde;o informado(s): <br>" + msg;

	}

	

}