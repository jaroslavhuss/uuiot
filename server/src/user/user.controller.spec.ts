import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
const mock = {
  getAllUsers:jest.fn(async ()=>([
    {}
  ])),
 
  updateUser:jest.fn(async()=>({})),
  deleteUser:jest.fn(async()=>({}))
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
const date = new Date()
  it("should return a specific user", async()=>{
    expect(controller.whoAmI({
      email:"jaroslav.huss@gmail.com",
      name:"Jaroslav",
      surname:"Huss",
      createdAt:date,
      updatedAt:date,
      authLevel:"iot-admin",
      isUserApproved:true,
      password:"somefailstring",
      lastLoggedIn:date,
      refresh_token:"fake_token"
    })).toStrictEqual({  email:"jaroslav.huss@gmail.com",
    name:"Jaroslav",
    surname:"Huss",
    createdAt:date,
    updatedAt:date,
    authLevel:"iot-admin",
    isUserApproved:true,
    lastLoggedIn:date,
    refresh_token:"fake_token"})
  })

  it("should delete a user", async ()=>{
    expect(await controller.deleteUser("fakeid")).toStrictEqual({})
  })
  
  it("should", async ()=>{
    expect(await controller.updateUser({ email:"jaroslav.huss@gmail.com",
    name:"Jaroslav",
    surname:"Huss",
    authLevel:"iot-admin",
    isUserApproved:true,
   }, "fakeid")).toStrictEqual({})
  })
});
