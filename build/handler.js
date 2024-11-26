"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceMessages = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const kinesis = new aws_sdk_1.default.Kinesis();
const produceMessages = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const streamName = process.env.STREAM_NAME;
    const body = JSON.parse(event.body || '{}');
    try {
        yield kinesis
            .putRecord({
            StreamName: streamName,
            PartitionKey: '1',
            Data: JSON.stringify(body),
        })
            .promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data sent to Kinesis stream!' }),
        };
    }
    catch (error) {
        console.error('Error writing to Kinesis:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send data to Kinesis.' }),
        };
    }
});
exports.produceMessages = produceMessages;
