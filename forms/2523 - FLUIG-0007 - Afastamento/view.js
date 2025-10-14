
$(document).ready(function() {
		
	
	var atividade = getWKNumState();
	
	Compartilhados.expandePainel(atividade);
	Compartilhados.destacaAprovacoes();
	Compartilhados.destacaParecer();
	Compartilhados.camposObrigatorio();
	
	if(atividade !== 41 && $("#cpReaberturaChamado").val() == ""){
    	$("#divReabertura").hide();
    }
	
	if(atividade=="1" || atividade=="0" || atividade=="41"){
	
		
	//limpa solcitação ao mudar o tipo
	$("#cpTipoAfastamento").change(function(){
		$(".clearPosCentroCusto").val("");
	}); 	
		
	//Empresa e Dpto	
	$("#addEmpresa").click(function(){
		var TpSol = $("#cpTipoAfastamento").val();
		if(TpSol==""){
			window.parent.FLUIGC.message.alert({
				message : "Antes de selecionar o departamento,preencha o Tipo de Afastamento!",
				title : 'Erro',
				label : 'Ok'
			});
		}else{
		
		var zoomSecao = buscaCentroCusto();
		zoomSecao.Abrir();
		}
	}); 		
	//Colaborador
	$("#addNomCol").click(function(){
		var TpSol = $("#cpTipoAfastamento").val();
		if(TpSol==""){
			window.parent.FLUIGC.message.alert({
				message : "Antes de selecionar o colaborador,preencha o Tipo de Afastamento!",
				title : 'Erro',
				label : 'Ok'
			});
		}
		//fim afastamento - busca somente os afastados 
		else if(TpSol=="3"){
			var ZoomColAfastados = ZoomBuscaColAfastados();
			ZoomColAfastados.Abrir();
		
		}
		//inicio ou inicio e fim busca os ativos
		else{
			var ZoomCol = ZoomBuscaCol();
			ZoomCol.Abrir();	
		}
	});  
	
	criaDatepickers();
	TpAfastamento();
	
	//BUSCA DATA DE INICIO
	$("#addDtInicio").click(function() {
		var TpAfast = $("#cpTipoAfastamento").val();
		if(TpAfast=="1" || TpAfast=="2"){
			$("#DataInicio").datepicker('show');
		}
	});
	//BUSCA DATA DE FIM
	$("#addDtFim").click(function() {
		$("#DataFim").datepicker('show');
	});
	$("#cpTipoAfastamento").change(function() {
		var Tipo = $("#cpTipoAfastamento").val();
		TpAfastamento(Tipo);		
	});
	
}
	
});

var criaDatepickers = function() {
	
$("#DataInicio").datepicker({
	showOn: "button",
	showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true", 
	onSelect: function() {
	$(document).trigger('dataSelecionada');
	}
});
$("#DataFim").datepicker({
	showOn: "button",
	showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true", 
	onSelect: function() {
	$(document).trigger('dataSelecionada');
	}
});
}

var TpAfastamento = function(Tipo){
	if(Tipo=="1"){
		$(".inicio").show();
		$(".Fim").show();
	}else if(Tipo=="2"){
		$(".inicio").show();
		$(".Fim").hide();
	}else if(Tipo=="3"){
		$(".Fim").show();
		$(".inicio").show();
	}else{
		$(".Fim").hide();
		$(".inicio").hide();
	}

	
}

var buscaCentroCusto = function() {

	var login = $("#cpLoginFluig").val();

	var zoomSecao = new Zoom();

	zoomSecao.FieldsName = ["login"];
	zoomSecao.Id = "IDZoomCentroCusto";
	zoomSecao.DataSet = "DS_FLUIG_0012";
	zoomSecao.Titulo = "Buscar Obra/Departamento";
	zoomSecao.setRawFilters("login", login);
	zoomSecao.Colunas = [
		
		{"title" : "Obra/Departamento", "name" : "SECAO"},
		{"title" : "Cod.Secao", "name" : "CODSECAO" },
		{"title" : "Cod.Coligada", "name" : "CODCOLIGADA"},
		{"title" : "COD_GESTOR", "name" : "COD_GESTOR", "display" : false},
		{"title" : "NOME_GESTOR", "name" : "NOME_GESTOR", "display" : false},
		{"title" : "COD_DIRETOR", "name" : "COD_DIRETOR", "display" : false},
		{"title" : "NOME_DIRETOR", "name" : "NOME_DIRETOR", "display" : false},
		{"title" : "Empresa", "name" : "EMPRESA", "display" : false}
		];

	zoomSecao.Retorno = function(retorno) {

		$("#CentroCC").val(retorno[0]);
		$("#CodCentroCC").val(retorno[1]);
		$("#CodColigada").val(retorno[2]);
		$("#codGestorOrigem").val(retorno[3]);
		$("#Gestor").val(retorno[4]);
		$("#codDiretorOrigem").val(retorno[5]);
		$("#Empresa").val(retorno[7]);
		$("#txtSecOrig").val(retorno[0]);
		$("#CodCentroCC").val(retorno[1]);
		$("#txtCodSecaoOri").val(retorno[1]); 
	}  

	return zoomSecao;
};


function ZoomBuscaCol() {
	
	var ZoomCol = new Zoom();
	ZoomCol.FieldsName = new Array("CodCentroCC", "CodColigada");
	ZoomCol.Id = "IDZoomDadosColaborador";
	ZoomCol.DataSet = "DS_FLUIG_0026";
	ZoomCol.Titulo = "Buscar Colaborador";
	ZoomCol.Linhas = [];
	ZoomCol.Renderizado = false;
	
	ZoomCol.Colunas = [ 

		{"title" : "CHAPA", "name" : "CHAPA"},
		{"title" : "NOME", "name" : "NOME"},
		{"title" : "CARGO", "name" : "CARGO"},
		{"title" : "DATAADMISSAO", "name" : "DATAADMISSAO", display: false},
		{"title" : "UF_COLIGADA", "name" : "UF_COLIGADA", display: false},
		{"title" : "CODFUNCAO", "name" : "CODFUNCAO", display: false},
		{"title" : "CODSITUACAO", "name" : "CODSITUACAO", display: false},
		{"title" : "CODSECAO", "name" : "CODSECAO", display: false},
		{"title" : "FIMPRAZOCONTR", "name" : "FIMPRAZOCONTR", display: false},
		{"title" : "CODPESSOA", "name" : "CODPESSOA", display: false},
		{"title" : "SALARIO", "name" : "SALARIO", display: false},
		{"title" : "DATALIMITEFER", "name" : "DATALIMITEFER", display: false},
		{"title" : "CODSINDICATO", "name" : "CODSINDICATO", display: false},
		{"title" : "MEMBROCIPA", "name" : "MEMBROCIPA", display: false},
		{"title" : "CODTIPO", "name" : "CODTIPO", display: false},
		{"title" : "CODCATEGORIA", "name" : "CODCATEGORIA", display: false},
		{"title" : "TEMPRAZOCONTR", "name" : "TEMPRAZOCONTR", display: false},
		{"title" : "FIMPRAZOCONTR", "name" : "FIMPRAZOCONTR", display: false},
		{"title" : "NROFICHAREG", "name" : "NROFICHAREG", display: false},
		{"title" : "CODRECEBIMENTO", "name" : "CODRECEBIMENTO", display: false},
		{"title" : "SALARIO", "name" : "SALARIO", display: false},
		{"title" : "HORARIO", "name" : "HORARIO", display: false},
		{"title" : "CODHORARIO", "name" : "CODHORARIO", display: false},
		{"title" : "SINDICATO", "name" : "SINDICATO", display: false},
		{"title" : "CODSINDICATO", "name" : "CODSINDICATO", display: false},
		{"title" : "INDINICIOHOR", "name" : "INDINICIOHOR", display: false}
		
		  
		];
	
	
	ZoomCol.Retorno = function(retorno) {

		$("#MatriculaCod").val(retorno[0]);
		$("#TxtChapa").val(retorno[0]);
		$("#NomeColaborador").val(retorno[1]);
		$("#CargoCol").val(retorno[2]);
		$("#DatadaAdmissao").val(retorno[3]);
		$("#CodPessoa").val(retorno[9]);
		$("#TxtNomeCol").val(retorno[1]);
		$("#txtCodFuncao").val(retorno[5]);
		$("#DtLimitFer").val(retorno[11]);
		$("#txtDtAdm").val(retorno[3]);
		$("#txtCodSindicato").val(retorno[12]);
		$("#txtMembCipaCod").val(retorno[13]);
		$("#CodTipo").val(retorno[14]);
		$("#CodCategoria").val(retorno[15]);
		$("#txtSalOrigem").val(retorno[10]);
		$("#TEMPRAZOCONTR").val(retorno[16]);
		$("#FIMPRAZOCONTR").val(retorno[17]);
		$("#NROFICHAREG").val(retorno[18]);
		$("#CODRECEBIMENTO").val(retorno[19]);
		$("#Salario").val(retorno[20]);
		$("#txtCodSindicato").val(retorno[6]);
		$("#DescSindAtual").val(retorno[23]);
		$("#txtCodSindicato").val(retorno[24]);
		$("#DescHoraAtual").val(retorno[21]);
		$("#CodHorAtual").val(retorno[22]);
		$("#IndiceAtual").val(retorno[25]);
		$("#cpCodSituacao").val(retorno[6]);
	}  

	return ZoomCol;
}


function ZoomBuscaColAfastados() {
	
	var ZoomColAfastados = new Zoom();
	ZoomColAfastados.FieldsName = new Array("CodCentroCC", "CodColigada");
	ZoomColAfastados.Id = "IDZoomDadosColAfastados";
	ZoomColAfastados.DataSet = "DS_FLUIG_0043";
	ZoomColAfastados.Titulo = "Buscar Colaborador Afastado";
	ZoomColAfastados.Linhas = [];
	ZoomColAfastados.Renderizado = false;
	
	ZoomColAfastados.Colunas = [ 

		{"title" : "CHAPA", "name" : "CHAPA"},
		{"title" : "NOME", "name" : "NOME"},
		{"title" : "CARGO", "name" : "CARGO"},
		{"title" : "DATAADMISSAO", "name" : "DATAADMISSAO", display: false},
		{"title" : "UF_COLIGADA", "name" : "UF_COLIGADA", display: false},
		{"title" : "CODFUNCAO", "name" : "CODFUNCAO", display: false},
		{"title" : "CODSITUACAO", "name" : "CODSITUACAO", display: false},
		{"title" : "CODSECAO", "name" : "CODSECAO", display: false},
		{"title" : "FIMPRAZOCONTR", "name" : "FIMPRAZOCONTR", display: false},
		{"title" : "CODPESSOA", "name" : "CODPESSOA", display: false},
		{"title" : "SALARIO", "name" : "SALARIO", display: false},
		{"title" : "DATALIMITEFER", "name" : "DATALIMITEFER", display: false},
		{"title" : "CODSINDICATO", "name" : "CODSINDICATO", display: false},
		{"title" : "MEMBROCIPA", "name" : "MEMBROCIPA", display: false},
		{"title" : "CODTIPO", "name" : "CODTIPO", display: false},
		{"title" : "CODCATEGORIA", "name" : "CODCATEGORIA", display: false},
		{"title" : "TEMPRAZOCONTR", "name" : "TEMPRAZOCONTR", display: false},
		{"title" : "FIMPRAZOCONTR", "name" : "FIMPRAZOCONTR", display: false},
		{"title" : "NROFICHAREG", "name" : "NROFICHAREG", display: false},
		{"title" : "CODRECEBIMENTO", "name" : "CODRECEBIMENTO", display: false},
		{"title" : "SALARIO", "name" : "SALARIO", display: false},
		{"title" : "HORARIO", "name" : "HORARIO", display: false},
		{"title" : "CODHORARIO", "name" : "CODHORARIO", display: false},
		{"title" : "SINDICATO", "name" : "SINDICATO", display: false},
		{"title" : "CODSINDICATO", "name" : "CODSINDICATO", display: false},
		{"title" : "INDINICIOHOR", "name" : "INDINICIOHOR", display: false},
		{"title" : "DTNICIO", "name" : "DTNICIO", display: false}
		
		  
		];
	
	
	ZoomColAfastados.Retorno = function(retorno) {

		$("#MatriculaCod").val(retorno[0]);
		$("#TxtChapa").val(retorno[0]);
		$("#NomeColaborador").val(retorno[1]);
		$("#CargoCol").val(retorno[2]);
		$("#DatadaAdmissao").val(retorno[3]);
		$("#CodPessoa").val(retorno[9]);
		$("#TxtNomeCol").val(retorno[1]);
		$("#txtCodFuncao").val(retorno[5]);
		$("#DtLimitFer").val(retorno[11]);
		$("#txtDtAdm").val(retorno[3]);
		$("#txtCodSindicato").val(retorno[12]);
		$("#txtMembCipaCod").val(retorno[13]);
		$("#CodTipo").val(retorno[14]);
		$("#CodCategoria").val(retorno[15]);
		$("#txtSalOrigem").val(retorno[10]);
		$("#TEMPRAZOCONTR").val(retorno[16]);
		$("#FIMPRAZOCONTR").val(retorno[17]);
		$("#NROFICHAREG").val(retorno[18]);
		$("#CODRECEBIMENTO").val(retorno[19]);
		$("#Salario").val(retorno[20]);
		$("#txtCodSindicato").val(retorno[6]);
		$("#DescSindAtual").val(retorno[23]);
		$("#txtCodSindicato").val(retorno[24]);
		$("#DescHoraAtual").val(retorno[21]);
		$("#CodHorAtual").val(retorno[22]);
		$("#IndiceAtual").val(retorno[25]);
		$("#DataInicio").val(retorno[26]);
		
	}  

	return ZoomColAfastados;
}