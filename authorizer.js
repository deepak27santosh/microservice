exports.handler = async event => {
    console.log('event', event);

    const clientId = event.body.clientId;

    if (!clientId) {
        console.log('could not find a client Id on the event');
        return generatePolicy({ allow: false });
    }
    return generatePolicy({ allow: true });
};

const generatePolicy = ({ allow }) => {
    return {
        principalId: 'token',
        policyDocument: {
            Version: '2012-10-17',
            Statement: {
                Action: 'execute-api:Invoke',
                Effect: allow ? 'Allow' : 'Deny',
                Resource: '*',
            },
        },
    };
};