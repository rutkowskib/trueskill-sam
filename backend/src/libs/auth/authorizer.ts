import jws from 'jws';
import jwkToPem from 'jwk-to-pem';
import request from 'request-promise';

const certificates = {};

// helper function to load certificate of issuer
function getCertificate(iss, kid) {
    if (certificates[iss]) {
        // resolve with cached certificate, if exists
        return Promise.resolve(certificates[iss][kid]);
    }
    return request({
        url: `${iss}/.well-known/jwks.json`,
        method: 'GET'
    }).then((rawBody) => {
        const { keys } = JSON.parse(rawBody);
        const pems = keys.map(k => ({ kid: k.kid, pem: jwkToPem(k) }));
        const map = {};
        pems.forEach((e) => { map[e.kid] = e.pem; });
        certificates[iss] = map;
        return map[kid];
    });
}

// extract tenant from a payload
function getTenant() {
    return 'xd'
}

// Help function to generate an IAM policy
function generatePolicy(payload, effect, resource) {
    const tenant = getTenant();
    if (!tenant) {
        return Promise.reject(new Error('Unknown tenant'));
    }
    const authResponse = {} as any;

    authResponse.principalId = payload.sub;
    if (effect && resource) {
        authResponse.policyDocument = {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }]
        };
    }

    // extract tenant id from iss
    payload.tenant = tenant;

    authResponse.context = { payload: JSON.stringify(payload) };

    console.log('%j', authResponse);

    return authResponse;
}

function verifyPayload(payload) {
    if (payload.token_use !== 'id') {
        console.log('Invalid token use');
        return Promise.reject(new Error('Invalid token use'));
    }

    if (parseInt(payload.exp || 0, 10) * 1000 < new Date().getTime()) {
        console.log('Token expired');
        return Promise.reject(new Error('Token expired'));
    }

    // check if iss is a known tenant TODO FIX THIS
    /*return tenants().then((config) => {
        if (config[payload.iss]) {
            return Promise.resolve();
        }
        console.log('Invalid issuer');
        return Promise.reject();
    });*/
    return Promise.resolve();
}

function verifyToken(token, alg, pem) {
    if (!jws.verify(token, alg, pem)) {
        console.log('Invalid Signature');
        return Promise.reject(new Error('Token invalid'));
    }
    return Promise.resolve();
}

exports.handler = function handle(e, context, callback) {
    console.log('processing event: %j', e);

    const { authorizationToken: token } = e;

    if (!token) {
        console.log('No token found');
        return callback('Unauthorized');
    }
    const decoded = jws.decode(token);
    console.log(decoded);

    const { header: { alg, kid }, payload: rawToken } = decoded;
    const payload = JSON.parse(rawToken);
    console.log(payload);

    return verifyPayload(payload)
        .then(() => getCertificate(payload.iss, kid))
        .then(pem => verifyToken(token, alg, pem))
        .then(() => generatePolicy(payload, 'Allow', e.methodArn))
        .then(policy => callback(null, policy))
        .catch((err) => {
            console.log(err);
            return callback('Unauthorized');
        });
};