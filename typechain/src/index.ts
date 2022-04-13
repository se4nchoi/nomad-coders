import * as CryptoJS from 'crypto-js';
class Block {
    public index: number;
    public hash: string;
    public prevHash: string;
    public data: string;
    public timestamp: number;

    // you don't really need this to be static + inside this class
    // could write outside as global function
    static calculateBlockHash = (
        index: number,
        prevHash: string,
        timestamp: number,
        data: string
    ): string =>
        CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

    static validateStructure = (target: Block):boolean => {
        return  typeof target.index === "number" &&
                typeof target.hash === "string" && 
                typeof target.prevHash === "string" && 
                typeof target.data === "string" && 
                typeof target.timestamp === "number";
    }
    constructor(
        index: number,
        hash: string,
        prevHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, '2020202020', '', 'Hello', 123456);

let blockchain: [Block] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const prevBlock: Block = getLatestBlock();
    const newIndex: number = prevBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        prevBlock.hash,
        newTimeStamp,
        data
    );

    const newBlock = new Block(newIndex, newHash, prevBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};

const getHashOfBlock = (aBlock: Block):string => Block.calculateBlockHash(
            aBlock.index, aBlock.prevHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock:Block, previousBlock:Block):boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.prevHash) {
        return false;
    } else if (getHashOfBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
        
    }
}

const addBlock = (candidateBlock:Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);