import 'reflect-metadata';
import {
    APIGatewayEvent,
} from "aws-lambda";
import { buildResponse } from '../libs/lambda';

export const handler = async (event: APIGatewayEvent, context: any) => {
    console.log(event);
    console.log(context);
    return buildResponse(200)
};
