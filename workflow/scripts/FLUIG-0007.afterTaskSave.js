function afterTaskSave(colleagueId, nextSequenceId, userList) {

    log.info("--- [FLUIG-0007] Evento afterTaskSave ---");

    // ID da atividade de Correção do Solicitante
    var ATIVIDADE_CORRECAO = 41;
    var atividadeAtual = getValue("WKNumState");

    log.info("--- [FLUIG-0007] Atividade Atual: " + atividadeAtual);

    // Verifica se a tarefa que está sendo salva é a de "Correção da Solicitação"
    if (atividadeAtual == ATIVIDADE_CORRECAO) {

        // Pega o valor da decisão do solicitante (1 = Reenviar Chamado, 2 = Cancelar)
        var decisaoSolicitante = hAPI.getCardValue("cpReaberturaChamado");
        log.info("--- [FLUIG-0007] Decisão do Solicitante na Correção: " + decisaoSolicitante);

        // Se a decisão for "Reenviar Chamado", limpa os campos do parecer anterior do analista
        if (decisaoSolicitante == "1") {
            log.info("--- [FLUIG-0007] Limpando campos de parecer do analista para nova avaliação. Processo: " + getValue("WKNumProces"));
            
            // Limpa os campos de aprovação, parecer e nome do aprovador
            hAPI.setCardValue("cpAprovacaoGestor", "");
            hAPI.setCardValue("cpParecercol", "");
            hAPI.setCardValue("cpRespGestor", "");
        }
    }
}

// Função para preencher o número da solicitação na criação do processo
function afterProcessCreate(processId){
	hAPI.setCardValue( "cpNumeroSolicitacao", getValue("WKNumProces") );
}

// A função abaixo pode ser mantida, mas a lógica principal agora está no afterTaskSave
function beforeStateEntry(sequenceId) {
    // A lógica foi movida para o afterTaskSave para maior confiabilidade.
    // Pode-se adicionar outros códigos aqui, se necessário para outras etapas.
    log.info("--- [FLUIG-0007] Entrando na atividade: " + sequenceId);
}