import { Block } from "./block";

export class BlockChain {

    public blocks: Block[] = [];


    constructor(public difficulty = 3) {
        const oBlock = new Block("Genesis block");
        oBlock.mineBlock(this.difficulty);
        this.blocks.push(oBlock);
    }


    private _latestBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    public addBlock(newBlock: Block) {
        newBlock.index = this.blocks.length;
        newBlock.previousHash = this._latestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.blocks.push(newBlock);
    }

    public isBlockChainValid() {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];

            if (currentBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            const previousBlock = this.blocks[i - 1];

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}


