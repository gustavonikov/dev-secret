const { v4: uuidv4 } = require('uuid');

require('../resources/db/connection')();

const SecretModel = require('../resources/db/models/Secret');

module.exports.create = async (event, context) => {
    context.callBackWaitsForEmptyEventLoop = false;

    const { id: secretId } = event.pathParameters
    const { name, email } = JSON.parse(event.body);
    const externalId = uuidv4();

    try {
        const result = await SecretModel.updateOne(
            {
                externalId: secretId,
                'participants.email': { $ne: email },  
            },
            {
                $push: {
                    participants: {
                        externalId,
                        name,
                        email,
                    }
                }
            }
        )

        if (!result.nModified) {
            throw new Error();
        }

        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                success: true,
                id: externalId,
            }),
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                success: false,
            }),
        }
    }
};

module.exports.delete = async (event, context) => {
    context.callBackWaitsForEmptyEventLoop = false;

    const { id: secretId, participantId } = event.pathParameters;
    const adminKey = event.headers['admin-key'];

    try {
        const result = await SecretModel.updateOne(
            {
                externalId: secretId,
                adminKey,
            }, 
            {
                $pull: {
                    participants: {
                        externalId: participantId,
                    }
                }
            }
        )
        
        if (!result.nModified) {
            throw new Error();
        }

        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                success: false,
            }),
        }
    }
};