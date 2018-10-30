import { SHA256 } from 'crypto-js';

export class Block {

    public index: number = 0;
    public previousHash: string = '0';
    public hash: string = '';
    public timestamp: Date = new Date();
    public nonce: number = 0;

    constructor(
        public data: any,
    ) {
    }

    public calculateHash(): string {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            this.data +
            this.nonce
        ).toString();
    }

    public mineBlock(difficulty: number) {

        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

    }
}


