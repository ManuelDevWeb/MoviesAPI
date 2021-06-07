//Utilidad para optimizar los mensajes que salen al realizar una peticion

function buildMessage(entity, action) {
    if (action === 'list') {
        return `${entity}s ${action}ed`;
    } else {
        return `${entity} ${action}d`;
    }
}

module.exports = buildMessage;