function afterProcessCreate(processId){
	hAPI.setCardValue( "cpNumeroSolicitacao", getValue("WKNumProces") );
}

function beforeStateEntry(sequenceId) {

    // ID da atividade do Analista BPO
    var ATIVIDADE_ANALISTA_BPO = 106;

    // ID da atividade de Correção do Solicitante
    var ATIVIDADE_CORRECAO = 41;

    var previousState = getValue("WKPreviousState");

    // Verifica se a atividade que está sendo aberta é a do Analista BPO
    // E se a atividade de onde ela veio é a de Correção
    if (sequenceId == ATIVIDADE_ANALISTA_BPO && previousState == ATIVIDADE_CORRECAO) {
        
        log.info("PROCESSO " + getValue("WKNumProces") + ": Limpando campos de aprovação ao retornar da correção para o Analista BPO.");

        // Limpa os campos do formulário usando a API hAPI
        hAPI.setCardValue("cpAprovacaoGestor", "");
        hAPI.setCardValue("cpParecercol", "");
        hAPI.setCardValue("cpRespGestor", "");
    }
}