import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserService = {
    getAllUsers:jest.fn(()=>({})),
    updateUser:jest.fn(async()=>({})),
    deleteUser:jest.fn(async()=>({}))
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).overrideProvider(UserService).useValue(mockUserService).compile()

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should", async() =>{
    expect(await service.getAllUsers()).toEqual({})
  })
  it("should", async() =>{
    expect(await service.deleteUser("fakeid")).toStrictEqual({})
  })
  it("should", async() =>{
    expect(await service.updateUser("fakeid",{ email:"jaroslav.huss@gmail.com",
    name:"Jaroslav",
    surname:"Huss",
    authLevel:"iot-admin",
    isUserApproved:true,
   })).toStrictEqual({})
  })
});
