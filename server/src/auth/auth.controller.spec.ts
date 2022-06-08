import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    signin:jest.fn(()=>({
      access_token:"lskjdf",
      refresh_token:"klsdjf"
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[AuthService]
    }).overrideProvider(AuthService).useValue(mockAuthService).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should do something", async ()=>{
    expect(await controller.signin({email:"jaroslav.huss@gmail.com", password:"some pwd"})).toStrictEqual({ access_token:"lskjdf",
    refresh_token:"klsdjf"})
  })
});
