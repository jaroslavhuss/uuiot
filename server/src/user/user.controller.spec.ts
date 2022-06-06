import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
describe('UserController', () => {
  let controller: UserController;
const mock = {
  getAllUsers:jest.fn(async ()=>([
    {}
  ]))
}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      controllers: [UserController],
      providers:[UserService]
    }).overrideProvider(UserService).useValue(mock).compile()

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it("should return all users", async ()=>{
    expect(await controller.getAllUsers()).toEqual([{}])
  })
});
