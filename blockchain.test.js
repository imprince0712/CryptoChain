const Blockchain = require('./blockchain');
const Block=require('./block');

describe('Blockchain',()=>{
    let blockchain, newChain,originalChain;
    beforeEach(()=>{
        blockchain=new Blockchain();
        newChain=new Blockchain();
        originalChain=blockchain.chain;
    });
    it('contains a `chain` Array of instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });
    it('starts with a genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });
    it('adds a new Block to the chain',()=>{
        const newData='foo bar';
        blockchain.addBlock({data:newData});
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });
    describe('isValidChain()',()=>{
        beforeEach(()=>{
            blockchain.addBlock({data:'Bears'});
            blockchain.addBlock({data:'Beets'});
            blockchain.addBlock({data:'Battlestar Galactica'});
        });
        describe('when the chain does not start with the genesis block',()=>{
            it('returns false',()=>{
                blockchain.chain[0]={data:'fake-genesis'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
        describe('when the chain starts with the genesis block and has multiple blocks',()=>{
            describe('and lastHash refernce has changed',()=>{
                it('returns false',()=>{
                    
                    blockchain.chain[2].lastHash='broken-lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain contains a block with the invalid field',()=>{
                it('returns false',()=>{
                    
                    blockchain.chain[2].data='some-bad-and-evil-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('ans the chain does not contain any invalid blocks',()=>{
                it('return true',()=>{
                   
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });
    });
    describe('replaceChain()',()=>{
        describe('when the new chain is not longer',()=>{
            it('does not replace the chain',()=>{
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });
        });
        describe('when the new chain is longer',()=>{
            describe('and the chain is invalid',()=>{
                it('does not replace the chain',()=>{
                    
                });
            });
            describe('and the chain is valid',()=>{
                it('replaces the chain',()=>{

                });
            });
        });
    });
});