import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { BlockChain } from "./model/block-chain";
import { Block } from "./model/block";


class App {

  public blockChain: BlockChain = null;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.blockChain = new BlockChain(5);
  }

  public app: express.Application;

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/getBC', (req: Request, res: Response) => {

      res.status(200).send(
        this.blockChain.blocks
      )
    });

    router.get('/checkBC', (req: Request, res: Response) => {
      let strBCStatus = this.blockChain.isBlockChainValid ? 'valid' : 'invalid';
      res.status(200).send({
        message: 'The Block Chain (BC) is ' + strBCStatus,
      })

    });
    router.post('/insertBlock', (req: Request, res: Response) => {
      const data = req.body.data;
      const oBlock = new Block(data);
      this.blockChain.addBlock(oBlock);
      res.status(200).send({ message: `the new block is added with index ${oBlock.index} successfully` });




      // const stat = util.promisify(this.blockChain.addBlock);
      // // const startAsync = async callback => {
      //   await  this.blockChain.addBlock(oBlock);
      //   // callback('Hello');
      //   // await wait(1000);
      //   // callback('And Welcome');
      //   // await wait(1000);
      //   // callback('To Async Await Using TypeScript');
      // };


    });

    router.use('/', (req: Request, res: Response) => {

      res.status(200).send({
        message: 'Welcome to my Block Chain ...'
      })
    });
    this.app.use('/', router)

  }

}

export default new App().app;