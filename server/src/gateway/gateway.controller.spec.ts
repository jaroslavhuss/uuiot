import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import {GatewayService} from "./gateway.service"
describe('GatewayController', () => {
  let controller: GatewayController;
const mockGatewayService = {}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers:[GatewayService]
    }).overrideProvider(GatewayService).useValue(mockGatewayService).compile()

    controller = module.get<GatewayController>(GatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
